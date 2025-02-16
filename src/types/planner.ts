import type { Session } from './session';

export type YearData = {
  year: number;
  sessions: Session[];
};

export type YearSectionProps = {
  year: number;
  sessions: Session[];
  isLastYear: boolean;
};
