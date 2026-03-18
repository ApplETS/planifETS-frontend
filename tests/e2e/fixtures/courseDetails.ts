import type { Page } from '@playwright/test';
import { selectors } from '../../assets/selectors';

export async function openCourseDetailsPage(page: Page, courseId: number) {
  await page.goto(`/course/${courseId}`);
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

export function getCourseDetailLocators(page: Page) {
  return {
    requirementType: page.getByText(/Requirement type:/i),
    typicalSession: page.getByText(/typical session:/i),
  };
}

export async function openCourseFromPlanner(page: Page, courseCode: string) {
  const searchInput = page.locator(selectors.searchInput);
  await searchInput.fill(courseCode);

  const courseCard = page.locator(selectors.courseCard(courseCode));
  await courseCard.waitFor({ timeout: 15000 });

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    courseCard.click(),
  ]);
}
