'use client';

import type { FC, ReactNode } from 'react';
import CreditsTag from './CreditsTag';

type CourseHeaderProps = {
  code: string;
  title: string;
  credits: number;
  dataTestid?: string;
  actions?: ReactNode;
};

const CourseHeader: FC<CourseHeaderProps> = ({ code, title, credits, dataTestid, actions }) => (
  <div className="flex flex-col">
    <div className="flex items-start justify-between gap-2">
      <span
        className="font-semibold flex flex-col items-start gap-1 sm:flex-row sm:items-center"
        data-testid={dataTestid}
      >
        <span>{code}</span>
        <span className="flex items-center text-xs">
          •
          <CreditsTag credits={credits} shortText={true} />
        </span>
      </span>
      {actions ? <div className="flex items-center">{actions}</div> : null}
    </div>
    <span className="text-sm text-muted-foreground">{title}</span>
  </div>
);

export default CourseHeader;
