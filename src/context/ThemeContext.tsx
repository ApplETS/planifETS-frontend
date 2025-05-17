'use client';

import type { Theme } from '@/types/themes';
import { createContext } from 'react';
import { DEFAULT_THEME } from '@/utils/themeUtils';

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: DEFAULT_THEME,
  setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);
