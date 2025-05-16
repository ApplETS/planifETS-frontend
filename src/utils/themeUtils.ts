import type { SystemMode, ThemeColors, ThemeMode } from '@/types/themes';

export const LOCAL_STORAGE_THEME = 'theme-preference';

export function getButtonBgStyle(color: ThemeColors, mode: SystemMode): string {
  type DarkColors = typeof COLORS_BY_MODE['dark'][number];
  type LightColors = typeof COLORS_BY_MODE['light'][number];

  const darkThemes: Record<DarkColors, string> = {
    zinc: 'bg-zinc-700',
    blue: 'bg-blue-800',
    violet: 'bg-violet-800',
    yellow: 'bg-yellow-600',
    green: 'bg-green-700',
    red: 'bg-red-900',
  };

  const lightThemes: Record<LightColors, string> = {
    zinc: 'bg-zinc-200',
    rose: 'bg-rose-200',
    green: 'bg-green-200',
    orange: 'bg-orange-200',
    blue: 'bg-blue-200',
    red: 'bg-red-200',
  };

  const themeMap = mode === 'dark' ? darkThemes : lightThemes;

  return (themeMap as Record<ThemeColors, string>)[color];
}

export function getPrincipalColors(color: ThemeColors, mode: ThemeMode): string[] {
  // create a temporary element to get computed styles
  const tempElement = document.createElement('div');
  tempElement.setAttribute('data-theme', `${color}-${mode}`);
  document.body.appendChild(tempElement);

  const styles = window.getComputedStyle(tempElement);
  const backgroundColor = styles.getPropertyValue('--background').trim();
  const primaryColor = styles.getPropertyValue('--primary').trim();

  document.body.removeChild(tempElement);

  return [primaryColor, backgroundColor].filter(Boolean);
}

export const DEFAULT_THEME = {
  mode: 'system' as const,
  color: 'zinc' as const,
};

export const SYSTEM_THEME_DEFAULT_COLOR = {
  dark: 'zinc' as const,
  light: 'red' as const,
};

export const THEME_COLORS = ['zinc', 'rose', 'blue', 'violet', 'yellow', 'green', 'orange', 'red'] as const;

export const COLORS_BY_MODE = {
  dark: ['zinc', 'blue', 'violet', 'yellow', 'green', 'red'] as const,
  light: ['zinc', 'rose', 'green', 'orange', 'blue', 'red'] as const,
};
