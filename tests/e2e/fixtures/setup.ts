import type { Page } from '@playwright/test';

export const setupTestPage = async (page: Page) => {
  await page.goto('/planner');
  await page.waitForLoadState('domcontentloaded');

  // Disable animations for faster tests
  if (process.env.CI) {
    await page.addStyleTag({
      content: `* { transition: none !important; animation: none !important; }`,
    });
  }
};
