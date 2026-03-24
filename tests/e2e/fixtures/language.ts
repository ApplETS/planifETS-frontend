import type { Page } from '@playwright/test';
import enMessages from '@/messages/en.json';
import frMessages from '@/messages/fr.json';
import { selectors } from '../../assets/selectors';
import { closeDialog } from './dialog';

export type SupportedLocale = 'en' | 'fr';

const messagesByLocale = {
  en: enMessages,
  fr: frMessages,
} as const;

export const getMessages = (locale: SupportedLocale = 'en') => messagesByLocale[locale];

export async function changeLanguage(page: Page, locale: SupportedLocale): Promise<void> {
  await page.click(selectors.settingsToggleButton);
  await page.waitForSelector(selectors.settingsToggleButton, { state: 'visible' });

  await page.click(selectors.languageOption(locale));

  await closeDialog(page);

  await page.waitForLoadState('networkidle');
}
