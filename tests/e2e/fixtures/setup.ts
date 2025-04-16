import type { Locator, Page } from '@playwright/test';

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

export const simulateHover = async (element: Locator, waitTime = 500) => {
  // Force hover state using JavaScript
  await element.evaluate((el) => {
    const mouseenter = new MouseEvent('mouseenter', {
      bubbles: true,
      cancelable: true,
    });
    el.dispatchEvent(mouseenter);
  });

  await element.page().waitForTimeout(waitTime);
};
