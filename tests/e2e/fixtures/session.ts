import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { selectors } from '../../assets/selectors';

// Expect exactly 3 session drop-target divs
export async function expectYear(page: Page, year: number, expectedSessionCount = 3) {
  const locator = page.locator(selectors.year(year));
  const count = await locator.count();

  expect(count).toBe(expectedSessionCount);
}
