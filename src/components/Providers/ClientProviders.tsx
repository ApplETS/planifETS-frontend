'use client';

import type { ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';

type ClientProvidersProps = {
  children: ReactNode;
};

const ClientProviders = ({ children }: ClientProvidersProps) => {
  return (
    <SnackbarProvider maxSnack={3}>
      {children}
    </SnackbarProvider>
  );
};

export default ClientProviders;
