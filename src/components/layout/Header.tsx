import React from 'react';
import { Search, Flame, Bell, Clock, Menu } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { requestNotificationPermission } from '../../utils/notifications';

interface HeaderProps {
  onOpenSearch: () => void;
  onToggleMobileMenu: () => void;
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onToggleMobileMenu,
  currentView,
}) => {
  const { streakData, timeline, state, dispatch } = useApp();

  const handleNotificationClick = async () => {
    if (!state.settings.notificationsEnabled) {
      const permission = await requestNotificationPermission();
      if (permission === 'granted') {
        dispatch({
          type: 'UPDATE_SETTINGS',
          settings: { notificationsEnabled: true, remindersEnabled: true },
        });
      }
    } else {
      dispatch({
        type: 'UPDATE_SETTINGS',
        settings: { notificationsEnabled: false },
      });
    }
  };

  const getPageTitle = (view: string) => {
    switch (view) {
      case 'dashboard':
        return 'Mission Control';
      case 'roadmap':
        return '17 AI Engineering Tracks';
      case 'timeline':
        return '2-Year Dynamic Roadmap Timeline';
      case 'projects':
        return 'Progressive Projects & Engineering Proof';
      case 'challenges':
        return 'Independent Engineering Challenges';
      case 'activity':
        return 'Activity History & Streaks';
      case 'readiness':
        return 'Portfolio Readiness & Proof Score';
      case 'settings':
        return 'System Settings & Data Backup';
      default:
        return 'AI Engineer OS';
    }
  };

  return (
    <header className="h-14 border-b border-dark-border bg-dark-bg/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      {/* Left: Mobile Menu & Current Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-1.5 rounded-md hover:bg-dark-elevated text-dark-muted hover:text-dark-text transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu size={18} />
        </button>
        <span className="text-sm font-semibold text-zinc-100 font-sans tracking-tight">
          {getPageTitle(currentView)}
        </span>
      </div>

      {/* Center / Right: Omnisearch Trigger & Quick Stats */}
      <div className="flex items-center gap-3">
        {/* Search Bar Trigger Button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-400 hover:text-zinc-100 transition-colors shadow-sm"
        >
          <Search size={14} />
          <span className="hidden sm:inline font-medium">Search OS...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-700 rounded">
            ⌘K
          </kbd>
        </button>

        {/* Current Streak */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs">
          <Flame size={14} className={streakData.currentStreak > 0 ? 'text-amber-400' : 'text-zinc-400'} />
          <span className="font-semibold text-zinc-200">{streakData.currentStreak}</span>
          <span className="text-zinc-400 text-xs">day streak</span>
        </div>

        {/* Days Remaining Counter */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs">
          <Clock size={14} className="text-zinc-400" />
          <span className="font-semibold text-zinc-200">{timeline.daysRemaining}</span>
          <span className="text-zinc-400 text-xs">days left</span>
        </div>

        {/* Notification Bell */}
        <button
          onClick={handleNotificationClick}
          title={state.settings.notificationsEnabled ? 'Notifications enabled' : 'Enable daily notifications'}
          className={`p-1.5 rounded-md border transition-colors ${
            state.settings.notificationsEnabled
              ? 'bg-dark-elevated border-accent/40 text-accent'
              : 'bg-dark-surface border-dark-border text-dark-muted hover:text-dark-text'
          }`}
          aria-label="Notifications toggle"
        >
          <Bell size={15} />
        </button>
      </div>
    </header>
  );
};
