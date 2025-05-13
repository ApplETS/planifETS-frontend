'use client';

import type { FC } from 'react';

type TagProps = {
  text: string;
};

const Tag: FC<TagProps> = ({ text }) => (
  <span className="rounded-[5px] border border-favoris bg-primary px-2 py-1 text-xs text--primary-foreground">
    {text}
  </span>
);

export default Tag;
