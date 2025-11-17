'use client';

import type { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { usePlannerStore } from '@/store/plannerStore';
import CreditsTag from './atoms/CreditsTag';
import ProgramSelector from './ProgramSelector';

export const ProgramSection: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const totalCredits = usePlannerStore(state => state.getTotalCredits());

  return (
    <header className="w-full">
      <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center space-x-4 pl-2'}`}>
        <ProgramSelector />
        <CreditsTag credits={totalCredits} data-testid="total-credits" />
      </div>
    </header>
  );
};
