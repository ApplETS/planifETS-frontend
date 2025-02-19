'use client';

import type { FC } from 'react';

type TagProps = {
  text: string;
};

const Tag: FC<TagProps> = ({ text }) => (
  <span className="rounded-[5px] border border-favoris bg-buttonTags px-2 py-1 text-xs text-textLightBackground">
    {text}
  </span>
);

export default Tag;
