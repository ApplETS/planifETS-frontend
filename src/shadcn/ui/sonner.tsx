'use client';

import type { ToasterProps } from 'sonner';
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { Toaster as Sonner } from 'sonner';
import { useTheme } from '@/hooks/useTheme';

// Note: next-themes package requirement has been removed; we use our own theme hook instead
const Toaster = ({ className, ...props }: ToasterProps) => {
  const { theme } = useTheme();
  const themeMode = (theme && theme.mode);

  const themeClasses
    = themeMode === 'dark'
      ? 'bg-popover text-popover-foreground border border-border'
      : 'bg-popover text-popover-foreground border border-border';

  return (
    <Sonner
      theme={themeMode as ToasterProps['theme']}
      className={`toaster group ${themeClasses} ${className ?? ''}`.trim()}
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
