import React from 'react';
import { FolderGit2, Check, ExternalLink, ShieldCheck, Clock, Award } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { Project, ProjectDifficulty, ProjectStatus } from '../../types/project';
import { ProjectState } from '../../types/project';
import { Badge } from '../common/Badge';

interface ProjectCardProps {
  project: Project;
  projectState?: ProjectState;
  onOpenModal: (projectId: string) => void;
  onStatusChange: (projectId: string, status: ProjectStatus) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  projectState,
  onOpenModal,
  onStatusChange,
}) => {
  const status = projectState?.status || 'LOCKED';
  const proof = projectState?.proof;

  const getDifficultyBadgeVariant = (diff: ProjectDifficulty) => {
    switch (diff) {
      case 'Mini':
        return 'sky';
      case 'Intermediate':
        return 'warning';
      case 'Advanced':
        return 'purple';
      case 'Capstone':
        return 'proof';
      default:
        return 'default';
    }
  };

  const getStatusBadgeVariant = (st: ProjectStatus) => {
    switch (st) {
      case 'COMPLETED':
        return 'success';
      case 'IN_PROGRESS':
        return 'sky';
      case 'READY':
        return 'warning';
      case 'LOCKED':
        return 'default';
      default:
        return 'default';
    }
  };

  // Proof checklist completion count
  const proofItems = [
    proof?.githubUrl && proof.githubUrl.length > 5,
    proof?.liveDemoUrl && proof.liveDemoUrl.length > 5,
    proof?.hasAutomatedTests,
    proof?.hasEvaluationSuite,
    proof?.hasArchitectureDoc,
    proof?.hasDocumentation,
    proof?.hasRealUsers,
  ].filter(Boolean).length;

  return (
    <div
      className={`tech-card p-5 border-dark-border flex flex-col justify-between transition-all ${
        status === 'COMPLETED'
          ? 'bg-emerald-950/15 border-emerald-800/40'
          : status === 'IN_PROGRESS'
          ? 'border-sky-500/50'
          : ''
      }`}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-2 pb-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant={getDifficultyBadgeVariant(project.difficulty)}>
              {project.difficulty}
            </Badge>
            <Badge variant={getStatusBadgeVariant(status)}>
              {status}
            </Badge>
          </div>

          <div className="text-right flex-shrink-0">
            <span className="text-xs font-semibold text-emerald-400">+{project.baseXP} XP</span>
          </div>
        </div>

        {/* Title & Description */}
        <h3
          onClick={() => onOpenModal(project.id)}
          className="text-base font-bold text-zinc-100 hover:text-emerald-400 cursor-pointer transition-colors mt-2"
        >
          {project.title}
        </h3>
        <p className="text-xs text-zinc-400 mt-1 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Deliverables / Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Proof Summary & Action Buttons */}
      <div className="mt-4 pt-3 border-t border-dark-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Proof items summary */}
        <div
          onClick={() => onOpenModal(project.id)}
          className="flex items-center gap-2 text-xs text-zinc-400 font-medium cursor-pointer hover:text-zinc-200"
        >
          <Award size={14} className={proofItems > 0 ? 'text-emerald-400' : 'text-zinc-400'} />
          <span>Proof Evidence: {proofItems}/7</span>
          {proof?.githubUrl && <GithubIcon size={13} className="text-zinc-300" />}
          {proof?.liveDemoUrl && <ExternalLink size={13} className="text-zinc-300" />}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenModal(project.id)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 transition-colors shadow-sm"
          >
            Proof Audit
          </button>

          {status === 'READY' && (
            <button
              onClick={() => onStatusChange(project.id, 'IN_PROGRESS')}
              className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors"
            >
              Start Project
            </button>
          )}

          {status === 'IN_PROGRESS' && (
            <button
              onClick={() => onStatusChange(project.id, 'COMPLETED')}
              className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Check size={13} />
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
