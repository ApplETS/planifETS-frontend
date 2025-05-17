'use client';

import { ThemeProviderContext } from '@/context/ThemeContext';
import { darkTheme, lightTheme } from '@/lib/MuiTheme';
import type { Theme } from '@/types/themes';
import {
  LOCAL_STORAGE_THEME,
  getInitialTheme,
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
  const [currentTheme, setCurrentTheme] = useState<Theme>(getInitialTheme());

  useEffect(() => {
    // Handle theme initialization and system theme changes
    setIsMounted(true);

    // Set up listener for system theme changes
    if (window.matchMedia) {
      const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Only respond to system changes if user hasn't set a preference
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem(LOCAL_STORAGE_THEME)) {
          setCurrentTheme({
            mode: e.matches ? 'dark' : 'light',
            color: e.matches ? 'zinc' : 'zinc',
          });
        }
      };
      
      colorSchemeQuery.addEventListener('change', handleSystemThemeChange);
      return () => colorSchemeQuery.removeEventListener('change', handleSystemThemeChange);
    }
  }, []);

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

  const contextValue = useMemo(() => ({
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
    <ThemeProviderContext value={contextValue}>
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
