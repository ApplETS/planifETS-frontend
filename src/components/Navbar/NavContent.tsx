'use client';

import { useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import AuthButton from '../atoms/buttons/AuthButton';
import SettingsButton from './buttons/SettingsButton';

export default function NavContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navContentClasses = isMobile
    ? 'flex flex-col items-start space-y-4'
    : 'flex flex-row items-center space-x-4';

  return (
    <div className={navContentClasses}>
      <SettingsButton />
      <AuthButton />
    </div>
  );
}
