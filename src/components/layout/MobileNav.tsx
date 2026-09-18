import React from 'react';
import {
  LayoutDashboard,
  Map,
  Calendar,
  FolderGit2,
  Flame,
  History,
  ShieldCheck,
  Settings,
  X,
  Sparkles,
  Award,
} from 'lucide-react';
import { useApp } from '../../store/AppContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  currentView,
  onNavigate,
}) => {
  const { xpStats, proofScore } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'timeline', label: '2-Year Timeline', icon: Calendar },
    { id: 'projects', label: 'Projects & Proof', icon: FolderGit2 },
    { id: 'challenges', label: 'Challenges', icon: Flame },
    { id: 'activity', label: 'Activity & Streaks', icon: History },
    { id: 'readiness', label: 'Portfolio Readiness', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (!isOpen) return null;

  const handleSelect = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden bg-black/80 backdrop-blur-sm flex">
      <div className="w-72 max-w-[80vw] bg-dark-surface border-r border-dark-border h-full flex flex-col p-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-dark-border">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-dark-elevated border border-dark-border flex items-center justify-center text-proof font-bold">
              <Sparkles size={14} className="text-proof" />
            </div>
            <div>
              <span className="text-xs font-bold text-dark-text">AI Engineer OS</span>
              <p className="text-[10px] text-dark-muted font-mono">2-Year Journey</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-dark-muted hover:text-dark-text"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-dark-elevated text-dark-text border border-dark-border'
                    : 'text-dark-muted hover:text-dark-text hover:bg-dark-card border border-transparent'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-accent' : 'text-dark-muted'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="pt-4 border-t border-dark-border space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-dark-muted">Proof Score:</span>
            <span className="font-bold text-proof flex items-center gap-1">
              <Award size={12} />
              {proofScore.totalProofScore} pts
            </span>
          </div>
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-dark-muted">Level {xpStats.currentLevel}:</span>
            <span className="text-dark-text font-semibold">{xpStats.totalXP} XP</span>
          </div>
        </div>
      </div>
      <div className="flex-1" onClick={onClose} aria-hidden="true" />
    </div>
  );
};
