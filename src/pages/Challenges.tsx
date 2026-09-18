import React, { useState, useMemo } from 'react';
import { Flame, Sparkles } from 'lucide-react';
import { ALL_CHALLENGES } from '../data/challenges';
import { ChallengeCard } from '../components/challenges/ChallengeCard';
import { ChallengeFilters } from '../components/challenges/ChallengeFilters';
import { ChallengeDifficulty } from '../types/challenge';
import { useApp } from '../store/AppContext';

export const ChallengesPage: React.FC = () => {
  const { state, dispatch } = useApp();

  const [selectedDifficulty, setSelectedDifficulty] = useState<ChallengeDifficulty | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Incomplete' | 'Completed'>('All');

  const handleCompleteChallenge = (challengeId: string, notes?: string) => {
    dispatch({ type: 'COMPLETE_CHALLENGE', challengeId, notes });
  };

  const completedCount = Object.keys(state.completedChallenges).length;

  const filteredChallenges = useMemo(() => {
    return ALL_CHALLENGES.filter((chal) => {
      if (selectedDifficulty !== 'All' && chal.difficulty !== selectedDifficulty) {
        return false;
      }

      const isDone = !!state.completedChallenges[chal.id];
      if (selectedStatus === 'Completed' && !isDone) return false;
      if (selectedStatus === 'Incomplete' && isDone) return false;

      return true;
    });
  }, [selectedDifficulty, selectedStatus, state.completedChallenges]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="tech-card p-6 border-dark-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-dark-border">
          <div>
            <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
              <Flame size={15} />
              <span>Independent Problem Solving</span>
            </span>
            <h1 className="text-2xl font-bold text-zinc-100 tracking-tight mt-1">
              Zero-Tutorial Engineering Challenges
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5 max-w-2xl">
              Tutorial hell happens when you passively copy code. These challenges require you to design, build, and verify systems from pure principles, rules, and tests.
            </p>
          </div>

          <div className="text-right flex-shrink-0">
            <div className="text-lg font-bold text-zinc-100">
              {completedCount} <span className="text-xs font-normal text-zinc-400">/ {ALL_CHALLENGES.length}</span>
            </div>
            <div className="text-xs text-amber-400 font-medium">Challenges conquered</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <ChallengeFilters
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredChallenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            isCompleted={!!state.completedChallenges[challenge.id]}
            completedAt={state.completedChallenges[challenge.id]?.completedAt}
            onComplete={handleCompleteChallenge}
          />
        ))}
      </div>
    </div>
  );
};
