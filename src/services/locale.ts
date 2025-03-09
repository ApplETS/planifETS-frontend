'use server';

import type { Locale } from '@/i18n/config';
import { defaultLocale, locales } from '@/i18n/config';

import { cookies } from 'next/headers';

const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
  const cookieValue = (await cookies()).get(COOKIE_NAME)?.value;
  if (cookieValue) {
    return cookieValue;
  }

  if (typeof navigator !== 'undefined') {
    const browserLanguage = navigator.language || navigator.languages[0];
    return locales.includes(browserLanguage as Locale)
      ? (browserLanguage as Locale)
      : defaultLocale;
  }

  return defaultLocale;
}
