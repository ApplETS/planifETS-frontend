import { expect, test } from '@playwright/test';
import { selectors } from '../../assets/selectors';
import enableMockApi from '../fixtures/mock';
import completeOnboarding from '../fixtures/onboarding';
import { expectYear } from '../fixtures/session';

test.describe('Onboarding', () => {
  test.beforeEach(async ({ page }) => {
    enableMockApi(page);
    await page.goto('/planner');
    await page.waitForLoadState('domcontentloaded');
  });

  test.describe('Admission Year Sessions Creation', () => {
    test('creates sessions for future admission year', async ({ page }) => {
      // Set admission year to a future year (currentYear + 1) and complete onboarding
      const currentYear = new Date().getFullYear();
      const lastYear = currentYear - 1;
      const futureYear = currentYear + 1;

      await completeOnboarding(
        page,
        'Baccalauréat en génie logiciel',
        '182848',
        futureYear,
      );

      await expectYear(page, lastYear, 0);
      await expectYear(page, currentYear, 0);
      await expectYear(page, futureYear);

      // Simple assertion to mark test as passed
      expect(true).toBeTruthy();
    });

    test('admission year 5 years ago creates all intermediate years', async ({ page }) => {
      const currentYear = new Date().getFullYear();
      const admissionYear = currentYear - 5;

      await completeOnboarding(page, 'Baccalauréat en génie logiciel', '182848', admissionYear);

      for (let y = admissionYear; y <= currentYear; y++) {
        await expectYear(page, y);
      }

      // years outside range should not have sessions (one before, one after)
      await expectYear(page, admissionYear - 1, 0);
      await expectYear(page, currentYear + 1, 0);

      expect(true).toBeTruthy();
    });

    test('admission year this year creates only this year', async ({ page }) => {
      const currentYear = new Date().getFullYear();

      await completeOnboarding(page, 'Baccalauréat en génie logiciel', '182848', currentYear);

      await expectYear(page, currentYear);
      await expectYear(page, currentYear - 1, 0);
      await expectYear(page, currentYear + 1, 0);

      expect(true).toBeTruthy();
    });
  });

  test.describe('Onboarding Input Validation', () => {
    test('complete button disabled when admission year is more than 1 year in future', async ({ page }) => {
      const currentYear = new Date().getFullYear();
      const tooFar = currentYear + 2;

      // open dialog but do not select program
      const programsSelect = page.locator(selectors.programsSelect);

      await expect(programsSelect).toBeVisible({ timeout: 15000 });

      const input = programsSelect.locator('input');
      await input.focus();

      await page.fill(selectors.admissionYearInput, String(tooFar));

      const completeButton = page.locator(selectors.onboardingCompleteButton);

      await expect(completeButton).toBeVisible({ timeout: 15000 });
      await expect(completeButton).toBeDisabled();
    });

    test('cannot complete dialog with no selected programs', async ({ page }) => {
      const currentYear = new Date().getFullYear();
      await page.fill(selectors.admissionYearInput, String(currentYear));

      const completeButton = page.locator(selectors.onboardingCompleteButton);

      await expect(completeButton).toBeVisible({ timeout: 15000 });
      await expect(completeButton).toBeDisabled();
    });
  });
});
