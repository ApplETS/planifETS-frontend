'use client';

import { AppWindow, Bug, Info, Server } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shadcn/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu';

const LINKS = {
  reportBug: 'https://github.com/ApplETS/planifETS-frontend/issues/new/choose',
  frontendSource: 'https://github.com/ApplETS/planifETS-frontend/',
  backendSource: 'https://github.com/ApplETS/planifETS-backend',
} as const;

export default function MoreOptionsButton({ iconOnly = false }: Readonly<{ iconOnly?: boolean }>) {
  const t = useTranslations('Navbar');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="normal-case flex items-center gap-1"
          aria-label={t('more-options')}
        >
          <Info className="size-4" />
          {!iconOnly && t('more-options')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[70]">
        <DropdownMenuItem asChild>
          <a href={LINKS.reportBug} target="_blank" rel="noopener noreferrer">
            <Bug className="mr-2 h-4 w-4" />
            {t('feedback')}
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={LINKS.frontendSource} target="_blank" rel="noopener noreferrer">
            <AppWindow className="mr-2 h-4 w-4" />
            {t('frontend-source-code')}
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={LINKS.backendSource} target="_blank" rel="noopener noreferrer">
            <Server className="mr-2 h-4 w-4" />
            {t('backend-source-code')}
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
