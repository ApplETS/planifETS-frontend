import { expect, test } from '@playwright/test';
import { selectors } from '../../assets/selectors';
import { changeLanguage, getMessages } from '../fixtures/language';
import { setupTestPage } from '../fixtures/setup';

const englishMessages = getMessages('en');
const frenchMessages = getMessages('fr');

test.describe('Language Settings', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
  });

  test('should translate search placeholder when changing language', async ({ page }) => {
    const searchInput = page.locator(selectors.searchInput);

    await expect(searchInput).toBeVisible({ timeout: 15000 });

    await expect(searchInput).toHaveAttribute(
      'placeholder',
      englishMessages.PlannerPage['search-course'],
    );

    await changeLanguage(page, 'fr');

    await expect(searchInput).toHaveAttribute(
      'placeholder',
      frenchMessages.PlannerPage['search-course'],
    );

    await changeLanguage(page, 'en');

    await expect(searchInput).toHaveAttribute(
      'placeholder',
      englishMessages.PlannerPage['search-course'],
    );
  });
});
