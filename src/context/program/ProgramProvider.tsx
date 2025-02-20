'use client';

import type { ReactNode } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useProgramStore } from '@/store/programStore';
import React, { useEffect } from 'react';

type ProgramProviderProps = Readonly<{
  children: ReactNode;
}>;

export function ProgramProvider({ children }: ProgramProviderProps) {
  const setSelectedProgram = useProgramStore(state => state.setSelectedProgram);
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      setSelectedProgram('7084');
    } else {
      setSelectedProgram(null);
    }
  }, [isLoggedIn, setSelectedProgram]);

  return <>{children}</>;
}
