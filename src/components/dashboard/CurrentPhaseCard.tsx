import React from 'react';
import { Flag, ArrowRight, Calendar } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { ProgressBar } from '../common/ProgressBar';
import { Badge } from '../common/Badge';

interface CurrentPhaseCardProps {
  onNavigate: (view: string, entityId?: string) => void;
}

export const CurrentPhaseCard: React.FC<CurrentPhaseCardProps> = ({ onNavigate }) => {
  const { timeline } = useApp();
  const currentInfo = timeline.phasesInfo[timeline.currentPhaseIndex] || timeline.phasesInfo[0];
  const { phase, status, completionPercent, skillsCompleted, skillsTotal, projectsCompleted, projectsTotal } = currentInfo;

  const getStatusBadgeVariant = (st: string) => {
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

  const nextCheckpoint = phase.checkpoints[0];

  return (
    <div className="tech-card p-5 relative overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-dark-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-zinc-400">
              Active Focus • Phase {phase.number} of 8
            </span>
            <Badge variant={getStatusBadgeVariant(status)}>
              {status}
            </Badge>
          </div>
          <h2 className="text-lg font-bold text-zinc-100 tracking-tight mt-1">
            {phase.title}
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">{phase.tagline}</p>
        </div>

        <button
          onClick={() => onNavigate('timeline', phase.id)}
          className="text-xs text-zinc-400 hover:text-zinc-100 font-medium flex items-center gap-1 transition-colors"
        >
          View Timeline <ArrowRight size={13} />
        </button>
      </div>

      {/* Progress & Focus Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        {/* Progress Bar & Counters */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-zinc-400 mb-1.5">
              <span>Phase Completion</span>
              <span className="font-semibold text-zinc-100">{completionPercent}%</span>
            </div>
            <ProgressBar value={completionPercent} max={100} size="md" variant="proof" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
              <span className="text-zinc-400 text-[11px] font-medium">Skills:</span>
              <div className="font-semibold text-zinc-100 mt-0.5">
                {skillsCompleted} / {skillsTotal} done
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
              <span className="text-zinc-400 text-[11px] font-medium">Projects:</span>
              <div className="font-semibold text-zinc-100 mt-0.5">
                {projectsCompleted} / {projectsTotal} done
              </div>
            </div>
          </div>
        </div>

        {/* Next Checkpoint Preview */}
        <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
              <Flag size={13} />
              <span>Immediate Checkpoint</span>
            </div>
            {nextCheckpoint ? (
              <>
                <h4 className="text-xs font-semibold text-zinc-200 mt-1.5">
                  {nextCheckpoint.title}
                </h4>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                  {nextCheckpoint.description}
                </p>
              </>
            ) : (
              <p className="text-xs text-zinc-400 mt-1">All phase checkpoints achieved.</p>
            )}
          </div>

          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-zinc-800/80 text-[11px] text-zinc-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} className="text-zinc-400" />
              Months {phase.startMonth}–{phase.endMonth}
            </span>
            <button
              onClick={() => onNavigate('timeline')}
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              All Checkpoints →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
