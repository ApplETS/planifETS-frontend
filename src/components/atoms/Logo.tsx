'use client';

import type { FC } from 'react';
import Link from 'next/link';

type LogoProps = {
  textSize?: string;
  position?: string;
};

const Logo: FC<LogoProps> = ({ textSize = 'text-4xl', position }) => (
  <div className={`${position} flex items-center select-none`}>
    <Link href="/" className="flex items-center">
      <span className={`${textSize} font-bold text-foreground`}>Planif</span>
      <span className={`${textSize} font-bold text-red-500`}>ETS</span>
    </Link>
  </div>
);

export default Logo;
