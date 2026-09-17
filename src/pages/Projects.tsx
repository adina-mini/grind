import React, { useState, useMemo } from 'react';
import { FolderGit2, Sparkles, Award } from 'lucide-react';
import { ALL_PROJECTS } from '../data/projects';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectFilters } from '../components/projects/ProjectFilters';
import { ProjectProofModal } from '../components/projects/ProjectProofModal';
import { Project, ProjectDifficulty, ProjectStatus, ProjectProof, ProjectBonusAwards } from '../types/project';
import { useApp } from '../store/AppContext';
import { PROJECTS_BY_ID } from '../data/projects';

interface ProjectsPageProps {
  selectedProjectId?: string;
  onClearSelectedProject?: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  selectedProjectId,
  onClearSelectedProject,
}) => {
  const { state, dispatch, proofScore } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<ProjectDifficulty | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | 'All'>('All');
  const [activeModalProjectId, setActiveModalProjectId] = useState<string | null>(selectedProjectId || null);

  const activeProject = activeModalProjectId ? PROJECTS_BY_ID[activeModalProjectId] : null;

  const handleUpdateProof = (projectId: string, proof: Partial<ProjectProof>) => {
    dispatch({ type: 'UPDATE_PROJECT_PROOF', projectId, proof });
  };

  const handleToggleBonus = (projectId: string, bonusKey: keyof ProjectBonusAwards) => {
    dispatch({ type: 'TOGGLE_PROJECT_BONUS', projectId, bonusKey });
  };

  const handleStatusChange = (projectId: string, status: ProjectStatus) => {
    dispatch({ type: 'UPDATE_PROJECT_STATUS', projectId, status });
  };

  // Filter projects
  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return ALL_PROJECTS.filter((project) => {
      if (q) {
        const titleMatch = project.title.toLowerCase().includes(q);
        const descMatch = project.description.toLowerCase().includes(q);
        const tagMatch = project.tags.some((t) => t.toLowerCase().includes(q));
        if (!titleMatch && !descMatch && !tagMatch) return false;
      }

      if (selectedDifficulty !== 'All' && project.difficulty !== selectedDifficulty) {
        return false;
      }

      const pState = state.projectStates[project.id];
      const curStatus = pState?.status || 'LOCKED';
      if (selectedStatus !== 'All' && curStatus !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedDifficulty, selectedStatus, state.projectStates]);

  const completedCount = Object.values(state.projectStates).filter(
    (ps) => ps.status === 'COMPLETED'
  ).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="tech-card p-6 border-dark-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-dark-border">
          <div>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <FolderGit2 size={14} />
              <span>Demonstrated Evidence Through Building</span>
            </span>
            <h1 className="text-2xl font-bold text-zinc-100 tracking-tight mt-1">
              50+ Progressive Engineering Projects
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5 max-w-2xl">
              From Mini automation scripts to the flagship multi-tenant Capstone platform. Every project has a dedicated Proof section to track GitHub URLs, live deployments, automated tests, and evaluation suites.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-right">
              <span className="text-zinc-400 text-[11px] font-medium block">Completed</span>
              <span className="font-bold text-emerald-400 text-base">
                {completedCount} / {ALL_PROJECTS.length}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-950/25 border border-emerald-800/50 text-right">
              <span className="text-emerald-400 text-[11px] font-medium block">Proof Score</span>
              <span className="font-bold text-emerald-300 text-base">{proofScore.totalProofScore} pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <ProjectFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            projectState={state.projectStates[project.id]}
            onOpenModal={(pId) => setActiveModalProjectId(pId)}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      {/* Proof & Details Modal */}
      <ProjectProofModal
        isOpen={!!activeModalProjectId}
        onClose={() => {
          setActiveModalProjectId(null);
          onClearSelectedProject?.();
        }}
        project={activeProject}
        projectState={activeProject ? state.projectStates[activeProject.id] : undefined}
        onUpdateProof={handleUpdateProof}
        onToggleBonus={handleToggleBonus}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};
