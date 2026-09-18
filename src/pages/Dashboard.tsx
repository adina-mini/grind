import React from 'react';
import { HeroStats } from '../components/dashboard/HeroStats';
import { CurrentPhaseCard } from '../components/dashboard/CurrentPhaseCard';
import { TodayMissionCard } from '../components/dashboard/TodayMissionCard';
import { NextRecommendationCard } from '../components/dashboard/NextRecommendationCard';
import { TimelinePreview } from '../components/dashboard/TimelinePreview';
import { ActiveProjectsCard } from '../components/dashboard/ActiveProjectsCard';
import { ReadinessSummaryCard } from '../components/dashboard/ReadinessSummaryCard';

interface DashboardPageProps {
  onNavigate: (view: string, entityId?: string) => void;
  onOpenProjectDetail: (projectId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onOpenProjectDetail,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Hero & Top Performance Metrics */}
      <HeroStats onNavigate={onNavigate} />

      {/* 2. Active Focus Phase Card */}
      <CurrentPhaseCard onNavigate={onNavigate} />

      {/* 3. Today's Mission & Next Recommended Action */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodayMissionCard onNavigate={onNavigate} />
        <NextRecommendationCard onNavigate={onNavigate} />
      </div>

      {/* 4. Active Projects & Engineering Proof */}
      <ActiveProjectsCard
        onNavigate={onNavigate}
        onOpenProjectDetail={onOpenProjectDetail}
      />

      {/* 5. 2-Year Timeline Progress Bar & 8-Phase Chips */}
      <TimelinePreview onNavigate={onNavigate} />

      {/* 6. Readiness Gauge */}
      <div>
        <ReadinessSummaryCard onNavigate={onNavigate} />
      </div>
    </div>
  );
};
