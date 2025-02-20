import { expect, test } from '@playwright/test';
import { TEST_COURSES } from '../../assets/courses';
import { selectors } from '../../assets/selectors';
import { addCourseToSession, deleteCourse, moveCourseToSession } from '../fixtures/course';
import { setupTestPage } from '../fixtures/setup';

test.describe('Course Management', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
  });

  test('should add and delete a course instance', async ({ page }) => {
    const course = TEST_COURSES.LOG240;
    const courseInSession = await addCourseToSession(page, course);

    await expect(courseInSession).toBeVisible({ timeout: 15000 });

    await deleteCourse(page, course);

    await expect(courseInSession).toBeHidden({ timeout: 15000 });
  });

  test('should move course instances between sessions', async ({ page }) => {
    const course = TEST_COURSES.LOG240;
    await addCourseToSession(page, course);

    const targetSession = 'Automne';
    const targetYear = 2025;

    await moveCourseToSession(page, course, targetSession, targetYear);

    const courseInNewSession = page.locator(selectors.courseInSession(course.code));

    await expect(courseInNewSession).toBeVisible({ timeout: 15000 });

    // Verify course is in new session
    const newSessionDropTarget = page.locator(
      selectors.sessionDropTarget(targetSession, targetYear),
    );

    await expect(newSessionDropTarget).toContainText(course.code);
  });

  test('should not allow dropping course instance in non-session area', async ({ page }) => {
    const course = TEST_COURSES.LOG240;
    await addCourseToSession(page, course);

    // Try to drag to navbar (non-droppable area)
    const courseBox = page.locator(selectors.courseInSession(course.code));
    const navbar = page.locator(selectors.navbar);

    await courseBox.dragTo(navbar);

    // Verify course remains in original session
    const originalSessionDropTarget = page.locator(
      selectors.sessionDropTarget(course.sessionName, course.sessionYear),
    );

    await expect(originalSessionDropTarget).toContainText(course.code);
  });
});
