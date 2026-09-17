import React, { useState } from 'react';
import { History, BookOpen, FolderGit2, Flame, Award, Filter } from 'lucide-react';
import { ActivityLogEntry, ActivityType } from '../../types/activity';

interface ActivityLogListProps {
  activities: ActivityLogEntry[];
}

export const ActivityLogList: React.FC<ActivityLogListProps> = ({ activities }) => {
  const [filter, setFilter] = useState<'All' | 'Skills' | 'Projects' | 'Challenges' | 'Milestones'>('All');

  const filteredActivities = activities.filter((act) => {
    if (filter === 'Skills') return act.type.startsWith('SKILL_');
    if (filter === 'Projects') return act.type.startsWith('PROJECT_');
    if (filter === 'Challenges') return act.type === 'CHALLENGE_COMPLETED';
    if (filter === 'Milestones') return act.type === 'MILESTONE_AWARDED';
    return true;
  });

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'SKILL_COMPLETED':
      case 'SKILL_UNCOMPLETED':
        return <BookOpen size={14} className="text-accent" />;
      case 'PROJECT_STARTED':
      case 'PROJECT_COMPLETED':
      case 'PROJECT_PROOF_UPDATED':
        return <FolderGit2 size={14} className="text-proof" />;
      case 'CHALLENGE_COMPLETED':
        return <Flame size={14} className="text-status-amber" />;
      case 'MILESTONE_AWARDED':
        return <Award size={14} className="text-status-purple" />;
      default:
        return <History size={14} className="text-dark-muted" />;
    }
  };

  const formatTimestamp = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="tech-card p-6 border-dark-border space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <History size={16} className="text-dark-muted" />
          <h3 className="text-sm font-mono uppercase tracking-wider font-semibold text-dark-text">
            Audit Trail & Event History ({filteredActivities.length} Events)
          </h3>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          {(['All', 'Skills', 'Projects', 'Challenges', 'Milestones'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1 rounded transition-colors ${
                filter === f
                  ? 'bg-dark-elevated text-dark-text border border-dark-border font-medium'
                  : 'text-dark-muted hover:text-dark-text'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-dark-borderSubtle max-h-[600px] overflow-y-auto">
        {filteredActivities.length === 0 ? (
          <div className="py-8 text-center text-xs text-dark-muted font-mono">
            No logged activity events in this category yet.
          </div>
        ) : (
          filteredActivities.map((act) => (
            <div key={act.id} className="py-3 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded bg-dark-elevated border border-dark-borderSubtle mt-0.5 flex-shrink-0">
                  {getActivityIcon(act.type)}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-dark-text">
                    {act.title}
                  </h4>
                  <p className="text-[11px] text-dark-muted mt-0.5 leading-relaxed">
                    {act.description}
                  </p>
                  <span className="text-[10px] font-mono text-dark-faint mt-1 block">
                    {formatTimestamp(act.timestamp)}
                  </span>
                </div>
              </div>

              {act.xpDelta !== 0 && (
                <div
                  className={`text-xs font-mono font-bold flex-shrink-0 ${
                    act.xpDelta > 0 ? 'text-status-emerald' : 'text-status-rose'
                  }`}
                >
                  {act.xpDelta > 0 ? `+${act.xpDelta}` : act.xpDelta} XP
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
