import { Leaf, Snowflake, Sun } from 'lucide-react';

import { TermEnum } from '@/types/session';
import { ORDERED_SESSION_TERMS } from '@/utils/sessionUtil';

type SeasonStyle = {
  SeasonIcon: React.ComponentType<any>;
  color: string;
};

type SeasonIconsType = {
  [key in TermEnum]: SeasonStyle;
};

const seasonIcons: SeasonIconsType = {
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

export const getSeasonBorder = (sessionTerm: string | TermEnum): string => {
  // eslint-disable-next-line style/operator-linebreak
  const season =
    typeof sessionTerm === 'string'
      ? ORDERED_SESSION_TERMS.find((s) => sessionTerm.includes(s))
      : sessionTerm;

  switch (season) {
    case TermEnum.H:
      return 'border-2 border-blue-500 dark:border-blue-400';
    case TermEnum.E:
      return 'border-2 border-yellow-500 dark:border-yellow-400';
    case TermEnum.A:
      return 'border-2 border-orange-500 dark:border-orange-400';
    default:
      return 'border border-border';
  }
};

export const getSeasonBorderFromTypicalSessionIndex = (
  typicalSessionIndex: number,
): string => {
  if (!Number.isInteger(typicalSessionIndex) || typicalSessionIndex < 1) {
    return 'border-border';
  }
  const index = (typicalSessionIndex - 1) % ORDERED_SESSION_TERMS.length;
  const seasonTerm = ORDERED_SESSION_TERMS[index];
  if (!seasonTerm) {
    return 'border-border';
  }
  return getSeasonBorder(seasonTerm);
};
