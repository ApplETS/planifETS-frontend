'use client';

import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider, useTheme as useNextTheme } from 'next-themes';
import { darkTheme, lightTheme } from 'lib/MuiTheme';

type ClientProvidersProps = {
  children: ReactNode;
};

const ClientProviders = ({ children }: ClientProvidersProps) => {
  const { theme: nextTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  const muiTheme =
    nextTheme === 'dark' || nextTheme === 'system' ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={muiTheme}>
      <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
    </MuiThemeProvider>
  );
};

export default ClientProviders;
