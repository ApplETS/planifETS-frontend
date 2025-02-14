import { expect, test } from '@playwright/test';
import { TEST_COURSES } from '../assets/courses';
import { selectors } from '../assets/selectors';
import { addCourseToSession, deleteCourse } from './fixtures/course';
import { setupTestPage } from './fixtures/setup';

const CREDITS_LABEL = 'crédits';

test.describe('Course Planner', () => {
  test.beforeEach(async ({ page }) => {
    setupTestPage(page);
  });

  test('should add and delete a course', async ({ page }) => {
    const course = TEST_COURSES.LOG240;
    const courseInSession = await addCourseToSession(page, course);

    await expect(courseInSession).toBeVisible({ timeout: 15000 });

    await deleteCourse(page, course);

    await expect(courseInSession).toBeHidden({ timeout: 15000 });
  });

  test('should update total credits', async ({ page }) => {
    // Wait for the total credits element to be ready
    const totalCredits = page.locator(selectors.totalCredits);

    await expect(totalCredits).toBeVisible({ timeout: 15000 });
    await expect(totalCredits).toHaveText(`0 ${CREDITS_LABEL}`, { timeout: 15000 });

    // Add courses and verify credits
    const course1 = TEST_COURSES.LOG240;
    const course2 = TEST_COURSES.LOG121;

    await addCourseToSession(page, course1);
    await addCourseToSession(page, course2);

    await expect(totalCredits).toHaveText(`${course1.credits + course2.credits} ${CREDITS_LABEL}`, { timeout: 15000 });

    // Remove courses and verify credits
    await deleteCourse(page, course1);

    await expect(totalCredits).toHaveText(`${course2.credits} ${CREDITS_LABEL}`, { timeout: 15000 });

    await deleteCourse(page, course2);

    await expect(totalCredits).toHaveText(`0 ${CREDITS_LABEL}`, { timeout: 15000 });
  });
});
