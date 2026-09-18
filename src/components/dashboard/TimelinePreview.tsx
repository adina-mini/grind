import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { ProgressBar } from '../common/ProgressBar';

interface TimelinePreviewProps {
  onNavigate: (view: string, entityId?: string) => void;
}

export const TimelinePreview: React.FC<TimelinePreviewProps> = ({ onNavigate }) => {
  const { timeline } = useApp();

  return (
    <div className="tech-card p-5">
      <div className="flex items-center justify-between pb-3 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <Calendar size={15} className="text-dark-muted" />
          <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-dark-text">
            2-Year Timeline Progress
          </h3>
        </div>
        <button
          onClick={() => onNavigate('timeline')}
          className="text-xs font-mono text-dark-muted hover:text-dark-text flex items-center gap-1 hover:underline"
        >
          View Full Schedule <ChevronRight size={13} />
        </button>
      </div>

      <div className="pt-4 space-y-4">
        {/* Progress Bar of Time Elapsed */}
        <div>
          <div className="flex justify-between text-xs font-mono text-dark-muted mb-1.5">
            <span>Overall Time Elapsed ({timeline.daysElapsed} days)</span>
            <span>{timeline.daysRemaining} days remaining ({timeline.percentElapsed}%)</span>
          </div>
          <ProgressBar value={timeline.percentElapsed} max={100} size="sm" variant="accent" />
        </div>

        {/* 8 Phase Compact Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {timeline.phasesInfo.map((pInfo, idx) => {
            const isCurrent = pInfo.isCurrent;
            const isCompleted = pInfo.status === 'COMPLETED';
            return (
              <div
                key={pInfo.phase.id}
                onClick={() => onNavigate('timeline', pInfo.phase.id)}
                className={`p-2.5 rounded border text-center cursor-pointer transition-all ${
                  isCurrent
                    ? 'border-accent bg-accent/10 shadow-sm'
                    : isCompleted
                    ? 'border-emerald-800/40 bg-emerald-950/20'
                    : 'border-dark-borderSubtle bg-dark-elevated/50 hover:bg-dark-elevated'
                }`}
              >
                <div className="text-[10px] font-mono text-dark-muted flex items-center justify-center gap-1">
                  <span>P{idx + 1}</span>
                  {isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                  )}
                </div>
                <div className="text-xs font-semibold text-dark-text mt-0.5 truncate">
                  {pInfo.phase.title.split(' ')[0]}
                </div>
                <div className="text-[10px] font-mono text-dark-muted mt-1">
                  {pInfo.completionPercent}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
