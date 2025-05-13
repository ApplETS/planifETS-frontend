export type ThemeColors =
  | 'zinc'
  | 'rose'
  | 'blue'
  | 'green'
  | 'orange'
  | 'red'
  | 'yellow'
  | 'violet';
export type ThemeMode = 'dark' | 'light' | 'system';
export type Theme = {
  mode: ThemeMode;
  color: ThemeColors;
};

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
