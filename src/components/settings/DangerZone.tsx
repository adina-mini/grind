import React, { useState } from 'react';
import { AlertOctagon, Trash2 } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { Modal } from '../common/Modal';

export const DangerZone: React.FC = () => {
  const { dispatch } = useApp();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleConfirmReset = () => {
    dispatch({ type: 'RESET_STATE' });
    setIsConfirmOpen(false);
  };

  return (
    <div className="tech-card p-6 border-rose-900/40 bg-rose-950/10 space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-rose-900/40">
        <AlertOctagon size={16} className="text-status-rose" />
        <h3 className="text-sm font-mono uppercase tracking-wider font-semibold text-rose-300">
          Danger Zone
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold text-dark-text block">
            Reset All Application Progress
          </span>
          <span className="text-[11px] text-dark-muted">
            Clears all completed skills, projects, proof items, milestones, and streak records. This cannot be undone.
          </span>
        </div>

        <button
          onClick={() => setIsConfirmOpen(true)}
          className="px-4 py-2 bg-rose-950 hover:bg-rose-900 text-rose-300 text-xs font-mono rounded-md border border-rose-800 font-medium transition-colors flex items-center gap-1.5 flex-shrink-0"
        >
          <Trash2 size={13} />
          <span>Reset All Data</span>
        </button>
      </div>

      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Confirm Factory Reset"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-dark-muted leading-relaxed">
            Are you absolutely sure you want to reset your AI Engineer OS state? All your progress and verified proof records will be permanently erased.
          </p>
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              onClick={() => setIsConfirmOpen(false)}
              className="px-3 py-1.5 rounded text-xs font-mono text-dark-muted hover:text-dark-text"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmReset}
              className="px-4 py-1.5 rounded bg-status-rose hover:bg-rose-600 text-white text-xs font-mono font-semibold transition-colors"
            >
              Yes, Reset Everything
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
