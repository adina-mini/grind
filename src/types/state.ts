import { ProjectState } from './project';
import { ActivityLogEntry } from './activity';

export interface AwardedMilestone {
  awarded: boolean;
  awardedAt: string;
  xpAwarded: number;
}

export interface UserSettings {
  startDate: string; // ISO format or YYYY-MM-DD
  targetGraduationDate: string; // ISO format or YYYY-MM-DD
  dailyReminderTime: string; // "09:00"
  reminderTimes?: string[]; // Multiple daily ping times e.g. ["09:00", "20:00"]
  remindersEnabled: boolean;
  notificationsEnabled: boolean;
  theme: 'dark';
}

export interface AppState {
  version: number;
  completedSkills: Record<string, boolean>; // skillId -> boolean
  projectStates: Record<string, ProjectState>; // projectId -> ProjectState
  completedChallenges: Record<string, { completedAt: string; notes?: string }>;
  completedMissions: Record<string, { completedAt: string }>; // missionKey -> timestamp
  completedCheckpoints: Record<string, boolean>; // checkpointId -> boolean
  milestones: Record<string, AwardedMilestone>; // milestoneId -> AwardedMilestone
  activityHistory: ActivityLogEntry[];
  settings: UserSettings;
  portfolioChecklistCustom: Record<string, boolean>; // checklist item overrides if any
}

export interface ProofScoreBreakdown {
  totalProofScore: number;
  completedProjectsScore: number;
  deployedProjectsScore: number;
  githubReposScore: number;
  liveDemosScore: number;
  automatedTestsScore: number;
  evaluationSuitesScore: number;
  architectureDocsScore: number;
  documentationScore: number;
  realUsersScore: number;
  openSourceScore: number;
  capstoneBonus: number;
  details: {
    label: string;
    score: number;
    count: number;
    description: string;
  }[];
}
