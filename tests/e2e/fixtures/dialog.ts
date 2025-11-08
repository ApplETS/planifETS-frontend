import type { Page } from '@playwright/test';

export async function closeDialog(page: Page): Promise<void> {
  return await page.keyboard.press('Escape');
}
