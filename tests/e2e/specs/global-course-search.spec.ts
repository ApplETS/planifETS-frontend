import { expect, test } from '@playwright/test';
import { selectors } from '../../assets/selectors';
import { selectProgram } from '../fixtures/program';
import { setupTestPage } from '../fixtures/setup';

test.describe('Global Course Search Link', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
    await selectProgram(page);
  });

  test('renders link under list when local results exist and triggers search on click', async ({ page }) => {
    // Type a query that is expected to match locally
    const searchInput = page.locator(selectors.searchInput);
    await searchInput.fill('LOG');

    // Link should be visible below the list
    const linkContainer = page.getByTestId('global-search-link');

    await expect(linkContainer).toBeVisible({ timeout: 15000 });

    // Clicking should show the global search loading message
    const button = page.getByTestId('global-search-button');
    await button.click();

    await expect(page.getByText('Searching in all programs...')).toBeVisible({ timeout: 15000 });
  });

  test('renders link in empty state when no local results and triggers search on click', async ({ page }) => {
    // Use a query that yields no local results
    const searchInput = page.locator(selectors.searchInput);
    await searchInput.fill('ZZZ_NOT_FOUND');

    // Link should be visible in the empty state
    const linkContainer = page.getByTestId('global-search-link');

    await expect(linkContainer).toBeVisible({ timeout: 15000 });

    // Clicking should show the global search loading message
    const button = page.getByTestId('global-search-button');
    await button.click();

    await expect(page.getByText('Searching in all programs...')).toBeVisible({ timeout: 15000 });
  });
});
