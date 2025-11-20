import { expect, test } from '@playwright/test';
import { TEST_COURSES } from '../../assets/courses';
import { selectors } from '../../assets/selectors';
import { addCourseToSession, deleteCourse, searchCourseInSidebar } from '../fixtures/course';
import { selectProgram } from '../fixtures/program';
import { setupTestPage } from '../fixtures/setup';

const CREDITS_LABEL = 'credits';

test.describe('Credits Management', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
    await selectProgram(page);
  });

  // test('should display zero credits for a new session', async ({ page }) => {
  //   const course = TEST_COURSES.LOG240;

  //   const sessionCredits = page.locator(
  //     selectors.sessionCredits(course.sessionTerm, course.sessionYear),
  //   );

  //   await expect(sessionCredits).toHaveText(
  //     `0 ${CREDITS_LABEL}`,
  //     { timeout: 15000 },
  //   );
  // });

  test('should update session credits', async ({ page }) => {
    const course = TEST_COURSES.LOG240;

    await searchCourseInSidebar(page, course.code);
    await addCourseToSession(page, course);

    const sessionCredits = page.locator(
      selectors.sessionCredits(course.sessionTerm, course.sessionYear),
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
