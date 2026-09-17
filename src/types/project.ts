export type ProjectDifficulty = 'Mini' | 'Intermediate' | 'Advanced' | 'Capstone';
export type ProjectStatus = 'LOCKED' | 'READY' | 'IN_PROGRESS' | 'COMPLETED';

export interface ProjectProof {
  githubUrl?: string;
  liveDemoUrl?: string;
  hasDocumentation: boolean;
  hasAutomatedTests: boolean;
  hasEvaluationSuite: boolean;
  hasArchitectureDoc: boolean;
  demoVideoUrl?: string;
  hasRealUsers: boolean;
  hasOpenSourceContribution?: boolean;
  postmortemNotes?: string;
}

export interface ProjectBonusAwards {
  deployment: boolean;
  automatedTests: boolean;
  evaluationSuite: boolean;
  documentation: boolean;
  realUsers: boolean;
  openSource: boolean;
}

export interface ProjectState {
  status: ProjectStatus;
  proof: ProjectProof;
  bonusesAwarded: ProjectBonusAwards;
  notes?: string;
  startedAt?: string;
  completedAt?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: ProjectDifficulty;
  trackId: string;
  phaseId: string;
  baseXP: number;
  estimatedHours: number;
  requiredSkills: string[];
  prerequisites: string[]; // previous project IDs if any
  tags: string[];
  deliverables: string[];
}
