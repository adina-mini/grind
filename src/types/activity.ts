export type ActivityType =
  | 'SKILL_COMPLETED'
  | 'SKILL_UNCOMPLETED'
  | 'PROJECT_STARTED'
  | 'PROJECT_COMPLETED'
  | 'PROJECT_PROOF_UPDATED'
  | 'CHALLENGE_COMPLETED'
  | 'MISSION_COMPLETED'
  | 'MILESTONE_AWARDED'
  | 'CHECKPOINT_COMPLETED';

export interface ActivityLogEntry {
  id: string;
  timestamp: string; // ISO 8601 string
  type: ActivityType;
  title: string;
  description: string;
  xpDelta: number;
  entityId?: string; // skillId, projectId, etc.
}
