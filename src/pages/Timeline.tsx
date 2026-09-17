import React from 'react';
import { TimelineOverview } from '../components/timeline/TimelineOverview';
import { PhaseDetailCard } from '../components/timeline/PhaseDetailCard';
import { useApp } from '../store/AppContext';

interface TimelinePageProps {
  onNavigateToProject: (projectId: string) => void;
  onNavigateToRoadmap: () => void;
}

export const TimelinePage: React.FC<TimelinePageProps> = ({
  onNavigateToProject,
  onNavigateToRoadmap,
}) => {
  const { timeline, roadmapProgressPercent, state, dispatch } = useApp();

  const handleToggleCheckpoint = (cpId: string) => {
    dispatch({ type: 'TOGGLE_CHECKPOINT', checkpointId: cpId });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Timeline Header & Macro Stats */}
      <TimelineOverview
        timeline={timeline}
        roadmapPercent={roadmapProgressPercent}
      />

      {/* 2. All 8 Phases in Chronological Order */}
      <div className="space-y-4">
        {timeline.phasesInfo.map((pInfo) => (
          <PhaseDetailCard
            key={pInfo.phase.id}
            phase={pInfo.phase}
            startDate={pInfo.startDate}
            endDate={pInfo.endDate}
            status={pInfo.status}
            skillsCompleted={pInfo.skillsCompleted}
            skillsTotal={pInfo.skillsTotal}
            projectsCompleted={pInfo.projectsCompleted}
            projectsTotal={pInfo.projectsTotal}
            completionPercent={pInfo.completionPercent}
            isCurrent={pInfo.isCurrent}
            completedCheckpoints={state.completedCheckpoints}
            onToggleCheckpoint={handleToggleCheckpoint}
            onNavigateToProject={onNavigateToProject}
            onNavigateToRoadmap={onNavigateToRoadmap}
          />
        ))}
      </div>
    </div>
  );
};
