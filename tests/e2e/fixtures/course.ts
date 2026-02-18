import type { Locator, Page } from '@playwright/test';
import type { TestCourse } from '../../assets/courses';
import type { TermEnum } from '@/types/session';
import { expect } from '@playwright/test';
import { selectors } from '../../assets/selectors';
import { reliableDragAndDrop } from './dnd';

export async function searchCourseInSidebar(page: Page, courseCode: string): Promise<void> {
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
): Promise<Locator> => {
  const courseCard = await getCourseCard(page, course.code);

  await expect(courseCard).toBeVisible({ timeout: 15000 });

  const dropTarget = page.locator(
    selectors.sessionDropTarget(course.sessionTerm, course.sessionYear),
  );

  await expect(dropTarget).toBeVisible({ timeout: 15000 });

  await dropTarget.scrollIntoViewIfNeeded();

  const courseBox = page.locator(selectors.courseInSession(course.code));

  await reliableDragAndDrop(page, courseCard, dropTarget, courseBox);

  await expect(courseBox).toBeVisible({ timeout: 25000 });

  return courseBox;
};

export const deleteCourse = async (
  page: Page,
  course: TestCourse,
): Promise<void> => {
  await page.mouse.move(0, 0);
  await page.waitForTimeout(200);

  const courseBox = page.locator(selectors.courseInSession(course.code));
  await courseBox.scrollIntoViewIfNeeded();

  await courseBox.hover({ force: true, timeout: 2000 });

  const deleteButtonSelector = selectors.courseDeleteButton(course.code, course.sessionTerm, course.sessionYear);

  const deleteButton = page.locator(deleteButtonSelector);

  await page.waitForTimeout(300);

  await deleteButton.click({ force: true, timeout: 3000 });
};

export const moveCourseToSession = async (
  page: Page,
  course: TestCourse,
  targetTerm: TermEnum,
  targetYear: number,
): Promise<void> => {
  const dropTarget = page.locator(
    selectors.sessionDropTarget(targetTerm, targetYear),
  );

  await expect(dropTarget).toBeVisible({ timeout: 15000 });

  await dropTarget.scrollIntoViewIfNeeded();

  const courseSource = page.locator(selectors.courseInSession(course.code));
  const courseBox = page.locator(selectors.courseInSession(course.code));

  await reliableDragAndDrop(page, courseSource, dropTarget, courseBox);

  await expect(courseBox).toBeVisible({ timeout: 25000 });
};
