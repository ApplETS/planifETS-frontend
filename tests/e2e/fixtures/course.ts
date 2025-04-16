import type { Page } from '@playwright/test';
import type { TestCourse } from '../../assets/courses';
import { expect } from '@playwright/test';
import { selectors } from '../../assets/selectors';
import { simulateHover } from './setup';

export async function searchCourseInSidebar(page: Page, courseCode: string) {
  const searchInput = page.locator(selectors.searchInput);

  await expect(searchInput).toBeVisible({ timeout: 15000 });

  await searchInput.fill(courseCode);
}

export async function getCourseCard(page: Page, courseCode: string) {
  const courseCard = page.locator(selectors.courseCard(courseCode));

  await expect(courseCard).toBeVisible({ timeout: 15000 });

  return courseCard;
}

export const addCourseToSession = async (
  page: Page,
  course: TestCourse,
) => {
  const courseCard = await getCourseCard(page, course.code);
  const dropTarget = page.locator(
    selectors.sessionDropTarget(course.sessionTerm, course.sessionYear),
  );

  await expect(dropTarget).toBeVisible({ timeout: 15000 });

  await courseCard.dragTo(dropTarget);

  return page.locator(selectors.courseInSession(course.code));
};

export const deleteCourse = async (
  page: Page,
  course: TestCourse,
) => {
  const courseBox = page.locator(selectors.courseInSession(course.code));

  await expect(courseBox).toBeVisible({ timeout: 15000 });

  await simulateHover(courseBox);

  const deleteButton = page.locator(
    selectors.courseDeleteButton(course.code, course.sessionTerm, course.sessionYear),
  );

  await expect(deleteButton).toBeVisible({ timeout: 15000 });

  await deleteButton.click();
};

export const moveCourseToSession = async (
  page: Page,
  course: TestCourse,
  targetSession: string,
  targetYear: number,
) => {
  const courseBox = page.locator(selectors.courseInSession(course.code));
  const dropTarget = page.locator(
    selectors.sessionDropTarget(targetSession, targetYear),
  );
  await courseBox.dragTo(dropTarget);

  await expect(courseBox).toBeVisible({ timeout: 15000 });
  await expect(dropTarget).toBeVisible({ timeout: 15000 });
};
