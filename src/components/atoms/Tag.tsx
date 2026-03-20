'use client';

import type { VariantProps } from 'class-variance-authority';
import type { FC, ReactNode } from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/shadcn/lib/utils';

export type TagVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'credits'
  | 'credits-subtle'
  | 'duplicate'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'sessionDisabled'
  | 'sessionAvailable'
  | 'currentSession';

const tagVariants = cva(
  'inline-flex items-center justify-center rounded-md text-xs font-medium select-none',
  {
    variants: {
      variant: {
        'default': 'bg-muted text-muted-foreground border border-primary px-2.5 py-1',
        'primary': 'bg-primary/50 text-primary-foreground px-2.5 py-1',
        'secondary': 'bg-primary/50 text-primary border border-primary/20 px-3.5 py-1 bg-transparent',
        'credits': 'bg-secondary text-secondary-foreground border border-secondary/80 px-1.5 py-1',
        'credits-subtle': 'text-secondary-foreground border-b border-secondary/30 px-1.5 py-1',
        'duplicate':
          'bg-amber-100 text-amber-900 border border-amber-400/70 ring-1 ring-amber-200/80 shadow-xs px-2.5 py-1 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-700/70 dark:ring-amber-800/60',
        'success': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2.5 py-1',
        'info': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-300/40 px-2.5 py-1',
        'warning': 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-300/40 px-2.5 py-1',
        'danger': 'bg-destructive/10 text-destructive border border-destructive/20 px-2.5 py-1',
        'sessionDisabled':
          'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-300/40 opacity-40 pointer-events-none cursor-default px-2.5 py-1',
        'sessionAvailable':
          'bg-muted text-muted-foreground border hover:bg-primary/10 cursor-pointer px-2.5 py-1',
        'currentSession':
          'bg-transparent text-primary uppercase border border-primary/20 px-1.5 py-0.5 ml-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type TagProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof tagVariants> & {
    children: ReactNode;
  };

const Tag: FC<TagProps> = ({ children, className, variant, ...props }) => (
  <span className={cn(tagVariants({ variant, className }))} {...props}>
    {children}
  </span>
);

export default Tag;
