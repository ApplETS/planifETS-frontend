import { expect, test } from '@playwright/test';
import { selectors } from '../../assets/selectors';
import { changeLanguage, getExpectedTranslation } from '../fixtures/language';
import { setupTestPage } from '../fixtures/setup';

test.describe('Language Settings', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
  });

  test('should translate search placeholder when changing language', async ({ page }) => {
    const searchInput = page.locator(selectors.searchInput);

    await expect(searchInput).toHaveAttribute(
      'placeholder',
      getExpectedTranslation('searchPlaceholder', 'en'),
    );

    await changeLanguage(page, 'fr');

    await expect(searchInput).toHaveAttribute(
      'placeholder',
      getExpectedTranslation('searchPlaceholder', 'fr'),
    );

    await changeLanguage(page, 'en');

    await expect(searchInput).toHaveAttribute(
      'placeholder',
      getExpectedTranslation('searchPlaceholder', 'en'),
    );
  });
});
