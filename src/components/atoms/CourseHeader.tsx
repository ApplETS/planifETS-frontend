'use client';

import type { FC } from 'react';

type CourseHeaderProps = {
  code: string;
};

const CourseHeader: FC<CourseHeaderProps> = ({ code }) => (
  <div className="flex items-center">
    <span className="font-semibold">{code}</span>
  </div>
);

export default CourseHeader;
