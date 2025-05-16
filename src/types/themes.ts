import type { THEME_COLORS } from '@/utils/themeUtils';

export type ThemeMode = 'light' | 'dark';
export type SystemMode = ThemeMode | 'system';
export type ThemeColors = typeof THEME_COLORS[number];

export type Theme = {
  mode: SystemMode;
  color: ThemeColors;
};

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};
