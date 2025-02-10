import { CreditsContext, type CreditsContextType } from '@/context/credits/context';
import { useContext } from 'react';

export const useCredits = (): CreditsContextType => {
  const context = useContext(CreditsContext);

  if (!context) {
    throw new Error('useCredits must be used within a CreditsProvider');
  }
  return context;
};
