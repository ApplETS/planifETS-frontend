'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';

type CreditsTagProps = {
  credits: number;
  dataTestId: string;
};

const CreditsTag: FC<CreditsTagProps> = ({ credits, dataTestId }) => {
  const t = useTranslations('Commons');

  return (
    <span
      className="text-sm text-muted-foreground justify-center flex items-center px-2 py-1"
      data-testid={dataTestId}
    >
      {credits}
      {' '}
      {t('credits')}
    </span>
  );
};

export default CreditsTag;
