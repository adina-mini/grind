import { Phase, PhaseStatus } from '../types/timeline';
import { AppState } from '../types/state';
import { SKILLS_BY_PHASE } from '../data/roadmap';
import { PROJECTS_BY_PHASE } from '../data/projects';

export interface TimelineCalculation {
  startDate: Date;
  graduationDate: Date;
  totalDays: number;
  daysElapsed: number;
  daysRemaining: number;
  percentElapsed: number;
  currentPhaseIndex: number;
  phasesInfo: {
    phase: Phase;
    startDate: Date;
    endDate: Date;
    status: PhaseStatus;
    skillsTotal: number;
    skillsCompleted: number;
    projectsTotal: number;
    projectsCompleted: number;
    completionPercent: number;
    isCurrent: boolean;
  }[];
}

export function parseDate(dateStr: string): Date {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date() : d;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function calculateTimeline(
  startDateStr: string,
  graduationDateStr: string,
  phases: Phase[],
  state: AppState
): TimelineCalculation {
  const startDate = parseDate(startDateStr);
  const graduationDate = parseDate(graduationDateStr);
  const now = new Date();

  // Clamp now for elapsed calculation
  const totalMs = Math.max(1, graduationDate.getTime() - startDate.getTime());
  const totalDays = Math.ceil(totalMs / (1000 * 60 * 60 * 24));

  const elapsedMs = Math.max(0, now.getTime() - startDate.getTime());
  const daysElapsed = Math.min(totalDays, Math.floor(elapsedMs / (1000 * 60 * 60 * 24)));
  const daysRemaining = Math.max(0, totalDays - daysElapsed);
  const percentElapsed = Math.min(100, Math.round((daysElapsed / totalDays) * 100));

  let currentPhaseIndex = 0;

  const phasesInfo = phases.map((phase, idx) => {
    // Phase month boundaries: phase.startMonth (1-indexed) to phase.endMonth (inclusive)
    const phaseStartOffsetMonths = phase.startMonth - 1;
    const phaseDurationMonths = phase.endMonth - phase.startMonth + 1;

    // Calculate actual dates
    const phaseStart = addMonths(startDate, phaseStartOffsetMonths);
    const phaseEnd = addMonths(startDate, phaseStartOffsetMonths + phaseDurationMonths);

    // Requirements calculation
    const phaseSkills = SKILLS_BY_PHASE[phase.id] || [];
    const skillsTotal = phaseSkills.length;
    const skillsCompleted = phaseSkills.filter((s) => state.completedSkills[s.id]).length;

    const phaseProjects = PROJECTS_BY_PHASE[phase.id] || [];
    const projectsTotal = phaseProjects.length;
    const projectsCompleted = phaseProjects.filter(
      (p) => state.projectStates[p.id]?.status === 'COMPLETED'
    ).length;

    const totalRequirements = skillsTotal + projectsTotal;
    const completedRequirements = skillsCompleted + projectsCompleted;
    const completionPercent =
      totalRequirements > 0 ? Math.round((completedRequirements / totalRequirements) * 100) : 0;

    const isAllCompleted = totalRequirements > 0 && completedRequirements === totalRequirements;

    // Evaluate Phase Status based on user's exact specification:
    // 1. COMPLETED: all requirements for phase are complete
    // 2. AHEAD: phase has not started and at least 80% of requirements already complete
    // 3. CURRENT: today's date is inside phase date range (default active)
    // 4. ON TRACK: phase is active and progress is reasonably aligned with elapsed time
    // 5. BEHIND: phase end date has passed and requirements remain incomplete
    // 6. UPCOMING: phase has not started and requirements are incomplete (<80%)

    let status: PhaseStatus = 'UPCOMING';
    const isCurrent = now >= phaseStart && now <= phaseEnd;

    if (isCurrent) {
      currentPhaseIndex = idx;
    }

    if (isAllCompleted) {
      status = 'COMPLETED';
    } else if (now > phaseEnd) {
      // Phase end date has passed and requirements incomplete
      status = 'BEHIND';
    } else if (now < phaseStart) {
      // Phase has not started yet
      if (completionPercent >= 80) {
        status = 'AHEAD';
      } else {
        status = 'UPCOMING';
      }
    } else {
      // Phase is currently active (now between phaseStart and phaseEnd)
      const phaseMsTotal = Math.max(1, phaseEnd.getTime() - phaseStart.getTime());
      const phaseMsElapsed = Math.max(0, now.getTime() - phaseStart.getTime());
      const phasePercentElapsed = Math.round((phaseMsElapsed / phaseMsTotal) * 100);

      // On track if completion percent is at least (phasePercentElapsed - 15)
      if (completionPercent >= Math.max(0, phasePercentElapsed - 15)) {
        status = 'ON TRACK';
      } else {
        status = 'CURRENT';
      }
    }

    return {
      phase,
      startDate: phaseStart,
      endDate: phaseEnd,
      status,
      skillsTotal,
      skillsCompleted,
      projectsTotal,
      projectsCompleted,
      completionPercent,
      isCurrent,
    };
  });

  return {
    startDate,
    graduationDate,
    totalDays,
    daysElapsed,
    daysRemaining,
    percentElapsed,
    currentPhaseIndex,
    phasesInfo,
  };
}
