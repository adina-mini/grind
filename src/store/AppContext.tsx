import React, { createContext, useContext, useReducer, useEffect, useMemo, useRef } from 'react';
import { AppState, ProofScoreBreakdown } from '../types/state';
import { appReducer, AppAction } from './appReducer';
import { loadStateFromStorage, saveStateToStorage } from './persistence';
import { calculateTotalXP, XPStats } from '../utils/xp';
import { calculateProofScore } from '../utils/proofScore';
import { calculateTimeline, TimelineCalculation } from '../utils/dates';
import { calculateStreak, StreakData } from '../utils/streak';
import { generateDailyMission, generateNextRecommendation, DailyMission, Recommendation } from '../utils/recommendations';
import { TIMELINE_PHASES } from '../data/timeline';

import { playAudioPing } from '../utils/sound';
import { sendBrowserNotification } from '../utils/notifications';

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  xpStats: XPStats;
  proofScore: ProofScoreBreakdown;
  timeline: TimelineCalculation;
  streakData: StreakData;
  dailyMission: DailyMission;
  nextRecommendation: Recommendation;
  roadmapProgressPercent: number;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, undefined, loadStateFromStorage);

  // Sync to localStorage on every state change
  useEffect(() => {
    saveStateToStorage(state);
  }, [state]);

  // Keep settings ref in sync without triggering effect re-subscriptions
  const settingsRef = useRef(state.settings);
  useEffect(() => {
    settingsRef.current = state.settings;
  }, [state.settings]);

  // Periodic check for daily training reminder pings (strictly once per slot per day)
  useEffect(() => {
    // Persistent tracking in memory & sessionStorage to avoid re-firing on render or reload
    const hasSlotFiredToday = (slotKey: string): boolean => {
      try {
        const raw = sessionStorage.getItem('ai_engineer_os_fired_slots');
        const list: string[] = raw ? JSON.parse(raw) : [];
        return Array.isArray(list) && list.includes(slotKey);
      } catch {
        return false;
      }
    };

    const markSlotFiredToday = (slotKey: string): void => {
      try {
        const raw = sessionStorage.getItem('ai_engineer_os_fired_slots');
        const list: string[] = raw ? JSON.parse(raw) : [];
        if (!list.includes(slotKey)) {
          list.push(slotKey);
          sessionStorage.setItem('ai_engineer_os_fired_slots', JSON.stringify(list));
        }
      } catch {
        // ignore
      }
    };

    const checkReminders = () => {
      const currentSettings = settingsRef.current;
      if (!currentSettings.notificationsEnabled || !currentSettings.remindersEnabled) return;

      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMinutes}`;
      const todayStr = now.toISOString().split('T')[0];

      const activeTimes =
        currentSettings.reminderTimes && currentSettings.reminderTimes.length > 0
          ? currentSettings.reminderTimes
          : [currentSettings.dailyReminderTime || '09:00'];

      activeTimes.forEach((targetTime) => {
        const slotKey = `${todayStr}_${targetTime}`;
        if (currentTimeStr === targetTime && !hasSlotFiredToday(slotKey)) {
          // Immediately mark as fired before dispatching to prevent duplicate triggers
          markSlotFiredToday(slotKey);
          playAudioPing('test');

          const hour = now.getHours();
          let title = 'AI Engineer OS: Daily Check-in';
          let body = 'Time to learn, build, or deploy. Check your Today’s Mission!';

          if (hour >= 18) {
            title = 'AI Engineer OS: Evening Review & Streak';
            body = 'Keep your streak alive! Log completed skills and project milestones.';
          } else if (hour >= 13) {
            title = 'AI Engineer OS: Afternoon Sprint';
            body = 'Time for focused deep work. Check your roadmap recommendations!';
          }

          sendBrowserNotification(title, { body });
        }
      });
    };

    // Run periodically without an immediate instant-fire on mount
    const interval = setInterval(checkReminders, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Enhanced dispatch with tactile Web Audio feedback
  const handleDispatch: React.Dispatch<AppAction> = (action) => {
    if (action.type === 'TOGGLE_SKILL') {
      const isCurrentlyComplete = !!state.completedSkills[action.skillId];
      if (!isCurrentlyComplete) {
        playAudioPing('skill');
      }
    } else if (action.type === 'UPDATE_PROJECT_STATUS') {
      if (action.status === 'COMPLETED') {
        playAudioPing('project');
      }
    } else if (action.type === 'COMPLETE_CHALLENGE' || action.type === 'COMPLETE_MISSION') {
      playAudioPing('skill');
    }
    dispatch(action);
  };

  // Play celebration chord when a new milestone is unlocked
  const awardedMilestonesCount = useMemo(() => {
    return Object.values(state.milestones || {}).filter((m) => m.awarded).length;
  }, [state.milestones]);

  const prevMilestonesCountRef = useRef(awardedMilestonesCount);
  useEffect(() => {
    if (awardedMilestonesCount > prevMilestonesCountRef.current) {
      playAudioPing('milestone');
    }
    prevMilestonesCountRef.current = awardedMilestonesCount;
  }, [awardedMilestonesCount]);

  // Computed metrics with memoization
  const xpStats = useMemo(() => calculateTotalXP(state), [state]);
  const proofScore = useMemo(() => calculateProofScore(state), [state]);
  const timeline = useMemo(
    () => calculateTimeline(state.settings.startDate, state.settings.targetGraduationDate, TIMELINE_PHASES, state),
    [state]
  );
  const streakData = useMemo(() => calculateStreak(state.activityHistory), [state.activityHistory]);
  const dailyMission = useMemo(() => generateDailyMission(state), [state]);
  const nextRecommendation = useMemo(() => generateNextRecommendation(state), [state]);

  // Overall roadmap completed skills percentage
  const roadmapProgressPercent = useMemo(() => {
    const completedCount = Object.values(state.completedSkills).filter(Boolean).length;
    return Math.min(100, Math.round((completedCount / 270) * 100));
  }, [state.completedSkills]);

  const value: AppContextValue = {
    state,
    dispatch: handleDispatch,
    xpStats,
    proofScore,
    timeline,
    streakData,
    dailyMission,
    nextRecommendation,
    roadmapProgressPercent,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
