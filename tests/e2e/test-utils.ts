import type { Page } from '@playwright/test';
import type { TestCourse } from '../assets/courses';
import { expect } from '@playwright/test';
import { selectors } from '../assets/selectors';

export async function addCourseToSession(
  page: Page,
  course: TestCourse,
) {
  const courseCard = await setupProgramAndSearch(page, course.code);
  const dropTarget = page.locator(
    selectors.sessionDropTarget(course.sessionName, course.sessionYear),
  );

  await expect(dropTarget).toBeVisible({ timeout: 15000 });

  await courseCard.dragTo(dropTarget);

  return page.locator(selectors.courseInSession(course.code));
}

export async function deleteCourse(
  page: Page,
  course: TestCourse,
) {
  const courseBox = page.locator(selectors.courseInSession(course.code));
  await courseBox.hover();

  const deleteButton = page.locator(
    selectors.courseDeleteButton(course.code, course.sessionName, course.sessionYear),
  );

  await expect(deleteButton).toBeVisible({ timeout: 15000 });

  await deleteButton.click();
}

async function setupProgramAndSearch(page: Page, courseCode: string) {
  // Select program first
  const programSelect = page.locator(selectors.programSelect);

  await expect(programSelect).toBeVisible({ timeout: 15000 });

  await programSelect.click();

  const firstOption = page.getByRole('option').first();

  await expect(firstOption).toBeVisible({ timeout: 15000 });

  await firstOption.click();

  await expect(firstOption).toBeHidden();

  // Then search for the course using SearchBar
  const searchInput = page.locator(selectors.searchInput);

  await expect(searchInput).toBeVisible({ timeout: 15000 });

  await searchInput.fill(courseCode);
  await searchInput.press('Enter');

  // Wait for and return the course card
  const courseCard = page.locator(selectors.courseCard(courseCode));

  await expect(courseCard).toBeVisible({ timeout: 15000 });

  return courseCard;
}
