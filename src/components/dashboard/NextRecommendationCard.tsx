import React from 'react';
import { Compass, ArrowRight, Lightbulb } from 'lucide-react';
import { useApp } from '../../store/AppContext';

interface NextRecommendationCardProps {
  onNavigate: (view: string, entityId?: string) => void;
}

export const NextRecommendationCard: React.FC<NextRecommendationCardProps> = ({ onNavigate }) => {
  const { nextRecommendation } = useApp();

  return (
    <div className="tech-card p-5 border-dark-border flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-mono text-status-sky font-semibold uppercase tracking-wider">
            <Compass size={15} />
            <span>Next Recommended Action</span>
          </div>
          <span className="text-[11px] font-mono text-dark-muted">
            {nextRecommendation.subtitle}
          </span>
        </div>

        <h3 className="text-base font-bold text-dark-text mt-2.5">
          {nextRecommendation.title}
        </h3>

        {/* Deterministic Explanation */}
        <div className="mt-3 p-3 rounded-md bg-dark-elevated border border-dark-borderSubtle flex items-start gap-2.5">
          <Lightbulb size={15} className="text-status-amber flex-shrink-0 mt-0.5" />
          <p className="text-xs text-dark-muted leading-relaxed">
            {nextRecommendation.rationale}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-dark-border">
        <button
          onClick={() => {
            if (nextRecommendation.skillId) {
              onNavigate('roadmap', nextRecommendation.skillId);
            } else if (nextRecommendation.projectId) {
              onNavigate('projects', nextRecommendation.projectId);
            } else {
              onNavigate('roadmap');
            }
          }}
          className="w-full py-2 px-4 rounded-md bg-dark-elevated hover:bg-dark-border border border-dark-border text-xs font-mono font-medium text-dark-text hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          <span>Focus on this Skill</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};
