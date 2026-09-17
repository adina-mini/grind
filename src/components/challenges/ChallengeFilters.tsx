import React from 'react';
import { Filter } from 'lucide-react';
import { ChallengeDifficulty } from '../../types/challenge';

interface ChallengeFiltersProps {
  selectedDifficulty: ChallengeDifficulty | 'All';
  onDifficultyChange: (diff: ChallengeDifficulty | 'All') => void;
  selectedStatus: 'All' | 'Incomplete' | 'Completed';
  onStatusChange: (status: 'All' | 'Incomplete' | 'Completed') => void;
}

export const ChallengeFilters: React.FC<ChallengeFiltersProps> = ({
  selectedDifficulty,
  onDifficultyChange,
  selectedStatus,
  onStatusChange,
}) => {
  const difficulties: (ChallengeDifficulty | 'All')[] = [
    'All',
    'Beginner',
    'Intermediate',
    'Advanced',
    'Expert',
  ];

  const statuses: ('All' | 'Incomplete' | 'Completed')[] = ['All', 'Incomplete', 'Completed'];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 tech-card">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 text-xs text-dark-muted font-mono mr-1">
          <Filter size={13} />
          <span>Difficulty:</span>
        </div>
        {difficulties.map((diff) => (
          <button
            key={diff}
            onClick={() => onDifficultyChange(diff)}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
              selectedDifficulty === diff
                ? 'bg-status-amber text-dark-bg font-bold'
                : 'bg-dark-elevated text-dark-muted hover:text-dark-text border border-dark-borderSubtle'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        {statuses.map((st) => (
          <button
            key={st}
            onClick={() => onStatusChange(st)}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
              selectedStatus === st
                ? 'bg-dark-border text-dark-text font-medium border border-dark-border'
                : 'text-dark-muted hover:text-dark-text'
            }`}
          >
            {st}
          </button>
        ))}
      </div>
    </div>
  );
};
