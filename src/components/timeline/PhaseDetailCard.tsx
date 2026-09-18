import React from 'react';
import { Flag, CheckCircle2, FolderGit2, ArrowRight } from 'lucide-react';
import { Phase, PhaseStatus } from '../../types/timeline';
import { formatDate } from '../../utils/dates';
import { ProgressBar } from '../common/ProgressBar';
import { Badge } from '../common/Badge';
import { PROJECTS_BY_ID } from '../../data/projects';

interface PhaseDetailCardProps {
  phase: Phase;
  startDate: Date;
  endDate: Date;
  status: PhaseStatus;
  skillsCompleted: number;
  skillsTotal: number;
  projectsCompleted: number;
  projectsTotal: number;
  completionPercent: number;
  isCurrent: boolean;
  completedCheckpoints: Record<string, boolean>;
  onToggleCheckpoint: (cpId: string) => void;
  onNavigateToProject: (projectId: string) => void;
  onNavigateToRoadmap: () => void;
}

export const PhaseDetailCard: React.FC<PhaseDetailCardProps> = ({
  phase,
  startDate,
  endDate,
  status,
  skillsCompleted,
  skillsTotal,
  projectsCompleted,
  projectsTotal,
  completionPercent,
  isCurrent,
  completedCheckpoints,
  onToggleCheckpoint,
  onNavigateToProject,
  onNavigateToRoadmap,
}) => {
  const getStatusBadgeVariant = (st: PhaseStatus) => {
    switch (st) {
      case 'COMPLETED':
        return 'success';
      case 'ON TRACK':
      case 'AHEAD':
        return 'sky';
      case 'CURRENT':
        return 'warning';
      case 'BEHIND':
        return 'danger';
      default:
        return 'default';
    }
  };

  const primaryProject = PROJECTS_BY_ID[phase.primaryProjectId];

  return (
    <div
      className={`tech-card p-6 border-dark-border transition-all ${
        isCurrent ? 'border-accent/60 shadow-lg ring-1 ring-accent/30' : ''
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-dark-border">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-dark-muted uppercase tracking-wider">
              Phase {phase.number} • Months {phase.startMonth}–{phase.endMonth}
            </span>
            <Badge variant={getStatusBadgeVariant(status)}>{status}</Badge>
            {isCurrent && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-accent text-white font-bold tracking-wider uppercase animate-pulse">
                YOU ARE HERE
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-dark-text mt-1.5">{phase.title}</h3>
          <p className="text-xs text-dark-muted mt-0.5">{phase.tagline}</p>
        </div>

        <div className="text-right text-xs font-mono text-dark-muted flex-shrink-0">
          <div>{formatDate(startDate)}</div>
          <div className="text-[11px] text-dark-faint">to {formatDate(endDate)}</div>
        </div>
      </div>

      {/* Progress & Focus Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-b border-dark-borderSubtle">
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono text-dark-muted">
            <span>Phase Progress</span>
            <span className="font-semibold text-dark-text">{completionPercent}%</span>
          </div>
          <ProgressBar value={completionPercent} max={100} size="sm" variant="accent" />
          <div className="flex justify-between text-[10px] font-mono text-dark-muted mt-1">
            <span>{skillsCompleted}/{skillsTotal} skills</span>
            <span>{projectsCompleted}/{projectsTotal} projects</span>
          </div>
        </div>

        <div className="md:col-span-2">
          <p className="text-xs text-dark-muted leading-relaxed">{phase.description}</p>
          {primaryProject && (
            <div className="mt-2 flex items-center gap-2 text-xs font-mono text-proof">
              <FolderGit2 size={13} />
              <span>Flagship Project:</span>
              <button
                onClick={() => onNavigateToProject(primaryProject.id)}
                className="hover:underline font-semibold text-dark-text"
              >
                {primaryProject.title}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Monthly Checkpoints */}
      <div className="pt-4 space-y-2.5">
        <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-dark-text flex items-center gap-1.5">
          <Flag size={13} className="text-status-amber" />
          <span>Monthly Target Checkpoints</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {phase.checkpoints.map((cp) => {
            const isDone = !!completedCheckpoints[cp.id];
            return (
              <div
                key={cp.id}
                onClick={() => onToggleCheckpoint(cp.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-dark-text'
                    : 'bg-dark-elevated border-dark-borderSubtle hover:border-dark-border'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                        isDone
                          ? 'bg-status-emerald border-status-emerald text-white'
                          : 'border-dark-border bg-dark-surface'
                      }`}
                    >
                      {isDone && <CheckCircle2 size={12} />}
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-dark-muted uppercase">
                      Month {cp.monthIndex}
                    </span>
                  </div>
                </div>
                <h5 className="text-xs font-medium text-dark-text mt-1.5">{cp.title}</h5>
                <p className="text-[11px] text-dark-muted mt-1 line-clamp-2">{cp.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
