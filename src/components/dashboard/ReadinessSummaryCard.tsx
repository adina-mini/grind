import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { PORTFOLIO_CHECKLIST_ITEMS } from '../../data/portfolioChecklist';
import { ProgressBar } from '../common/ProgressBar';

interface ReadinessSummaryCardProps {
  onNavigate: (view: string) => void;
}

export const ReadinessSummaryCard: React.FC<ReadinessSummaryCardProps> = ({ onNavigate }) => {
  const { state } = useApp();

  const totalItems = PORTFOLIO_CHECKLIST_ITEMS.length;
  const completedItems = PORTFOLIO_CHECKLIST_ITEMS.filter(
    (item) => !!state.portfolioChecklistCustom[item.id]
  ).length;

  const readinessPercent = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="tech-card p-5">
      <div className="flex items-center justify-between pb-3 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-proof" />
          <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-dark-text">
            AI Engineer Readiness Checklist
          </h3>
        </div>
        <button
          onClick={() => onNavigate('readiness')}
          className="text-xs font-mono text-dark-muted hover:text-dark-text flex items-center gap-1 hover:underline"
        >
          Audit Checklist <ArrowRight size={13} />
        </button>
      </div>

      <div className="pt-4 space-y-3">
        <div>
          <div className="flex justify-between items-center text-xs font-mono text-dark-muted mb-1.5">
            <span>Core Competencies Satisfied</span>
            <span className="font-semibold text-proof">
              {completedItems} / {totalItems} verified ({readinessPercent}%)
            </span>
          </div>
          <ProgressBar value={readinessPercent} max={100} size="sm" variant="proof" />
        </div>

        <p className="text-xs text-dark-muted leading-relaxed">
          Tracks verified engineering proof across Python, DSA, ML, Deep Learning, RAG, Multi-Agent systems, Cloud, MLOps, Security, and Capstone.
        </p>
      </div>
    </div>
  );
};
