import { expect, test } from '@playwright/test';
import { TEST_COURSES } from '../../assets/courses';
import { selectors } from '../../assets/selectors';
import { addCourseToSession, deleteCourse, searchCourseInSidebar } from '../fixtures/course';
import { reliableDragAndDrop } from '../fixtures/dnd';
import { selectProgram } from '../fixtures/program';
import { setupTestPage } from '../fixtures/setup';

const STAGE_CREDITS_LABEL = 'internship credits';
const CREDITS_LABEL = 'credits';

test.describe('Credits Management', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
    await selectProgram(page);
  });

  test('should display zero credits for a new session', async ({ page }) => {
    const course = TEST_COURSES.LOG240;

    const sessionCredits = page.locator(
      selectors.sessionCredits(course.sessionTerm, course.sessionYear),
    );

    await expect(sessionCredits).toHaveText(
      `0 ${CREDITS_LABEL}`,
      { timeout: 15000 },
    );
  });

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

  test('should show internship credit total when a Stage course is added', async ({ page }) => {
    const course = TEST_COURSES.STG001;

    await searchCourseInSidebar(page, course.code);
    await addCourseToSession(page, course);

    const totalStageCredits = page.locator(selectors.totalStageCredits);

    await expect(totalStageCredits).toBeVisible({ timeout: 15000 });
    await expect(totalStageCredits).toHaveText(
      `${course.credits} ${STAGE_CREDITS_LABEL}`,
      { timeout: 15000 },
    );
  });

  test('should accumulate stage credits when two Stage courses are added', async ({ page }) => {
    const courseE = TEST_COURSES.STG001;
    const courseA = TEST_COURSES.STG001_A;

    await searchCourseInSidebar(page, courseE.code);
    await addCourseToSession(page, courseE);

    // Second drag to a different session — verify via total (avoids strict-mode
    // violation from two matching course-box-STG001 elements)
    const totalStageCredits = page.locator(selectors.totalStageCredits);
    const courseCard = page.locator(selectors.courseCard(courseA.code));
    const dropTarget = page.locator(selectors.sessionDropTarget(courseA.sessionTerm, courseA.sessionYear));
    await dropTarget.scrollIntoViewIfNeeded();
    await reliableDragAndDrop(page, courseCard, dropTarget, totalStageCredits.filter({ hasText: '18' }));

    await expect(totalStageCredits).toHaveText(
      `${courseE.credits + courseA.credits} ${STAGE_CREDITS_LABEL}`,
      { timeout: 15000 },
    );
  });

  test('should show zero internship credits when no Stage courses are in the plan', async ({ page }) => {
    const course = TEST_COURSES.LOG240;

    await searchCourseInSidebar(page, course.code);
    await addCourseToSession(page, course);

    const totalStageCredits = page.locator(selectors.totalStageCredits);

    await expect(totalStageCredits).toBeVisible({ timeout: 15000 });
    await expect(totalStageCredits).toContainText('0');
  });
});
