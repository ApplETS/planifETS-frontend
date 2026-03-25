import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { selectors } from '../../assets/selectors';
import {
  COURSE_DETAILS_ASSERTION_TIMEOUT,
  expectCourseMetadata,
  expectProgramSelectionRequired,
  expectSelectedCourse,
  openCourseDetailsPage,
  openCourseSearchPage,
  openProgramSelector,
  searchCourseAndWaitForDetails,
  selectProgramInCourseDetails,
  waitForCourseDetailsResponse,
} from '../fixtures/courseDetails';
import { getMessages } from '../fixtures/language';
import { setupTestPage } from '../fixtures/setup';

const LOG210_COURSE_ID = 352413;
const MEC111_COURSE_ID = 352716;
const LOG240_COURSE_ID = 352421;
const SOFTWARE_PROGRAM_ID = 182848;
const AEROSPACE_PROGRAM_ID = 738518;

const SOFTWARE_PROGRAM_LABEL = '7084 - Baccalauréat en génie logiciel';
const IT_PROGRAM_LABEL = '7086 - Baccalauréat en génie des technologies de l’information';
const AEROSPACE_PROGRAM_LABEL = '6522 - Baccalauréat en génie aérospatial';
const NO_PREREQUISITES_MESSAGE = 'No prerequisites are listed for this course.';

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

    await expect(page).toHaveURL(/\/course$/, COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(page.getByTestId('course-details-page-title')).toHaveText(
      courseDetailsMessages.pageTitle,
      COURSE_DETAILS_ASSERTION_TIMEOUT,
    );
    await expect(page.getByTestId('course-details-empty-description')).toHaveText(
      courseDetailsMessages.pageDescription,
      COURSE_DETAILS_ASSERTION_TIMEOUT,
    );
    await expect(programSelect).toHaveCount(0, COURSE_DETAILS_ASSERTION_TIMEOUT);

    await searchCourseAndWaitForDetails(page, 'LOG', LOG240_COURSE_ID, SOFTWARE_PROGRAM_ID);

    await expectSelectedCourse(page, {
      courseCode: 'LOG240',
      courseId: LOG240_COURSE_ID,
      programLabel: SOFTWARE_PROGRAM_LABEL,
    });
  });

  test('shows a dedicated invalid state for malformed course ids', async ({ page }) => {
    await page.goto('/course/waka-waka');

    const programSelect = page.locator(selectors.courseDetailsProgramSelect);

    await expect(page).toHaveURL(/\/course\/waka-waka$/, COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(page.getByTestId('course-details-invalid-description')).toHaveText(
      courseDetailsMessages.invalidCourse,
      COURSE_DETAILS_ASSERTION_TIMEOUT,
    );
    await expect(programSelect).toHaveCount(0, COURSE_DETAILS_ASSERTION_TIMEOUT);
  });

  test('shows a simple empty state when no programs are found for a course id', async ({ page }) => {
    await page.goto('/course/999999');

    const programSelect = page.locator(selectors.courseDetailsProgramSelect);

    await expect(page).toHaveURL(/\/course\/999999$/, COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(page.getByTestId('course-details-no-programs-description')).toHaveText(
      courseDetailsMessages.noPrograms,
      COURSE_DETAILS_ASSERTION_TIMEOUT,
    );
    await expect(programSelect).toHaveCount(0, COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(page.getByTestId('course-details-code')).toHaveCount(0, COURSE_DETAILS_ASSERTION_TIMEOUT);
  });

  test('loads LOG210 with programs, prerequisites, and offerings', async ({ page }) => {
    await openCourseDetailsPage(page, LOG210_COURSE_ID);

    await expect(page.getByTestId('course-details-code')).toHaveText('LOG210', COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(page.getByTestId('course-details-title')).toHaveText(
      'Analyse et conception de logiciels',
      COURSE_DETAILS_ASSERTION_TIMEOUT,
    );

    await expectCourseMetadata(page, getRequirementTypeLabel('TRONC'), getTypicalSessionLabel(3));

    await expect(page.getByText('LOG121')).toHaveCount(2, COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(page.getByText('Conception orientée objet')).toBeVisible(COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(page.getByText(courseDetailsMessages.unstructuredPrerequisiteRule)).toBeVisible(
      COURSE_DETAILS_ASSERTION_TIMEOUT,
    );
    await expect(page.getByTestId('course-details-unstructured-prerequisite')).toContainText(
      'LOG121',
      COURSE_DETAILS_ASSERTION_TIMEOUT,
    );
    await expect(page.getByRole('heading', { name: courseDetailsMessages.courseOffering })).toBeVisible(
      COURSE_DETAILS_ASSERTION_TIMEOUT,
    );
    await expect(page.locator(selectors.courseOffering('H2026'))).toContainText('H26', COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(page.locator(selectors.courseOffering('E2026'))).toContainText('E26', COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(page.locator(selectors.courseOffering('A2026'))).toContainText('A26', COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(page.locator(selectors.courseOffering('H2027'))).toContainText('H27', COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(getOfferingAvailabilityLocator(page, 'H2026', 'JOUR')).toBeVisible(COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(getOfferingAvailabilityLocator(page, 'H2026', 'SOIR')).toBeVisible(COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(getOfferingAvailabilityLocator(page, 'E2026', 'JOUR')).toBeVisible(COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(getOfferingAvailabilityLocator(page, 'E2026', 'SOIR')).toHaveCount(0, COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(getOfferingAvailabilityLocator(page, 'A2026', 'JOUR')).toBeVisible(COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(getOfferingAvailabilityLocator(page, 'A2026', 'SOIR')).toHaveCount(0, COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(getOfferingAvailabilityLocator(page, 'H2027', 'JOUR')).toBeVisible(COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(getOfferingAvailabilityLocator(page, 'H2027', 'SOIR')).toBeVisible(COURSE_DETAILS_ASSERTION_TIMEOUT);

    await openProgramSelector(page);

    await expect(page.getByRole('option', { name: SOFTWARE_PROGRAM_LABEL })).toBeVisible(
      COURSE_DETAILS_ASSERTION_TIMEOUT,
    );
    await expect(page.getByRole('option', { name: IT_PROGRAM_LABEL })).toBeVisible(COURSE_DETAILS_ASSERTION_TIMEOUT);
  });

  test('requires a valid program for MEC111 without changing the planner selection', async ({ page }) => {
    await openCourseDetailsPage(page, MEC111_COURSE_ID);

    const programSelect = page.locator(selectors.courseDetailsProgramSelect);

    await expectProgramSelectionRequired(page, courseDetailsMessages.selectProgramDescription);

    const mec111Request = waitForCourseDetailsResponse(page, MEC111_COURSE_ID, AEROSPACE_PROGRAM_ID);
    await selectProgramInCourseDetails(page, AEROSPACE_PROGRAM_LABEL);
    await mec111Request;

    await expect(programSelect).toContainText(AEROSPACE_PROGRAM_LABEL, COURSE_DETAILS_ASSERTION_TIMEOUT);

    await expectCourseMetadata(page, getRequirementTypeLabel('TRONC'), getTypicalSessionLabel(1));

    await expect(page.getByTestId('course-details-code')).toHaveText('MEC111', COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(page.getByText(NO_PREREQUISITES_MESSAGE)).toBeVisible(COURSE_DETAILS_ASSERTION_TIMEOUT);

    await page.reload();

    await expectProgramSelectionRequired(page, courseDetailsMessages.selectProgramDescription);

    await searchCourseAndWaitForDetails(page, 'LOG', LOG240_COURSE_ID, SOFTWARE_PROGRAM_ID);

    await expectSelectedCourse(page, {
      courseHeading: 'LOG240',
      courseId: LOG240_COURSE_ID,
      programLabel: SOFTWARE_PROGRAM_LABEL,
    });
  });

  test('renders LOG240 structured and unstructured prerequisites', async ({ page }) => {
    await openCourseDetailsPage(page, LOG240_COURSE_ID);

    const programSelect = page.locator(selectors.courseDetailsProgramSelect);

    await expect(page.getByRole('heading', { name: 'LOG240' })).toBeVisible(COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(programSelect).toContainText(SOFTWARE_PROGRAM_LABEL, COURSE_DETAILS_ASSERTION_TIMEOUT);

    await expectCourseMetadata(page, getRequirementTypeLabel('TRONC'), getTypicalSessionLabel(3));

    await expect(page.getByText('LOG100')).toHaveCount(2, COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(page.getByText('Programmation et réseautique en génie logiciel')).toBeVisible(
      COURSE_DETAILS_ASSERTION_TIMEOUT,
    );
    await expect(page.getByText(courseDetailsMessages.unstructuredPrerequisiteRule)).toBeVisible(
      COURSE_DETAILS_ASSERTION_TIMEOUT,
    );
    await expect(page.getByTestId('course-details-unstructured-prerequisite')).toContainText(
      'LOG100',
      COURSE_DETAILS_ASSERTION_TIMEOUT,
    );
    await expect(page.locator(selectors.courseOffering('H2026'))).toContainText('H26', COURSE_DETAILS_ASSERTION_TIMEOUT);
  });

  test('searches for another course from the details page and keeps the selected program when available', async ({ page }) => {
    await openCourseDetailsPage(page, LOG210_COURSE_ID);

    const programSelect = page.locator(selectors.courseDetailsProgramSelect);

    await expect(programSelect).toContainText(SOFTWARE_PROGRAM_LABEL, COURSE_DETAILS_ASSERTION_TIMEOUT);
    await expect(page.getByRole('heading', { name: 'LOG210' })).toBeVisible(COURSE_DETAILS_ASSERTION_TIMEOUT);

    await searchCourseAndWaitForDetails(page, 'LOG', LOG240_COURSE_ID, SOFTWARE_PROGRAM_ID);

    await expectSelectedCourse(page, {
      courseHeading: 'LOG240',
      courseId: LOG240_COURSE_ID,
      courseTitle: 'Tests et maintenance',
      programLabel: SOFTWARE_PROGRAM_LABEL,
    });

    await expect(page.getByText('Programmation et réseautique en génie logiciel')).toBeVisible(
      COURSE_DETAILS_ASSERTION_TIMEOUT,
    );
  });
});
