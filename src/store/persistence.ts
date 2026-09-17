import { AppState } from '../types/state';
import { CURRENT_STORAGE_VERSION, migrateState } from './migrations';
import { ALL_PROJECTS } from '../data/projects';

export const STORAGE_KEY = 'ai_engineer_os_state_v1';

export function getInitialState(): AppState {
  const today = new Date();
  const twoYearsLater = new Date(today);
  twoYearsLater.setFullYear(twoYearsLater.getFullYear() + 2);

  // Initialize all projects as LOCKED or READY based on prerequisites
  const initialProjectStates: AppState['projectStates'] = {};
  for (const project of ALL_PROJECTS) {
    const isReadyInitially = project.requiredSkills.length === 0;
    initialProjectStates[project.id] = {
      status: isReadyInitially ? 'READY' : 'LOCKED',
      proof: {
        hasDocumentation: false,
        hasAutomatedTests: false,
        hasEvaluationSuite: false,
        hasArchitectureDoc: false,
        hasRealUsers: false,
        hasOpenSourceContribution: false,
      },
      bonusesAwarded: {
        deployment: false,
        automatedTests: false,
        evaluationSuite: false,
        documentation: false,
        realUsers: false,
        openSource: false,
      },
    };
  }

  return {
    version: CURRENT_STORAGE_VERSION,
    completedSkills: {},
    projectStates: initialProjectStates,
    completedChallenges: {},
    completedMissions: {},
    completedCheckpoints: {},
    milestones: {},
    activityHistory: [
      {
        id: 'act-init-welcome',
        timestamp: new Date().toISOString(),
        type: 'MISSION_COMPLETED',
        title: 'Welcome to AI Engineer OS',
        description: 'Your 2-year journey to becoming an AI Engineer has begun.',
        xpDelta: 0,
      },
    ],
    settings: {
      startDate: today.toISOString().split('T')[0],
      targetGraduationDate: twoYearsLater.toISOString().split('T')[0],
      dailyReminderTime: '09:00',
      reminderTimes: ['09:00', '20:00'],
      remindersEnabled: false,
      notificationsEnabled: false,
      theme: 'dark',
    },
    portfolioChecklistCustom: {},
  };
}

export function loadStateFromStorage(): AppState {
  if (typeof window === 'undefined') return getInitialState();

  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) {
      return getInitialState();
    }
    const parsed = JSON.parse(serialized);
    return migrateState(parsed);
  } catch (err) {
    console.error('Failed to load state from localStorage, initializing fresh state:', err);
    return getInitialState();
  }
}

export function saveStateToStorage(state: AppState): void {
  if (typeof window === 'undefined') return;

  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (err) {
    // If quota is exceeded, gracefully prune historical activity log and retry
    try {
      const prunedState: AppState = {
        ...state,
        activityHistory: state.activityHistory.slice(0, 200),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prunedState));
    } catch (fallbackErr) {
      console.warn('Storage quota exceeded, unable to persist state:', fallbackErr);
    }
  }
}

export function exportStateAsJSON(state: AppState): void {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(state, null, 2)
  )}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  const dateStr = new Date().toISOString().split('T')[0];
  downloadAnchor.setAttribute('download', `ai-engineer-os-backup-${dateStr}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function validateAndParseImport(jsonContent: string): AppState {
  const parsed = JSON.parse(jsonContent);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('Import file must contain a valid JSON object.');
  }

  // Safe object construction preventing prototype pollution
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
    if (key !== '__proto__' && key !== 'constructor' && key !== 'prototype') {
      sanitized[key] = value;
    }
  }

  // Validate that it has recognizable structure
  if (!('completedSkills' in sanitized) && !('settings' in sanitized)) {
    throw new Error('Invalid schema: Missing completedSkills or settings.');
  }
  return migrateState(sanitized);
}
