'use client';

import type { Theme, ThemeProviderProps, ThemeProviderState } from '@/types/themes';
import { darkTheme, lightTheme } from '@/lib/MuiTheme';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createContext, useEffect, useMemo, useState } from 'react';

const initialState: ThemeProviderState = {
  theme: { mode: 'dark', color: 'yellow' },
  setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

const defaultThemeValue = { mode: 'system', color: 'yellow' } as const;

export function ThemeProvider({
  children,
  defaultTheme = defaultThemeValue,
}: ThemeProviderProps) {
  const [storedTheme, setStoredTheme] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<Theme>({
    ...defaultTheme,
    mode: defaultTheme.mode === 'system' ? 'dark' : defaultTheme.mode,
  });

  const [isMounted, setIsMounted] = useState(false);

  // Only run once client-side to set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle theme resolution and system preference
  useEffect(() => {
    if (!isMounted) {
      return;
    }

    // Function to determine system theme preference
    const getSystemTheme = () => {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Update resolved theme based on stored theme
    if (storedTheme.mode === 'system') {
      setResolvedTheme({
        ...storedTheme,
        mode: getSystemTheme(),
      });
    } else {
      setResolvedTheme(storedTheme);
    }

    // Set up listener for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (storedTheme.mode === 'system') {
        setResolvedTheme({
          ...storedTheme,
          mode: getSystemTheme(),
        });
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [storedTheme, isMounted]);

  // Set theme on document
  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const doc = document.documentElement;
    doc.setAttribute('data-theme', `${resolvedTheme.color}-${resolvedTheme.mode}`);

    if (resolvedTheme.mode === 'dark') {
      doc.classList.add('dark');
    } else {
      doc.classList.remove('dark');
    }
  }, [resolvedTheme, isMounted]);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    theme: storedTheme,
    setTheme: (theme: Theme) => {
      setStoredTheme(theme);
    },
  }), [storedTheme]);

  // Only render the full themed content when mounted (client-side)
  // This prevents hydration mismatch errors
  if (!isMounted) {
    // Return a minimal version for server-side rendering
    return <div className="contents">{children}</div>;
  }

  return (
    <ThemeProviderContext value={value}>
      <MuiThemeProvider theme={resolvedTheme.mode === 'dark' ? darkTheme : lightTheme}>
        <div
          className={resolvedTheme.mode === 'dark' ? 'dark' : ''}
          data-theme={`${resolvedTheme.color}-${resolvedTheme.mode}`}
        >
          {children}
        </div>
      </MuiThemeProvider>
    </ThemeProviderContext>
  );
}
