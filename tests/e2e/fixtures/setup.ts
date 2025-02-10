import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { selectors } from '../../assets/selectors';

export const setupProgramAndSearch = async (page: Page, courseCode: string) => {
  // Select program first
  const programSelect = page.locator(selectors.programSelect);

  await expect(programSelect).toBeVisible({ timeout: 15000 });

  await programSelect.click();

  const firstOption = page.getByRole('option').first();

  await expect(firstOption).toBeVisible({ timeout: 15000 });

  await firstOption.click();

  await expect(firstOption).toBeHidden();

  // Search for the course
  const searchInput = page.locator(selectors.searchInput);

  await expect(searchInput).toBeVisible({ timeout: 15000 });

  await searchInput.fill(courseCode);
  await searchInput.press('Enter');

  // Return the course card
  const courseCard = page.locator(selectors.courseCard(courseCode));

  await expect(courseCard).toBeVisible({ timeout: 15000 });

  return courseCard;
};

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
