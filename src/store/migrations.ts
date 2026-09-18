import { AppState } from '../types/state';

export const CURRENT_STORAGE_VERSION = 1;

export function migrateState(rawState: unknown): AppState {
  if (!rawState || typeof rawState !== 'object') {
    throw new Error('Invalid state object provided for migration.');
  }

  const candidate = rawState as Partial<AppState>;

  // Ensure all required top-level collections exist
  const version = typeof candidate.version === 'number' ? candidate.version : CURRENT_STORAGE_VERSION;

  const migrated: AppState = {
    version: CURRENT_STORAGE_VERSION,
    completedSkills: candidate.completedSkills || {},
    projectStates: candidate.projectStates || {},
    completedChallenges: candidate.completedChallenges || {},
    completedMissions: candidate.completedMissions || {},
    completedCheckpoints: candidate.completedCheckpoints || {},
    milestones: candidate.milestones || {},
    activityHistory: Array.isArray(candidate.activityHistory) ? candidate.activityHistory : [],
    settings: {
      startDate: candidate.settings?.startDate || new Date().toISOString().split('T')[0],
      targetGraduationDate:
        candidate.settings?.targetGraduationDate ||
        new Date(Date.now() + 730 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      dailyReminderTime: candidate.settings?.dailyReminderTime || '09:00',
      reminderTimes: Array.isArray(candidate.settings?.reminderTimes) && candidate.settings.reminderTimes.length > 0
        ? candidate.settings.reminderTimes
        : candidate.settings?.dailyReminderTime
        ? [candidate.settings.dailyReminderTime, '20:00']
        : ['09:00', '20:00'],
      remindersEnabled: candidate.settings?.remindersEnabled ?? false,
      notificationsEnabled: candidate.settings?.notificationsEnabled ?? false,
      theme: 'dark',
    },
    portfolioChecklistCustom: candidate.portfolioChecklistCustom || {},
  };

  return migrated;
}
