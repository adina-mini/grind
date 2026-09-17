import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showPercent?: boolean;
  variant?: 'accent' | 'proof' | 'success' | 'amber';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercent = false,
  variant = 'accent',
  size = 'sm',
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const heightClasses = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  const fillColors = {
    accent: 'bg-accent',
    proof: 'bg-proof',
    success: 'bg-status-emerald',
    amber: 'bg-status-amber',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1 text-xs text-dark-muted font-mono">
          {label && <span>{label}</span>}
          {showPercent && <span>{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-dark-elevated rounded-full overflow-hidden border border-dark-borderSubtle ${heightClasses[size]}`}>
        <div
          className={`${fillColors[variant]} h-full transition-all duration-300 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
