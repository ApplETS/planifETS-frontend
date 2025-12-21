import { expect, test } from '@playwright/test';
import { selectors } from '../../assets/selectors';
import { selectProgram } from '../fixtures/program';
import { setupTestPage } from '../fixtures/setup';

test.describe('Global Course Search', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
    await selectProgram(page);
  });

  test('renders link in empty state when no local results and triggers search on click', async ({ page }) => {
    // Use a query that yields no local results
    const searchInput = page.locator(selectors.searchInput);
    await searchInput.fill('ZZZ_NOT_FOUND');

    const linkContainer = page.locator(selectors.globalSearchLink);

    await expect(linkContainer).toBeVisible({ timeout: 30000 });

    const button = page.locator(selectors.globalSearchButton);
    await button.click();

    const noResultsMsg = page.getByText('No courses found in any program. Try a different search term.');

    await expect(noResultsMsg).toBeVisible({ timeout: 30000 });
  });

  test('displays global search results after API returns', async ({ page }) => {
    const searchInput = page.locator(selectors.searchInput);
    await searchInput.fill('MAT21');

    const button = page.locator(selectors.globalSearchButton);
    await button.click();

    // Wait for loading to finish
    await expect(page.getByText('Searching in all programs...')).toBeHidden({ timeout: 5000 });

    // Verify results are displayed (MAT210 should be in mock data)
    const courseCard = page.locator(selectors.courseCard('MAT210'));

    await expect(courseCard).toBeVisible({ timeout: 15000 });
  });

  test('clears global search when user types new query', async ({ page }) => {
    const searchInput = page.locator(selectors.searchInput);
    await searchInput.fill('MAT21');
    const button = page.locator(selectors.globalSearchButton);
    await button.click();

    await expect(page.getByText('Searching in all programs...')).toBeHidden({ timeout: 5000 });

    const courseCardMat = page.locator(selectors.courseCard('MAT210'));

    await expect(courseCardMat).toBeVisible({ timeout: 15000 });

    // Type additional characters to trigger auto-clear
    await searchInput.fill('LOG');

    const linkContainer = page.locator(selectors.globalSearchLink);

    await expect(linkContainer).toBeVisible({ timeout: 15000 });
  });

  test('clears global search when switching to favorites tab', async ({ page }) => {
    // Wait for initial courses to load
    await expect(page.locator(selectors.courseCardItem).first()).toBeVisible({ timeout: 15000 });

    // Count initial courses before search
    const initialCourseCount = await page.locator(selectors.courseCardItem).count();

    expect(initialCourseCount).toBeGreaterThan(0);

    const searchInput = page.locator(selectors.searchInput);
    await searchInput.fill('MAT21');
    const button = page.locator(selectors.globalSearchButton);
    await button.click();

    await expect(page.getByText('Searching in all programs...')).toBeHidden({ timeout: 5000 });

    const favoritesTab = page.locator(selectors.favoritesTab);
    await favoritesTab.click();

    const coursesTab = page.locator(selectors.coursesTab);
    await coursesTab.click();

    // Verify search input was cleared and course count matches initial
    await expect(searchInput).toHaveValue('');

    const finalCourseCount = await page.locator(selectors.courseCardItem).count();

    expect(finalCourseCount).toBeGreaterThan(0);
    expect(finalCourseCount).toBe(initialCourseCount);
  });

  test('does not show global search link on favorites tab', async ({ page }) => {
    const searchInput = page.locator(selectors.searchInput);
    await searchInput.fill('LOG');

    const favoritesTab = page.locator(selectors.favoritesTab);
    await favoritesTab.click();

    const linkContainer = page.locator(selectors.globalSearchLink);

    await expect(linkContainer).toBeHidden({ timeout: 5000 });
  });

  test('hides global search link when search is cleared', async ({ page }) => {
    const searchInput = page.locator(selectors.searchInput);
    await searchInput.fill('LOG');

    const linkContainer = page.locator(selectors.globalSearchLink);

    await expect(linkContainer).toBeVisible({ timeout: 15000 });

    await searchInput.clear();

    await expect(linkContainer).toBeHidden({ timeout: 5000 });
  });
});
