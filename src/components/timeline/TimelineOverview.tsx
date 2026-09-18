import React from 'react';
import { Calendar, Clock, Flag, Award } from 'lucide-react';
import { TimelineCalculation, formatDate } from '../../utils/dates';
import { ProgressBar } from '../common/ProgressBar';

interface TimelineOverviewProps {
  timeline: TimelineCalculation;
  roadmapPercent: number;
}

export const TimelineOverview: React.FC<TimelineOverviewProps> = ({
  timeline,
  roadmapPercent,
}) => {
  return (
    <div className="tech-card p-6 border-dark-border space-y-6">
      {/* Title & Dates */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-dark-border">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
            Dynamic Schedule Tracking
          </span>
          <h2 className="text-xl font-bold text-dark-text mt-1">
            2-Year Journey: From Student to Production AI Engineer
          </h2>
          <p className="text-xs text-dark-muted mt-0.5">
            {formatDate(timeline.startDate)} → {formatDate(timeline.graduationDate)} (24 Months)
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="p-2.5 rounded bg-dark-elevated border border-dark-borderSubtle text-right">
            <span className="text-dark-muted text-[10px] uppercase block">Days Elapsed</span>
            <span className="font-bold text-dark-text text-sm">{timeline.daysElapsed}</span>
          </div>
          <div className="p-2.5 rounded bg-dark-elevated border border-dark-borderSubtle text-right">
            <span className="text-dark-muted text-[10px] uppercase block">Days Remaining</span>
            <span className="font-bold text-status-amber text-sm">{timeline.daysRemaining}</span>
          </div>
        </div>
      </div>

      {/* Progress Bars: Time Elapsed vs Roadmap Completion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3.5 rounded-lg bg-dark-elevated border border-dark-borderSubtle space-y-1.5">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-dark-muted flex items-center gap-1">
              <Clock size={12} /> Time Elapsed in 2-Year Plan
            </span>
            <span className="font-semibold text-dark-text">{timeline.percentElapsed}%</span>
          </div>
          <ProgressBar value={timeline.percentElapsed} max={100} size="sm" variant="accent" />
        </div>

        <div className="p-3.5 rounded-lg bg-dark-elevated border border-dark-borderSubtle space-y-1.5">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-dark-muted flex items-center gap-1">
              <Flag size={12} /> Actual Curriculum Completed
            </span>
            <span className="font-semibold text-proof">{roadmapPercent}%</span>
          </div>
          <ProgressBar value={roadmapPercent} max={100} size="sm" variant="proof" />
        </div>
      </div>
    </div>
  );
};
