export interface MilestoneDefinition {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  iconName: string;
  category: 'roadmap' | 'project' | 'engineering' | 'capstone';
}

export const MILESTONE_DEFINITIONS: MilestoneDefinition[] = [
  {
    id: 'milestone-roadmap-25',
    title: 'Roadmap Milestone: 25% Complete',
    description: 'Completed a quarter of the comprehensive AI Engineering curriculum.',
    xpReward: 100,
    iconName: 'Award',
    category: 'roadmap'
  },
  {
    id: 'milestone-roadmap-50',
    title: 'Roadmap Milestone: 50% Complete (Halfway)',
    description: 'Halfway through the 2-year AI Engineering roadmap.',
    xpReward: 200,
    iconName: 'Award',
    category: 'roadmap'
  },
  {
    id: 'milestone-roadmap-75',
    title: 'Roadmap Milestone: 75% Complete',
    description: 'Advanced mastery across core and applied AI disciplines.',
    xpReward: 300,
    iconName: 'Award',
    category: 'roadmap'
  },
  {
    id: 'milestone-roadmap-100',
    title: 'Roadmap Milestone: 100% Complete',
    description: 'Completed all skills across all 17 AI Engineering tracks.',
    xpReward: 500,
    iconName: 'Trophy',
    category: 'roadmap'
  },
  {
    id: 'milestone-first-project',
    title: 'First Project Shipped',
    description: 'Completed and verified your first engineering project.',
    xpReward: 100,
    iconName: 'FolderCheck',
    category: 'project'
  },
  {
    id: 'milestone-first-deployment',
    title: 'First Live AI Deployment',
    description: 'Deployed an AI service or platform to production with a public live URL.',
    xpReward: 150,
    iconName: 'Globe',
    category: 'engineering'
  },
  {
    id: 'milestone-first-eval-suite',
    title: 'First Evaluation Suite',
    description: 'Built and verified an automated LLM/ML evaluation suite with metrics.',
    xpReward: 150,
    iconName: 'CheckCircle2',
    category: 'engineering'
  },
  {
    id: 'milestone-first-advanced-project',
    title: 'First Advanced Project Completed',
    description: 'Completed an Advanced tier (200 XP) multi-agent, fine-tuning, or inference project.',
    xpReward: 200,
    iconName: 'Zap',
    category: 'project'
  },
  {
    id: 'milestone-capstone-completed',
    title: 'AI Engineer Flagship Capstone Completed',
    description: 'Built, tested, deployed, and verified the comprehensive Capstone platform.',
    xpReward: 500,
    iconName: 'Crown',
    category: 'capstone'
  }
];

export const MILESTONES_BY_ID = MILESTONE_DEFINITIONS.reduce((acc, m) => {
  acc[m.id] = m;
  return acc;
}, {} as Record<string, MilestoneDefinition>);
