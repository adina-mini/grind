import React from 'react';
import { LayoutDashboard, Map, Calendar, FolderGit2, ShieldCheck } from 'lucide-react';

interface MobileBottomBarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ currentView, onNavigate }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'timeline', label: 'Timeline', icon: Calendar },
    { id: 'readiness', label: 'Readiness', icon: ShieldCheck },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-dark-surface/95 backdrop-blur-md border-t border-dark-border px-2 py-1.5 flex items-center justify-around"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentView === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-md transition-all ${
              isActive
                ? 'text-proof font-semibold'
                : 'text-dark-muted hover:text-dark-text'
            }`}
          >
            <Icon size={18} className={isActive ? 'text-proof' : 'text-dark-muted'} />
            <span className="text-[10px] mt-0.5 font-mono">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
