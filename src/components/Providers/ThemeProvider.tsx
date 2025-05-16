'use client';

import type { Theme, ThemeProviderProps } from '@/types/themes';
import { ThemeProviderContext } from '@/context/ThemeContext';
import { darkTheme, lightTheme } from '@/lib/MuiTheme';
import {
  detectInitialTheme,
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
}: ThemeProviderProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>({
    mode: 'dark', // Default fallback for SSR
    color: 'zinc',
  });

  // Initialize theme once on mount
  useEffect(() => {
    setIsMounted(true);
    const initialTheme = detectInitialTheme();
    setCurrentTheme(initialTheme);
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
