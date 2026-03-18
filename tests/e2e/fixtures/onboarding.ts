import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { selectors } from '../../assets/selectors';

export default async function completeOnboarding(
  page: Page,
  programName: string = 'Baccalauréat en génie logiciel',
  programId?: string,
  admissionYear?: number,
) {
  const programsSelect = page.locator(selectors.programsSelect);

  await expect(programsSelect).toBeVisible({ timeout: 15000 });

  const input = programsSelect.locator('input');
  await input.focus();
  await input.fill(programName);

  const programOption = programsSelect.locator(`text=${programName}`);

  await expect(programOption).toBeVisible({ timeout: 15000 });

  await input.press('Enter');

  if (programId) {
    const programChip = page.locator(selectors.programChip(programId));

    await expect(programChip).toBeVisible({ timeout: 15000 });
  }

  if (admissionYear !== undefined) {
    await page.fill(selectors.admissionYearInput, String(admissionYear));
  }

  const completeButton = page.locator(selectors.onboardingCompleteButton);

  await expect(completeButton).toBeVisible({ timeout: 15000 });

  await completeButton.click();

  await expect(page).toHaveURL(/\/planner$/, { timeout: 15000 });
  await expect(page.locator(selectors.searchInput)).toBeVisible({ timeout: 15000 });
}
