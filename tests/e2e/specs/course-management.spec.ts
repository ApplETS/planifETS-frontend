import { expect, test } from '@playwright/test';
import { SessionEnum } from '../../../src/types/session';
import { TEST_COURSES } from '../../assets/courses';
import { selectors } from '../../assets/selectors';
import { addCourseToSession, deleteCourse, moveCourseToSession, searchCourseInSidebar } from '../fixtures/course';
import { selectProgram } from '../fixtures/program';
import { setupTestPage } from '../fixtures/setup';

const CREDITS_LABEL = 'crédits';

test.describe('Course Management', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
    await selectProgram(page);
  });

  test('should add and delete a course instance', async ({ page }) => {
    const course = TEST_COURSES.LOG240;

    await searchCourseInSidebar(page, course.code);
    const courseInSession = await addCourseToSession(page, course);

    await expect(courseInSession).toBeVisible({ timeout: 15000 });

    await deleteCourse(page, course);

    await expect(courseInSession).toBeHidden({ timeout: 15000 });
  });

  test('should move course instances between sessions', async ({ page }) => {
    const course = TEST_COURSES.LOG240;

    await searchCourseInSidebar(page, course.code);
    await addCourseToSession(page, course);

    const targetSession = SessionEnum.A;
    const targetYear = 2025;

    await moveCourseToSession(page, course, targetSession, targetYear);

    const courseInNewSession = page.locator(selectors.courseInSession(course.code));

    await expect(courseInNewSession).toBeVisible({ timeout: 15000 });

    const newSessionDropTarget = page.locator(
      selectors.sessionDropTarget(targetSession, targetYear),
    );

    await expect(newSessionDropTarget).toContainText(course.code);
  });

  test('should not allow dropping course instance in non-session area', async ({ page }) => {
    const course = TEST_COURSES.LOG240;

    await searchCourseInSidebar(page, course.code);
    await addCourseToSession(page, course);

    const courseBox = page.locator(selectors.courseInSession(course.code));
    const navbar = page.locator(selectors.navbar);

    await courseBox.dragTo(navbar);

    const originalSessionDropTarget = page.locator(
      selectors.sessionDropTarget(course.sessionName, course.sessionYear),
    );

    await expect(originalSessionDropTarget).toContainText(course.code);
  });

  test('should update total credits', async ({ page }) => {
    const totalCredits = page.locator(selectors.totalCredits);

    await expect(totalCredits).toBeVisible({ timeout: 15000 });
    await expect(totalCredits).toHaveText(`0 ${CREDITS_LABEL}`, { timeout: 15000 });

    const course1 = TEST_COURSES.LOG240;
    const course2 = TEST_COURSES.LOG121;

    await searchCourseInSidebar(page, course1.code);
    await addCourseToSession(page, course1);

    await searchCourseInSidebar(page, course2.code);
    await addCourseToSession(page, course2);

    await expect(totalCredits).toHaveText(`${course1.credits + course2.credits} ${CREDITS_LABEL}`, { timeout: 15000 });

    await deleteCourse(page, course1);

    await expect(totalCredits).toHaveText(`${course2.credits} ${CREDITS_LABEL}`, { timeout: 15000 });

    await deleteCourse(page, course2);

    await expect(totalCredits).toHaveText(`0 ${CREDITS_LABEL}`, { timeout: 15000 });
  });
});
