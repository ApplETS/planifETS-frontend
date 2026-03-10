'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function Footer() {
  const t = useTranslations('Footer');
  const linkClasses = 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors';

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
                {t('addressLabel', { default: 'Adresse' })}
              </h3>
              <address className="not-italic mt-2 text-gray-600 dark:text-gray-300">
                Local D-2020, 1100 rue Notre-Dame Ouest, Montréal, QC, H3C 1K3
              </address>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                {t('contactLabel', { default: 'Contact' })}
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
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <p className="mb-4 sm:mb-0 text-gray-500 dark:text-gray-400">Fait par le club ApplETS de l'École de technologie supérieure</p>
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
    </footer>
  );
}
