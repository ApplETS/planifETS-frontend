import { expect, test } from '@playwright/test';
import { TEST_COURSES } from '../../assets/courses';
import { selectors } from '../../assets/selectors';
import { addCourseToSession, deleteCourse, searchCourseInSidebar } from '../fixtures/course';
import { selectProgram } from '../fixtures/program';
import { setupTestPage } from '../fixtures/setup';

test.describe('Session Availability Icon', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
    await selectProgram(page);
    await page.locator(selectors.addYearButton).click();
  });

  test('should show info icon when session has courses but availability is not known', async ({ page }) => {
    const course = TEST_COURSES.LOG530;

    // Add 2 more years
    await page.locator(selectors.addYearButton).click();
    await page.locator(selectors.addYearButton).click();

    // Add a course to a session
    await searchCourseInSidebar(page, course.code);
    await addCourseToSession(page, course);

    // Check that the info icon is visible for the session with courses
    const infoIcon = page.locator(selectors.infoIcon(course.sessionTerm, course.sessionYear));

    await expect(infoIcon).toBeVisible({ timeout: 15000 });
  });

  test('should show tooltip with availability message on info icon hover', async ({ page }) => {
    const course = TEST_COURSES.LOG530;

    // Add 2 more years
    await page.locator(selectors.addYearButton).click();
    await page.locator(selectors.addYearButton).click();

    // Add a course to a session
    await searchCourseInSidebar(page, course.code);
    await addCourseToSession(page, course);

    // Hover over the info icon that belongs to the specific session and check tooltip
    const sessionContainer = page.locator(selectors.sessionDropTarget(course.sessionTerm, course.sessionYear));
    const infoIcon = sessionContainer.locator(selectors.infoIcon(course.sessionTerm, course.sessionYear));

    await expect(infoIcon).toBeVisible({ timeout: 15000 });

    await infoIcon.hover();

    // The tooltip should appear with the expected message (filter by exact text to avoid other tooltips)
    const tooltip = page.locator('role=tooltip', {
      hasText: 'Information on course availability for this session is not yet published by the school.',
    });

    await expect(tooltip).toBeVisible();
    await expect(tooltip).toContainText('Information on course availability for this session is not yet published by the school.');
  });

  test('should hide info icon when course is removed from session', async ({ page }) => {
    const course = TEST_COURSES.LOG530;

    // Add 2 more years
    await page.locator(selectors.addYearButton).click();
    await page.locator(selectors.addYearButton).click();

    // Add a course to a session
    await searchCourseInSidebar(page, course.code);
    await addCourseToSession(page, course);

    // Verify icon is visible (scoped to the session container to avoid collisions)
    const sessionContainer = page.locator(selectors.sessionDropTarget(course.sessionTerm, course.sessionYear));
    const infoIcon = sessionContainer.locator(selectors.infoIcon(course.sessionTerm, course.sessionYear));

    await expect(infoIcon).toBeVisible({ timeout: 15000 });

    // Remove the course
    await deleteCourse(page, course);

    // Verify icon is hidden
    await expect(infoIcon).toBeHidden({ timeout: 15000 });
  });

  test('should not show info icon for sessions with known availability', async ({ page }) => {
    const course = TEST_COURSES.LOG121; // E2026: which is before H2027 (latest-available), so known availability

    // Add a course to a session with known availability
    await searchCourseInSidebar(page, course.code);
    await addCourseToSession(page, course);

    // Check that the info icon is not visible
    const infoIcon = page.locator(selectors.infoIcon(course.sessionTerm, course.sessionYear));

    await expect(infoIcon).toBeHidden();
  });

  test('should not show info icon for old sessions', async ({ page }) => {
    const course = TEST_COURSES.LOG460;

    // Add a course to an old session
    await searchCourseInSidebar(page, course.code);
    await addCourseToSession(page, course);

    // Check that the info icon is not visible
    const infoIcon = page.locator(selectors.infoIcon(course.sessionTerm, course.sessionYear));

    await expect(infoIcon).toBeHidden();
  });
});
