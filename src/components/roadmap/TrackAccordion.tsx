import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Layers } from 'lucide-react';
import { Track, Skill } from '../../types/roadmap';
import { SkillCard } from './SkillCard';
import { ProgressBar } from '../common/ProgressBar';

interface TrackAccordionProps {
  track: Track;
  skills: Skill[];
  completedSkills: Record<string, boolean>;
  onToggleSkill: (skillId: string) => void;
  onNavigateToProject?: (projectId: string) => void;
  defaultExpanded?: boolean;
}

export const TrackAccordion: React.FC<TrackAccordionProps> = ({
  track,
  skills,
  completedSkills,
  onToggleSkill,
  onNavigateToProject,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const totalSkills = skills.length;
  const completedCount = skills.filter((s) => completedSkills[s.id]).length;
  const percent = totalSkills > 0 ? Math.round((completedCount / totalSkills) * 100) : 0;

  return (
    <div className="tech-card overflow-hidden border-dark-border">
      {/* Accordion Header */}
      <div
        onClick={() => setIsExpanded((prev) => !prev)}
        className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-dark-elevated/50 transition-colors select-none"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="p-2 rounded-lg bg-dark-elevated border border-dark-border text-accent flex-shrink-0">
            <Layers size={18} />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-dark-text truncate">
                {track.title}
              </h3>
            </div>
            <p className="text-xs text-dark-muted truncate mt-0.5 max-w-xl">
              {track.description}
            </p>
          </div>
        </div>

        {/* Right Stats & Expand Icon */}
        <div className="flex items-center gap-4 flex-shrink-0 ml-3">
          <div className="hidden sm:block text-right font-mono">
            <div className="text-xs font-semibold text-dark-text">
              {completedCount} / {totalSkills}
            </div>
            <div className="text-[10px] text-dark-muted">{percent}% complete</div>
          </div>

          <div className="w-16 hidden md:block">
            <ProgressBar value={percent} max={100} size="xs" variant={percent === 100 ? 'success' : 'accent'} />
          </div>

          <div className="p-1 rounded text-dark-muted hover:text-dark-text">
            {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </div>
        </div>
      </div>

      {/* Accordion Body */}
      {isExpanded && (
        <div className="p-4 sm:p-5 border-t border-dark-border bg-dark-surface/40 space-y-3">
          {skills.length === 0 ? (
            <div className="text-xs text-dark-muted py-4 text-center">
              No skills matching current difficulty or search filters in this track.
            </div>
          ) : (
            skills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                isCompleted={!!completedSkills[skill.id]}
                onToggle={onToggleSkill}
                onNavigateToProject={onNavigateToProject}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};
