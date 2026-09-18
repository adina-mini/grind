import React, { useState } from 'react';
import { Target, CheckCircle, Clock, Sparkles } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { Badge } from '../common/Badge';

interface TodayMissionCardProps {
  onNavigate: (view: string, entityId?: string) => void;
}

export const TodayMissionCard: React.FC<TodayMissionCardProps> = ({ onNavigate }) => {
  const { dailyMission, state, dispatch } = useApp();
  const [isCompletedJustNow, setIsCompletedJustNow] = useState(false);

  const isCompleted = isCompletedJustNow || !!state.completedMissions[dailyMission.id];

  const handleAction = () => {
    if (dailyMission.category === 'Skill' && dailyMission.entityId) {
      dispatch({ type: 'TOGGLE_SKILL', skillId: dailyMission.entityId });
      dispatch({ type: 'COMPLETE_MISSION', missionId: dailyMission.id, title: dailyMission.title });
      setIsCompletedJustNow(true);
    } else if (dailyMission.category === 'Project' && dailyMission.entityId) {
      onNavigate('projects', dailyMission.entityId);
    } else if (dailyMission.category === 'Proof' && dailyMission.entityId) {
      onNavigate('projects', dailyMission.entityId);
    } else {
      onNavigate('roadmap');
    }
  };

  return (
    <div className="tech-card p-5 border-dark-border flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <Target size={15} />
            <span>Today’s Mission</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-zinc-400 flex items-center gap-1">
              <Clock size={12} />
              ~{dailyMission.estimatedMinutes} mins
            </span>
            <Badge variant="purple">{dailyMission.category}</Badge>
          </div>
        </div>

        <h3 className="text-base font-bold text-zinc-100 tracking-tight mt-2">
          {dailyMission.title}
        </h3>

        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
          {dailyMission.description}
        </p>

        {/* Deterministic Rationale */}
        <div className="mt-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400 flex items-start gap-2">
          <Sparkles size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          <span>
            <strong className="text-zinc-200 font-medium">Why today:</strong> {dailyMission.rationale}
          </span>
        </div>
      </div>

      {/* Completion Action */}
      <div className="mt-4 pt-3 border-t border-dark-border flex items-center justify-between">
        {isCompleted ? (
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
            <CheckCircle size={15} />
            <span>Mission Completed for Today</span>
          </div>
        ) : (
          <button
            onClick={handleAction}
            className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-medium text-white shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <span>{dailyMission.actionText}</span>
          </button>
        )}
      </div>
    </div>
  );
};
