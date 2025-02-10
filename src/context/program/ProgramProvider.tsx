'use client';

import type { ReactNode } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useProgramStore } from '@/store/programStore';
import React, { useEffect } from 'react';

export function ProgramProvider({ children }: { children: ReactNode }) {
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
