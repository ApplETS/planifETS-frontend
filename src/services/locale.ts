'use server';

import type { Locale } from '@/i18n/config';
import { cookies, headers } from 'next/headers';
import { defaultLocale, locales } from '@/i18n/config';

const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
  // Check for cookie first
  const cookieValue = (await cookies()).get(COOKIE_NAME)?.value;
  if (cookieValue && locales.includes(cookieValue as Locale)) {
    return cookieValue as Locale;
  }

  // Get Accept-Language header from the request on the server
  const headersList = headers();
  const acceptLanguage = (await headersList).get('accept-language');

  if (acceptLanguage) {
    // Parse the Accept-Language header
    const preferredLanguages = acceptLanguage.split(',')
      .map((lang: string) => {
        const parts = lang.split(';');
        return parts.length > 0 ? (parts[0]?.trim() || '') : '';
      });

    // Find the first language that matches the base language (e.g., 'en' in 'en-GB')
    for (const language of preferredLanguages) {
      const baseLanguage = language.split('-')[0];
      if (locales.includes(baseLanguage as Locale)) {
        return baseLanguage as Locale;
      }
    }
  }

  return defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale, {
    maxAge: 31536000, // 1 year
  });
}
