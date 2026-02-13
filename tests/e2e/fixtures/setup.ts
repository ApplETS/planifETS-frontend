import type { Page } from '@playwright/test';
import { selectors } from '../../assets/selectors';
import enableMockApi from './mock';

export const setupTestPage = async (page: Page) => {
  enableMockApi(page);

  await page.goto('/planner');
  await page.waitForLoadState('domcontentloaded');

  // If onboarding dialog is shown in tests, select a default program and complete it
  try {
    const programsSelect = page.locator('[data-testid="programs-select"]');
    if ((await programsSelect.count()) > 0) {
      const input = programsSelect.locator('input');
      await input.focus();
      await input.fill('Baccalauréat en génie logiciel');
      await input.press('Enter');

      // Set admission year to ensure future sessions are shown
      const admissionYearInput = page.locator(selectors.admissionYearInput);
      await admissionYearInput.fill((new Date().getFullYear() - 2).toString());

      const completeButton = page.locator('[data-testid="onboarding-complete"]');
      await completeButton.click({ timeout: 5000 });
    }
  } catch {
    // ignore; if onboarding not present or interaction fails, continue
  }

  // Disable animations for faster tests
  if (process.env.CI) {
    await page.addStyleTag({
      content: `* { transition: none !important; animation: none !important; }`,
    });
  }
};
