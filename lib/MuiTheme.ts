import type { ThemeMode } from '@/types/themes';
import { createTheme } from '@mui/material/styles';

const createCssVariableTheme = (mode: ThemeMode) => {
  return createTheme({
    components: {
      MuiButtonBase: { defaultProps: { disableRipple: true } },
    },
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#7d90ed' : '#7b68ee',
        light: mode === 'dark' ? '#8c89f2' : '#9281f1',
        dark: mode === 'dark' ? '#6a5acd' : '#6a5acd',
        contrastText: mode === 'dark' ? '#f0f4ff' : '#ffffff',
      },
      secondary: {
        main: mode === 'dark' ? '#4f435a' : '#a5a1ff',
        light: mode === 'dark' ? '#504060' : '#b8b5ff',
        dark: mode === 'dark' ? '#2f3359' : '#8c89f2',
        contrastText: mode === 'dark' ? '#f0f4ff' : '#000000',
      },
      background: {
        default: mode === 'dark' ? '#1F1824' : '#ffffff',
        paper: mode === 'dark' ? '#211F33' : '#f5f5f5',
      },
      text: {
        primary: mode === 'dark' ? '#F0F4FF' : '#000000',
        secondary: mode === 'dark' ? '#D8D2F1' : '#555555',
      },
      error: {
        main: mode === 'dark' ? '#FFA5A6' : '#ef4444',
        contrastText: mode === 'dark' ? '#000000' : '#ffffff',
      },
      success: {
        main: mode === 'dark' ? '#6DE9A2' : '#22c55e',
      },
      warning: {
        main: mode === 'dark' ? '#EED37E' : '#f97316',
      },
      info: {
        main: mode === 'dark' ? '#7D90ED' : '#3b82f6',
      },
      divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
    },
  });
};

export const darkTheme = createCssVariableTheme('dark');
export const lightTheme = createCssVariableTheme('light');
