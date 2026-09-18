import React, { useState } from 'react';
import { Bell, Check, Plus, Trash2, Volume2, Sparkles, Clock, AlertTriangle } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import {
  isNotificationSupported,
  getNotificationPermission,
  requestNotificationPermission,
  sendBrowserNotification,
} from '../../utils/notifications';
import { playAudioPing } from '../../utils/sound';

export const NotificationSettings: React.FC = () => {
  const { state, dispatch } = useApp();

  const currentTimes: string[] =
    state.settings.reminderTimes && state.settings.reminderTimes.length > 0
      ? state.settings.reminderTimes
      : [state.settings.dailyReminderTime || '09:00'];

  const [permissionState, setPermissionState] = useState(getNotificationPermission());
  const [newTimeInput, setNewTimeInput] = useState('18:00');
  const [testSent, setTestSent] = useState<string | null>(null);

  const handleRequestPermission = async () => {
    const perm = await requestNotificationPermission();
    setPermissionState(perm);
    if (perm === 'granted') {
      dispatch({
        type: 'UPDATE_SETTINGS',
        settings: { notificationsEnabled: true, remindersEnabled: true },
      });
    }
  };

  const handleToggleReminders = (enabled: boolean) => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      settings: { remindersEnabled: enabled },
    });
  };

  const updateTimesList = (newTimes: string[]) => {
    // Sort chronologically
    const sorted = [...newTimes].sort();
    dispatch({
      type: 'UPDATE_SETTINGS',
      settings: {
        reminderTimes: sorted,
        dailyReminderTime: sorted[0] || '09:00',
      },
    });
  };

  const handleAddTime = () => {
    if (!newTimeInput) return;
    if (currentTimes.includes(newTimeInput)) return;
    updateTimesList([...currentTimes, newTimeInput]);
  };

  const handleRemoveTime = (indexToRemove: number) => {
    if (currentTimes.length <= 1) return; // Keep at least one time
    const updated = currentTimes.filter((_, idx) => idx !== indexToRemove);
    updateTimesList(updated);
  };

  const handleTimeChange = (index: number, val: string) => {
    if (!val) return;
    const updated = [...currentTimes];
    updated[index] = val;
    updateTimesList(updated);
  };

  const applyPreset = (presetTimes: string[]) => {
    updateTimesList(presetTimes);
  };

  const [testCooldown, setTestCooldown] = useState(false);

  const handleTestPing = (timeLabel?: string) => {
    if (testCooldown) return; // Prevent continuous or repeated clicks
    setTestCooldown(true);
    setTimeout(() => setTestCooldown(false), 3000);

    playAudioPing('test');
    const isEvening = timeLabel && timeLabel !== 'global' ? parseInt(timeLabel.split(':')[0], 10) >= 18 : false;

    const title = isEvening
      ? 'AI Engineer OS: Evening Review & Streak'
      : 'AI Engineer OS: Daily Check-in';
    const body = isEvening
      ? 'Keep your streak alive! Log completed skills and project milestones.'
      : 'Time to learn, build, or deploy. Check your Today’s Mission!';

    const sent = sendBrowserNotification(title, { body });
    if (sent) {
      setTestSent(timeLabel || 'global');
      setTimeout(() => setTestSent(null), 3500);
    }
  };

  const getTimeSlotDescription = (timeStr: string) => {
    const hour = parseInt(timeStr.split(':')[0], 10);
    if (hour < 12) return 'Morning Kickoff & Today’s Mission';
    if (hour < 17) return 'Midday Focus & Deep Work Check-in';
    return 'Evening Progress Review & Streak Keeper';
  };

  const isTwoPingsPreset =
    currentTimes.length === 2 && currentTimes.includes('09:00') && currentTimes.includes('20:00');
  const isOnePingPreset = currentTimes.length === 1 && currentTimes[0] === '09:00';
  const isThreePingsPreset =
    currentTimes.length === 3 &&
    currentTimes.includes('09:00') &&
    currentTimes.includes('14:00') &&
    currentTimes.includes('21:00');

  return (
    <div className="tech-card p-6 border-dark-border space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between pb-3 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-status-sky" />
          <h3 className="text-sm font-mono uppercase tracking-wider font-semibold text-dark-text">
            Daily Training Reminders & Pings
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-dark-muted">Master Switch:</span>
          <button
            onClick={() => handleToggleReminders(!state.settings.remindersEnabled)}
            className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all ${
              state.settings.remindersEnabled
                ? 'bg-status-emerald/20 text-status-emerald border border-status-emerald/40'
                : 'bg-dark-elevated text-dark-muted border border-dark-border'
            }`}
          >
            {state.settings.remindersEnabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      </div>

      {/* Browser Notification Permission Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-dark-elevated border border-dark-borderSubtle">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-dark-text">
              Browser Push Notifications
            </span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                permissionState === 'granted'
                  ? 'bg-status-emerald/15 text-status-emerald border border-status-emerald/30'
                  : permissionState === 'denied'
                  ? 'bg-status-rose/15 text-status-rose border border-status-rose/30'
                  : 'bg-status-amber/15 text-status-amber border border-status-amber/30'
              }`}
            >
              {permissionState}
            </span>
          </div>
          <span className="text-[11px] text-dark-muted mt-0.5 block">
            Pings appear as native notifications in Windows/browser with tactile audio chimes.
          </span>
        </div>

        <div className="flex items-center gap-2">
          {permissionState !== 'granted' ? (
            <button
              onClick={handleRequestPermission}
              className="px-3.5 py-1.5 bg-accent hover:bg-accent-hover text-white text-xs font-mono rounded font-medium transition-colors shadow-sm"
            >
              Enable Notifications
            </button>
          ) : (
            <button
              onClick={() => handleTestPing('global')}
              className="px-3 py-1.5 bg-dark-surface hover:bg-dark-border text-dark-text text-xs font-mono rounded border border-dark-border transition-colors flex items-center gap-1.5"
            >
              <Volume2 size={13} className="text-status-sky" />
              Test Global Ping
            </button>
          )}
        </div>
      </div>

      {testSent && (
        <div className="text-xs font-mono text-status-emerald flex items-center gap-1.5 p-2 rounded bg-status-emerald/10 border border-status-emerald/30">
          <Check size={14} /> Ping notification dispatched with Web Audio synthesizer chime!
        </div>
      )}

      {/* Quick Presets (Highlighting 2 Pings a Day) */}
      <div className="space-y-2">
        <label className="text-xs font-mono font-medium text-dark-text flex items-center gap-1.5">
          <Sparkles size={13} className="text-status-amber" />
          Quick Frequency Presets:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={() => applyPreset(['09:00'])}
            className={`p-2.5 rounded-lg text-left border transition-all ${
              isOnePingPreset
                ? 'bg-dark-elevated border-accent text-dark-text'
                : 'bg-dark-surface/50 border-dark-borderSubtle text-dark-muted hover:border-dark-border'
            }`}
          >
            <div className="text-xs font-mono font-semibold text-dark-text">1 Ping / Day</div>
            <div className="text-[11px] text-dark-muted font-mono mt-0.5">09:00 (Morning)</div>
          </button>

          {/* 2 Pings / Day Preset */}
          <button
            onClick={() => applyPreset(['09:00', '20:00'])}
            className={`p-2.5 rounded-lg text-left border relative transition-all ${
              isTwoPingsPreset
                ? 'bg-accent/10 border-accent text-dark-text ring-1 ring-accent/30'
                : 'bg-dark-surface/50 border-dark-borderSubtle text-dark-muted hover:border-dark-border'
            }`}
          >
            <span className="absolute top-1.5 right-2 text-[9px] font-mono px-1.5 py-0.2 rounded bg-accent/20 text-accent font-semibold">
              RECOMMENDED
            </span>
            <div className="text-xs font-mono font-semibold text-dark-text">2 Pings / Day</div>
            <div className="text-[11px] text-dark-muted font-mono mt-0.5">
              09:00 (Kickoff) & 20:00 (Review)
            </div>
          </button>

          <button
            onClick={() => applyPreset(['09:00', '14:00', '21:00'])}
            className={`p-2.5 rounded-lg text-left border transition-all ${
              isThreePingsPreset
                ? 'bg-dark-elevated border-accent text-dark-text'
                : 'bg-dark-surface/50 border-dark-borderSubtle text-dark-muted hover:border-dark-border'
            }`}
          >
            <div className="text-xs font-mono font-semibold text-dark-text">3 Pings / Day</div>
            <div className="text-[11px] text-dark-muted font-mono mt-0.5">
              09:00, 14:00 & 21:00
            </div>
          </button>
        </div>
      </div>

      {/* Configured Ping Times List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-medium text-dark-text flex items-center gap-1.5">
            <Clock size={13} className="text-status-sky" />
            Configured Ping Times ({currentTimes.length} per day):
          </label>
          <span className="text-[11px] font-mono text-dark-muted">
            Fires push notification + audio alert
          </span>
        </div>

        <div className="space-y-2">
          {currentTimes.map((timeStr, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-3 p-3 rounded-lg bg-dark-elevated border border-dark-borderSubtle hover:border-dark-border transition-colors"
            >
              <div className="flex items-center gap-3">
                <input
                  type="time"
                  value={timeStr}
                  onChange={(e) => handleTimeChange(idx, e.target.value)}
                  className="px-2.5 py-1.5 rounded bg-dark-surface border border-dark-border text-xs text-dark-text font-mono font-semibold outline-none focus:border-accent"
                />
                <div>
                  <span className="text-xs font-mono text-dark-text block">
                    Ping #{idx + 1} &bull; {timeStr}
                  </span>
                  <span className="text-[11px] text-dark-muted">
                    {getTimeSlotDescription(timeStr)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTestPing(timeStr)}
                  title="Test this ping"
                  className="px-2 py-1 text-[11px] font-mono rounded bg-dark-surface hover:bg-dark-border text-dark-text border border-dark-borderSubtle flex items-center gap-1 transition-colors"
                >
                  <Volume2 size={12} className="text-status-sky" />
                  Test
                </button>
                {currentTimes.length > 1 && (
                  <button
                    onClick={() => handleRemoveTime(idx)}
                    title="Remove this ping time"
                    className="p-1.5 text-dark-muted hover:text-status-rose hover:bg-status-rose/10 rounded transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Another Ping Time */}
        <div className="flex items-center gap-2 pt-2">
          <input
            type="time"
            value={newTimeInput}
            onChange={(e) => setNewTimeInput(e.target.value)}
            className="px-3 py-1.5 rounded bg-dark-elevated border border-dark-border text-xs text-dark-text font-mono outline-none focus:border-accent"
          />
          <button
            onClick={handleAddTime}
            className="px-3 py-1.5 rounded bg-dark-surface hover:bg-dark-border border border-dark-border text-xs font-mono text-dark-text flex items-center gap-1.5 transition-colors"
          >
            <Plus size={13} className="text-status-emerald" />
            Add Custom Ping Time
          </button>
        </div>
      </div>
    </div>
  );
};
