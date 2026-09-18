import React from 'react';
import { Search, Filter } from 'lucide-react';
import { ProjectDifficulty, ProjectStatus } from '../../types/project';

interface ProjectFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedDifficulty: ProjectDifficulty | 'All';
  onDifficultyChange: (diff: ProjectDifficulty | 'All') => void;
  selectedStatus: ProjectStatus | 'All';
  onStatusChange: (status: ProjectStatus | 'All') => void;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedStatus,
  onStatusChange,
}) => {
  const difficulties: (ProjectDifficulty | 'All')[] = [
    'All',
    'Mini',
    'Intermediate',
    'Advanced',
    'Capstone',
  ];

  const statuses: (ProjectStatus | 'All')[] = [
    'All',
    'READY',
    'IN_PROGRESS',
    'COMPLETED',
    'LOCKED',
  ];

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 tech-card">
      <div className="relative flex-1 max-w-md">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter projects by title, stack, or deliverable..."
          className="w-full pl-9 pr-3 py-1.5 bg-dark-elevated border border-dark-border rounded-md text-xs text-dark-text placeholder-dark-muted outline-none focus:border-proof"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 text-xs text-dark-muted font-mono mr-1">
          <Filter size={13} />
          <span>Tier:</span>
        </div>
        {difficulties.map((diff) => (
          <button
            key={diff}
            onClick={() => onDifficultyChange(diff)}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
              selectedDifficulty === diff
                ? 'bg-proof-dark text-dark-bg font-bold'
                : 'bg-dark-elevated text-dark-muted hover:text-dark-text border border-dark-borderSubtle'
            }`}
          >
            {diff}
          </button>
        ))}

        <div className="h-4 w-px bg-dark-border mx-1 hidden sm:block" />

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
