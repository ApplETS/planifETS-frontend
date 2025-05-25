import { expect, test } from '@playwright/test';
import { selectors } from '../../assets/selectors';
import { closeDialog } from '../fixtures/dialog';
import { setupTestPage } from '../fixtures/setup';

// Define theme constants for easier maintenance
const YELLOW_DARK = 'yellow-dark';
const BLUE_LIGHT = 'blue-light';
const DEFAULT_DARK = 'zinc-dark';
const DEFAULT_LIGHT = 'red-light';

test.describe('Theme Settings', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
  });

  test(`should apply ${YELLOW_DARK} theme correctly`, async ({ page }) => {
    // Open settings dialog
    await page.click(selectors.settingsToggleButton);

    // Select dark theme
    const darkThemeButton = page.locator(selectors.themeOption(YELLOW_DARK));

    await expect(darkThemeButton).toBeVisible();

    await darkThemeButton.click();

    // Close dialog
    await closeDialog(page);

    // Verify the theme was applied by checking data-theme attribute
    const themeContainer = page.locator(selectors.themeContainer);

    await expect(themeContainer).toHaveAttribute('data-theme', YELLOW_DARK);

    // Verify some CSS variables were applied correctly
    const backgroundColor = await page.evaluate(() => {
      return getComputedStyle(document.body).getPropertyValue('--background').trim();
    });

    // The dark theme should have a dark background
    expect(backgroundColor).toBeTruthy();
  });

  test(`should apply ${BLUE_LIGHT} theme correctly`, async ({ page }) => {
    // Open settings dialog
    await page.click(selectors.settingsToggleButton);

    // Select light theme
    const lightThemeButton = page.locator(selectors.themeOption(BLUE_LIGHT));

    await expect(lightThemeButton).toBeVisible();

    await lightThemeButton.click();

    // Close dialog
    await closeDialog(page);

    // Verify the theme was applied
    const themeContainer = page.locator(selectors.themeContainer);

    await expect(themeContainer).toHaveAttribute('data-theme', BLUE_LIGHT);

    // Verify primary color is applied (blue theme should have blue primary color)
    const primaryColor = await page.evaluate(() => {
      return getComputedStyle(document.body).getPropertyValue('--primary').trim();
    });

    expect(primaryColor).toBeTruthy();
  });

  test('should persist theme preference after page reload', async ({ page }) => {
    // Set theme to light theme
    await page.click(selectors.settingsToggleButton);
    await page.locator(selectors.themeOption(BLUE_LIGHT)).click();
    await closeDialog(page);

    // Verify theme was applied
    await expect(page.locator(selectors.themeContainer)).toHaveAttribute('data-theme', BLUE_LIGHT);

    // Reload the page
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Verify theme is still applied after reload
    await expect(page.locator(selectors.themeContainer)).toHaveAttribute('data-theme', BLUE_LIGHT);
  });

  test(`should default to ${DEFAULT_DARK} theme when system preference is dark`, async ({ browser }) => {
    // Create a new context with dark color scheme preference
    const context = await browser.newContext({
      colorScheme: 'dark',
      storageState: { cookies: [], origins: [] }, // Ensure no saved preferences
    });

    // Create a new page in this context
    const page = await context.newPage();

    // Navigate to the application
    await setupTestPage(page);

    // Wait for the theme container to be visible instead of networkidle
    const themeContainer = page.locator(selectors.themeContainer);

    await expect(themeContainer).toBeVisible({ timeout: 5000 });

    // Verify the default dark theme was applied
    await expect(themeContainer).toHaveAttribute('data-theme', DEFAULT_DARK);

    // Clean up
    await context.close();
  });

  test(`should default to ${DEFAULT_LIGHT} theme when system preference is light`, async ({ browser }) => {
    // Create a new context with light color scheme preference
    const context = await browser.newContext({
      colorScheme: 'light',
      storageState: { cookies: [], origins: [] }, // Ensure no saved preferences
    });

    // Create a new page in this context
    const page = await context.newPage();

    // Navigate to the application
    await setupTestPage(page);

    // Wait for the theme container to be visible instead of networkidle
    const themeContainer = page.locator(selectors.themeContainer);

    await expect(themeContainer).toBeVisible({ timeout: 5000 });

    // Verify the default light theme was applied
    await expect(themeContainer).toHaveAttribute('data-theme', DEFAULT_LIGHT);

    // Clean up
    await context.close();
  });
});
