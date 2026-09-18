import React from 'react';
import { History, ArrowRight, BookOpen, FolderGit2, Flame, Award } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { ActivityType } from '../../types/activity';

interface RecentActivityFeedProps {
  onNavigate: (view: string) => void;
}

export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ onNavigate }) => {
  const { state } = useApp();
  const recentActivities = state.activityHistory.slice(0, 5);

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'SKILL_COMPLETED':
      case 'SKILL_UNCOMPLETED':
        return <BookOpen size={13} className="text-accent" />;
      case 'PROJECT_STARTED':
      case 'PROJECT_COMPLETED':
      case 'PROJECT_PROOF_UPDATED':
        return <FolderGit2 size={13} className="text-proof" />;
      case 'CHALLENGE_COMPLETED':
        return <Flame size={13} className="text-status-amber" />;
      case 'MILESTONE_AWARDED':
        return <Award size={13} className="text-status-purple" />;
      default:
        return <History size={13} className="text-dark-muted" />;
    }
  };

  const formatTimeAgo = (isoString: string) => {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="tech-card p-5">
      <div className="flex items-center justify-between pb-3 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <History size={15} className="text-dark-muted" />
          <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-dark-text">
            Recent Activity
          </h3>
        </div>
        <button
          onClick={() => onNavigate('activity')}
          className="text-xs font-mono text-dark-muted hover:text-dark-text flex items-center gap-1 hover:underline"
        >
          View Full Feed <ArrowRight size={13} />
        </button>
      </div>

      <div className="pt-3 divide-y divide-dark-borderSubtle">
        {recentActivities.map((act) => (
          <div key={act.id} className="py-2.5 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="p-1 rounded bg-dark-elevated border border-dark-borderSubtle mt-0.5">
                {getActivityIcon(act.type)}
              </div>
              <div>
                <p className="text-xs font-medium text-dark-text leading-tight">
                  {act.title}
                </p>
                <p className="text-[11px] text-dark-muted mt-0.5 line-clamp-1">
                  {act.description}
                </p>
              </div>
            </div>

            <div className="text-right flex-shrink-0 font-mono">
              {act.xpDelta !== 0 && (
                <div
                  className={`text-xs font-semibold ${
                    act.xpDelta > 0 ? 'text-status-emerald' : 'text-status-rose'
                  }`}
                >
                  {act.xpDelta > 0 ? `+${act.xpDelta}` : act.xpDelta} XP
                </div>
              )}
              <div className="text-[10px] text-dark-muted">{formatTimeAgo(act.timestamp)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
