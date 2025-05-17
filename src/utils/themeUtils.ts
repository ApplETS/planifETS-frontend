import type { Theme, ThemeColors, ThemeMode } from '@/types/themes';

export const LOCAL_STORAGE_THEME = 'theme-preference';

// Default theme colors by mode
export const DEFAULT_COLOR = {
  dark: 'zinc' as const,
  light: 'red' as const,
};

// Theme colors available
export const THEME_COLORS = ['zinc', 'blue', 'violet', 'yellow', 'green', 'orange', 'red'] as const;

// Available colors categorized by theme mode
export const COLORS_BY_MODE = {
  dark: ['zinc', 'blue', 'violet', 'yellow', 'green', 'red'] as const,
  light: ['zinc', 'green', 'orange', 'blue', 'red'] as const,
};

// Default theme object
export const DEFAULT_THEME: Theme = {
  mode: 'dark',
  color: DEFAULT_COLOR.dark,
};

export function getInitialTheme(): Theme {
  const defaultTheme: Theme = {
    mode: 'dark',
    color: DEFAULT_COLOR.dark,
  };

  if (typeof window === 'undefined') {
    console.warn('Window is undefined, returning default theme');
    return defaultTheme;
  }

  try {
    const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME);
    if (storedTheme) {
      return JSON.parse(storedTheme);
    }

    // If no stored preference, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return {
        mode: 'light',
        color: DEFAULT_COLOR.light,
      };
    }
  } catch (e) {
    console.error('Error determining theme:', e);
  }

  return defaultTheme;
}

// UI helper functions
export function getButtonBgStyle(color: ThemeColors, mode: ThemeMode): string {
  type DarkColors = typeof COLORS_BY_MODE['dark'][number];
  type LightColors = typeof COLORS_BY_MODE['light'][number];

  const darkThemes: Record<DarkColors, string> = {
    zinc: 'bg-zinc-700',
    blue: 'bg-blue-800',
    violet: 'bg-violet-800',
    yellow: 'bg-yellow-600',
    green: 'bg-green-700',
    red: 'bg-red-800',
  };

  const lightThemes: Record<LightColors, string> = {
    zinc: 'bg-zinc-200',
    green: 'bg-green-200',
    orange: 'bg-orange-200',
    blue: 'bg-blue-200',
    red: 'bg-red-200',
  };

  const themeMap = mode === 'dark' ? darkThemes : lightThemes;

  return (themeMap as Record<ThemeColors, string>)[color];
}

export function getPrincipalColors(color: ThemeColors, mode: ThemeMode): string[] {
  // Safe check for browser environment
  if (typeof window === 'undefined') {
    return [];
  }

  // Create a temporary element to get computed theme colors
  const tempElement = document.createElement('div');
  tempElement.setAttribute('data-theme', `${color}-${mode}`);
  document.body.appendChild(tempElement);

  const styles = window.getComputedStyle(tempElement);
  const backgroundColor = styles.getPropertyValue('--background').trim();
  const primaryColor = styles.getPropertyValue('--primary').trim();

  document.body.removeChild(tempElement);

  return [primaryColor, backgroundColor].filter(Boolean);
}
