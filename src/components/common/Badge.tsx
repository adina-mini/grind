import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'proof' | 'success' | 'warning' | 'danger' | 'purple' | 'sky';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}) => {
  const variantStyles = {
    default: 'bg-zinc-900/90 text-zinc-300 border border-zinc-800',
    proof: 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/50',
    success: 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/50',
    warning: 'bg-amber-950/50 text-amber-300 border border-amber-800/50',
    danger: 'bg-rose-950/50 text-rose-300 border border-rose-800/50',
    purple: 'bg-purple-950/50 text-purple-300 border border-purple-800/50',
    sky: 'bg-sky-950/50 text-sky-300 border border-sky-800/50',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 rounded-md font-medium',
    md: 'text-xs px-3 py-1 rounded-md font-medium',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-sans ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
