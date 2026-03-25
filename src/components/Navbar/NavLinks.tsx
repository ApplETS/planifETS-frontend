'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { navbarLinks } from '@/utils/routesUtil';

type NavLinksProps = {
  onNavigateAction?: () => void;
};

export default function NavLinks({ onNavigateAction }: NavLinksProps) {
  const t = useTranslations('Navbar');

  return (
    <>
      {navbarLinks.map((link) => (
        <Link
          key={link.key}
          href={link.href}
          className="flex items-center py-1 font-semibold text-foreground text-lg hover:text-primary hover:underline underline-offset-2"
          onClick={onNavigateAction}
        >
          {t(link.labelKey)}
        </Link>
      ))}
    </>
  );
}
