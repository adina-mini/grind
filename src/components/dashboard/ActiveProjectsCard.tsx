import React from 'react';
import { FolderGit2, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { useApp } from '../../store/AppContext';
import { ALL_PROJECTS } from '../../data/projects';
import { Badge } from '../common/Badge';
import { EmptyState } from '../common/EmptyState';

interface ActiveProjectsCardProps {
  onNavigate: (view: string, entityId?: string) => void;
  onOpenProjectDetail: (projectId: string) => void;
}

export const ActiveProjectsCard: React.FC<ActiveProjectsCardProps> = ({
  onNavigate,
  onOpenProjectDetail,
}) => {
  const { state } = useApp();

  // Find projects that are in progress or ready
  const activeProjects = ALL_PROJECTS.filter((p) => {
    const pState = state.projectStates[p.id];
    return pState?.status === 'IN_PROGRESS' || pState?.status === 'READY';
  }).slice(0, 4);

  return (
    <div className="tech-card p-5">
      <div className="flex items-center justify-between pb-3 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <FolderGit2 size={15} className="text-proof" />
          <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-dark-text">
            Active Projects & Proof
          </h3>
        </div>
        <button
          onClick={() => onNavigate('projects')}
          className="text-xs font-mono text-dark-muted hover:text-dark-text flex items-center gap-1 hover:underline"
        >
          All 50+ Projects <ArrowRight size={13} />
        </button>
      </div>

      <div className="pt-4">
        {activeProjects.length === 0 ? (
          <EmptyState
            icon={FolderGit2}
            title="No Projects In Progress Yet"
            description="Complete required foundational skills to unlock progressive projects, or start an available project."
            actionText="Browse Ready Projects"
            onAction={() => onNavigate('projects')}
          />
        ) : (
          <div className="space-y-3">
            {activeProjects.map((project) => {
              const pState = state.projectStates[project.id];
              const proof = pState?.proof;
              const hasGithub = !!proof?.githubUrl;
              const hasDemo = !!proof?.liveDemoUrl;
              const hasTests = !!proof?.hasAutomatedTests;

              return (
                <div
                  key={project.id}
                  onClick={() => onOpenProjectDetail(project.id)}
                  className="p-3.5 rounded-lg bg-dark-elevated border border-dark-borderSubtle hover:border-dark-border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-semibold text-dark-text group-hover:text-proof transition-colors">
                        {project.title}
                      </h4>
                      <Badge variant={project.difficulty === 'Capstone' ? 'proof' : 'default'} size="sm">
                        {project.difficulty}
                      </Badge>
                      <Badge variant={pState?.status === 'IN_PROGRESS' ? 'sky' : 'default'} size="sm">
                        {pState?.status}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-dark-muted line-clamp-1">
                      {project.description}
                    </p>
                  </div>

                  {/* Proof Evidence Badges */}
                  <div className="flex items-center gap-2 text-[11px] font-mono flex-shrink-0">
                    <span
                      title={hasGithub ? 'GitHub repository linked' : 'No repo linked'}
                      className={`p-1 rounded ${
                        hasGithub ? 'text-status-emerald bg-emerald-950/40' : 'text-dark-faint bg-dark-surface'
                      }`}
                    >
                      <GithubIcon size={12} className="text-dark-text" />
                    </span>
                    <span
                      title={hasDemo ? 'Live demo URL attached' : 'No live demo'}
                      className={`p-1 rounded ${
                        hasDemo ? 'text-status-emerald bg-emerald-950/40' : 'text-dark-faint bg-dark-surface'
                      }`}
                    >
                      <ExternalLink size={13} />
                    </span>
                    <span
                      title={hasTests ? 'Automated test suite attached' : 'No tests attached'}
                      className={`p-1 rounded ${
                        hasTests ? 'text-status-emerald bg-emerald-950/40' : 'text-dark-faint bg-dark-surface'
                      }`}
                    >
                      <CheckCircle2 size={13} />
                    </span>
                    <span className="text-proof font-medium ml-1">+{project.baseXP} XP</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
