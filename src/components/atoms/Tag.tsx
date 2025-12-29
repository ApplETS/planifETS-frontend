'use client';

import type { FC, ReactNode } from 'react';
import { cn } from '@/shadcn/lib/utils';

export type TagVariant = 'default' | 'primary' | 'secondary' | 'credits' | 'success' | 'warning' | 'danger' | 'info' | 'sessionDisabled' | 'sessionAvailable';

type ContrastTagProps = React.HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: TagVariant;
};

const Tag: FC<ContrastTagProps> = ({
  children,
  variant = 'default',
  ...props
}) => {
  const BASE_STYLES = 'inline-flex items-center justify-center rounded-md text-xs font-medium select-none';

  const VARIANT_STYLES: Record<TagVariant, string> = {
    default: 'bg-muted text-muted-foreground border border-primary px-2.5 py-1',
    primary: 'bg-primary text-primary-foreground border border-primary/30 px-2.5 py-1',
    secondary: 'bg-secondary text-secondary-foreground border border-secondary/80 px-2.5 py-1',
    credits: 'bg-secondary text-secondary-foreground border border-secondary/80 px-1.5 py-1',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-300/40 px-2.5 py-1',
    info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-300/40 px-2.5 py-1',
    warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-300/40 px-2.5 py-1',
    danger: 'bg-destructive/10 text-destructive border border-destructive/20 px-2.5 py-1',
    sessionDisabled: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-300/40 opacity-40 pointer-events-none cursor-default px-2.5 py-1',
    sessionAvailable: 'bg-muted text-muted-foreground border border-primary hover:bg-primary/10 cursor-pointer px-2.5 py-1',
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
