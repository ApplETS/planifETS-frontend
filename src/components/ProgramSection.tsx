'use client';

import type { FC } from 'react';
import { useCredits } from '@/hooks/credits/useCredits';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CreditsBadge from './atoms/CreditsBadge';
import ProgramSelector from './ProgramSelector';

export const ProgramSection: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { totalCredits } = useCredits();

  return (
    <header className="w-full">
      <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center space-x-4'}`}>
        <ProgramSelector />
        <CreditsBadge credits={totalCredits ?? 0} testId="total-credits" />
      </div>
    </header>
  );
};

export default ProgramSection;
