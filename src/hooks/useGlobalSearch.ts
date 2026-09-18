import { useState, useMemo } from 'react';
import { SearchItem } from '../types/search';
import { ALL_SKILLS } from '../data/roadmap';
import { ALL_PROJECTS } from '../data/projects';
import { ALL_CHALLENGES } from '../data/challenges';
import { ALL_CHECKPOINTS } from '../data/timeline';
import { TRACKS_METADATA } from '../data/roadmap/tracks';

export function useGlobalSearch() {
  const [query, setQuery] = useState('');

  // Pre-index all searchable items
  const allSearchableItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];

    // 1. Skills
    for (const skill of ALL_SKILLS) {
      items.push({
        id: `search-skill-${skill.id}`,
        type: 'skill',
        title: skill.title,
        subtitle: `${skill.trackId} • ${skill.difficulty} • ~${skill.estimatedHours}h`,
        tags: skill.tags,
        trackName: skill.trackId,
        difficulty: skill.difficulty,
        targetView: 'roadmap',
        targetId: skill.id,
      });
    }

    // 2. Projects
    for (const proj of ALL_PROJECTS) {
      items.push({
        id: `search-proj-${proj.id}`,
        type: 'project',
        title: proj.title,
        subtitle: `${proj.difficulty} Project • ${proj.baseXP} XP • ${proj.trackId}`,
        tags: proj.tags,
        trackName: proj.trackId,
        difficulty: proj.difficulty,
        targetView: 'projects',
        targetId: proj.id,
      });
    }

    // 3. Challenges
    for (const chal of ALL_CHALLENGES) {
      items.push({
        id: `search-chal-${chal.id}`,
        type: 'challenge',
        title: chal.title,
        subtitle: `${chal.difficulty} Challenge • ${chal.xpReward} XP`,
        tags: chal.tags,
        trackName: chal.trackId,
        difficulty: chal.difficulty,
        targetView: 'challenges',
        targetId: chal.id,
      });
    }

    // 4. Checkpoints
    for (const cp of ALL_CHECKPOINTS) {
      items.push({
        id: `search-cp-${cp.id}`,
        type: 'checkpoint',
        title: cp.title,
        subtitle: cp.description,
        targetView: 'timeline',
        targetId: cp.id,
      });
    }

    // 5. Tracks
    for (const track of TRACKS_METADATA) {
      items.push({
        id: `search-track-${track.id}`,
        type: 'track',
        title: track.title,
        subtitle: `${track.category} Track • ${track.description}`,
        targetView: 'roadmap',
        targetId: track.id,
      });
    }

    return items;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return allSearchableItems
      .filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(q);
        const subMatch = item.subtitle.toLowerCase().includes(q);
        const tagMatch = item.tags?.some((t) => t.toLowerCase().includes(q));
        const trackMatch = item.trackName?.toLowerCase().includes(q);
        return titleMatch || subMatch || tagMatch || trackMatch;
      })
      .slice(0, 15); // limit top 15 results
  }, [query, allSearchableItems]);

  return {
    query,
    setQuery,
    results,
    hasQuery: query.trim().length > 0,
  };
}
