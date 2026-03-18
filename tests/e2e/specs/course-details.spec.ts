import { expect, test } from '@playwright/test';
import { selectors } from '../../assets/selectors';
import {
  getCourseDetailLocators,
  openCourseDetailsPage,
  openProgramSelector,
  selectProgramInCourseDetails,
} from '../fixtures/courseDetails';
import { setupTestPage } from '../fixtures/setup';

const LOG210_COURSE_ID = 352413;
const MEC111_COURSE_ID = 352716;
const LOG240_COURSE_ID = 352421;

const SOFTWARE_PROGRAM_LABEL = '7084 - Baccalauréat en génie logiciel';
const IT_PROGRAM_LABEL = '7086 - Baccalauréat en génie des technologies de l’information';
const MECHANICAL_PROGRAM_LABEL = '7684 - Baccalauréat en génie mécanique';
const AEROSPACE_PROGRAM_LABEL = '6522 - Baccalauréat en génie aérospatial';

test.describe('Course details page', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
  });

  test('loads LOG210 with programs, prerequisites, and offerings', async ({ page }) => {
    await openCourseDetailsPage(page, LOG210_COURSE_ID);

    const locators = getCourseDetailLocators(page);

    await expect(page.locator('h1', { hasText: 'LOG210' })).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Analyse et conception de logiciels')).toBeVisible({ timeout: 15000 });
    await expect(locators.requirementType).toHaveText('requirement type: TRONC', { timeout: 15000 });
    await expect(locators.typicalSession).toHaveText('typical session: 3/8', { timeout: 15000 });
    await expect(page.getByText('LOG121')).toHaveCount(2, { timeout: 15000 });
    await expect(page.getByText('Conception orientée objet')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Additional prerequisite rule')).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('heading', { name: 'Course offerings' })).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Winter 2026')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Summer 2026')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Autumn 2026')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Winter 2027')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('JOUR / SOIR')).toHaveCount(2, { timeout: 15000 });
    await expect(page.getByText('JOUR', { exact: true })).toHaveCount(2, { timeout: 15000 });

    await openProgramSelector(page);

    await expect(page.getByRole('option', { name: SOFTWARE_PROGRAM_LABEL })).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('option', { name: IT_PROGRAM_LABEL })).toBeVisible({ timeout: 15000 });
  });

  test('switches MEC111 between programs and persists the selected program after reload', async ({ page }) => {
    await openCourseDetailsPage(page, MEC111_COURSE_ID);

    const locators = getCourseDetailLocators(page);
    const programSelect = page.locator(selectors.courseDetailsProgramSelect);

    await expect(page.getByRole('heading', { name: 'MEC111' })).toBeVisible({ timeout: 15000 });
    await expect(programSelect).toContainText(MECHANICAL_PROGRAM_LABEL, { timeout: 15000 });
    await expect(locators.requirementType).toHaveText('requirement type: TRONC', { timeout: 15000 });
    await expect(locators.typicalSession).toHaveText('typical session: 1/8', { timeout: 15000 });
    await expect(page.getByText('No prerequisites are listed for this course.')).toBeVisible({ timeout: 15000 });

    const detailsRequest = page.waitForResponse((response) => {
      const url = response.url();
      return response.status() === 200
        && url.includes('/api/program-courses/details')
        && url.includes(`courseId=${MEC111_COURSE_ID}`)
        && url.includes('programId=738518');
    });

    await selectProgramInCourseDetails(page, AEROSPACE_PROGRAM_LABEL);
    await detailsRequest;

    await expect(programSelect).toContainText(AEROSPACE_PROGRAM_LABEL, { timeout: 15000 });
    await expect(locators.requirementType).toHaveText('requirement type: TRONC', { timeout: 15000 });
    await expect(locators.typicalSession).toHaveText('typical session: 1/8', { timeout: 15000 });
    await expect(page.getByText('MEC111')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('No prerequisites are listed for this course.')).toBeVisible({ timeout: 15000 });

    await page.reload();

    await expect(programSelect).toContainText(AEROSPACE_PROGRAM_LABEL, { timeout: 15000 });
    await expect(locators.requirementType).toHaveText('requirement type: TRONC', { timeout: 15000 });
    await expect(locators.typicalSession).toHaveText('typical session: 1/8', { timeout: 15000 });
    await expect(page.getByText('MEC111')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('No prerequisites are listed for this course.')).toBeVisible({ timeout: 15000 });
  });

  test('renders LOG240 structured and unstructured prerequisites', async ({ page }) => {
    await openCourseDetailsPage(page, LOG240_COURSE_ID);

    const locators = getCourseDetailLocators(page);
    const programSelect = page.locator(selectors.courseDetailsProgramSelect);

    await expect(page.getByRole('heading', { name: 'LOG240' })).toBeVisible({ timeout: 15000 });
    await expect(programSelect).toContainText(SOFTWARE_PROGRAM_LABEL, { timeout: 15000 });
    await expect(locators.requirementType).toHaveText('requirement type: TRONC', { timeout: 15000 });
    await expect(locators.typicalSession).toHaveText('typical session: 3/8', { timeout: 15000 });
    await expect(page.getByText('LOG100')).toHaveCount(2, { timeout: 15000 });
    await expect(page.getByText('Programmation et réseautique en génie logiciel')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Additional prerequisite rule')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Winter 2026')).toBeVisible({ timeout: 15000 });
  });
});
