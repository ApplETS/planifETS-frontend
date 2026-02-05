'use client';

import type { FC } from 'react';

type CourseHeaderProps = {
  code: string;
  title: string;
};

const CourseHeader: FC<CourseHeaderProps> = ({ code, title }) => (
  <div className="flex flex-col">
    <span className="font-semibold">{code}</span>
    <span className="text-sm text-muted-foreground">{title}</span>
  </div>
);

export default CourseHeader;
