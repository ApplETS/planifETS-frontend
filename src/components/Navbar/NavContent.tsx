'use client';

import { useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import AuthButton from '../atoms/buttons/AuthButton';
import SettingsDialog from './buttons/SettingsDialog';

export default function NavContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navContentClasses = isMobile
    ? 'flex flex-col items-start flex flex-col gap-4 p-2'
    : 'flex flex-row items-center space-x-4';

  return (
    <div className={navContentClasses}>
      <SettingsDialog />
      <AuthButton />
    </div>
  );
}
