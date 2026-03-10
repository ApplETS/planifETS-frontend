import { expect, test } from '@playwright/test';
import { TEST_COURSES } from '../../assets/courses';
import { selectors } from '../../assets/selectors';
import { addCourseToSession, getCourseCard } from '../fixtures/course';
import { reliableDragAndDrop } from '../fixtures/dnd';
import { selectProgram } from '../fixtures/program';
import { setupTestPage } from '../fixtures/setup';

test.describe('Global Course Search', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
    await selectProgram(page);
  });

  test('renders link in empty state when no local results and triggers search on click', async ({ page }) => {
    // Use a query that yields no local results
    const searchInput = page.locator(selectors.searchInput);
    await searchInput.fill('ZZZ_NOT_FOUND');

    const linkContainer = page.locator(selectors.globalSearchLink);

    await expect(linkContainer).toBeVisible({ timeout: 30000 });

    const button = page.locator(selectors.globalSearchButton);
    await button.click();

    const noResultsMsg = page.getByText('No courses found in any program. Try a different search term.');

    await expect(noResultsMsg).toBeVisible({ timeout: 30000 });
  });

  test('displays global search results after API returns', async ({ page }) => {
    const searchInput = page.locator(selectors.searchInput);
    await searchInput.fill('MAT21');

    const button = page.locator(selectors.globalSearchButton);
    await button.click();

    // Wait for loading to finish
    await expect(page.getByText('Searching in all programs...')).toBeHidden({ timeout: 5000 });

    // Verify results are displayed (MAT210 should be in mock data)
    const courseCard = page.locator(selectors.courseCard('MAT210'));

    await expect(courseCard).toBeVisible({ timeout: 15000 });
  });

  test('clears global search when user types new query', async ({ page }) => {
    const searchInput = page.locator(selectors.searchInput);
    await searchInput.fill('MAT21');
    const button = page.locator(selectors.globalSearchButton);
    await button.click();

    await expect(page.getByText('Searching in all programs...')).toBeHidden({ timeout: 5000 });

    const courseCardMat = page.locator(selectors.courseCard('MAT210'));

    await expect(courseCardMat).toBeVisible({ timeout: 15000 });

    // Type additional characters to trigger auto-clear
    await searchInput.fill('LOG');

    const linkContainer = page.locator(selectors.globalSearchLink);

    await expect(linkContainer).toBeVisible({ timeout: 15000 });
  });

  test('clears global search when switching to favorites tab', async ({ page }) => {
    // Wait for initial courses to load
    await expect(page.locator(selectors.courseCardItem).first()).toBeVisible({ timeout: 15000 });

    // Count initial courses before search
    const initialCourseCount = await page.locator(selectors.courseCardItem).count();

    expect(initialCourseCount).toBeGreaterThan(0);

    const searchInput = page.locator(selectors.searchInput);
    await searchInput.fill('MAT21');
    const button = page.locator(selectors.globalSearchButton);
    await button.click();

    await expect(page.getByText('Searching in all programs...')).toBeHidden({ timeout: 5000 });

    const favoritesTab = page.locator(selectors.favoritesTab);
    await favoritesTab.click();

    const coursesTab = page.locator(selectors.coursesTab);
    await coursesTab.click();

    // Verify search input was cleared and course count matches initial
    await expect(searchInput).toHaveValue('');

    const finalCourseCount = await page.locator(selectors.courseCardItem).count();

    expect(finalCourseCount).toBeGreaterThan(0);
    expect(finalCourseCount).toBe(initialCourseCount);
  });

  test('does not show global search link on favorites tab', async ({ page }) => {
    const searchInput = page.locator(selectors.searchInput);
    await searchInput.fill('LOG');

    const favoritesTab = page.locator(selectors.favoritesTab);
    await favoritesTab.click();

    const linkContainer = page.locator(selectors.globalSearchLink);

    await expect(linkContainer).toBeHidden({ timeout: 5000 });
  });

  test('hides global search link when search is cleared', async ({ page }) => {
    const searchInput = page.locator(selectors.searchInput);
    await searchInput.fill('LOG');

    const linkContainer = page.locator(selectors.globalSearchLink);

    await expect(linkContainer).toBeVisible({ timeout: 15000 });

    await searchInput.clear();

    await expect(linkContainer).toBeHidden({ timeout: 5000 });
  });

  test('adding a program course (LOG240) from global search should place it in the planner', async ({ page }) => {
    const course = TEST_COURSES.LOG240;

    const searchInput = page.locator(selectors.searchInput);
    // our mock data responds to the prefix "LOG" rather than full code
    await searchInput.fill('LOG');

    const button = page.locator(selectors.globalSearchButton);
    await button.click();

    // wait for global search to complete
    await expect(page.getByText('Searching in all programs...')).toBeHidden({ timeout: 5000 });

    // drag the card that appeared to the target session
    await addCourseToSession(page, course);

    const courseBox = page.locator(selectors.courseInSession(course.code));

    await expect(courseBox).toBeVisible({ timeout: 15000 });
    await expect(courseBox).toContainText(course.code);
  });

  test('adding a non-selected-program course (MEC129) from global search should also work', async ({ page }) => {
    // currently selected program is logiciel; use a MEC course
    const searchInput = page.locator(selectors.searchInput);
    await searchInput.fill('MEC1');

    const button = page.locator(selectors.globalSearchButton);
    await button.click();

    await expect(page.getByText('Searching in all programs...')).toBeHidden({ timeout: 5000 });

    const course = TEST_COURSES.MEC129;

    // make sure the card becomes visible before attempting to drop
    const card = await getCourseCard(page, course.code);
    const dropTarget = page.locator(
      selectors.sessionDropTarget(course.sessionTerm, course.sessionYear),
    );
    await dropTarget.scrollIntoViewIfNeeded();

    const courseBox = page.locator(selectors.courseInSession(course.code));
    // perform drag using reliable helper directly to avoid duplicate import conflict
    await reliableDragAndDrop(page, card, dropTarget, courseBox);

    await expect(courseBox).toBeVisible({ timeout: 15000 });
    await expect(courseBox).toContainText(course.code);
  });
});
