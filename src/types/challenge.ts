export type ChallengeDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface Challenge {
  id: string;
  title: string;
  prompt: string;
  context: string;
  difficulty: ChallengeDifficulty;
  trackId: string;
  phaseId: string;
  xpReward: number;
  tags: string[];
  rules: string[]; // e.g. "No copy-pasting code", "Must write unit tests"
  acceptanceCriteria: string[];
}
