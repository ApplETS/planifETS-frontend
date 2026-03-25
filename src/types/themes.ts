import type { THEME_COLORS } from '@/utils/themeUtil';

export type ThemeMode = 'light' | 'dark';
export type ThemeColors = typeof THEME_COLORS[number];

export type Theme = {
  mode: ThemeMode;
  color: ThemeColors;
};
