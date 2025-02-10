'use client';

import Image from 'next/image';
import React from 'react';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative -mt-16 min-h-screen bg-background text-textDarkBackground">
      {/* Logo */}
      <div className="absolute left-6 top-6 z-10 flex items-center">
        <span className="text-4xl font-bold text-textDarkBackground">Planif</span>
        <span className="text-4xl font-bold text-red-500">ETS</span>
      </div>

      {/* Decorative SVG Borders */}
      <Image
        priority={false}
        placeholder="empty"
        src="/topLeft.svg"
        alt=""
        width={64}
        height={64}
        className="absolute left-0 hidden size-64 [top:-50px] md:block"
      />
      <Image
        priority={false}
        placeholder="empty"
        src="/topRight.svg"
        alt=""
        width={64}
        height={64}
        className="absolute right-0 top-0 hidden size-64 md:block"
      />
      <Image
        priority={false}
        placeholder="empty"
        src="/bottomLeft.svg"
        alt=""
        width={64}
        height={64}
        className="absolute bottom-0 left-0 hidden size-64 md:block"
      />
      <Image
        priority={false}
        placeholder="empty"
        src="/bottomRight.svg"
        alt=""
        width={64}
        height={64}
        className="absolute bottom-0 right-0 hidden size-64 md:block"
      />

      {/* Main Content */}
      <div className="flex min-h-screen items-center justify-center px-4 md:px-0">
        {children}
      </div>
    </div>
  );
}
