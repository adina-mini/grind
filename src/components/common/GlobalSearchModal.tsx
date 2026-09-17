import React, { useEffect, useRef } from 'react';
import { Search, X, BookOpen, FolderGit2, Flame, Flag, ArrowRight } from 'lucide-react';
import { useGlobalSearch } from '../../hooks/useGlobalSearch';
import { SearchItem } from '../../types/search';
import { Badge } from './Badge';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string, entityId?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const { query, setQuery, results, hasQuery } = useGlobalSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen, setQuery]);

  if (!isOpen) return null;

  const handleSelect = (item: SearchItem) => {
    onNavigate(item.targetView, item.targetId);
    onClose();
  };

  const getItemIcon = (type: SearchItem['type']) => {
    switch (type) {
      case 'skill':
        return <BookOpen size={15} className="text-accent" />;
      case 'project':
        return <FolderGit2 size={15} className="text-proof" />;
      case 'challenge':
        return <Flame size={15} className="text-status-amber" />;
      case 'checkpoint':
        return <Flag size={15} className="text-status-sky" />;
      default:
        return <Search size={15} className="text-dark-muted" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/80 backdrop-blur-sm">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-xl bg-dark-card border border-dark-border rounded-lg shadow-2xl overflow-hidden z-10">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-dark-border gap-2">
          <Search size={18} className="text-dark-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills, projects, challenges, and timeline checkpoints..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-dark-text placeholder-dark-muted"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-dark-muted hover:text-dark-text p-1"
            >
              <X size={16} />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-dark-elevated text-dark-muted border border-dark-border rounded">
            ESC
          </kbd>
        </div>

        {/* Search Results List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {hasQuery && results.length === 0 && (
            <div className="py-8 text-center text-xs text-dark-muted">
              No matching items found for &ldquo;<span className="text-dark-text">{query}</span>&rdquo;.
            </div>
          )}

          {!hasQuery && (
            <div className="p-4 text-xs text-dark-muted">
              <span className="font-medium text-dark-text">Try searching for:</span> Python, PyTorch, RAG, FastAPI, Docker, Agents, or Capstone.
            </div>
          )}

          {results.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              className="flex items-center justify-between p-2.5 rounded-md hover:bg-dark-elevated cursor-pointer group transition-colors"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-1.5 rounded bg-dark-surface border border-dark-border flex-shrink-0">
                  {getItemIcon(item.type)}
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-dark-text group-hover:text-white truncate">
                      {item.title}
                    </span>
                    <Badge size="sm" variant={item.type === 'project' ? 'proof' : 'default'}>
                      {item.type}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-dark-muted truncate mt-0.5">{item.subtitle}</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-dark-faint group-hover:text-dark-text transition-colors flex-shrink-0 ml-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
