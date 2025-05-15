'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import Tag from './Tag';

type CreditsTagProps = {
  credits: number;
  dataTestId: string;
};

const CreditsTag: FC<CreditsTagProps> = ({ credits, dataTestId }) => {
  const t = useTranslations('Commons');

  return (
    <Tag
      variant="secondary"
      data-testid={dataTestId}
      className="font-medium"
    >
      {credits}
      {' '}
      {t('credits')}
    </Tag>
  );
};

export default CreditsTag;
