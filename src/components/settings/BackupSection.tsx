import React, { useState, useRef } from 'react';
import { Download, Upload, Check, AlertTriangle, Share2, Copy, ClipboardPaste, ShieldCheck } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { exportStateAsJSON, validateAndParseImport } from '../../store/persistence';

export const BackupSection: React.FC = () => {
  const { state, dispatch } = useApp();
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [showPasteBox, setShowPasteBox] = useState(false);
  const [pastedCode, setPastedCode] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportStateAsJSON(state);
  };

  // Mobile Web Share API - Save directly to iCloud, Google Drive, WhatsApp, or Notes
  const handleShareToCloud = async () => {
    try {
      const jsonString = JSON.stringify(state, null, 2);
      const fileName = `ai-engineer-os-backup-${new Date().toISOString().slice(0, 10)}.json`;

      if (navigator.share) {
        const file = new File([jsonString], fileName, { type: 'application/json' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'AI Engineer OS Backup',
            text: 'My personal AI Engineer OS progress backup',
          });
          setImportStatus('Backup shared successfully!');
          setTimeout(() => setImportStatus(null), 3500);
          return;
        }
      }

      // Fallback if sharing files is unsupported: copy to clipboard
      await navigator.clipboard.writeText(jsonString);
      setCopiedStatus(true);
      setTimeout(() => setCopiedStatus(false), 3000);
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setErrorMessage('Failed to share backup. Try exporting or copying instead.');
      }
    }
  };

  const handleCopyCode = async () => {
    try {
      const jsonString = JSON.stringify(state, null, 2);
      await navigator.clipboard.writeText(jsonString);
      setCopiedStatus(true);
      setTimeout(() => setCopiedStatus(false), 3000);
    } catch {
      setErrorMessage('Could not copy to clipboard. Please use Export JSON.');
    }
  };

  const handlePasteRestore = () => {
    if (!pastedCode.trim()) {
      setErrorMessage('Please paste your backup JSON code.');
      return;
    }
    try {
      const parsedState = validateAndParseImport(pastedCode.trim());
      dispatch({ type: 'IMPORT_STATE', state: parsedState });
      setImportStatus('Backup successfully restored from pasted code!');
      setErrorMessage(null);
      setPastedCode('');
      setShowPasteBox(false);
      setTimeout(() => setImportStatus(null), 3500);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Invalid backup JSON string.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result as string;
        const parsedState = validateAndParseImport(text);
        dispatch({ type: 'IMPORT_STATE', state: parsedState });
        setImportStatus('Backup successfully verified and restored!');
        setErrorMessage(null);
        setTimeout(() => setImportStatus(null), 3500);
      } catch (err: unknown) {
        setErrorMessage(err instanceof Error ? err.message : 'Invalid backup JSON file.');
        setImportStatus(null);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="tech-card p-6 border-dark-border space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-dark-border">
        <ShieldCheck size={16} className="text-proof" />
        <h3 className="text-sm font-mono uppercase tracking-wider font-semibold text-dark-text">
          Cloud Backup, Device Migration & Recovery
        </h3>
      </div>

      {/* Safety Notice Callout */}
      <div className="p-3 rounded-lg bg-dark-elevated border border-proof-dark/30 text-xs text-dark-muted space-y-1">
        <div className="font-semibold text-dark-text flex items-center gap-1.5 text-proof">
          <ShieldCheck size={14} />
          <span>Will my check marks be lost if my phone breaks?</span>
        </div>
        <p className="leading-relaxed">
          Because AI Engineer OS respects your privacy and stores all progress directly on your device, data will stay on this phone unless you back it up.
          <strong className="text-dark-text"> To protect your progress against phone loss or breakage:</strong> use the buttons below to save a copy to your Google Drive, iCloud, or send it to yourself on WhatsApp/Telegram.
        </p>
      </div>

      {/* Action Buttons Grid */}
      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        {/* 1-Click Mobile Share to Cloud */}
        <button
          onClick={handleShareToCloud}
          className="px-3.5 py-2 bg-[#008f7a] hover:bg-[#00a389] text-white text-xs font-mono rounded-md font-medium shadow-sm transition-colors flex items-center gap-1.5"
        >
          <Share2 size={13} />
          <span>Save to Cloud / Drive / WhatsApp</span>
        </button>

        {/* Export File */}
        <button
          onClick={handleExport}
          className="px-3 py-2 bg-dark-elevated hover:bg-dark-border text-dark-text text-xs font-mono rounded-md border border-dark-border font-medium transition-colors flex items-center gap-1.5"
        >
          <Download size={13} />
          <span>Export .json File</span>
        </button>

        {/* Copy Code */}
        <button
          onClick={handleCopyCode}
          className="px-3 py-2 bg-dark-elevated hover:bg-dark-border text-dark-text text-xs font-mono rounded-md border border-dark-border font-medium transition-colors flex items-center gap-1.5"
        >
          <Copy size={13} />
          <span>{copiedStatus ? 'Copied to Clipboard!' : 'Copy Backup Text'}</span>
        </button>

        {/* Paste Restore Toggle */}
        <button
          onClick={() => setShowPasteBox((prev) => !prev)}
          className="px-3 py-2 bg-dark-elevated hover:bg-dark-border text-dark-text text-xs font-mono rounded-md border border-dark-border font-medium transition-colors flex items-center gap-1.5"
        >
          <ClipboardPaste size={13} />
          <span>Paste & Restore</span>
        </button>

        {/* Import File Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-2 bg-dark-elevated hover:bg-dark-border text-dark-text text-xs font-mono rounded-md border border-dark-border font-medium transition-colors flex items-center gap-1.5"
        >
          <Upload size={13} />
          <span>Upload Backup File</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* Paste Box Drawer */}
      {showPasteBox && (
        <div className="p-3 rounded bg-dark-elevated border border-dark-border space-y-2">
          <label className="block text-xs font-mono text-dark-muted">
            Paste your backup JSON string here to restore all check marks on your new phone:
          </label>
          <textarea
            value={pastedCode}
            onChange={(e) => setPastedCode(e.target.value)}
            placeholder='{"schemaVersion":1,"completedSkills":{...}}'
            rows={4}
            className="w-full p-2.5 rounded bg-dark-bg border border-dark-border text-xs font-mono text-dark-text outline-none focus:border-proof"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowPasteBox(false)}
              className="px-3 py-1 text-xs font-mono text-dark-muted hover:text-dark-text"
            >
              Cancel
            </button>
            <button
              onClick={handlePasteRestore}
              className="px-3 py-1 bg-[#008f7a] hover:bg-[#00a389] text-white text-xs font-mono rounded font-medium"
            >
              Confirm Restore
            </button>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {importStatus && (
        <div className="p-3 rounded bg-emerald-950/40 border border-emerald-800/40 text-xs font-mono text-emerald-300 flex items-center gap-2">
          <Check size={14} />
          <span>{importStatus}</span>
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="p-3 rounded bg-rose-950/40 border border-rose-800/40 text-xs font-mono text-rose-300 flex items-center gap-2">
          <AlertTriangle size={14} />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
