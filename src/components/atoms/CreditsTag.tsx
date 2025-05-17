'use client';

import type { FC, HTMLAttributes } from 'react';
import { useTranslations } from 'next-intl';
import Tag from './Tag';

type CreditsTagProps = {
  credits: number;
} & HTMLAttributes<HTMLDivElement>;

const CreditsTag: FC<CreditsTagProps> = ({ credits, ...props }) => {
  const t = useTranslations('Commons');

  return (
    <Tag
      variant="secondary"
      className="font-medium"
      {...props}
    >
      {credits}
      {' '}
      {t('credits')}
    </Tag>
  );
};

export default CreditsTag;
