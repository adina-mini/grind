export type PhaseStatus = 'UPCOMING' | 'AHEAD' | 'CURRENT' | 'ON TRACK' | 'BEHIND' | 'COMPLETED';

export interface Checkpoint {
  id: string;
  monthIndex: number; // 1 to 24
  title: string;
  description: string;
  phaseId: string;
  linkedSkillIds: string[];
  linkedProjectIds: string[];
}

export interface Phase {
  id: string;
  number: number;
  title: string;
  tagline: string;
  startMonth: number; // 1 to 24
  endMonth: number;   // 1 to 24
  focusTracks: string[];
  primaryProjectId: string;
  description: string;
  checkpoints: Checkpoint[];
}
