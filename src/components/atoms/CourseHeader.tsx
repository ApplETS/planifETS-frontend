'use client';

import type { FC } from 'react';
import CreditsTag from './CreditsTag';

type CourseHeaderProps = {
  code: string;
  title: string;
  credits: number;
  dataTestid?: string;
};

const CourseHeader: FC<CourseHeaderProps> = ({ code, title, credits, dataTestid }) => (
  <div className="flex flex-col">
    <span className="font-semibold" data-testid={dataTestid}>
      {code}
      {' '}
      •
      <CreditsTag credits={credits} shortText={true} />
    </span>
    <span className="text-sx text-muted-foreground">{title}</span>
  </div>
);

export default CourseHeader;
