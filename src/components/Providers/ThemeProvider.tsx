'use client';

import type { Theme } from '@/types/themes';
import { ThemeProviderContext } from '@/context/ThemeContext';
import { darkTheme, lightTheme } from '@/lib/MuiTheme';
import {
  DEFAULT_THEME,
  LOCAL_STORAGE_THEME,
} from '@/utils/themeUtils';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';

export function ThemeProvider({
  children,
}: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>(DEFAULT_THEME);

  // Initialize theme once on mount
  useEffect(() => {
    // Use a function to avoid direct setState in useEffect
    const initTheme = () => {
      // Get the theme from localStorage or use default
      const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME);
      if (storedTheme) {
        try {
          // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
          setCurrentTheme(JSON.parse(storedTheme));
        } catch (e) {
          console.error('Failed to parse stored theme', e);
        }
      }

      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setIsMounted(true);
    };

    initTheme();
  }, []);

  // Update the document theme attribute when theme changes
  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const doc = document.documentElement;
    doc.setAttribute('data-theme', `${currentTheme.color}-${currentTheme.mode}`);

    if (currentTheme.mode === 'dark') {
      doc.classList.add('dark');
    } else {
      doc.classList.remove('dark');
    }
  }, [currentTheme, isMounted]);

  // Theme context value
  const value = useMemo(() => ({
    theme: currentTheme,
    setTheme: (theme: Theme) => {
      setCurrentTheme(theme);
      localStorage.setItem(LOCAL_STORAGE_THEME, JSON.stringify(theme));
    },
  }), [currentTheme]);

  if (!isMounted) {
    return <div className="contents">{children}</div>;
  }

  return (
    <ThemeProviderContext value={value}>
      <MuiThemeProvider theme={currentTheme.mode === 'dark' ? darkTheme : lightTheme}>
        <div
          className={currentTheme.mode === 'dark' ? 'dark' : ''}
          data-theme={`${currentTheme.color}-${currentTheme.mode}`}
        >
          {children}
        </div>
      </MuiThemeProvider>
    </ThemeProviderContext>
  );
}
