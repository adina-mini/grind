import { AppState } from '../types/state';
import { ALL_SKILLS, SKILLS_BY_ID } from '../data/roadmap';
import { ALL_PROJECTS, PROJECTS_BY_ID } from '../data/projects';
import { TIMELINE_PHASES } from '../data/timeline';
import { calculateTimeline } from './dates';

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  category: 'Skill' | 'Project' | 'Challenge' | 'Proof';
  entityId?: string;
  rationale: string;
  actionText: string;
}

export interface Recommendation {
  skillId?: string;
  projectId?: string;
  title: string;
  subtitle: string;
  rationale: string;
  type: 'skill' | 'project';
  estimatedHours: number;
  priorityScore: number;
}

export function generateDailyMission(state: AppState): DailyMission {
  const timeline = calculateTimeline(
    state.settings.startDate,
    state.settings.targetGraduationDate,
    TIMELINE_PHASES,
    state
  );

  const activePhase = timeline.phasesInfo[timeline.currentPhaseIndex]?.phase || TIMELINE_PHASES[0];

  // 1. Look for uncompleted skills in the active phase whose prerequisites are met
  const uncompletedPhaseSkills = ALL_SKILLS.filter((s) => {
    if (s.phaseId !== activePhase.id) return false;
    if (state.completedSkills[s.id]) return false;
    // Check prerequisites
    const prereqsMet = s.prerequisites.every((pid) => state.completedSkills[pid]);
    return prereqsMet;
  });

  if (uncompletedPhaseSkills.length > 0) {
    const targetSkill = uncompletedPhaseSkills[0];
    return {
      id: `mission-skill-${targetSkill.id}`,
      title: `Master: ${targetSkill.title}`,
      description: targetSkill.description,
      estimatedMinutes: Math.min(120, targetSkill.estimatedHours * 30),
      category: 'Skill',
      entityId: targetSkill.id,
      rationale: `Part of your active ${activePhase.title} curriculum. Completing this unlocks next milestones.`,
      actionText: 'Study & Mark Complete',
    };
  }

  // 2. Look for ready or in-progress projects
  const activeProjects = ALL_PROJECTS.filter((p) => {
    const status = state.projectStates[p.id]?.status || 'LOCKED';
    return status === 'IN_PROGRESS' || status === 'READY';
  });

  if (activeProjects.length > 0) {
    const targetProject = activeProjects[0];
    const proof = state.projectStates[targetProject.id]?.proof;
    const needsTests = !proof?.hasAutomatedTests;
    const needsDeploy = !proof?.liveDemoUrl;

    if (needsTests) {
      return {
        id: `mission-proof-test-${targetProject.id}`,
        title: `Add Pytest Suite to ${targetProject.title}`,
        description: 'Write deterministic automated unit tests and achieve >= 80% code coverage.',
        estimatedMinutes: 45,
        category: 'Proof',
        entityId: targetProject.id,
        rationale: 'Adding automated tests proves engineering rigour and awards +25 XP and +20 Proof points.',
        actionText: 'Update Project Proof',
      };
    }

    if (needsDeploy) {
      return {
        id: `mission-proof-deploy-${targetProject.id}`,
        title: `Deploy ${targetProject.title} Live`,
        description: 'Deploy this service to a live cloud host (Render, Railway, Fly.io, or AWS) and attach the live URL.',
        estimatedMinutes: 60,
        category: 'Proof',
        entityId: targetProject.id,
        rationale: 'Live deployments distinguish serious builders and award +50 XP and +45 Proof points.',
        actionText: 'Update Deployment URL',
      };
    }

    return {
      id: `mission-project-${targetProject.id}`,
      title: `Ship: ${targetProject.title}`,
      description: targetProject.description,
      estimatedMinutes: 90,
      category: 'Project',
      entityId: targetProject.id,
      rationale: 'This project is currently active and ready for completion.',
      actionText: 'Open Project',
    };
  }

  // Fallback generic mission
  return {
    id: 'mission-explore-roadmap',
    title: 'Explore & Plan Your Next Milestone',
    description: 'Review upcoming skills in your active phase and start planning your next portfolio project.',
    estimatedMinutes: 30,
    category: 'Skill',
    rationale: 'Strategic planning keeps your 2-year transformation aligned with your personal targets.',
    actionText: 'Explore Roadmap',
  };
}

export function generateNextRecommendation(state: AppState): Recommendation {
  const timeline = calculateTimeline(
    state.settings.startDate,
    state.settings.targetGraduationDate,
    TIMELINE_PHASES,
    state
  );

  const activePhase = timeline.phasesInfo[timeline.currentPhaseIndex]?.phase || TIMELINE_PHASES[0];

  // Calculate unlock counts for each uncompleted skill
  // (how many projects list this skill as a requiredSkill)
  const candidateSkills = ALL_SKILLS.filter((s) => !state.completedSkills[s.id]);

  let bestSkill = candidateSkills[0];
  let highestScore = -1;
  let bestRationale = '';

  for (const skill of candidateSkills) {
    let score = 0;
    const isCurrentPhase = skill.phaseId === activePhase.id;
    if (isCurrentPhase) score += 50;

    // Prereqs met?
    const prereqsMet = skill.prerequisites.every((pid) => state.completedSkills[pid]);
    if (prereqsMet) score += 30;

    // How many projects require this skill?
    const requiringProjects = ALL_PROJECTS.filter((p) => p.requiredSkills.includes(skill.id));
    score += requiringProjects.length * 15;

    if (score > highestScore) {
      highestScore = score;
      bestSkill = skill;

      const projectCount = requiringProjects.length;
      if (projectCount > 0 && isCurrentPhase) {
        bestRationale = `Recommended because it is part of your current ${activePhase.title} and is required by ${projectCount} portfolio project${projectCount > 1 ? 's' : ''}.`;
      } else if (projectCount > 0) {
        bestRationale = `Recommended because it is a prerequisite for ${projectCount} projects across your curriculum.`;
      } else if (isCurrentPhase) {
        bestRationale = `Recommended because it is part of your scheduled ${activePhase.title} focus area.`;
      } else {
        bestRationale = `Recommended as the next logical skill based on your completed prerequisites.`;
      }
    }
  }

  if (bestSkill) {
    return {
      skillId: bestSkill.id,
      title: bestSkill.title,
      subtitle: `${bestSkill.difficulty} • ~${bestSkill.estimatedHours}h`,
      rationale: bestRationale,
      type: 'skill',
      estimatedHours: bestSkill.estimatedHours,
      priorityScore: highestScore,
    };
  }

  return {
    title: 'All Curated Skills Mastered',
    subtitle: '100% Curriculum Completed',
    rationale: 'You have achieved complete coverage across all 17 AI Engineering tracks.',
    type: 'skill',
    estimatedHours: 0,
    priorityScore: 0,
  };
}
