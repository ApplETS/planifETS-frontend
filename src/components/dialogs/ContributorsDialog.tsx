'use client';

import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/ui/dialog';

type Contributor = {
  login: string;
  avatar_url: string;
  html_url: string;
};

export default function ContributorsDialog({
  open,
  onOpenChange,
}: Readonly<{ open: boolean; onOpenChange: (open: boolean) => void }>) {
  const t = useTranslations('Navbar');
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'loaded'>('idle');

  useEffect(() => {
    if (!open || status !== 'idle') {
      return;
    }

    const loadContributors = async () => {
      setStatus('loading');
      try {
        const response = await fetch('/api/contributors');
        if (!response.ok) {
          throw new Error('Request failed');
        }
        setContributors(await response.json());
        setStatus('loaded');
      } catch {
        setStatus('error');
      }
    };

    void loadContributors();
  }, [open, status]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(80vh,42rem)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('contributors-title')}</DialogTitle>
          <DialogDescription>{t('contributors-description')}</DialogDescription>
        </DialogHeader>
        <div className="-mx-6 overflow-y-auto px-6 scrollbar-thin">
          {status === 'loading' && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              {t('contributors-loading')}
            </p>
          )}
          {status === 'error' && (
            <div className="py-8 text-center">
              <p className="text-sm text-muted-foreground">{t('contributors-error')}</p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-2 text-sm font-medium underline underline-offset-4"
              >
                {t('contributors-retry')}
              </button>
            </div>
          )}
          {status === 'loaded' && contributors.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              {t('contributors-empty')}
            </p>
          )}
          {status === 'loaded' && contributors.length > 0 && (
            <ol className="divide-y divide-border">
              {contributors.map((contributor) => (
                <li
                  key={contributor.login}
                  className="flex items-center gap-3 py-3"
                >
                  <Image
                    src={contributor.avatar_url}
                    alt=""
                    width={36}
                    height={36}
                    className="size-9 rounded-full border border-border"
                    unoptimized
                  />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">
                    {contributor.login}
                  </span>
                  <a
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('view-github-profile', { login: contributor.login })}
                    className="inline-flex shrink-0 items-center gap-1 rounded-sm text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    GitHub
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
