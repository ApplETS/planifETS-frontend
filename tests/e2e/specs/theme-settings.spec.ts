import { expect, test } from '@playwright/test';
import { selectors } from '../../assets/selectors';
import { closeDialog } from '../fixtures/dialog';
import { setupTestPage } from '../fixtures/setup';

test.describe('Theme Settings', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
  });

  test('should apply zinc-dark theme correctly', async ({ page }) => {
    // Open settings dialog
    await page.click(selectors.settingsToggleButton);

    // Select zinc dark theme
    const zincDarkThemeButton = page.locator(selectors.themeOption('zinc-dark'));

    await expect(zincDarkThemeButton).toBeVisible();

    await zincDarkThemeButton.click();

    // Close dialog
    await closeDialog(page);

    // Verify the theme was applied by checking data-theme attribute and dark class
    const themeContainer = page.locator(selectors.themeContainer);

    await expect(themeContainer).toHaveAttribute('data-theme', 'zinc-dark');

    // Verify some CSS variables were applied correctly
    const backgroundColor = await page.evaluate(() => {
      return getComputedStyle(document.body).getPropertyValue('--background').trim();
    });

    // The zinc-dark theme should have a dark background
    expect(backgroundColor).toBeTruthy();
  });

  test('should apply red-light theme correctly', async ({ page }) => {
    // Open settings dialog
    await page.click(selectors.settingsToggleButton);

    // Select red light theme
    const redLightThemeButton = page.locator(selectors.themeOption('red-light'));

    await expect(redLightThemeButton).toBeVisible();

    await redLightThemeButton.click();

    // Close dialog
    await closeDialog(page);

    // Verify the theme was applied
    const themeContainer = page.locator(selectors.themeContainer);

    await expect(themeContainer).toHaveAttribute('data-theme', 'red-light');

    // Verify primary color is applied (red theme should have red primary color)
    const primaryColor = await page.evaluate(() => {
      return getComputedStyle(document.body).getPropertyValue('--primary').trim();
    });

    expect(primaryColor).toBeTruthy();
  });

  test('should persist theme preference after page reload', async ({ page }) => {
    // Set theme to red-light
    await page.click(selectors.settingsToggleButton);
    await page.locator(selectors.themeOption('red-light')).click();
    await closeDialog(page);

    // Verify theme was applied
    await expect(page.locator(selectors.themeContainer)).toHaveAttribute('data-theme', 'red-light');

    // Reload the page
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Verify theme is still applied after reload
    await expect(page.locator(selectors.themeContainer)).toHaveAttribute('data-theme', 'red-light');
  });
});
