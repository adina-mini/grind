import React, { useState } from 'react';
import { AppProvider } from './store/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/Dashboard';
import { RoadmapPage } from './pages/Roadmap';
import { TimelinePage } from './pages/Timeline';
import { ProjectsPage } from './pages/Projects';
import { ChallengesPage } from './pages/Challenges';
import { ActivityPage } from './pages/Activity';
import { ReadinessPage } from './pages/Readiness';
import { SettingsPage } from './pages/Settings';

export const MainContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [targetEntityId, setTargetEntityId] = useState<string | undefined>(undefined);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);

  const handleNavigate = (view: string, entityId?: string) => {
    setCurrentView(view);
    setTargetEntityId(entityId);
    if (view === 'projects' && entityId) {
      setSelectedProjectId(entityId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardPage
            onNavigate={handleNavigate}
            onOpenProjectDetail={(pId) => {
              setSelectedProjectId(pId);
              setCurrentView('projects');
            }}
          />
        );
      case 'roadmap':
        return (
          <RoadmapPage
            targetEntityId={targetEntityId}
            onNavigateToProject={(pId) => {
              setSelectedProjectId(pId);
              setCurrentView('projects');
            }}
          />
        );
      case 'timeline':
        return (
          <TimelinePage
            onNavigateToProject={(pId) => {
              setSelectedProjectId(pId);
              setCurrentView('projects');
            }}
            onNavigateToRoadmap={() => setCurrentView('roadmap')}
          />
        );
      case 'projects':
        return (
          <ProjectsPage
            selectedProjectId={selectedProjectId}
            onClearSelectedProject={() => setSelectedProjectId(undefined)}
          />
        );
      case 'challenges':
        return <ChallengesPage />;
      case 'activity':
        return <ActivityPage />;
      case 'readiness':
        return (
          <ReadinessPage
            onNavigateToRoadmap={() => setCurrentView('roadmap')}
            onNavigateToProjects={() => setCurrentView('projects')}
          />
        );
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <DashboardPage
            onNavigate={handleNavigate}
            onOpenProjectDetail={(pId) => {
              setSelectedProjectId(pId);
              setCurrentView('projects');
            }}
          />
        );
    }
  };

  return (
    <AppLayout currentView={currentView} onNavigate={handleNavigate}>
      {renderActiveView()}
    </AppLayout>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
};

export default App;
