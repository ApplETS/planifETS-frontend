import { Leaf, Snowflake, Sun } from 'lucide-react';

import { TermEnum } from '@/types/session';
import { ORDERED_SESSION_TERMS } from '@/utils/sessionUtils';

export type SeasonStyle = {
  SeasonIcon: React.ComponentType<any>;
  color: string;
};

type SeasonIconsType = {
  [key in TermEnum]: SeasonStyle;
};

export const seasonIcons: SeasonIconsType = {
  [TermEnum.H]: { SeasonIcon: Snowflake, color: 'text-blue-400' },
  [TermEnum.E]: { SeasonIcon: Sun, color: 'text-yellow-400' },
  [TermEnum.A]: { SeasonIcon: Leaf, color: 'text-orange-500' },
};

export const getSeasonStyle = (sessionTerm: string): SeasonStyle => {
  const season = ORDERED_SESSION_TERMS.find((s) => sessionTerm.includes(s));

  if (!season) {
    throw new Error('Session is undefined');
  }

  const seasonConfig = seasonIcons[season];

  if (!seasonConfig?.SeasonIcon || !seasonConfig?.color) {
    throw new Error('SessionConfig is undefined');
  }

  return seasonConfig;
};
