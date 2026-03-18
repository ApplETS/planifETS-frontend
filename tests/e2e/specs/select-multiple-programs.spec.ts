import { expect, test } from '@playwright/test';
import { selectors } from '../../assets/selectors';
import { selectProgram } from '../fixtures/program';
import { setupTestPage } from '../fixtures/setup';

// Select 4 distinct programs and ensure the planner reflects them all.
test.describe('Multiple Program Selection', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
  });

  test('can select multiple programs and see all selected chips', async ({ page }) => {
    await selectProgram(page, '182864', 'Baccalauréat en génie mécanique');
    await selectProgram(page, '182832', 'Baccalauréat en génie électrique');
    await selectProgram(page, '738518', 'Baccalauréat en génie aérospatial');

    const programChips = page.locator('[data-testid^="program-chip-"]');

    await expect(programChips).toHaveCount(4, { timeout: 15000 });

    for (const programId of ['182848', '182864', '182832', '738518']) {
      await expect(page.locator(selectors.programChip(programId))).toBeVisible();
    }
  });
});
