import React, { useState, useMemo } from 'react';
import { Map, Layers, CheckCircle2 } from 'lucide-react';
import { ROADMAP_TRACKS } from '../data/roadmap';
import { TrackAccordion } from '../components/roadmap/TrackAccordion';
import { RoadmapFilters } from '../components/roadmap/RoadmapFilters';
import { SkillDifficulty } from '../types/roadmap';
import { useApp } from '../store/AppContext';
import { ProgressBar } from '../components/common/ProgressBar';

interface RoadmapPageProps {
  targetEntityId?: string;
  onNavigateToProject?: (projectId: string) => void;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({
  targetEntityId,
  onNavigateToProject,
}) => {
  const { state, dispatch, roadmapProgressPercent } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<SkillDifficulty | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Incomplete' | 'Completed'>('All');

  const handleToggleSkill = (skillId: string) => {
    dispatch({ type: 'TOGGLE_SKILL', skillId });
  };

  const totalSkills = 270;
  const completedCount = Object.values(state.completedSkills).filter(Boolean).length;

  // Filter skills for each track
  const filteredTracks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return ROADMAP_TRACKS.map((track) => {
      const matchingSkills = track.skills.filter((skill) => {
        // Search query filter
        if (q) {
          const titleMatch = skill.title.toLowerCase().includes(q);
          const descMatch = skill.description.toLowerCase().includes(q);
          const tagMatch = skill.tags.some((t) => t.toLowerCase().includes(q));
          if (!titleMatch && !descMatch && !tagMatch) return false;
        }

        // Difficulty filter
        if (selectedDifficulty !== 'All' && skill.difficulty !== selectedDifficulty) {
          return false;
        }

        // Status filter
        const isDone = !!state.completedSkills[skill.id];
        if (selectedStatus === 'Completed' && !isDone) return false;
        if (selectedStatus === 'Incomplete' && isDone) return false;

        return true;
      });

      return {
        track,
        skills: matchingSkills,
        hasMatches: matchingSkills.length > 0 || !q,
      };
    }).filter((t) => (searchQuery ? t.skills.length > 0 : true));
  }, [searchQuery, selectedDifficulty, selectedStatus, state.completedSkills]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="tech-card p-6 border-dark-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-dark-border">
          <div>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <Map size={14} />
              <span>Full Engineering Curriculum</span>
            </span>
            <h1 className="text-2xl font-bold text-zinc-100 tracking-tight mt-1">
              17 Parallel AI Engineering Tracks
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Non-linear mastery: study Python, DSA, Math, and LLMs simultaneously. The roadmap tells you what to learn; your timeline tells you when to focus.
            </p>
          </div>

          <div className="text-right flex-shrink-0">
            <div className="text-lg font-bold text-zinc-100">
              {completedCount} <span className="text-xs font-normal text-zinc-400">/ {totalSkills} skills</span>
            </div>
            <div className="text-xs text-emerald-400 font-semibold">{roadmapProgressPercent}% complete</div>
          </div>
        </div>

        <div className="pt-3">
          <ProgressBar value={roadmapProgressPercent} max={100} size="sm" variant="proof" />
        </div>
      </div>

      {/* Filters Bar */}
      <RoadmapFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      {/* 17 Track Accordions */}
      <div className="space-y-3">
        {filteredTracks.map(({ track, skills }, idx) => {
          // Check if this track contains the targeted entity ID
          const containsTarget = targetEntityId && skills.some((s) => s.id === targetEntityId);
          return (
            <TrackAccordion
              key={track.id}
              track={track}
              skills={skills}
              completedSkills={state.completedSkills}
              onToggleSkill={handleToggleSkill}
              onNavigateToProject={onNavigateToProject}
              defaultExpanded={idx === 0 || !!containsTarget}
            />
          );
        })}
      </div>
    </div>
  );
};
