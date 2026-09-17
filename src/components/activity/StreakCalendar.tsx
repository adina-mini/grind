import React from 'react';
import { Flame, Calendar as CalendarIcon } from 'lucide-react';
import { StreakData, getPastNDaysCalendar } from '../../utils/streak';

interface StreakCalendarProps {
  streakData: StreakData;
}

export const StreakCalendar: React.FC<StreakCalendarProps> = ({ streakData }) => {
  const days = getPastNDaysCalendar(63); // 9 weeks = 63 days

  return (
    <div className="tech-card p-6 border-dark-border space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-dark-border">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-status-amber font-semibold flex items-center gap-1.5">
            <Flame size={14} />
            <span>Consistency Engine</span>
          </span>
          <h2 className="text-xl font-bold text-dark-text mt-1">
            Activity Heatmap & Streaks
          </h2>
          <p className="text-xs text-dark-muted mt-0.5">
            A day is active when you complete a skill, start/complete a project, update proof, or finish a challenge.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="p-2.5 rounded bg-dark-elevated border border-dark-borderSubtle text-right">
            <span className="text-dark-muted text-[10px] uppercase block">Current Streak</span>
            <span className="font-bold text-status-amber text-sm">{streakData.currentStreak} Days</span>
          </div>
          <div className="p-2.5 rounded bg-dark-elevated border border-dark-borderSubtle text-right">
            <span className="text-dark-muted text-[10px] uppercase block">Best Streak</span>
            <span className="font-bold text-dark-text text-sm">{streakData.longestStreak} Days</span>
          </div>
          <div className="p-2.5 rounded bg-dark-elevated border border-dark-borderSubtle text-right">
            <span className="text-dark-muted text-[10px] uppercase block">Total Active</span>
            <span className="font-bold text-proof text-sm">{streakData.totalActiveDays} Days</span>
          </div>
        </div>
      </div>

      {/* Grid of Days (Heatmap) */}
      <div className="pt-2">
        <div className="text-xs font-mono text-dark-muted mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <CalendarIcon size={12} /> Past 9 Weeks Activity
          </span>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-dark-elevated border border-dark-border" /> Inactive
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-status-emerald border border-emerald-600" /> Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-7 sm:grid-cols-9 md:grid-cols-21 gap-1.5 pt-2">
          {days.map((day) => {
            const isActive = streakData.activeDatesSet.has(day.dateStr);
            return (
              <div
                key={day.dateStr}
                title={`${day.dateStr}: ${isActive ? 'Active day' : 'No recorded activity'}`}
                className={`h-7 rounded-sm flex flex-col items-center justify-center font-mono text-[9px] border transition-all ${
                  isActive
                    ? 'bg-emerald-950/60 border-emerald-600/60 text-emerald-300 font-bold'
                    : 'bg-dark-elevated/40 border-dark-borderSubtle text-dark-faint'
                }`}
              >
                <span>{day.dayOfMonth}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
