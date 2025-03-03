import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { selectors } from 'tests/assets/selectors';

const PROGRAM_CODE_LOG = '7084';
const PROGRAM_TITLE_LOG = 'Baccalauréat en génie logiciel';

export async function selectProgram(page: Page, programCode: string = PROGRAM_CODE_LOG, programTitle: string = PROGRAM_TITLE_LOG) {
  const programsSelect = page.locator(selectors.programsSelect);

  await expect(programsSelect).toBeVisible({ timeout: 15000 });

  await programsSelect.click();

  const programOption = page.getByRole('option', { name: programTitle });

  await expect(programOption).toBeVisible({ timeout: 15000 });

  await programOption.click();

  const programChip = page.locator(selectors.programChip(programCode));

  await expect(programChip).toBeVisible({ timeout: 15000 });
}
