'use client';

import type { FC, HTMLAttributes } from 'react';
import { useTranslations } from 'next-intl';

import Tag from './Tag';

type CreditsTagProps = {
  credits: number;
  shortText?: boolean;
  variant?: 'credits' | 'credits-subtle';
} & HTMLAttributes<HTMLDivElement>;

const CreditsTag: FC<CreditsTagProps> = ({ credits, shortText, variant = 'credits-subtle', ...props }) => {
  const t = useTranslations('Commons');

  return (
    <Tag
      variant={variant}
      {...props}
    >
      {credits}
      {' '}
      {shortText ? t('credits-short') : t('credits')}
    </Tag>
  );
};

export default CreditsTag;
