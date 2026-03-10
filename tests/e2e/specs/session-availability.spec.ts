import type { Page } from '@playwright/test';
import type { TermEnum } from '../../../src/types/session';
import type { TestCourse } from '../../assets/courses';
import { expect, test } from '@playwright/test';
import { TEST_COURSES } from '../../assets/courses';
import { selectors } from '../../assets/selectors';
import { addCourseToSession, deleteCourse, searchCourseInSidebar } from '../fixtures/course';
import { selectProgram } from '../fixtures/program';
import { addYears } from '../fixtures/session';
import { setupTestPage } from '../fixtures/setup';

async function addCourseInNewSession(page: Page, course: TestCourse, extraYears: number = 2) {
  await addYears(page, extraYears);
  await searchCourseInSidebar(page, course.code);
  await addCourseToSession(page, course);
}

function getSessionInfoIconLocator(page: Page, term: TermEnum, year: number) {
  const sessionContainer = page.locator(selectors.sessionDropTarget(term, year));
  return sessionContainer.locator(selectors.infoIcon(term, year));
}

test.describe('Session Availability Icon', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
    await selectProgram(page);
    await page.locator(selectors.addYearButton).click();
  });

  test('should show info icon when session has courses but availability is not known', async ({ page }) => {
    const course = TEST_COURSES.LOG530;

    await addCourseInNewSession(page, course);

    const infoIcon = getSessionInfoIconLocator(page, course.sessionTerm, course.sessionYear);

    await expect(infoIcon).toBeVisible({ timeout: 15000 });
  });

  test('should show tooltip with availability message on info icon hover', async ({ page }) => {
    const course = TEST_COURSES.LOG530;

    await addCourseInNewSession(page, course);

    const infoIcon = getSessionInfoIconLocator(page, course.sessionTerm, course.sessionYear);

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

    await addCourseInNewSession(page, course);

    const infoIcon = getSessionInfoIconLocator(page, course.sessionTerm, course.sessionYear);

    await expect(infoIcon).toBeVisible({ timeout: 15000 });

    await deleteCourse(page, course);

    await expect(infoIcon).toBeHidden({ timeout: 15000 });
  });

  test('should not show info icon for sessions with known availability', async ({ page }) => {
    const course = TEST_COURSES.LOG121;

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
