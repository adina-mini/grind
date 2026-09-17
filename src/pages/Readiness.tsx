import React from 'react';
import { ProofScoreBreakdownCard } from '../components/readiness/ProofScoreBreakdownCard';
import { PortfolioChecklistSection } from '../components/readiness/PortfolioChecklistSection';
import { useApp } from '../store/AppContext';

interface ReadinessPageProps {
  onNavigateToRoadmap: () => void;
  onNavigateToProjects: () => void;
}

export const ReadinessPage: React.FC<ReadinessPageProps> = ({
  onNavigateToRoadmap,
  onNavigateToProjects,
}) => {
  const { proofScore, dispatch } = useApp();

  const handleToggleChecklistItem = (itemId: string) => {
    dispatch({ type: 'TOGGLE_CHECKLIST_ITEM', itemId });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Engineering Proof Score Itemized Audit */}
      <ProofScoreBreakdownCard proofScore={proofScore} />

      {/* 2. Portfolio Readiness 22-Point Checklist */}
      <PortfolioChecklistSection
        onToggleItem={handleToggleChecklistItem}
        onNavigateToRoadmap={onNavigateToRoadmap}
        onNavigateToProjects={onNavigateToProjects}
      />
    </div>
  );
};
