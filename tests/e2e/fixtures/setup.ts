import type { Page } from '@playwright/test';
import enableMockApi from './mock';

export const setupTestPage = async (page: Page) => {
  enableMockApi(page);

  await page.goto('/planner');
  await page.waitForLoadState('domcontentloaded');

  // Disable animations for faster tests
  if (process.env.CI) {
    await page.addStyleTag({
      content: `* { transition: none !important; animation: none !important; }`,
    });
  }
};
