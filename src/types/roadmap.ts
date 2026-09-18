export type SkillDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface Skill {
  id: string;
  title: string;
  description: string;
  trackId: string;
  difficulty: SkillDifficulty;
  prerequisites: string[]; // IDs of required skills
  relatedProjects: string[]; // IDs of related projects
  phaseId: string; // e.g. "phase-1"
  estimatedHours: number;
  tags: string[];
}

export interface Track {
  id: string;
  title: string;
  description: string;
  iconName: string;
  skills: Skill[];
}
