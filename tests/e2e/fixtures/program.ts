import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { selectors } from '../../assets/selectors';

const PROGRAM_ID_LOG = '182848';
const PROGRAM_TITLE_LOG = 'Baccalauréat en génie logiciel';

export async function selectProgram(page: Page, programId: string = PROGRAM_ID_LOG, programTitle: string = PROGRAM_TITLE_LOG) {
  const programsSelect = page.locator(selectors.programsSelect);

  await expect(programsSelect).toBeVisible({ timeout: 15000 });

  // Focus the internal input so the cmdk/Command list opens and options render
  const input = programsSelect.locator('input');
  await input.focus();
  await input.click();

  // CommandItem doesn't always expose role=option; locate by visible text inside the select container
  const programOption = programsSelect.locator(`text=${programTitle}`);

  await expect(programOption).toBeVisible({ timeout: 15000 });

  await programOption.click();

  const programChip = page.locator(selectors.programChip(programId));

  await expect(programChip).toBeVisible({ timeout: 15000 });
}
