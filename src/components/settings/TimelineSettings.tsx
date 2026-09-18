import React, { useState } from 'react';
import { Calendar, Save, Check } from 'lucide-react';
import { useApp } from '../../store/AppContext';

export const TimelineSettings: React.FC = () => {
  const { state, dispatch } = useApp();
  const [startDate, setStartDate] = useState(state.settings.startDate);
  const [graduationDate, setGraduationDate] = useState(state.settings.targetGraduationDate);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE_SETTINGS',
      settings: {
        startDate,
        targetGraduationDate: graduationDate,
      },
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="tech-card p-6 border-dark-border space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-dark-border">
        <Calendar size={16} className="text-accent" />
        <h3 className="text-sm font-mono uppercase tracking-wider font-semibold text-dark-text">
          2-Year Timeline Calibration
        </h3>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-dark-muted mb-1.5">
              Start Date (Journey Kickoff)
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-dark-elevated border border-dark-border text-xs text-dark-text outline-none focus:border-accent font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-dark-muted mb-1.5">
              Target Graduation Date (2-Year Target)
            </label>
            <input
              type="date"
              value={graduationDate}
              onChange={(e) => setGraduationDate(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-dark-elevated border border-dark-border text-xs text-dark-text outline-none focus:border-accent font-mono"
            />
          </div>
        </div>

        <p className="text-xs text-dark-muted leading-relaxed">
          Updating your dates dynamically recalculates all 8 phase windows, daily elapsed metrics, and remaining days across your OS.
        </p>

        <div className="pt-2 flex items-center gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-dark-elevated hover:bg-dark-border text-dark-text text-xs font-mono rounded-md border border-dark-border font-medium transition-colors flex items-center gap-1.5"
          >
            <Save size={13} />
            <span>Save Timeline Dates</span>
          </button>
          {savedSuccess && (
            <span className="text-xs font-mono text-status-emerald flex items-center gap-1">
              <Check size={13} /> Dates updated & recomputed.
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
