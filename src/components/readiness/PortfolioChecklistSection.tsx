import React from 'react';
import { ShieldCheck, Check, AlertCircle } from 'lucide-react';
import { PORTFOLIO_CHECKLIST_ITEMS, ChecklistItem } from '../../data/portfolioChecklist';
import { useApp } from '../../store/AppContext';
import { SKILLS_BY_TRACK } from '../../data/roadmap';

interface PortfolioChecklistSectionProps {
  onToggleItem: (itemId: string) => void;
  onNavigateToRoadmap?: () => void;
  onNavigateToProjects?: () => void;
}

export const PortfolioChecklistSection: React.FC<PortfolioChecklistSectionProps> = ({
  onToggleItem,
  onNavigateToRoadmap,
  onNavigateToProjects,
}) => {
  const { state } = useApp();

  // Helper to check automatic completion criteria
  const isItemComplete = (item: ChecklistItem): boolean => {
    // 1. Check user manual override in state
    if (state.portfolioChecklistCustom[item.id]) return true;

    // 2. Check track percentage if linked to track
    if (item.associatedTrackId) {
      const trackSkills = SKILLS_BY_TRACK[item.associatedTrackId] || [];
      if (trackSkills.length > 0) {
        const completedCount = trackSkills.filter((s) => state.completedSkills[s.id]).length;
        if (completedCount / trackSkills.length >= 0.75) {
          return true;
        }
      }
    }

    // 3. Check project completion if linked to project
    if (item.associatedProjectId) {
      const projState = state.projectStates[item.associatedProjectId];
      if (projState?.status === 'COMPLETED') {
        return true;
      }
    }

    return false;
  };

  const categories = ['Foundation', 'Core AI', 'Applied Engineering', 'Career & Proof'] as const;

  const totalItems = PORTFOLIO_CHECKLIST_ITEMS.length;
  const totalVerified = PORTFOLIO_CHECKLIST_ITEMS.filter((i) => isItemComplete(i)).length;

  return (
    <div className="tech-card p-6 border-dark-border space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-dark-border">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-status-emerald font-semibold flex items-center gap-1.5">
            <ShieldCheck size={15} />
            <span>AI Engineer Readiness Framework</span>
          </span>
          <h2 className="text-xl font-bold text-dark-text mt-1">
            Portfolio Readiness Checklist ({totalVerified} / {totalItems} Verified)
          </h2>
          <p className="text-xs text-dark-muted mt-0.5">
            Personal readiness checklist for 2-year transformation. This is a personal development standard, not an employment guarantee.
          </p>
        </div>

        <div className="text-xs font-mono text-dark-muted p-2.5 rounded bg-dark-elevated border border-dark-borderSubtle">
          <span>Readiness: </span>
          <span className="font-bold text-status-emerald">
            {Math.round((totalVerified / totalItems) * 100)}%
          </span>
        </div>
      </div>

      {/* Grouped Checklist */}
      <div className="space-y-6">
        {categories.map((category) => {
          const catItems = PORTFOLIO_CHECKLIST_ITEMS.filter((i) => i.category === category);
          return (
            <div key={category} className="space-y-2.5">
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-dark-text pb-1 border-b border-dark-borderSubtle">
                {category}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {catItems.map((item) => {
                  const verified = isItemComplete(item);
                  return (
                    <div
                      key={item.id}
                      onClick={() => onToggleItem(item.id)}
                      className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                        verified
                          ? 'bg-emerald-950/20 border-emerald-800/40 text-dark-text'
                          : 'bg-dark-elevated border-dark-borderSubtle hover:border-dark-border'
                      }`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleItem(item.id);
                        }}
                        className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                          verified
                            ? 'bg-status-emerald border-status-emerald text-white'
                            : 'border-dark-border bg-dark-surface'
                        }`}
                        aria-label={`Toggle ${item.title}`}
                      >
                        {verified && <Check size={13} strokeWidth={3} />}
                      </button>

                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-dark-text">{item.title}</h4>
                        <p className="text-[11px] text-dark-muted mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                        {item.autoCriteria && (
                          <span className="text-[10px] font-mono text-dark-faint mt-1 block">
                            Auto-sync: {item.autoCriteria}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
