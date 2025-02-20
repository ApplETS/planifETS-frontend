'use client';

import type { FC } from 'react';
import { usePlannerStore } from '@/store/plannerStore';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CreditsBadge from './atoms/CreditsBadge';
import ProgramSelector from './ProgramSelector';

export const ProgramSection: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const totalCredits = usePlannerStore(state => state.totalCredits);

  return (
    <header className="w-full">
      <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center space-x-4'}`}>
        <ProgramSelector />
        <CreditsBadge credits={totalCredits} dataTestId="total-credits" />
      </div>
    </header>
  );
};
