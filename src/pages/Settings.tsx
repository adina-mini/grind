import React from 'react';
import { TimelineSettings } from '../components/settings/TimelineSettings';
import { BackupSection } from '../components/settings/BackupSection';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { DangerZone } from '../components/settings/DangerZone';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Dynamic 2-Year Timeline Calibration */}
      <TimelineSettings />

      {/* 2. Push Notifications & Daily Reminders */}
      <NotificationSettings />

      {/* 3. JSON Export & Import Backups */}
      <BackupSection />

      {/* 4. Danger Zone */}
      <DangerZone />
    </div>
  );
};
