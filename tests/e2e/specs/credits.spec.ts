import { expect, test } from '@playwright/test';
import { TEST_COURSES } from '../../assets/courses';
import { selectors } from '../../assets/selectors';
import { addCourseToSession, deleteCourse } from '../fixtures/course';
import { setupTestPage } from '../fixtures/setup';

const CREDITS_LABEL = 'crédits';

test.describe('Credits Management', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
  });

  test('should update session credits', async ({ page }) => {
    const course = TEST_COURSES.LOG240;
    await addCourseToSession(page, course);

    const sessionCredits = page.locator(
      selectors.sessionCredits(course.sessionName, course.sessionYear),
    );

    await expect(sessionCredits).toHaveText(
      `${course.credits} ${CREDITS_LABEL}`,
      { timeout: 15000 },
    );

    await deleteCourse(page, course);

    await expect(sessionCredits).toHaveText(
      `0 ${CREDITS_LABEL}`,
      { timeout: 15000 },
    );
  });
});
