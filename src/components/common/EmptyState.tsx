import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center tech-card border-dashed ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-dark-elevated flex items-center justify-center text-dark-muted mb-3 border border-dark-border">
        <Icon size={22} />
      </div>
      <h3 className="text-sm font-medium text-dark-text">{title}</h3>
      <p className="text-xs text-dark-muted max-w-sm mt-1">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-3 py-1.5 bg-dark-elevated hover:bg-dark-border text-xs text-dark-text border border-dark-border rounded-md font-medium transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
