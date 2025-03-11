import type { Page } from '@playwright/test';
import { selectors } from '../../assets/selectors';

export type TranslationKey = 'searchPlaceholder';
type SupportedLocale = 'en' | 'fr';

export function getExpectedTranslation(key: TranslationKey, locale: SupportedLocale): string {
  const translations = {
    searchPlaceholder: {
      en: 'Search for a course',
      fr: 'Chercher un cours',
    },
  };

  return translations[key]?.[locale] || key;
}

export async function changeLanguage(page: Page, locale: SupportedLocale): Promise<void> {
  await page.click(selectors.settingsToggleButton);
  await page.waitForSelector(selectors.settingsToggleButton, { state: 'visible' });

  await page.click(selectors.languageOption(locale));

  await page.waitForLoadState('networkidle');
}
