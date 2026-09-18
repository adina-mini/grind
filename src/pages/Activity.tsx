import React from 'react';
import { StreakCalendar } from '../components/activity/StreakCalendar';
import { useApp } from '../store/AppContext';

export const ActivityPage: React.FC = () => {
  const { streakData } = useApp();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Consistency & Streak Heatmap Calendar */}
      <StreakCalendar streakData={streakData} />
    </div>
  );
};
