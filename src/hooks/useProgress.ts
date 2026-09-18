import { useMemo } from 'react';
import { useApp } from '../store/AppContext';
import { ROADMAP_TRACKS, ALL_SKILLS } from '../data/roadmap';
import { ALL_PROJECTS } from '../data/projects';
import { ALL_CHALLENGES } from '../data/challenges';

export function useProgress() {
  const { state } = useApp();

  const trackProgress = useMemo(() => {
    return ROADMAP_TRACKS.map((track) => {
      const totalSkills = track.skills.length;
      const completedSkills = track.skills.filter((s) => state.completedSkills[s.id]).length;
      const percent = totalSkills > 0 ? Math.round((completedSkills / totalSkills) * 100) : 0;

      return {
        track,
        totalSkills,
        completedSkills,
        percent,
      };
    });
  }, [state.completedSkills]);

  const summary = useMemo(() => {
    const totalSkills = ALL_SKILLS.length;
    const completedSkills = Object.values(state.completedSkills).filter(Boolean).length;

    const totalProjects = ALL_PROJECTS.length;
    const completedProjects = Object.values(state.projectStates).filter(
      (ps) => ps.status === 'COMPLETED'
    ).length;
    const inProgressProjects = Object.values(state.projectStates).filter(
      (ps) => ps.status === 'IN_PROGRESS'
    ).length;
    const readyProjects = Object.values(state.projectStates).filter(
      (ps) => ps.status === 'READY'
    ).length;

    const totalChallenges = ALL_CHALLENGES.length;
    const completedChallenges = Object.keys(state.completedChallenges).length;

    return {
      totalSkills,
      completedSkills,
      skillsPercent: Math.round((completedSkills / totalSkills) * 100),
      totalProjects,
      completedProjects,
      inProgressProjects,
      readyProjects,
      totalChallenges,
      completedChallenges,
    };
  }, [state.completedSkills, state.projectStates, state.completedChallenges]);

  return {
    trackProgress,
    summary,
  };
}
