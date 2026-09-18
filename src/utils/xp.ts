import { SkillDifficulty } from '../types/roadmap';
import { ProjectDifficulty } from '../types/project';
import { AppState } from '../types/state';
import { SKILLS_BY_ID } from '../data/roadmap';
import { PROJECTS_BY_ID } from '../data/projects';
import { CHALLENGES_BY_ID } from '../data/challenges';

export const SKILL_XP_VALUES: Record<SkillDifficulty, number> = {
  Beginner: 10,
  Intermediate: 20,
  Advanced: 35,
  Expert: 50,
};

export const PROJECT_BASE_XP: Record<ProjectDifficulty, number> = {
  Mini: 50,
  Intermediate: 100,
  Advanced: 200,
  Capstone: 500,
};

export const PROJECT_BONUS_XP = {
  deployment: 50,
  automatedTests: 25,
  evaluationSuite: 50,
  documentation: 25,
  realUsers: 100,
  openSource: 100,
};

export const XP_PER_LEVEL = 500;

export interface XPStats {
  totalXP: number;
  skillXP: number;
  projectXP: number;
  bonusXP: number;
  challengeXP: number;
  milestoneXP: number;
  currentLevel: number;
  xpInCurrentLevel: number;
  xpToNextLevel: number;
  levelProgressPercent: number;
}

export function calculateTotalXP(state: AppState): XPStats {
  // 1. Skill XP
  let skillXP = 0;
  for (const [skillId, isCompleted] of Object.entries(state.completedSkills)) {
    if (isCompleted && SKILLS_BY_ID[skillId]) {
      const difficulty = SKILLS_BY_ID[skillId].difficulty;
      skillXP += SKILL_XP_VALUES[difficulty] || 10;
    }
  }

  // 2. Project Base & Bonus XP
  let projectXP = 0;
  let bonusXP = 0;
  for (const [projId, projState] of Object.entries(state.projectStates)) {
    if (projState.status === 'COMPLETED' && PROJECTS_BY_ID[projId]) {
      projectXP += PROJECTS_BY_ID[projId].baseXP;
    }

    // Bonuses awarded (counted whether in progress or completed, but tracked strictly once)
    const bonuses = projState.bonusesAwarded;
    if (bonuses) {
      if (bonuses.deployment) bonusXP += PROJECT_BONUS_XP.deployment;
      if (bonuses.automatedTests) bonusXP += PROJECT_BONUS_XP.automatedTests;
      if (bonuses.evaluationSuite) bonusXP += PROJECT_BONUS_XP.evaluationSuite;
      if (bonuses.documentation) bonusXP += PROJECT_BONUS_XP.documentation;
      if (bonuses.realUsers) bonusXP += PROJECT_BONUS_XP.realUsers;
      if (bonuses.openSource) bonusXP += PROJECT_BONUS_XP.openSource;
    }
  }

  // 3. Challenge XP
  let challengeXP = 0;
  for (const [chalId] of Object.entries(state.completedChallenges)) {
    if (CHALLENGES_BY_ID[chalId]) {
      challengeXP += CHALLENGES_BY_ID[chalId].xpReward;
    }
  }

  // 4. Historical Milestone XP (Non-reversible!)
  let milestoneXP = 0;
  for (const [, milestone] of Object.entries(state.milestones)) {
    if (milestone.awarded) {
      milestoneXP += milestone.xpAwarded;
    }
  }

  const totalXP = skillXP + projectXP + bonusXP + challengeXP + milestoneXP;
  const currentLevel = Math.floor(totalXP / XP_PER_LEVEL) + 1;
  const xpInCurrentLevel = totalXP % XP_PER_LEVEL;
  const xpToNextLevel = XP_PER_LEVEL - xpInCurrentLevel;
  const levelProgressPercent = Math.min(100, Math.round((xpInCurrentLevel / XP_PER_LEVEL) * 100));

  return {
    totalXP,
    skillXP,
    projectXP,
    bonusXP,
    challengeXP,
    milestoneXP,
    currentLevel,
    xpInCurrentLevel,
    xpToNextLevel,
    levelProgressPercent,
  };
}
