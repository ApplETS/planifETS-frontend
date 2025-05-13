'use client';

import type { ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';

type ClientProvidersProps = {
  children: ReactNode;
};

const ClientProviders = ({ children }: ClientProvidersProps) => {
  // const { theme: nextTheme } = useNextTheme();
  // const muiTheme = nextTheme === 'dark' ? darkTheme : lightTheme;

  return (
    <div
    // theme={muiTheme}
    >
      <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
    </div>
  );
};

export default ClientProviders;
