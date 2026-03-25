import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { selectors } from '../../assets/selectors';

export const COURSE_DETAILS_ASSERTION_TIMEOUT = { timeout: 15000 };

type SelectedCourseAssertions = {
  courseCode?: string;
  courseHeading?: string;
  courseId: number;
  courseTitle?: string;
  programLabel: string;
};

export async function openCourseDetailsPage(page: Page, courseId: number) {
  await page.goto(`/course/${courseId}`);
}

export async function openCourseSearchPage(page: Page) {
  await page.goto('/course');
}

export async function selectProgramInCourseDetails(page: Page, programLabel: string) {
  const programSelect = page.locator(selectors.courseDetailsProgramSelect);
  await programSelect.click();

  // Ensure dropdown is rendered
  await page.getByRole('listbox').waitFor({ timeout: 15000 });

  await page.getByRole('option', { name: programLabel }).click();
}

export async function openProgramSelector(page: Page) {
  const programSelect = page.locator(selectors.courseDetailsProgramSelect);

  await programSelect.click();
  await page.getByRole('listbox').waitFor({ timeout: 15000 });
}

async function searchCourseFromCourseDetails(
  page: Page,
  query: string,
  courseId: number,
) {
  const searchInput = page.locator(selectors.courseDetailsSearchInput);
  await searchInput.fill(query);

  await page.locator(selectors.courseDetailsSearchOption(courseId)).click();
}

export const waitForCourseDetailsResponse = (
  page: Page,
  courseId: number,
  programId: number,
) => page.waitForResponse((response) => {
  const url = response.url();
  return response.status() === 200
    && url.includes('/api/program-courses/details')
    && url.includes(`courseId=${courseId}`)
    && url.includes(`programId=${programId}`);
});

export async function searchCourseAndWaitForDetails(
  page: Page,
  query: string,
  courseId: number,
  programId: number,
) {
  const detailsRequest = waitForCourseDetailsResponse(page, courseId, programId);
  await searchCourseFromCourseDetails(page, query, courseId);
  await detailsRequest;
}

function getCourseDetailLocators(page: Page) {
  return {
    requirementType: page.getByText(/Requirement type:/i),
    typicalSession: page.getByText(/typical session:/i),
  };
}

export async function expectCourseMetadata(
  page: Page,
  requirementTypeLabel: string,
  typicalSessionLabel: string,
) {
  const locators = getCourseDetailLocators(page);

  await expect(locators.requirementType).toHaveText(
    requirementTypeLabel,
    COURSE_DETAILS_ASSERTION_TIMEOUT,
  );
  await expect(locators.typicalSession).toHaveText(
    typicalSessionLabel,
    COURSE_DETAILS_ASSERTION_TIMEOUT,
  );
}

export async function expectProgramSelectionRequired(page: Page, description: string) {
  await expect(page.getByTestId('course-details-code')).toHaveCount(0, COURSE_DETAILS_ASSERTION_TIMEOUT);
  await expect(page.getByText(description).last()).toBeVisible(COURSE_DETAILS_ASSERTION_TIMEOUT);
}

export async function expectSelectedCourse(
  page: Page,
  { courseCode, courseHeading, courseId, courseTitle, programLabel }: SelectedCourseAssertions,
) {
  const programSelect = page.locator(selectors.courseDetailsProgramSelect);

  await expect(page).toHaveURL(new RegExp(`/course/${courseId}$`), COURSE_DETAILS_ASSERTION_TIMEOUT);
  await expect(programSelect).toContainText(programLabel, COURSE_DETAILS_ASSERTION_TIMEOUT);

  if (courseCode) {
    await expect(page.getByTestId('course-details-code')).toHaveText(
      courseCode,
      COURSE_DETAILS_ASSERTION_TIMEOUT,
    );
  }

  if (courseHeading) {
    await expect(page.getByRole('heading', { name: courseHeading })).toBeVisible(
      COURSE_DETAILS_ASSERTION_TIMEOUT,
    );
  }

  if (courseTitle) {
    await expect(page.getByTestId('course-details-title')).toHaveText(
      courseTitle,
      COURSE_DETAILS_ASSERTION_TIMEOUT,
    );
  }
}
