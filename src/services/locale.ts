'use server';

import type { Locale } from '@/i18n/config';
import { defaultLocale, locales } from '@/i18n/config';

import { cookies } from 'next/headers';

const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
  const browserLanguage = navigator.language || navigator.languages[0];
  const userLocale: Locale = locales.includes(browserLanguage as Locale) ? (browserLanguage as Locale) : defaultLocale;

  const cookieValue = (await cookies()).get(COOKIE_NAME)?.value;
  return cookieValue ?? userLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
