import { Track, Skill } from '../types/roadmap';
import { TRACKS_METADATA } from './roadmap/tracks';
import { SKILLS_PART_1 } from './roadmap/skillsPart1';
import { SKILLS_PART_2 } from './roadmap/skillsPart2';
import { SKILLS_PART_3 } from './roadmap/skillsPart3';

export const ALL_SKILLS: Skill[] = [
  ...SKILLS_PART_1,
  ...SKILLS_PART_2,
  ...SKILLS_PART_3,
];

// Map tracks with their corresponding skills
export const ROADMAP_TRACKS: Track[] = TRACKS_METADATA.map((meta) => {
  const trackSkills = ALL_SKILLS.filter((s) => s.trackId === meta.id);
  return {
    id: meta.id,
    title: meta.title,
    description: meta.description,
    iconName: meta.iconName,
    skills: trackSkills,
  };
});

// Fast lookup map by ID
export const SKILLS_BY_ID: Record<string, Skill> = ALL_SKILLS.reduce((acc, skill) => {
  acc[skill.id] = skill;
  return acc;
}, {} as Record<string, Skill>);

// Skills grouped by Track ID
export const SKILLS_BY_TRACK: Record<string, Skill[]> = ALL_SKILLS.reduce((acc, skill) => {
  if (!acc[skill.trackId]) {
    acc[skill.trackId] = [];
  }
  acc[skill.trackId].push(skill);
  return acc;
}, {} as Record<string, Skill[]>);

// Skills grouped by Phase ID
export const SKILLS_BY_PHASE: Record<string, Skill[]> = ALL_SKILLS.reduce((acc, skill) => {
  if (!acc[skill.phaseId]) {
    acc[skill.phaseId] = [];
  }
  acc[skill.phaseId].push(skill);
  return acc;
}, {} as Record<string, Skill[]>);

export const TOTAL_SKILLS_COUNT = ALL_SKILLS.length;
