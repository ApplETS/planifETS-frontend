'use client';

import type { Theme, ThemeProviderProps, ThemeProviderState } from '@/types/themes';
import { createContext, useState } from 'react';

const initialState: ThemeProviderState = {
  theme: { mode: 'dark', color: 'yellow' },
  setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = { mode: 'system', color: 'yellow' },
  ...props
}: ThemeProviderProps) {
  const [storedTheme, setStoredTheme] = useState<Theme>(defaultTheme);

  const value = {
    theme: storedTheme,
    setTheme: (theme: Theme) => {
      setStoredTheme(theme);
    },
  };

  if (storedTheme.mode === 'system') {
    const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    return (
      <ThemeProviderContext {...props} value={value}>
        <div data-theme={`${storedTheme.color}-${systemMode}`}>{children}</div>
      </ThemeProviderContext>
    );
  }

  return (
    <ThemeProviderContext {...props} value={value}>
      <div className={`${storedTheme.mode}`} data-theme={`${storedTheme.color}-${storedTheme.mode}`}>{children}</div>
    </ThemeProviderContext>
  );
}
