import type { IconType } from 'react-icons';
import { FaSnowflake, FaSun } from 'react-icons/fa';
import { GiMapleLeaf } from 'react-icons/gi';

export type SeasonParams = {
  SeasonIcon: IconType;
  color: string;
};

type seasonIconsType = {
  [key: string]: SeasonParams;
};
// TODO: change this logic to be more modular (need to implement language support)
// Maybe use a (0 - 1 - 2) sessions index
export const seasonIcons: seasonIconsType = {
  hiver: { SeasonIcon: FaSnowflake, color: 'text-blue-400' },
  été: { SeasonIcon: FaSun, color: 'text-yellow-400' },
  automne: { SeasonIcon: GiMapleLeaf, color: 'text-orange-500' },
};

export const getSeason = (sessionName: string): SeasonParams => {
  const normalizedSession = sessionName.toLowerCase();
  const season = Object.keys(seasonIcons).find(s =>
    normalizedSession.includes(s),
  );

  if (!season) {
    throw new Error('Season is undefined');
  }

  const seasonConfig = seasonIcons[season];

  if (!seasonConfig || !seasonConfig.SeasonIcon || !seasonConfig.color) {
    throw new Error('SeasonConfig is undefined');
  }

  return seasonConfig;
};
