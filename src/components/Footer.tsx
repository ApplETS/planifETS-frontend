'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';

type BackendInfo = {
  gitSha: string | null;
  environment: string;
};

export function Footer() {
  const t = useTranslations('Footer');
  const linkClasses = 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors';
  const [backendInfo, setBackendInfo] = useState<BackendInfo | null>(null);

  useEffect(() => {
    apiClient
      .get<BackendInfo>(API_ENDPOINTS.INFO)
      .then((res) => {
        if (res.data) setBackendInfo(res.data);
      })
      .catch(() => {
        // silently ignore — info is non-critical
      });
  }, []);

  const frontendSha = process.env.NEXT_PUBLIC_APP_GIT_SHORT_SHA;
  const environment = process.env.NEXT_PUBLIC_APP_ENV;

  return (
    <footer className="bg-gray-100 text-gray-800 border-t border-gray-200 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800 not-prose" data-testid="site-footer">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row md:justify-between gap-12">
          <div>
            <a
              href="https://clubapplets.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <Image
                src="/appletsLogo.svg"
                alt="ApplETS logo"
                width={24}
                height={24}
                className="size-10 align-middle"
                loading="lazy"
              />
              <span className="text-xl font-semibold leading-none self-center">
                App|ETS
              </span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                {t('addressLabel')}
              </h3>
              <address className="not-italic mt-2 text-gray-600 dark:text-gray-300">
                Local D-2020, 1100 rue Notre-Dame Ouest, Montréal, QC, H3C 1K3
              </address>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                {t('contactLabel')}
              </h3>
              <a
                href="mailto:ApplETS@etsmtl.ca"
                className="mt-2 block text-gray-600 dark:text-gray-300 underline"
              >
                ApplETS@etsmtl.ca
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* lower band: copyright + social icons */}
      <div className="max-w-6xl mx-auto px-6 pt-6 pb-3 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <p className="mb-4 sm:mb-0 text-gray-500 dark:text-gray-400">
          {t('signature')}
        </p>
        <ul className="flex gap-6 text-sm">
          <li>
            <a
              href="https://github.com/ApplETS"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClasses}
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/ClubApplETS/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClasses}
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/company/applets/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClasses}
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://discord.gg/adMkWptn6Y"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClasses}
            >
              Discord
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/clubapplets/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClasses}
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>

      {/* build info band */}
      <div className="max-w-6xl mx-auto px-6 pb-3 flex justify-end">
        <p className="text-xs text-gray-400 dark:text-gray-600 font-mono">
          {environment && <span className="mr-3">{t('environment')}: {environment}</span>}
          <span className="mr-3">{t('frontend')}: {frontendSha ?? 'dev'}</span>
          <span>{t('backend')}: {backendInfo ? (backendInfo.gitSha ?? 'dev') : '…'}</span>
        </p>
      </div>
    </footer>
  );
}
