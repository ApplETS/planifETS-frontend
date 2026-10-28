import { expect, test } from '@playwright/test';
import { TEST_COURSES } from '../../assets/courses';
import { selectors } from '../../assets/selectors';
import { addCourseToSession, searchCourseInSidebar } from '../fixtures/course';
import { changeLanguage } from '../fixtures/language';
import { setupTestPage } from '../fixtures/setup';

test('creates and switches independent planners and keeps them after reload', async ({ page }) => {
  await setupTestPage(page);
  const plannerSelect = page.getByTestId('planner-select');

  await expect(plannerSelect).toContainText('Default Planner');

  const course = TEST_COURSES.LOG240;
  await searchCourseInSidebar(page, course.code);
  await addCourseToSession(page, course);

  await plannerSelect.click();
  await page.getByRole('menuitem', { name: 'New planner', exact: true }).click();
  const dialog = page.getByRole('dialog');
  const createButton = dialog.getByRole('button', { name: 'Create planner', exact: true });

  await expect(createButton).toBeDisabled();
  await expect(dialog.getByLabel('Planner name')).toHaveAttribute('placeholder', 'e.g. Study + work');

  await dialog.getByLabel('Planner name').fill('Alternative');
  await createButton.click();

  await expect(plannerSelect).toContainText('Alternative');
  await expect(page.locator(selectors.courseInSession(course.code))).toHaveCount(0);
  await expect(page.locator(selectors.totalCredits)).toHaveText('0 total credits');

  await page.locator(selectors.addYearButton).click();
  const addedYear = new Date().getFullYear() + 1;

  await expect(page.getByTestId(`year-${addedYear}-sessions`)).toBeVisible();

  await page.reload();

  await expect(plannerSelect).toBeEnabled();
  await expect(plannerSelect).toContainText('Alternative');
  await expect(page.getByTestId(`year-${addedYear}-sessions`)).toBeVisible();

  await plannerSelect.click();
  await page.getByRole('menuitemradio', { name: 'Default Planner', exact: true }).click();

  await expect(page.getByRole('menu')).toHaveCount(0);
  await expect(page.locator(selectors.courseInSession(course.code))).toBeVisible();
  await expect(page.getByTestId(`year-${addedYear}-sessions`)).toHaveCount(0);
  await expect(page.locator(selectors.totalCredits)).toHaveText(`${course.credits} total credits`);

  await plannerSelect.click();
  await page.getByRole('menuitemradio', { name: 'Alternative', exact: true }).click();

  await expect(page.locator(selectors.courseInSession(course.code))).toHaveCount(0);
  await expect(page.getByTestId(`year-${addedYear}-sessions`)).toBeVisible();
});

test('creates planners from the mobile drawer and cancels without adding one', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await setupTestPage(page);
  await page.getByTestId('planner-select').click();
  await page.getByRole('menuitem', { name: 'New planner', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByLabel('Planner name').fill('Cancelled plan');
  await dialog.getByRole('button', { name: 'Close', exact: true }).click();

  await expect(page.getByTestId('planner-select')).toContainText('Default Planner');

  await page.getByTestId('planner-select').click();
  await page.getByRole('menuitem', { name: 'New planner', exact: true }).click();

  await expect(dialog.getByLabel('Planner name')).toHaveValue('');

  await dialog.getByLabel('Planner name').fill('Mobile plan');
  await dialog.getByRole('button', { name: 'Create planner', exact: true }).click();

  await expect(page.getByTestId('planner-select')).toContainText('Mobile plan');

  await page.getByTestId('planner-select').click();

  await expect(page.getByRole('menuitemradio')).toHaveCount(2);

  await page.getByRole('menuitemradio', { name: 'Default Planner', exact: true }).click();

  await expect(page.getByTestId('planner-select')).toContainText('Default Planner');
});

test('stacks the planner above programs on smaller screens and supports French keyboard creation', async ({ page }) => {
  await setupTestPage(page);
  const plannerSelect = page.getByTestId('planner-select');

  await expect(plannerSelect).toHaveCSS('border-top-width', '1px');
  await expect(plannerSelect).toHaveCSS('border-top-style', 'solid');
  await expect(page.getByTestId('add-planner')).toHaveCount(0);

  for (const width of [320, 390, 640, 768, 850, 1024, 1280]) {
    await page.setViewportSize({ width, height: 896 });

    await expect(async () => {
      const programs = await page.getByTestId('programs-select').boundingBox();
      const programsInput = await page.getByTestId('programs-select').locator('[data-slot="command"] > div').first().boundingBox();
      const planner = await plannerSelect.boundingBox();
      const stacked = width < 1024;
      const gap = stacked
        ? programs!.y - planner!.y - planner!.height
        : planner!.x - programs!.x - programs!.width;
      const alignment = stacked
        ? Math.abs(planner!.x - programs!.x)
        : Math.abs(planner!.y - programs!.y);
      const widthDifference = stacked ? Math.abs(planner!.width - programs!.width) : 0;
      const heightDifference = stacked ? 0 : Math.abs(planner!.height - programsInput!.height);

      expect(gap).toBeGreaterThanOrEqual(0);
      expect(alignment).toBeLessThan(1);
      expect(widthDifference).toBeLessThan(1);
      expect(heightDifference).toBeLessThan(1);
      expect(planner!.x + planner!.width).toBeLessThanOrEqual(width);
    }).toPass();
  }

  await changeLanguage(page, 'fr');

  await expect(plannerSelect).toContainText('Plan par défaut');
  await expect(plannerSelect).toHaveAccessibleName('Plan');

  await plannerSelect.focus();
  await plannerSelect.press('ArrowDown');

  await expect(page.getByRole('menuitemradio', { name: 'Plan par défaut', exact: true })).toBeFocused();

  await page.keyboard.press('End');
  const createItem = page.getByRole('menuitem', { name: 'Nouveau plan', exact: true });

  await expect(createItem).toBeFocused();

  await createItem.press('Enter');
  const dialog = page.getByRole('dialog');

  await expect(dialog.getByRole('heading')).toHaveText('Nouveau plan');
  await expect(dialog.locator('form')).toHaveCSS('padding-top', '12px');
  await expect(dialog.locator('form')).toHaveCSS('padding-bottom', '12px');
  await expect(dialog.getByLabel('Nom du plan')).toHaveAttribute('placeholder', 'Ex. Études + emploi');

  await dialog.getByLabel('Nom du plan').fill('Parcours alternatif');
  await dialog.getByRole('button', { name: 'Créer le plan', exact: true }).click();

  await expect(plannerSelect).toContainText('Parcours alternatif');
});

test('waits before opening a planner tooltip on hover', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await setupTestPage(page);
  const longName = 'Course plan with a part-time job and summer internships until graduation';
  await page.getByTestId('planner-select').click();
  await page.getByTestId('add-planner').click();
  await page.getByRole('dialog').getByLabel('Planner name').fill(longName);
  await page.getByRole('button', { name: 'Create planner', exact: true }).click();
  await page.getByTestId('planner-select').scrollIntoViewIfNeeded();
  await page.clock.install();
  await page.clock.pauseAt(Date.now());
  await page.getByTestId('planner-select').hover();
  await page.clock.runFor(499);

  await expect(page.getByRole('tooltip')).toHaveCount(0);

  await page.clock.runFor(1);

  await expect(page.getByRole('tooltip')).toHaveText(longName);
});

