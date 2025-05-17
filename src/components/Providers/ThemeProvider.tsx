'use client';

import type { Theme } from '@/types/themes';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import Loading from '@/components/atoms/Loading';
import { ThemeProviderContext } from '@/context/ThemeContext';
import { darkTheme, lightTheme } from '@/lib/MuiTheme';
import {
  DEFAULT_COLOR,
  getInitialTheme,
  LOCAL_STORAGE_THEME,
} from '@/utils/themeUtils';

const defaultTheme: Theme = {
  mode: 'dark',
  color: DEFAULT_COLOR.dark,
};

export function ThemeProvider({
  children,
}: { children: React.ReactNode }) {
  // Use default theme initially to avoid hydration mismatch
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize theme after mount
  useEffect(() => {
    // Mark as mounted

    Promise.resolve().then(() => setIsMounted(true));
    Promise.resolve().then(() => setCurrentTheme(getInitialTheme()));

    // Set up system theme change listener
    if (typeof window !== 'undefined' && window.matchMedia) {
      const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem(LOCAL_STORAGE_THEME)) {
          setCurrentTheme({
            mode: e.matches ? 'dark' : 'light',
            color: e.matches ? DEFAULT_COLOR.dark : DEFAULT_COLOR.light,
          });
        }
      };

      colorSchemeQuery.addEventListener('change', handleSystemThemeChange);
      return () => {
        colorSchemeQuery.removeEventListener('change', handleSystemThemeChange);
      };
    }
    return () => {};
  }, []);

  const contextValue = useMemo(() => ({
    theme: currentTheme,
    setTheme: (theme: Theme) => {
      setCurrentTheme(theme);
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_THEME, JSON.stringify(theme));
      }
    },
  }), [currentTheme]);

  return (
    <ThemeProviderContext value={contextValue}>
      <MuiThemeProvider theme={currentTheme.mode === 'dark' ? darkTheme : lightTheme}>
        <div
          suppressHydrationWarning
          className={currentTheme.mode === 'dark' ? 'dark' : ''}
          data-theme={`${currentTheme.color}-${currentTheme.mode}`}
        >
          {isMounted ? children : <Loading />}
        </div>
      </MuiThemeProvider>
    </ThemeProviderContext>
  );
}
