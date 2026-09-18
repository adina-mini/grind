import { AppState, AwardedMilestone } from '../types/state';
import { ProjectStatus, ProjectProof, ProjectBonusAwards } from '../types/project';
import { UserSettings } from '../types/state';
import { SKILLS_BY_ID, ALL_SKILLS } from '../data/roadmap';
import { PROJECTS_BY_ID, ALL_PROJECTS } from '../data/projects';
import { CHALLENGES_BY_ID } from '../data/challenges';
import { ALL_CHECKPOINTS } from '../data/timeline';
import { SKILL_XP_VALUES, PROJECT_BASE_XP, PROJECT_BONUS_XP } from '../utils/xp';
import { getInitialState } from './persistence';

export type AppAction =
  | { type: 'TOGGLE_SKILL'; skillId: string }
  | { type: 'UPDATE_PROJECT_STATUS'; projectId: string; status: ProjectStatus }
  | { type: 'UPDATE_PROJECT_PROOF'; projectId: string; proof: Partial<ProjectProof> }
  | { type: 'TOGGLE_PROJECT_BONUS'; projectId: string; bonusKey: keyof ProjectBonusAwards }
  | { type: 'COMPLETE_CHALLENGE'; challengeId: string; notes?: string }
  | { type: 'COMPLETE_MISSION'; missionId: string; title: string }
  | { type: 'TOGGLE_CHECKPOINT'; checkpointId: string }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<UserSettings> }
  | { type: 'TOGGLE_CHECKLIST_ITEM'; itemId: string }
  | { type: 'IMPORT_STATE'; state: AppState }
  | { type: 'RESET_STATE' };

function updateProjectAvailability(
  completedSkills: Record<string, boolean>,
  projectStates: AppState['projectStates']
): AppState['projectStates'] {
  const updatedStates = { ...projectStates };

  for (const project of ALL_PROJECTS) {
    const current = updatedStates[project.id];
    if (!current) continue;

    // If currently LOCKED, check if all required skills are now completed
    if (current.status === 'LOCKED') {
      const allSkillsMet = project.requiredSkills.every((skId) => completedSkills[skId]);
      if (allSkillsMet) {
        updatedStates[project.id] = {
          ...current,
          status: 'READY',
        };
      }
    }
  }

  return updatedStates;
}

function syncCheckpoints(
  completedSkills: Record<string, boolean>,
  completedCheckpoints: Record<string, boolean>
): Record<string, boolean> {
  const updatedCheckpoints = { ...completedCheckpoints };

  for (const cp of ALL_CHECKPOINTS) {
    if (cp.linkedSkillIds.length > 0) {
      const allLinkedSkillsDone = cp.linkedSkillIds.every((skId) => completedSkills[skId]);
      if (allLinkedSkillsDone && !updatedCheckpoints[cp.id]) {
        updatedCheckpoints[cp.id] = true;
      }
    }
  }

  return updatedCheckpoints;
}

