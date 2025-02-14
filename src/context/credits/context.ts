import { createContext } from 'react';

export type CreditsContextType = {
  totalCredits: number;
};

export const CreditsContext = createContext<CreditsContextType>({ totalCredits: 0 });
