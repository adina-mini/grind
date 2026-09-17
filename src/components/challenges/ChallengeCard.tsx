import React, { useState } from 'react';
import { Flame, CheckCircle2, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { Challenge, ChallengeDifficulty } from '../../types/challenge';
import { Badge } from '../common/Badge';

interface ChallengeCardProps {
  challenge: Challenge;
  isCompleted: boolean;
  completedAt?: string;
  onComplete: (challengeId: string, notes?: string) => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  isCompleted,
  completedAt,
  onComplete,
}) => {
  const [isExpandingNotes, setIsExpandingNotes] = useState(false);
  const [notes, setNotes] = useState('');

  const getDifficultyBadge = (diff: ChallengeDifficulty) => {
    switch (diff) {
      case 'Beginner':
        return 'sky';
      case 'Intermediate':
        return 'warning';
      case 'Advanced':
        return 'purple';
      case 'Expert':
        return 'danger';
      default:
        return 'default';
    }
  };

  const handleCompleteClick = () => {
    onComplete(challenge.id, notes);
    setIsExpandingNotes(false);
  };

  return (
    <div
      className={`tech-card p-5 border-dark-border flex flex-col justify-between transition-all ${
        isCompleted ? 'bg-dark-elevated/30 border-emerald-800/40' : ''
      }`}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-2 pb-2">
          <div className="flex items-center gap-2">
            <Badge variant={getDifficultyBadge(challenge.difficulty)}>
              {challenge.difficulty}
            </Badge>
            <span className="text-[11px] font-mono text-dark-muted">
              {challenge.trackId}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-mono text-status-amber font-bold">
            <Sparkles size={13} />
            <span>+{challenge.xpReward} XP</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-dark-text mt-2 flex items-center gap-2">
          <Flame size={16} className={isCompleted ? 'text-status-emerald' : 'text-status-amber'} />
          <span>{challenge.title}</span>
        </h3>

        {/* Prompt */}
        <p className="text-xs text-dark-text mt-2 leading-relaxed bg-dark-elevated p-3 rounded-md border border-dark-borderSubtle">
          &ldquo;{challenge.prompt}&rdquo;
        </p>

        {/* Why this matters */}
        <p className="text-[11px] text-dark-muted mt-2">
          <strong className="text-dark-text">Engineering Context:</strong> {challenge.context}
        </p>

        {/* Rules */}
        <div className="mt-3 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-dark-muted block">
            Rules (Zero-Tutorial Constraint):
          </span>
          {challenge.rules.map((rule, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-[11px] text-dark-muted">
              <ShieldAlert size={11} className="text-status-rose flex-shrink-0 mt-0.5" />
              <span>{rule}</span>
            </div>
          ))}
        </div>

        {/* Acceptance Criteria */}
        <div className="mt-3 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-dark-muted block">
            Acceptance Criteria:
          </span>
          {challenge.acceptanceCriteria.map((crit, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-[11px] text-dark-text">
              <CheckCircle2 size={11} className="text-status-emerald flex-shrink-0 mt-0.5" />
              <span>{crit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Completion Action */}
      <div className="mt-4 pt-3 border-t border-dark-border">
        {isCompleted ? (
          <div className="flex items-center gap-1.5 text-xs font-mono text-status-emerald font-medium">
            <Check size={14} />
            <span>Completed without tutorials (+{challenge.xpReward} XP)</span>
          </div>
        ) : isExpandingNotes ? (
          <div className="space-y-2">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional: Note down key realizations, edge cases, or how you solved it..."
              rows={2}
              className="w-full p-2 text-xs bg-dark-surface border border-dark-border rounded text-dark-text outline-none focus:border-accent resize-none"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleCompleteClick}
                className="px-3 py-1.5 bg-status-emerald hover:bg-emerald-600 text-white text-xs font-mono rounded font-medium transition-colors"
              >
                Confirm Completion
              </button>
              <button
                onClick={() => setIsExpandingNotes(false)}
                className="px-3 py-1.5 bg-dark-elevated text-dark-muted text-xs font-mono rounded hover:text-dark-text"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsExpandingNotes(true)}
            className="w-full py-2 px-3 rounded bg-dark-elevated hover:bg-dark-border border border-dark-border text-xs font-mono font-medium text-dark-text hover:text-white transition-colors flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 size={13} />
            <span>I Built & Verified This Challenge</span>
          </button>
        )}
      </div>
    </div>
  );
};