export function appReducer(state: AppState, action: AppAction): AppState {
  const now = new Date().toISOString();

  switch (action.type) {
    case 'TOGGLE_SKILL': {
      const { skillId } = action;
      const skill = SKILLS_BY_ID[skillId];
      if (!skill) return state;

      const wasCompleted = !!state.completedSkills[skillId];
      const isNowCompleted = !wasCompleted;

      const newCompletedSkills = {
        ...state.completedSkills,
        [skillId]: isNowCompleted,
      };

      const xpValue = SKILL_XP_VALUES[skill.difficulty] || 10;
      const xpDelta = isNowCompleted ? xpValue : -xpValue;

      // Activity entry
      const activityEntry = {
        id: `act-skill-${skillId}-${Date.now()}`,
        timestamp: now,
        type: isNowCompleted ? ('SKILL_COMPLETED' as const) : ('SKILL_UNCOMPLETED' as const),
        title: isNowCompleted ? `Completed Skill: ${skill.title}` : `Unchecked Skill: ${skill.title}`,
        description: isNowCompleted
          ? `Earned +${xpValue} XP for mastering ${skill.difficulty} skill in ${skill.trackId}.`
          : `Reversed ${xpValue} XP for ${skill.title}.`,
        xpDelta,
        entityId: skillId,
      };

      // Check milestones based on total completed percentage
      const totalCompletedCount = Object.values(newCompletedSkills).filter(Boolean).length;
      const percentComplete = (totalCompletedCount / ALL_SKILLS.length) * 100;

      const updatedMilestones = { ...state.milestones };
      const newActivities = [activityEntry, ...state.activityHistory];

      function checkAndAwardMilestone(
        mId: string,
        title: string,
        xpReward: number,
        condition: boolean
      ) {
        if (condition && !updatedMilestones[mId]?.awarded) {
          updatedMilestones[mId] = {
            awarded: true,
            awardedAt: now,
            xpAwarded: xpReward,
          };
          newActivities.unshift({
            id: `act-milestone-${mId}-${Date.now()}`,
            timestamp: now,
            type: 'MILESTONE_AWARDED',
            title: `Milestone Achieved: ${title}!`,
            description: `Permanently awarded +${xpReward} XP for hitting this milestone.`,
            xpDelta: xpReward,
            entityId: mId,
          });
        }
      }

      checkAndAwardMilestone('milestone-roadmap-25', '25% Roadmap Complete', 100, percentComplete >= 25);
      checkAndAwardMilestone('milestone-roadmap-50', '50% Roadmap Complete', 200, percentComplete >= 50);
      checkAndAwardMilestone('milestone-roadmap-75', '75% Roadmap Complete', 300, percentComplete >= 75);
      checkAndAwardMilestone('milestone-roadmap-100', '100% Roadmap Complete', 500, percentComplete >= 100);

      // Auto-unlock projects
      const updatedProjectStates = updateProjectAvailability(newCompletedSkills, state.projectStates);

      // Sync checkpoints
      const updatedCheckpoints = syncCheckpoints(newCompletedSkills, state.completedCheckpoints);

      return {
        ...state,
        completedSkills: newCompletedSkills,
        projectStates: updatedProjectStates,
        completedCheckpoints: updatedCheckpoints,
        milestones: updatedMilestones,
        activityHistory: newActivities,
      };
    }

    case 'UPDATE_PROJECT_STATUS': {
      const { projectId, status } = action;
      const project = PROJECTS_BY_ID[projectId];
      if (!project) return state;

      const currentProjState = state.projectStates[projectId] || {
        status: 'LOCKED',
        proof: {
          hasDocumentation: false,
          hasAutomatedTests: false,
          hasEvaluationSuite: false,
          hasArchitectureDoc: false,
          hasRealUsers: false,
          hasOpenSourceContribution: false,
        },
        bonusesAwarded: {
          deployment: false,
          automatedTests: false,
          evaluationSuite: false,
          documentation: false,
          realUsers: false,
          openSource: false,
        },
      };

      const prevStatus = currentProjState.status;
      const newProjState = {
        ...currentProjState,
        status,
        startedAt: status === 'IN_PROGRESS' && !currentProjState.startedAt ? now : currentProjState.startedAt,
        completedAt: status === 'COMPLETED' ? now : undefined,
      };

      const updatedProjectStates = {
        ...state.projectStates,
        [projectId]: newProjState,
      };

      const updatedMilestones = { ...state.milestones };
      const newActivities = [...state.activityHistory];

      if (status === 'COMPLETED' && prevStatus !== 'COMPLETED') {
        const baseXP = project.baseXP;
        newActivities.unshift({
          id: `act-proj-done-${projectId}-${Date.now()}`,
          timestamp: now,
          type: 'PROJECT_COMPLETED',
          title: `Project Completed: ${project.title}`,
          description: `Earned +${baseXP} base XP for shipping this ${project.difficulty} project.`,
          xpDelta: baseXP,
          entityId: projectId,
        });

        // Milestones
        if (!updatedMilestones['milestone-first-project']?.awarded) {
          updatedMilestones['milestone-first-project'] = { awarded: true, awardedAt: now, xpAwarded: 100 };
          newActivities.unshift({
            id: `act-m-first-proj-${Date.now()}`,
            timestamp: now,
            type: 'MILESTONE_AWARDED',
            title: 'Milestone: First Project Shipped!',
            description: 'Permanently awarded +100 XP.',
            xpDelta: 100,
            entityId: 'milestone-first-project',
          });
        }

        if (project.difficulty === 'Advanced' && !updatedMilestones['milestone-first-advanced-project']?.awarded) {
          updatedMilestones['milestone-first-advanced-project'] = { awarded: true, awardedAt: now, xpAwarded: 200 };
          newActivities.unshift({
            id: `act-m-adv-proj-${Date.now()}`,
            timestamp: now,
            type: 'MILESTONE_AWARDED',
            title: 'Milestone: First Advanced Project Completed!',
            description: 'Permanently awarded +200 XP.',
            xpDelta: 200,
            entityId: 'milestone-first-advanced-project',
          });
        }

        if (project.difficulty === 'Capstone' && !updatedMilestones['milestone-capstone-completed']?.awarded) {
          updatedMilestones['milestone-capstone-completed'] = { awarded: true, awardedAt: now, xpAwarded: 500 };
          newActivities.unshift({
            id: `act-m-capstone-${Date.now()}`,
            timestamp: now,
            type: 'MILESTONE_AWARDED',
            title: 'Milestone: AI Engineer Capstone Completed!',
            description: 'Permanently awarded +500 XP.',
            xpDelta: 500,
            entityId: 'milestone-capstone-completed',
          });
        }
      } else if (status === 'IN_PROGRESS' && prevStatus !== 'IN_PROGRESS') {
        newActivities.unshift({
          id: `act-proj-start-${projectId}-${Date.now()}`,
          timestamp: now,
          type: 'PROJECT_STARTED',
          title: `Project Started: ${project.title}`,
          description: `Began working on ${project.difficulty} project in ${project.trackId}.`,
          xpDelta: 0,
          entityId: projectId,
        });
      }

      return {
        ...state,
        projectStates: updatedProjectStates,
        milestones: updatedMilestones,
        activityHistory: newActivities,
      };
    }

    case 'UPDATE_PROJECT_PROOF': {
      const { projectId, proof } = action;
      const project = PROJECTS_BY_ID[projectId];
      if (!project) return state;

      const currentProjState = state.projectStates[projectId];
      if (!currentProjState) return state;

      const updatedProof: ProjectProof = {
        ...currentProjState.proof,
        ...proof,
      };

      const updatedBonuses = { ...currentProjState.bonusesAwarded };
      let extraXpDelta = 0;

      // Check if bonuses should automatically trigger when proof item is provided
      if (updatedProof.liveDemoUrl && updatedProof.liveDemoUrl.length > 5 && !updatedBonuses.deployment) {
        updatedBonuses.deployment = true;
        extraXpDelta += PROJECT_BONUS_XP.deployment;
      }
      if (updatedProof.hasAutomatedTests && !updatedBonuses.automatedTests) {
        updatedBonuses.automatedTests = true;
        extraXpDelta += PROJECT_BONUS_XP.automatedTests;
      }
      if (updatedProof.hasEvaluationSuite && !updatedBonuses.evaluationSuite) {
        updatedBonuses.evaluationSuite = true;
        extraXpDelta += PROJECT_BONUS_XP.evaluationSuite;
      }
      if (updatedProof.hasDocumentation && !updatedBonuses.documentation) {
        updatedBonuses.documentation = true;
        extraXpDelta += PROJECT_BONUS_XP.documentation;
      }
      if (updatedProof.hasRealUsers && !updatedBonuses.realUsers) {
        updatedBonuses.realUsers = true;
        extraXpDelta += PROJECT_BONUS_XP.realUsers;
      }
      if (updatedProof.hasOpenSourceContribution && !updatedBonuses.openSource) {
        updatedBonuses.openSource = true;
        extraXpDelta += PROJECT_BONUS_XP.openSource;
      }

      const updatedProjectStates = {
        ...state.projectStates,
        [projectId]: {
          ...currentProjState,
          proof: updatedProof,
          bonusesAwarded: updatedBonuses,
        },
      };

      const updatedMilestones = { ...state.milestones };
      const newActivities = [...state.activityHistory];

      newActivities.unshift({
        id: `act-proof-${projectId}-${Date.now()}`,
        timestamp: now,
        type: 'PROJECT_PROOF_UPDATED',
        title: `Updated Proof for ${project.title}`,
        description: `Verified engineering proof items. ${extraXpDelta > 0 ? `Earned +${extraXpDelta} bonus XP.` : ''}`,
        xpDelta: extraXpDelta,
        entityId: projectId,
      });

      // Milestones for deployment and eval suites
      if (updatedProof.liveDemoUrl && !updatedMilestones['milestone-first-deployment']?.awarded) {
        updatedMilestones['milestone-first-deployment'] = { awarded: true, awardedAt: now, xpAwarded: 150 };
        newActivities.unshift({
          id: `act-m-deploy-${Date.now()}`,
          timestamp: now,
          type: 'MILESTONE_AWARDED',
          title: 'Milestone: First Live AI Deployment!',
          description: 'Permanently awarded +150 XP for deploying a live AI system.',
          xpDelta: 150,
          entityId: 'milestone-first-deployment',
        });
      }

      if (updatedProof.hasEvaluationSuite && !updatedMilestones['milestone-first-eval-suite']?.awarded) {
        updatedMilestones['milestone-first-eval-suite'] = { awarded: true, awardedAt: now, xpAwarded: 150 };
        newActivities.unshift({
          id: `act-m-eval-${Date.now()}`,
          timestamp: now,
          type: 'MILESTONE_AWARDED',
          title: 'Milestone: First Automated Evaluation Suite!',
          description: 'Permanently awarded +150 XP for verified automated evaluation.',
          xpDelta: 150,
          entityId: 'milestone-first-eval-suite',
        });
      }

      return {
        ...state,
        projectStates: updatedProjectStates,
        milestones: updatedMilestones,
        activityHistory: newActivities,
      };
    }

    case 'TOGGLE_PROJECT_BONUS': {
      const { projectId, bonusKey } = action;
      const currentProjState = state.projectStates[projectId];
      if (!currentProjState) return state;

      const wasAwarded = !!currentProjState.bonusesAwarded[bonusKey];
      const isNowAwarded = !wasAwarded;

      const bonusXPValue = PROJECT_BONUS_XP[bonusKey] || 0;
      const xpDelta = isNowAwarded ? bonusXPValue : -bonusXPValue;

      const updatedBonuses = {
        ...currentProjState.bonusesAwarded,
        [bonusKey]: isNowAwarded,
      };

      const updatedProjectStates = {
        ...state.projectStates,
        [projectId]: {
          ...currentProjState,
          bonusesAwarded: updatedBonuses,
        },
      };

      const newActivities = [
        {
          id: `act-bonus-${projectId}-${bonusKey}-${Date.now()}`,
          timestamp: now,
          type: 'PROJECT_PROOF_UPDATED' as const,
          title: isNowAwarded ? `Awarded ${bonusKey} Bonus` : `Reversed ${bonusKey} Bonus`,
          description: `${isNowAwarded ? 'Earned +' : 'Removed '}${bonusXPValue} XP.`,
          xpDelta,
          entityId: projectId,
        },
        ...state.activityHistory,
      ];

      return {
        ...state,
        projectStates: updatedProjectStates,
        activityHistory: newActivities,
      };
    }

    case 'COMPLETE_CHALLENGE': {
      const { challengeId, notes } = action;
      const challenge = CHALLENGES_BY_ID[challengeId];
      if (!challenge) return state;

      if (state.completedChallenges[challengeId]) return state; // Already completed

      const updatedChallenges = {
        ...state.completedChallenges,
        [challengeId]: {
          completedAt: now,
          notes,
        },
      };

      const newActivities = [
        {
          id: `act-chal-${challengeId}-${Date.now()}`,
          timestamp: now,
          type: 'CHALLENGE_COMPLETED' as const,
          title: `Challenge Completed: ${challenge.title}`,
          description: `Built without tutorials. Earned +${challenge.xpReward} XP.`,
          xpDelta: challenge.xpReward,
          entityId: challengeId,
        },
        ...state.activityHistory,
      ];

      return {
        ...state,
        completedChallenges: updatedChallenges,
        activityHistory: newActivities,
      };
    }

    case 'COMPLETE_MISSION': {
      const { missionId, title } = action;
      const updatedMissions = {
        ...state.completedMissions,
        [missionId]: { completedAt: now },
      };

      const newActivities = [
        {
          id: `act-mission-${missionId}-${Date.now()}`,
          timestamp: now,
          type: 'MISSION_COMPLETED' as const,
          title: `Daily Mission Completed: ${title}`,
          description: 'Completed today’s recommended training objective.',
          xpDelta: 0,
          entityId: missionId,
        },
        ...state.activityHistory,
      ];

      return {
        ...state,
        completedMissions: updatedMissions,
        activityHistory: newActivities,
      };
    }

    case 'TOGGLE_CHECKPOINT': {
      const { checkpointId } = action;
      const isCurrentlyDone = !!state.completedCheckpoints[checkpointId];
      const updatedCheckpoints = {
        ...state.completedCheckpoints,
        [checkpointId]: !isCurrentlyDone,
      };

      return {
        ...state,
        completedCheckpoints: updatedCheckpoints,
      };
    }

    case 'UPDATE_SETTINGS': {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.settings,
        },
      };
    }

    case 'TOGGLE_CHECKLIST_ITEM': {
      const { itemId } = action;
      const currentVal = !!state.portfolioChecklistCustom[itemId];
      return {
        ...state,
        portfolioChecklistCustom: {
          ...state.portfolioChecklistCustom,
          [itemId]: !currentVal,
        },
      };
    }

    case 'IMPORT_STATE': {
      return action.state;
    }

    case 'RESET_STATE': {
      return getInitialState();
    }

    default:
      return state;
  }
}
