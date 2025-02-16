import { usePlannerStore } from '@/store/plannerStore';
import { type FC, type ReactNode, useMemo } from 'react';
import { CreditsContext } from './context';

export const CreditsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const totalCredits = usePlannerStore(state => state.totalCredits);

  const contextValue = useMemo(() => {
    return { totalCredits };
  }, [totalCredits]);

  return (
    <CreditsContext value={contextValue}>
      {children}
    </CreditsContext>
  );
};

export default CreditsProvider;
