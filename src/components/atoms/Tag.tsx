'use client';

import type { FC, ReactNode } from 'react';

type TagProps = {
  children: ReactNode;
};

const Tag: FC<TagProps> = ({ children }) => (
  <span className="rounded-[5px] border border-favoris bg-buttonTags px-2 py-1 text-xs text-textLightBackground">
    {children}
  </span>
);

export default Tag;
