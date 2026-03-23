import { expect, test } from '@playwright/test';
import { selectors } from '../../assets/selectors';
import { searchCourseInSidebar } from '../fixtures/course';
import { selectProgram } from '../fixtures/program';
import { setupTestPage } from '../fixtures/setup';

const LOG_PROGRAM_ID = '182848';
const MEC_PROGRAM_ID = '182864';
const MEC_PROGRAM_NAME = 'Baccalauréat en génie mécanique';

test.describe('Program Course Cards', () => {
  test('should get valid list of program courses (courseCards) when selected one program', async ({ page }) => {
    await setupTestPage(page, {
      programName: MEC_PROGRAM_NAME,
      programId: MEC_PROGRAM_ID,
    });

    const programChips = page.locator(selectors.programChipItem);

    await expect(programChips).toHaveCount(1, { timeout: 15000 });
    await expect(page.locator(selectors.programChip(MEC_PROGRAM_ID))).toBeVisible();
    await expect(page.locator(selectors.programChip(LOG_PROGRAM_ID))).toHaveCount(0);

    await searchCourseInSidebar(page, 'MEC129');

    await expect(page.locator(selectors.courseCard('MEC129'))).toBeVisible({ timeout: 15000 });

    await searchCourseInSidebar(page, 'LOG121');

    await expect(page.locator(selectors.courseCard('LOG121'))).toHaveCount(0);
  });

  test('should not display any program courses (courseCards) when no program is selected', async ({ page }) => {
    await setupTestPage(page, {
      programName: MEC_PROGRAM_NAME,
      programId: MEC_PROGRAM_ID,
    });

    const programChips = page.locator(selectors.programChipItem);

    await expect(programChips).toHaveCount(1, { timeout: 15000 });
    await expect(page.locator(selectors.programChip(MEC_PROGRAM_ID))).toBeVisible();

    await searchCourseInSidebar(page, 'MEC129');

    await expect(page.locator(selectors.courseCard('MEC129'))).toBeVisible({ timeout: 15000 });

    await page.locator(selectors.programChipRemoveButton(MEC_PROGRAM_ID)).click();

    await expect(programChips).toHaveCount(0, { timeout: 15000 });
    await expect(page.locator(selectors.courseCardItem)).toHaveCount(0);
  });

  test('should get valid list of program courses (courseCards) when selected more than one program', async ({ page }) => {
    await setupTestPage(page);
    await selectProgram(page, MEC_PROGRAM_ID, MEC_PROGRAM_NAME);

    const programChips = page.locator(selectors.programChipItem);

    await expect(programChips).toHaveCount(2, { timeout: 15000 });
    await expect(page.locator(selectors.programChip(LOG_PROGRAM_ID))).toBeVisible();
    await expect(page.locator(selectors.programChip(MEC_PROGRAM_ID))).toBeVisible();

    await searchCourseInSidebar(page, '1');

    await expect(page.locator(selectors.courseCard('LOG121'))).toBeVisible({ timeout: 15000 });
    await expect(page.locator(selectors.courseCard('MEC129'))).toBeVisible({ timeout: 15000 });
  });
});
