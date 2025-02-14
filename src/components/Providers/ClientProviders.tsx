'use client';

import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const SnackbarProvider = dynamic(() => import('./SnackbarProvider'), { ssr: false });

export default function ClientProviders({ children }: { children: ReactNode }) {
  return <SnackbarProvider>{children}</SnackbarProvider>;
}
