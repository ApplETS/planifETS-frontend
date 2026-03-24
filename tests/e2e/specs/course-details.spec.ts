import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { selectors } from '../../assets/selectors';
import {
  getCourseDetailLocators,
  openCourseDetailsPage,
  openCourseSearchPage,
  openProgramSelector,
  searchCourseFromCourseDetails,
  selectProgramInCourseDetails,
} from '../fixtures/courseDetails';
import { getMessages } from '../fixtures/language';
import { setupTestPage } from '../fixtures/setup';

const LOG210_COURSE_ID = 352413;
const MEC111_COURSE_ID = 352716;
const LOG240_COURSE_ID = 352421;

const SOFTWARE_PROGRAM_LABEL = '7084 - Baccalauréat en génie logiciel';
const IT_PROGRAM_LABEL = '7086 - Baccalauréat en génie des technologies de l’information';
const AEROSPACE_PROGRAM_LABEL = '6522 - Baccalauréat en génie aérospatial';

const courseDetailsMessages = getMessages('en').CourseDetailsPage;
const getRequirementTypeLabel = (requirementType: string) =>
  `${courseDetailsMessages.requirementType}: ${requirementType}`;
const getTypicalSessionLabel = (sessionIndex: number) =>
  courseDetailsMessages.typicalSessionIndex.replace('{value}', String(sessionIndex));
const getOfferingAvailabilityLocator = (
  page: Page,
  sessionKey: string,
  availability: string,
) => page.locator(selectors.courseOfferingAvailability(sessionKey, availability));

