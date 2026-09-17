import React from 'react';
import { Check, Clock, FolderGit2, AlertCircle } from 'lucide-react';
import { Skill, SkillDifficulty } from '../../types/roadmap';
import { Badge } from '../common/Badge';
import { SKILLS_BY_ID } from '../../data/roadmap';
import { PROJECTS_BY_ID } from '../../data/projects';

interface SkillCardProps {
  skill: Skill;
  isCompleted: boolean;
  onToggle: (skillId: string) => void;
  onNavigateToProject?: (projectId: string) => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  isCompleted,
  onToggle,
  onNavigateToProject,
}) => {
  const getDifficultyVariant = (diff: SkillDifficulty) => {
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

  return (
    <div
      className={`p-4 rounded-xl border transition-all ${
        isCompleted
          ? 'bg-emerald-950/20 border-emerald-800/40 text-zinc-100'
          : 'bg-zinc-900/70 border-zinc-800/80 hover:border-zinc-700'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Toggle Checkbox Button */}
        <button
          onClick={() => onToggle(skill.id)}
          className={`w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center transition-all flex-shrink-0 ${
            isCompleted
              ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm'
              : 'border-zinc-700 hover:border-zinc-500 bg-zinc-950'
          }`}
          aria-label={isCompleted ? `Uncheck ${skill.title}` : `Complete ${skill.title}`}
        >
          {isCompleted && <Check size={13} strokeWidth={3} />}
        </button>

        {/* Skill Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4
              className={`text-xs sm:text-sm font-semibold transition-colors ${
                isCompleted ? 'line-through text-zinc-400' : 'text-zinc-100'
              }`}
            >
              {skill.title}
            </h4>
            <Badge variant={getDifficultyVariant(skill.difficulty)}>
              {skill.difficulty}
            </Badge>
            <span className="text-xs text-zinc-400 font-medium flex items-center gap-1">
              <Clock size={12} className="text-zinc-400" />
              ~{skill.estimatedHours}h
            </span>
          </div>

          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            {skill.description}
          </p>

          {/* Prerequisites / Tags */}
          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
            {skill.prerequisites.length > 0 && (
              <div className="flex items-center gap-1 text-zinc-400">
                <AlertCircle size={12} className="text-amber-400" />
                <span className="font-medium text-[11px]">Prereqs:</span>
                {skill.prerequisites.map((pid) => (
                  <span
                    key={pid}
                    className="text-zinc-300 bg-zinc-950 px-2 py-0.5 rounded-md border border-zinc-800 text-[11px]"
                  >
                    {SKILLS_BY_ID[pid]?.title.split(' ')[0] || pid}
                  </span>
                ))}
              </div>
            )}

            {skill.relatedProjects.length > 0 && (
              <div className="flex items-center gap-1 text-emerald-400">
                <FolderGit2 size={12} />
                <span className="font-medium text-[11px]">Used in:</span>
                {skill.relatedProjects.map((projId) => (
                  <button
                    key={projId}
                    onClick={() => onNavigateToProject?.(projId)}
                    className="hover:underline text-[11px] text-emerald-400 hover:text-emerald-300 font-medium"
                  >
                    {PROJECTS_BY_ID[projId]?.title.split(' ')[0] || 'Project'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
