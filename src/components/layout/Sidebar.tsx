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
  Sparkles,
  Award,
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { ProgressBar } from '../common/ProgressBar';
import { BuilderProfile } from './BuilderProfile';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const { xpStats, proofScore } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Roadmap & Tracks', icon: Map },
    { id: 'timeline', label: '2-Year Timeline', icon: Calendar },
    { id: 'projects', label: 'Projects & Proof', icon: FolderGit2 },
    { id: 'challenges', label: 'Challenges', icon: Flame },
    { id: 'activity', label: 'Activity & Streaks', icon: History },
    { id: 'readiness', label: 'Portfolio Readiness', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-dark-surface border-r border-dark-border flex-shrink-0 h-screen sticky top-0 overflow-y-auto">
      {/* Brand Header */}
      <div className="p-5 border-b border-dark-border flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
          <Sparkles size={16} className="text-emerald-400" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-zinc-100 tracking-tight flex items-center gap-1.5">
            AI Engineer OS
          </h1>
          <p className="text-xs text-zinc-400 font-medium">
            2-Year Journey
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-zinc-800/80 text-zinc-100 border border-zinc-700/60 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 border border-transparent'
              }`}
            >
              <Icon
                size={16}
                className={isActive ? 'text-emerald-400' : 'text-zinc-400'}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Engineering Proof & Level Status Footer */}
      <div className="p-4 border-t border-dark-border bg-dark-surface/50 space-y-3">
        {/* Proof Score Card */}
        <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
              <Award size={13} className="text-emerald-400" />
              <span>Proof Score</span>
            </div>
            <div className="text-base font-bold text-emerald-400 mt-0.5">
              {proofScore.totalProofScore} <span className="text-xs font-normal text-zinc-400">pts</span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('readiness')}
            className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Audit →
          </button>
        </div>

        {/* Level and XP */}
        <div>
          <div className="flex justify-between items-center text-xs font-medium mb-1.5">
            <span className="font-semibold text-zinc-200">Level {xpStats.currentLevel}</span>
            <span className="text-zinc-400">{xpStats.totalXP.toLocaleString()} XP</span>
          </div>
          <ProgressBar
            value={xpStats.xpInCurrentLevel}
            max={500}
            size="sm"
            variant="proof"
          />
          <div className="flex justify-between text-[11px] text-zinc-400 mt-1.5">
            <span>{xpStats.xpToNextLevel} XP to Level {xpStats.currentLevel + 1}</span>
            <span>{xpStats.levelProgressPercent}%</span>
          </div>
        </div>

        {/* Builder Profile Section */}
        <BuilderProfile />
      </div>
    </aside>
  );
};
