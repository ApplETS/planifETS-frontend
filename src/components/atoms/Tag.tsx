'use client';

import type { FC, ReactNode } from 'react';
import { cn } from '@/shadcn/lib/utils';

type TagVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

type ContrastTagProps = {
  children: ReactNode;
  variant?: TagVariant;
  className?: string;
  dataTestId?: string;
};

/**
 * A tag component with improved contrast for better readability
 */
const Tag: FC<ContrastTagProps> = ({
  children,
  variant = 'default',
  className = '',
  dataTestId,
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md px-2.5 py-1 text-xs font-medium';

  const variantStyles: Record<TagVariant, string> = {
    default: 'bg-muted text-muted-foreground border border-border',
    primary: 'bg-primary text-primary-foreground border border-primary/30',
    secondary: 'bg-secondary text-secondary-foreground border border-secondary/80',
    success: 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800',
    warning: 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800',
    danger: 'bg-rose-100 text-rose-800 border border-rose-200 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800',
    info: 'bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800',
  };

  return (
    <span
      className={cn(baseStyles, variantStyles[variant], className)}
      data-testid={dataTestId}
    >
      {children}
    </span>
  );
};

export default Tag;
