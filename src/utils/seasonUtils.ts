import { Leaf, Snowflake, Sun } from 'lucide-react';

import { SessionEnum } from '@/types/session';

export type SeasonStyle = {
  SeasonIcon: React.ComponentType<any>;
  color: string;
};

type SeasonIconsType = {
  [key in SessionEnum]: SeasonStyle;
};

export const seasonIcons: SeasonIconsType = {
  [SessionEnum.H]: { SeasonIcon: Snowflake, color: 'text-blue-400' },
  [SessionEnum.E]: { SeasonIcon: Sun, color: 'text-yellow-400' },
  [SessionEnum.A]: { SeasonIcon: Leaf, color: 'text-orange-500' },
};

export const getSeasonStyle = (sessionTerm: string): SeasonStyle => {
  const season = Object.values(SessionEnum).find((s) =>
    sessionTerm.includes(s),
  );

  if (!season) {
    throw new Error('Session is undefined');
  }

  const seasonConfig = seasonIcons[season];

  if (!seasonConfig?.SeasonIcon || !seasonConfig?.color) {
    throw new Error('SessionConfig is undefined');
  }

  return seasonConfig;
};
