'use client';

import type { Theme } from '@/types/themes';
import { DEFAULT_THEME } from '@/utils/themeUtils';
import { createContext } from 'react';

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: DEFAULT_THEME,
  setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);
