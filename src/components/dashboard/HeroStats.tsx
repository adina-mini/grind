import React from 'react';
import { Award } from 'lucide-react';
import { useApp } from '../../store/AppContext';

interface HeroStatsProps {
  onNavigate: (view: string) => void;
}

export const HeroStats: React.FC<HeroStatsProps> = ({ onNavigate }) => {
  const { xpStats, proofScore, timeline, roadmapProgressPercent, streakData } = useApp();

  return (
    <div className="space-y-4">
      {/* Hero Title & Tagline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wide text-emerald-400">
              Training Command Center
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 mt-1">
            AI Engineer OS
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-normal mt-0.5">
            My 2-Year Journey to Becoming an AI Engineer •{' '}
            <span className="text-zinc-200 font-medium">
              Learn → Build → Test → Deploy → Evaluate → Improve → Repeat
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('readiness')}
            className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-xs text-emerald-400 font-medium border border-emerald-500/30 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
          >
            <Award size={14} />
            Proof Audit: {proofScore.totalProofScore} pts
          </button>
        </div>
      </div>

      {/* 6 Key Performance Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Metric 1: Roadmap Completion */}
        <div
          onClick={() => onNavigate('roadmap')}
          className="tech-card tech-card-hover p-4 cursor-pointer"
        >
          <div className="text-zinc-400 text-xs font-medium">
            Roadmap
          </div>
          <div className="text-2xl font-bold tracking-tight text-zinc-100 mt-1.5">
            {roadmapProgressPercent}%
          </div>
          <div className="text-[11px] text-zinc-400 mt-0.5">
            17 tracks active
          </div>
        </div>

        {/* Metric 2: Level */}
        <div
          onClick={() => onNavigate('activity')}
          className="tech-card tech-card-hover p-4 cursor-pointer"
        >
          <div className="text-zinc-400 text-xs font-medium">
            Current Level
          </div>
          <div className="text-2xl font-bold tracking-tight text-zinc-100 mt-1.5">
            Lvl {xpStats.currentLevel}
          </div>
          <div className="text-[11px] text-zinc-400 mt-0.5">
            {xpStats.xpToNextLevel} XP to next level
          </div>
        </div>

        {/* Metric 3: Total XP */}
        <div
          onClick={() => onNavigate('activity')}
          className="tech-card tech-card-hover p-4 cursor-pointer"
        >
          <div className="text-zinc-400 text-xs font-medium">
            Total XP
          </div>
          <div className="text-2xl font-bold tracking-tight text-zinc-100 mt-1.5">
            {xpStats.totalXP.toLocaleString()}
          </div>
          <div className="text-[11px] text-zinc-400 mt-0.5">
            Skill & project XP
          </div>
        </div>

        {/* Metric 4: Engineering Proof Score */}
        <div
          onClick={() => onNavigate('readiness')}
          className="tech-card tech-card-hover p-4 cursor-pointer border-emerald-500/30 bg-emerald-950/15"
        >
          <div className="text-emerald-400 text-xs font-medium">
            Proof Score
          </div>
          <div className="text-2xl font-bold tracking-tight text-emerald-300 mt-1.5">
            {proofScore.totalProofScore}
          </div>
          <div className="text-[11px] text-zinc-400 mt-0.5">
            Verified evidence
          </div>
        </div>

        {/* Metric 5: Active Streak */}
        <div
          onClick={() => onNavigate('activity')}
          className="tech-card tech-card-hover p-4 cursor-pointer"
        >
          <div className="text-zinc-400 text-xs font-medium">
            Daily Streak
          </div>
          <div className="text-2xl font-bold tracking-tight text-zinc-100 mt-1.5">
            {streakData.currentStreak} <span className="text-xs font-normal text-zinc-400">days</span>
          </div>
          <div className="text-[11px] text-zinc-400 mt-0.5">
            Best: {streakData.longestStreak} days
          </div>
        </div>

        {/* Metric 6: Days Remaining */}
        <div
          onClick={() => onNavigate('timeline')}
          className="tech-card tech-card-hover p-4 cursor-pointer"
        >
          <div className="text-zinc-400 text-xs font-medium">
            Timeline
          </div>
          <div className="text-2xl font-bold tracking-tight text-zinc-100 mt-1.5">
            {timeline.daysRemaining} <span className="text-xs font-normal text-zinc-400">days</span>
          </div>
          <div className="text-[11px] text-zinc-400 mt-0.5">
            {timeline.daysElapsed} days elapsed
          </div>
        </div>
      </div>
    </div>
  );
};
