import type { Page } from '@playwright/test';
import type { TestCourse } from '../../assets/courses';
import { expect } from '@playwright/test';
import { selectors } from '../../assets/selectors';
import { setupProgramAndSearch } from './setup';

export const addCourseToSession = async (
  page: Page,
  course: TestCourse,
) => {
  const courseCard = await setupProgramAndSearch(page, course.code);
  const dropTarget = page.locator(
    selectors.sessionDropTarget(course.sessionName, course.year),
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
  await courseBox.hover();

  const deleteButton = page.locator(
    selectors.courseDeleteButton(course.code, course.sessionName, course.year),
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