test.describe('Course details page', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
  });

  test('loads /course without a selected course and lets the user search from there', async ({ page }) => {
    await openCourseSearchPage(page);

    const programSelect = page.locator(selectors.courseDetailsProgramSelect);

    await expect(page).toHaveURL(/\/course$/, { timeout: 15000 });
    await expect(page.getByTestId('course-details-page-title')).toHaveText(courseDetailsMessages.pageTitle, { timeout: 15000 });
    await expect(page.getByTestId('course-details-empty-description')).toHaveText(courseDetailsMessages.pageDescription, { timeout: 15000 });
    await expect(programSelect).toHaveCount(0);

    const detailsRequest = page.waitForResponse((response) => {
      const url = response.url();
      return response.status() === 200
        && url.includes('/api/program-courses/details')
        && url.includes(`courseId=${LOG240_COURSE_ID}`)
        && url.includes('programId=182848');
    });

    await searchCourseFromCourseDetails(page, 'LOG', LOG240_COURSE_ID);
    await detailsRequest;

    await expect(page).toHaveURL(new RegExp(`/course/${LOG240_COURSE_ID}$`), { timeout: 15000 });
    await expect(programSelect).toContainText(SOFTWARE_PROGRAM_LABEL, { timeout: 15000 });
    await expect(page.getByTestId('course-details-code')).toHaveText('LOG240', { timeout: 15000 });
  });

  test('shows a dedicated invalid state for malformed course ids', async ({ page }) => {
    await page.goto('/course/waka-waka');

    const programSelect = page.locator(selectors.courseDetailsProgramSelect);

    await expect(page).toHaveURL(/\/course\/waka-waka$/, { timeout: 15000 });
    await expect(page.getByTestId('course-details-invalid-description')).toHaveText(
      courseDetailsMessages.invalidCourse,
      { timeout: 15000 },
    );
    await expect(programSelect).toHaveCount(0);
  });

  test('shows a simple empty state when no programs are found for a course id', async ({ page }) => {
    await page.goto('/course/999999');

    const programSelect = page.locator(selectors.courseDetailsProgramSelect);

    await expect(page).toHaveURL(/\/course\/999999$/, { timeout: 15000 });
    await expect(page.getByTestId('course-details-no-programs-description')).toHaveText(
      courseDetailsMessages.noPrograms,
      { timeout: 15000 },
    );
    await expect(programSelect).toHaveCount(0);
    await expect(page.getByTestId('course-details-code')).toHaveCount(0);
  });

  test('loads LOG210 with programs, prerequisites, and offerings', async ({ page }) => {
    await openCourseDetailsPage(page, LOG210_COURSE_ID);

    const locators = getCourseDetailLocators(page);

    await expect(page.getByTestId('course-details-code')).toHaveText('LOG210', { timeout: 15000 });
    await expect(page.getByTestId('course-details-title')).toHaveText('Analyse et conception de logiciels', { timeout: 15000 });
    await expect(locators.requirementType).toHaveText(getRequirementTypeLabel('TRONC'), { timeout: 15000 });
    await expect(locators.typicalSession).toHaveText(getTypicalSessionLabel(3), { timeout: 15000 });
    await expect(page.getByText('LOG121')).toHaveCount(2, { timeout: 15000 });
    await expect(page.getByText('Conception orientée objet')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(courseDetailsMessages.unstructuredPrerequisiteRule)).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId('course-details-unstructured-prerequisite')).toContainText('LOG121', { timeout: 15000 });
    await expect(page.getByRole('heading', { name: courseDetailsMessages.courseOffering })).toBeVisible({ timeout: 15000 });
    await expect(page.locator(selectors.courseOffering('H2026'))).toContainText('H26', { timeout: 15000 });
    await expect(page.locator(selectors.courseOffering('E2026'))).toContainText('E26', { timeout: 15000 });
    await expect(page.locator(selectors.courseOffering('A2026'))).toContainText('A26', { timeout: 15000 });
    await expect(page.locator(selectors.courseOffering('H2027'))).toContainText('H27', { timeout: 15000 });
    await expect(getOfferingAvailabilityLocator(page, 'H2026', 'JOUR')).toBeVisible({ timeout: 15000 });
    await expect(getOfferingAvailabilityLocator(page, 'H2026', 'SOIR')).toBeVisible({ timeout: 15000 });
    await expect(getOfferingAvailabilityLocator(page, 'E2026', 'JOUR')).toBeVisible({ timeout: 15000 });
    await expect(getOfferingAvailabilityLocator(page, 'E2026', 'SOIR')).toHaveCount(0, { timeout: 15000 });
    await expect(getOfferingAvailabilityLocator(page, 'A2026', 'JOUR')).toBeVisible({ timeout: 15000 });
    await expect(getOfferingAvailabilityLocator(page, 'A2026', 'SOIR')).toHaveCount(0, { timeout: 15000 });
    await expect(getOfferingAvailabilityLocator(page, 'H2027', 'JOUR')).toBeVisible({ timeout: 15000 });
    await expect(getOfferingAvailabilityLocator(page, 'H2027', 'SOIR')).toBeVisible({ timeout: 15000 });

    await openProgramSelector(page);

    await expect(page.getByRole('option', { name: SOFTWARE_PROGRAM_LABEL })).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('option', { name: IT_PROGRAM_LABEL })).toBeVisible({ timeout: 15000 });
  });

  test('requires a valid program for MEC111 without changing the planner selection', async ({ page }) => {
    await openCourseDetailsPage(page, MEC111_COURSE_ID);

    const locators = getCourseDetailLocators(page);
    const programSelect = page.locator(selectors.courseDetailsProgramSelect);

    await expect(page.getByTestId('course-details-code')).toHaveCount(0, { timeout: 15000 });
    await expect(page.getByText(courseDetailsMessages.invalidProgram).last()).toBeVisible({ timeout: 15000 });

    const mec111Request = page.waitForResponse((response) => {
      const url = response.url();
      return response.status() === 200
        && url.includes('/api/program-courses/details')
        && url.includes(`courseId=${MEC111_COURSE_ID}`)
        && url.includes('programId=738518');
    });

    await selectProgramInCourseDetails(page, AEROSPACE_PROGRAM_LABEL);
    await mec111Request;

    await expect(programSelect).toContainText(AEROSPACE_PROGRAM_LABEL, { timeout: 15000 });
    await expect(locators.requirementType).toHaveText(getRequirementTypeLabel('TRONC'), { timeout: 15000 });
    await expect(locators.typicalSession).toHaveText(getTypicalSessionLabel(1), { timeout: 15000 });
    await expect(page.getByTestId('course-details-code')).toHaveText('MEC111', { timeout: 15000 });
    await expect(page.getByText('No prerequisites are listed for this course.')).toBeVisible({ timeout: 15000 });

    await page.reload();

    await expect(page.getByTestId('course-details-code')).toHaveCount(0, { timeout: 15000 });
    await expect(page.getByText(courseDetailsMessages.invalidProgram).last()).toBeVisible({ timeout: 15000 });

    const log240Request = page.waitForResponse((response) => {
      const url = response.url();
      return response.status() === 200
        && url.includes('/api/program-courses/details')
        && url.includes(`courseId=${LOG240_COURSE_ID}`)
        && url.includes('programId=182848');
    });

    await searchCourseFromCourseDetails(page, 'LOG', LOG240_COURSE_ID);
    await log240Request;

    await expect(page).toHaveURL(new RegExp(`/course/${LOG240_COURSE_ID}$`), { timeout: 15000 });
    await expect(programSelect).toContainText(SOFTWARE_PROGRAM_LABEL, { timeout: 15000 });
    await expect(page.getByRole('heading', { name: 'LOG240' })).toBeVisible({ timeout: 15000 });
  });

  test('renders LOG240 structured and unstructured prerequisites', async ({ page }) => {
    await openCourseDetailsPage(page, LOG240_COURSE_ID);

    const locators = getCourseDetailLocators(page);
    const programSelect = page.locator(selectors.courseDetailsProgramSelect);

    await expect(page.getByRole('heading', { name: 'LOG240' })).toBeVisible({ timeout: 15000 });
    await expect(programSelect).toContainText(SOFTWARE_PROGRAM_LABEL, { timeout: 15000 });
    await expect(locators.requirementType).toHaveText(getRequirementTypeLabel('TRONC'), { timeout: 15000 });
    await expect(locators.typicalSession).toHaveText(getTypicalSessionLabel(3), { timeout: 15000 });
    await expect(page.getByText('LOG100')).toHaveCount(2, { timeout: 15000 });
    await expect(page.getByText('Programmation et réseautique en génie logiciel')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(courseDetailsMessages.unstructuredPrerequisiteRule)).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId('course-details-unstructured-prerequisite')).toContainText('LOG100', { timeout: 15000 });
    await expect(page.locator(selectors.courseOffering('H2026'))).toContainText('H26', { timeout: 15000 });
  });

  test('searches for another course from the details page and keeps the selected program when available', async ({ page }) => {
    await openCourseDetailsPage(page, LOG210_COURSE_ID);

    const programSelect = page.locator(selectors.courseDetailsProgramSelect);

    await expect(programSelect).toContainText(SOFTWARE_PROGRAM_LABEL, { timeout: 15000 });
    await expect(page.getByRole('heading', { name: 'LOG210' })).toBeVisible({ timeout: 15000 });

    const detailsRequest = page.waitForResponse((response) => {
      const url = response.url();
      return response.status() === 200
        && url.includes('/api/program-courses/details')
        && url.includes(`courseId=${LOG240_COURSE_ID}`)
        && url.includes('programId=182848');
    });

    await searchCourseFromCourseDetails(page, 'LOG', LOG240_COURSE_ID);
    await detailsRequest;

    await expect(page).toHaveURL(new RegExp(`/course/${LOG240_COURSE_ID}$`), { timeout: 15000 });
    await expect(programSelect).toContainText(SOFTWARE_PROGRAM_LABEL, { timeout: 15000 });
    await expect(page.getByRole('heading', { name: 'LOG240' })).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId('course-details-title')).toHaveText('Tests et maintenance', { timeout: 15000 });
    await expect(page.getByText('Programmation et réseautique en génie logiciel')).toBeVisible({ timeout: 15000 });
  });
});
