'use client';

import type { SnackbarProviderProps } from 'notistack';
import { SnackbarProvider as NotistackProvider } from 'notistack';
import React from 'react';

export default function SnackbarProvider({ children }: Readonly<SnackbarProviderProps>) {
  return (
    <NotistackProvider
      maxSnack={3}
      preventDuplicate
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      hideIconVariant={false}
      autoHideDuration={3000}
      dense
    >
      {children}
    </NotistackProvider>
  );
}
