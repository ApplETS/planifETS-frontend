'use client';

import type { SnackbarKey } from 'notistack';
import type { ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { SnackbarProvider as NotistackProvider } from 'notistack';
import React from 'react';

type SnackbarProviderProps = {
  children: ReactNode;
};

export default function SnackbarProvider({ children }: SnackbarProviderProps) {
  const notistackRef = React.useRef<NotistackProvider>(null);

  const handleCloseSnackbar = (key: SnackbarKey) => {
    notistackRef.current?.closeSnackbar(key);
  };

  return (
    <NotistackProvider
      maxSnack={3}
      preventDuplicate
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      ref={notistackRef}
      action={key => (
        <IconButton
          onClick={() => handleCloseSnackbar(key)}
          sx={{ color: 'white', padding: '4px' }}
          size="small"
          aria-label="close notification"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    >
      {children}
    </NotistackProvider>
  );
}
