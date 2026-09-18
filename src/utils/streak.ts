import { ActivityLogEntry } from '../types/activity';

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  activeDatesSet: Set<string>; // 'YYYY-MM-DD'
  lastActiveDate: string | null;
}

export function toLocalDateStr(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function calculateStreak(activities: ActivityLogEntry[]): StreakData {
  const activeDatesSet = new Set<string>();

  // Extract unique active YYYY-MM-DD dates from activity history aligned with local time
  for (const act of activities) {
    if (act.timestamp) {
      const actDate = new Date(act.timestamp);
      const dateStr = isNaN(actDate.getTime()) ? act.timestamp.split('T')[0] : toLocalDateStr(actDate);
      if (dateStr) {
        activeDatesSet.add(dateStr);
      }
    }
  }

  const sortedDates = Array.from(activeDatesSet).sort();
  const totalActiveDays = sortedDates.length;

  if (totalActiveDays === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalActiveDays: 0,
      activeDatesSet,
      lastActiveDate: null,
    };
  }

  // Calculate longest streak
  let longestStreak = 0;
  let runningStreak = 0;
  let prevDate: Date | null = null;

  for (const dStr of sortedDates) {
    const curDate = new Date(dStr);
    if (!prevDate) {
      runningStreak = 1;
    } else {
      const diffMs = curDate.getTime() - prevDate.getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        runningStreak++;
      } else if (diffDays > 1) {
        runningStreak = 1;
      }
    }
    if (runningStreak > longestStreak) {
      longestStreak = runningStreak;
    }
    prevDate = curDate;
  }

  // Calculate current streak
  const today = new Date();
  const todayStr = toLocalDateStr(today);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = toLocalDateStr(yesterday);

  let currentStreak = 0;
  let checkDate = activeDatesSet.has(todayStr) ? today : activeDatesSet.has(yesterdayStr) ? yesterday : null;

  if (checkDate) {
    const d = new Date(checkDate);
    while (true) {
      const s = toLocalDateStr(d);
      if (activeDatesSet.has(s)) {
        currentStreak++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }
  }

  return {
    currentStreak,
    longestStreak,
    totalActiveDays,
    activeDatesSet,
    lastActiveDate: sortedDates[sortedDates.length - 1] || null,
  };
}

export function getPastNDaysCalendar(n: number = 60): { dateStr: string; dayOfMonth: number; monthName: string }[] {
  const result: { dateStr: string; dayOfMonth: number; monthName: string }[] = [];
  const today = new Date();

  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    result.push({
      dateStr: d.toISOString().split('T')[0],
      dayOfMonth: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' }),
    });
  }

  return result;
}
