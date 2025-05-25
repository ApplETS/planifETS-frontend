'use client';

import type { FC, ReactNode } from 'react';
import { cn } from '@/shadcn/lib/utils';

export type TagVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'credits';

type ContrastTagProps = {
  children: ReactNode;
  variant?: TagVariant;
};

const Tag: FC<ContrastTagProps> = ({
  children,
  variant = 'default',
  ...props
}) => {
  const BASE_STYLES = 'inline-flex items-center justify-center rounded-md px-2.5 py-1 text-xs font-medium';
  const VARIANT_STYLES: Record<TagVariant, string> = {
    default: 'bg-muted text-muted-foreground border border-primary',
    primary: 'bg-primary text-primary-foreground border border-primary/30',
    secondary: 'bg-secondary text-secondary-foreground border border-secondary/80',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-300/40',
    info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-300/40',
    warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-300/40',
    danger: 'bg-destructive/10 text-destructive border border-destructive/20',
    credits: 'font-medium',
  };

  return (
    <span
      className={cn(BASE_STYLES, VARIANT_STYLES[variant])}
      {...props}
    >
      {children}
    </span>
  );
};

export default Tag;