test('does not show tooltips when planner names fit in the selector or menu', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 844 });
  await setupTestPage(page);
  await page.clock.install();
  await page.clock.pauseAt(Date.now());
  const plannerSelect = page.getByTestId('planner-select');
  await plannerSelect.hover();
  await page.clock.runFor(1000);

  await expect(page.getByRole('tooltip')).toHaveCount(0);

  await plannerSelect.click();
  await page.clock.runFor(200);
  await page.getByRole('menuitemradio', { name: 'Default Planner', exact: true }).hover();
  await page.clock.runFor(1000);

  await expect(page.getByRole('tooltip')).toHaveCount(0);
});

test('shows the full planner name in tooltips on the selector and menu entries', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 844 });
  await setupTestPage(page);
  const plannerSelect = page.getByTestId('planner-select');
  const longName = 'Course plan with a part-time job and summer internships until graduation';
  await plannerSelect.click();
  await page.getByTestId('add-planner').click();
  const dialog = page.getByRole('dialog');
  await dialog.getByLabel('Planner name').fill(longName);
  await dialog.getByRole('button', { name: 'Create planner', exact: true }).click();

  await expect(plannerSelect).toContainText(longName);

  const tooltipContent = page.locator('[data-slot="tooltip-content"]:visible');
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await plannerSelect.hover();

    await expect(page.getByRole('tooltip')).toHaveText(longName);
    await expect(tooltipContent).toHaveAttribute('data-side', 'bottom');

    await expect(async () => {
      const triggerBounds = await plannerSelect.boundingBox();
      const tooltipBounds = await tooltipContent.boundingBox();
      const navbarZIndex = await page.getByTestId('navbar').evaluate((element) => Number(getComputedStyle(element).zIndex));
      const tooltipZIndex = await tooltipContent.evaluate((element) => Number(getComputedStyle(element).zIndex));

      expect(tooltipBounds!.y).toBeGreaterThanOrEqual(triggerBounds!.y + triggerBounds!.height);
      expect(tooltipBounds!.x).toBeGreaterThanOrEqual(0);
      expect(tooltipBounds!.x + tooltipBounds!.width).toBeLessThanOrEqual(width);
      expect(tooltipZIndex).toBeGreaterThan(navbarZIndex);
    }).toPass();

    await page.mouse.move(0, 0, { steps: 10 });

    await expect(tooltipContent).toHaveCount(0);
  }

  await page.clock.install();
  await page.clock.pauseAt(Date.now());
  await plannerSelect.click();
  await page.clock.runFor(200);
  const menuEntry = page.getByRole('menuitemradio', { name: longName, exact: true });
  await menuEntry.hover();
  await page.clock.runFor(499);

  await expect(page.getByRole('tooltip')).toHaveCount(0);

  await page.clock.runFor(1);

  await expect(page.getByRole('tooltip')).toHaveText(longName);
  await expect(tooltipContent).toBeInViewport({ ratio: 1 });

  await menuEntry.click();

  await expect(page.getByRole('menu')).toHaveCount(0);
  await expect(plannerSelect).toContainText(longName);
});
