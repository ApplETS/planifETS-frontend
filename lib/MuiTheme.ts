import type { ThemeMode } from '@/types/themes';
import { createTheme } from '@mui/material/styles';

const createCssVariableTheme = (mode: ThemeMode) => {
  return createTheme({
    components: {
      MuiButtonBase: { defaultProps: { disableRipple: true } },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === 'dark' ? '#1F1824' : '#ffffff',
            color: mode === 'dark' ? '#F0F4FF' : '#000000',
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#4f435a' : '#a5a1ff',
            color: mode === 'dark' ? '#F0F4FF' : '#000000',
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#1F1824' : '#ffffff',
            color: mode === 'dark' ? '#F0F4FF' : '#000000',
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#4f435a' : '#a5a1ff',
            color: mode === 'dark' ? '#F0F4FF' : '#000000',
          },
        },
      },
    },
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#7d90ed' : '#7b68ee',
        light: '#9281f1',
        dark: '#6a5acd',
        contrastText: mode === 'dark' ? '#f0f4ff' : '#ffffff',
      },
      secondary: {
        main: mode === 'dark' ? '#4f435a' : '#a5a1ff',
        light: '#b8b5ff',
        dark: '#2f3359',
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
