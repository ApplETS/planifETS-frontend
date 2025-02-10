'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { darkTheme, lightTheme } from '../theme';

type ThemeProviderProps = {
  children: React.ReactNode;
};

// FIXME: Partially working. Need to refactor theme
export default function ThemeProvider({ children }: ThemeProviderProps) {
  const isDarkMode = true;

  return (
    <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
