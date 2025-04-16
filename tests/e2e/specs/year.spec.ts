import { expect, test } from '@playwright/test';
import { SessionEnum } from '../../../src/types/session';
import { selectors } from '../../assets/selectors';
import { selectProgram } from '../fixtures/program';
import { setupTestPage } from '../fixtures/setup';

test.describe('Year Management', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
    await selectProgram(page);
  });

  test('should add a new year when clicking the add year button', async ({ page }) => {
    // Get the initial years
    const initialYearSections = await page.locator(selectors.yearSection()).all();
    const initialYears = await Promise.all(
      initialYearSections.map(async (section) => {
        const yearTestId = await section.getAttribute('data-testid');
        const match = yearTestId?.match(selectors.extractYearFromSection);
        return match ? Number.parseInt(match[1], 10) : 0;
      }),
    );

    expect(initialYears.length).toBe(4);

    const initialMaxYear = Math.max(...initialYears);
    const expectedNewYear = initialMaxYear + 1;

    await page.click(selectors.addYearButton);

    const updatedYearSections = await page.locator(selectors.yearSection()).all();

    expect(updatedYearSections.length).toBe(initialYearSections.length + 1);

    const newYearSection = page.locator(selectors.yearSection(expectedNewYear));

    await expect(newYearSection).toBeVisible();
  });

  test('should add 3 sessions', async ({ page }) => {
    await page.click(selectors.addYearButton);

    const yearSections = await page.locator(selectors.yearSection()).all();
    const lastYearSection = yearSections[yearSections.length - 1];

    const yearTestId = await lastYearSection.getAttribute('data-testid');
    const match = yearTestId?.match(selectors.extractYearFromSection);

    expect(match).toBeTruthy();

    // eslint-disable-next-line playwright/no-conditional-in-test
    const year = match ? Number.parseInt(match[1], 10) : 0;

    expect(year).toBeGreaterThan(0);

    await expect(page.locator(selectors.yearSection(year))).toBeVisible();

    await expect(page.locator(selectors.sessionDropTarget(SessionEnum.H, year))).toHaveCount(1);
    await expect(page.locator(selectors.sessionDropTarget(SessionEnum.E, year))).toHaveCount(1);
    await expect(page.locator(selectors.sessionDropTarget(SessionEnum.A, year))).toHaveCount(1);
  });
});
