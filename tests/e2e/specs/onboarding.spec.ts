import { expect, test } from '@playwright/test';
import { selectors } from '../../assets/selectors';
import enableMockApi from '../fixtures/mock';
import completeOnboarding from '../fixtures/onboarding';
import { expectYear } from '../fixtures/session';

const CURRENT_YEAR = new Date().getFullYear();

test.describe('Onboarding', () => {
  test.beforeEach(async ({ page }) => {
    enableMockApi(page);
    await page.goto('/planner');
    await page.waitForLoadState('domcontentloaded');
  });

  test.describe('Admission Year Sessions Creation', () => {
    test('creates sessions for future admission year', async ({ page }) => {
      // Set admission year to a future year and complete onboarding
      const lastYear = CURRENT_YEAR - 1;
      const futureYear = CURRENT_YEAR + 1;

      await completeOnboarding(
        page,
        'Baccalauréat en génie logiciel',
        '182848',
        futureYear,
      );

      await expectYear(page, lastYear, 0);
      await expectYear(page, CURRENT_YEAR, 0);
      await expectYear(page, futureYear);

      // Simple assertion to mark test as passed
      expect(true).toBeTruthy();
    });

    test('admission year 5 years ago creates all intermediate years', async ({ page }) => {
      const admissionYear = CURRENT_YEAR - 5;

      await completeOnboarding(page, 'Baccalauréat en génie logiciel', '182848', admissionYear);

      for (let y = admissionYear; y <= CURRENT_YEAR; y++) {
        await expectYear(page, y);
      }

      // years outside range should not have sessions (one before, one after)
      await expectYear(page, admissionYear - 1, 0);
      await expectYear(page, CURRENT_YEAR + 1, 0);

      expect(true).toBeTruthy();
    });

    test('admission year this year creates only this year', async ({ page }) => {
      await completeOnboarding(page, 'Baccalauréat en génie logiciel', '182848', CURRENT_YEAR);

      await expectYear(page, CURRENT_YEAR);
      await expectYear(page, CURRENT_YEAR - 1, 0);
      await expectYear(page, CURRENT_YEAR + 1, 0);

      expect(true).toBeTruthy();
    });
  });

  test.describe('Onboarding Input Validation', () => {
    test('complete button disabled when admission year is more than 1 year in future', async ({ page }) => {
      const tooFar = CURRENT_YEAR + 2;

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
      await page.fill(selectors.admissionYearInput, String(CURRENT_YEAR));

      const completeButton = page.locator(selectors.onboardingCompleteButton);

      await expect(completeButton).toBeVisible({ timeout: 15000 });
      await expect(completeButton).toBeDisabled();
    });
  });
});
