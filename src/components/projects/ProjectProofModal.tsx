import React, { useState } from 'react';
import {
  ExternalLink,
  CheckCircle2,
  FileText,
  Shield,
  Video,
  Users,
  Award,
  Clock,
  Sparkles,
  Save,
} from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { Project, ProjectStatus, ProjectProof, ProjectBonusAwards } from '../../types/project';
import { ProjectState } from '../../types/project';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { SKILLS_BY_ID } from '../../data/roadmap';

interface ProjectProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  projectState?: ProjectState;
  onUpdateProof: (projectId: string, proof: Partial<ProjectProof>) => void;
  onToggleBonus: (projectId: string, bonusKey: keyof ProjectBonusAwards) => void;
  onStatusChange: (projectId: string, status: ProjectStatus) => void;
}

export const ProjectProofModal: React.FC<ProjectProofModalProps> = ({
  isOpen,
  onClose,
  project,
  projectState,
  onUpdateProof,
  onToggleBonus,
  onStatusChange,
}) => {
  if (!project) return null;

  const currentProof = projectState?.proof || {
    hasDocumentation: false,
    hasAutomatedTests: false,
    hasEvaluationSuite: false,
    hasArchitectureDoc: false,
    hasRealUsers: false,
    hasOpenSourceContribution: false,
  };

  const currentBonuses = projectState?.bonusesAwarded || {
    deployment: false,
    automatedTests: false,
    evaluationSuite: false,
    documentation: false,
    realUsers: false,
    openSource: false,
  };

  const status = projectState?.status || 'LOCKED';

  // Local state for URLs and notes inputs
  const [githubUrl, setGithubUrl] = useState(currentProof.githubUrl || '');
  const [liveDemoUrl, setLiveDemoUrl] = useState(currentProof.liveDemoUrl || '');
  const [demoVideoUrl, setDemoVideoUrl] = useState(currentProof.demoVideoUrl || '');
  const [postmortemNotes, setPostmortemNotes] = useState(currentProof.postmortemNotes || '');

  const sanitizeUrlInput = (input: string): string => {
    const trimmed = input.trim();
    if (!trimmed) return '';
    // Block script and execution schemes
    if (/^(javascript|vbscript|data):/i.test(trimmed)) {
      return '';
    }
    // Auto-prefix https:// if missing protocol
    if (!/^https?:\/\//i.test(trimmed)) {
      return `https://${trimmed}`;
    }
    return trimmed;
  };

  const handleSaveUrls = () => {
    const sanitizedGithub = sanitizeUrlInput(githubUrl);
    const sanitizedDemo = sanitizeUrlInput(liveDemoUrl);
    const sanitizedVideo = sanitizeUrlInput(demoVideoUrl);
    const sanitizedNotes = postmortemNotes.slice(0, 5000);

    setGithubUrl(sanitizedGithub);
    setLiveDemoUrl(sanitizedDemo);
    setDemoVideoUrl(sanitizedVideo);

    onUpdateProof(project.id, {
      githubUrl: sanitizedGithub,
      liveDemoUrl: sanitizedDemo,
      demoVideoUrl: sanitizedVideo,
      postmortemNotes: sanitizedNotes,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      subtitle={`${project.difficulty} Project • Base ${project.baseXP} XP • ${project.trackId}`}
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* Status Lifecycle Selector */}
        <div className="p-3.5 rounded-lg bg-dark-elevated border border-dark-borderSubtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-mono text-dark-muted uppercase">Lifecycle State:</span>
            <div className="text-xs font-semibold text-dark-text mt-0.5">
              Started → Built → Completed → Proven → Portfolio-Ready
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs">
            {(['READY', 'IN_PROGRESS', 'COMPLETED'] as ProjectStatus[]).map((st) => (
              <button
                key={st}
                onClick={() => onStatusChange(project.id, st)}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                  status === st
                    ? 'bg-accent text-white font-semibold'
                    : 'bg-dark-surface text-dark-muted hover:text-dark-text border border-dark-border'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Project Description & Deliverables */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-dark-text">
            Description & Core Deliverables
          </h4>
          <p className="text-xs text-dark-muted leading-relaxed">{project.description}</p>

          <div className="pt-2 space-y-1">
            {project.deliverables.map((deliv, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-dark-text">
                <CheckCircle2 size={13} className="text-status-emerald flex-shrink-0 mt-0.5" />
                <span>{deliv}</span>
              </div>
            ))}
          </div>
        </div>

        {/* DEDICATED PROOF SYSTEM */}
        <div className="p-4 rounded-lg bg-dark-elevated/70 border border-proof-dark/40 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-proof uppercase tracking-wider">
              <Award size={15} />
              <span>Project Engineering Proof System</span>
            </div>
            <span className="text-[11px] font-mono text-dark-muted">
              Feeds directly into Engineering Proof Score
            </span>
          </div>

          {/* Proof Evidence Checkboxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {/* Automated Tests */}
            <label className="flex items-center gap-2 p-2 rounded bg-dark-surface border border-dark-borderSubtle cursor-pointer hover:border-dark-border">
              <input
                type="checkbox"
                checked={currentProof.hasAutomatedTests}
                onChange={(e) =>
                  onUpdateProof(project.id, { hasAutomatedTests: e.target.checked })
                }
                className="rounded border-dark-border text-proof"
              />
              <span className="text-dark-text">Automated Tests (Pytest)</span>
            </label>

            {/* Evaluation Suite */}
            <label className="flex items-center gap-2 p-2 rounded bg-dark-surface border border-dark-borderSubtle cursor-pointer hover:border-dark-border">
              <input
                type="checkbox"
                checked={currentProof.hasEvaluationSuite}
                onChange={(e) =>
                  onUpdateProof(project.id, { hasEvaluationSuite: e.target.checked })
                }
                className="rounded border-dark-border text-proof"
              />
              <span className="text-dark-text">Evaluation Suite (Ragas/Golden)</span>
            </label>

            {/* Architecture Doc */}
            <label className="flex items-center gap-2 p-2 rounded bg-dark-surface border border-dark-borderSubtle cursor-pointer hover:border-dark-border">
              <input
                type="checkbox"
                checked={currentProof.hasArchitectureDoc}
                onChange={(e) =>
                  onUpdateProof(project.id, { hasArchitectureDoc: e.target.checked })
                }
                className="rounded border-dark-border text-proof"
              />
              <span className="text-dark-text">Architecture Document / Diagrams</span>
            </label>

            {/* Full README / Docs */}
            <label className="flex items-center gap-2 p-2 rounded bg-dark-surface border border-dark-borderSubtle cursor-pointer hover:border-dark-border">
              <input
                type="checkbox"
                checked={currentProof.hasDocumentation}
                onChange={(e) =>
                  onUpdateProof(project.id, { hasDocumentation: e.target.checked })
                }
                className="rounded border-dark-border text-proof"
              />
              <span className="text-dark-text">Comprehensive Documentation</span>
            </label>

            {/* Real Users */}
            <label className="flex items-center gap-2 p-2 rounded bg-dark-surface border border-dark-borderSubtle cursor-pointer hover:border-dark-border">
              <input
                type="checkbox"
                checked={currentProof.hasRealUsers}
                onChange={(e) =>
                  onUpdateProof(project.id, { hasRealUsers: e.target.checked })
                }
                className="rounded border-dark-border text-proof"
              />
              <span className="text-dark-text">Validated by Real Users / Testers</span>
            </label>

            {/* Open Source Contribution */}
            <label className="flex items-center gap-2 p-2 rounded bg-dark-surface border border-dark-borderSubtle cursor-pointer hover:border-dark-border">
              <input
                type="checkbox"
                checked={currentProof.hasOpenSourceContribution}
                onChange={(e) =>
                  onUpdateProof(project.id, { hasOpenSourceContribution: e.target.checked })
                }
                className="rounded border-dark-border text-proof"
              />
              <span className="text-dark-text">Open Source Contribution / Library</span>
            </label>
          </div>

          {/* URLs Inputs (GitHub, Live Demo, Video) */}
          <div className="space-y-2.5 pt-2 border-t border-dark-borderSubtle">
            <div>
              <label className="block text-[11px] font-mono text-dark-muted mb-1 flex items-center gap-1.5">
                <GithubIcon size={13} />
                <span>GitHub Repository URL</span>
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/your-username/repo-name"
                className="w-full px-3 py-1.5 rounded bg-dark-surface border border-dark-border text-xs text-dark-text placeholder-dark-muted outline-none focus:border-proof"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-dark-muted mb-1 flex items-center gap-1.5">
                <ExternalLink size={13} />
                <span>Live Deployment / Demo URL</span>
              </label>
              <input
                type="url"
                value={liveDemoUrl}
                onChange={(e) => setLiveDemoUrl(e.target.value)}
                placeholder="https://my-ai-service.com or https://huggingface.co/spaces/..."
                className="w-full px-3 py-1.5 rounded bg-dark-surface border border-dark-border text-xs text-dark-text placeholder-dark-muted outline-none focus:border-proof"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-dark-muted mb-1 flex items-center gap-1.5">
                <Video size={13} />
                <span>Demo Video / Walkthrough URL</span>
              </label>
              <input
                type="url"
                value={demoVideoUrl}
                onChange={(e) => setDemoVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=... or Loom URL"
                className="w-full px-3 py-1.5 rounded bg-dark-surface border border-dark-border text-xs text-dark-text placeholder-dark-muted outline-none focus:border-proof"
              />
            </div>

            {/* Postmortem / Lessons Learned */}
            <div>
              <label className="block text-[11px] font-mono text-dark-muted mb-1">
                Postmortem & Engineering Lessons Learned
              </label>
              <textarea
                value={postmortemNotes}
                onChange={(e) => setPostmortemNotes(e.target.value)}
                rows={3}
                placeholder="Document trade-offs made, latency bottlenecks resolved, and failure modes encountered during this project..."
                className="w-full px-3 py-2 rounded bg-dark-surface border border-dark-border text-xs text-dark-text placeholder-dark-muted outline-none focus:border-proof resize-none"
              />
            </div>

            <button
              onClick={handleSaveUrls}
              className="px-4 py-2 rounded bg-proof-dark hover:bg-proof text-dark-bg font-mono font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <Save size={13} />
              <span>Save Evidence & Audit URLs</span>
            </button>
          </div>
        </div>

        {/* Project XP Bonus Audit */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-dark-text">
            Permanent Project XP Bonuses (Awarded Strictly Once)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px]">
            {Object.entries(currentBonuses).map(([key, awarded]) => (
              <div
                key={key}
                onClick={() => onToggleBonus(project.id, key as keyof ProjectBonusAwards)}
                className={`p-2 rounded border cursor-pointer transition-colors flex items-center justify-between ${
                  awarded
                    ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-400'
                    : 'bg-dark-elevated border-dark-borderSubtle text-dark-muted hover:text-dark-text'
                }`}
              >
                <span className="capitalize">{key}</span>
                <span className="font-bold">{awarded ? '+✓' : '+XP'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
