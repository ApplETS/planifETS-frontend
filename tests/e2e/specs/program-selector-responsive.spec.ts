import type { Locator, Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import enableMockApi from '../fixtures/mock';

const PROGRAM_TITLE = 'Baccalauréat en génie des technologies de l’information';
const PROGRAM_LABEL = `7086 - ${PROGRAM_TITLE}`;

async function expectContainedLabel(page: Page, control: Locator, container = control, expectedLabel = PROGRAM_LABEL) {
  const label = control.getByTitle(expectedLabel, { exact: true });

  await expect(label).toBeVisible();
  await expect(label).toHaveText(expectedLabel);
  await expect(label).toHaveCSS('white-space', 'normal');
  await expect(label).toHaveCSS('hyphens', 'auto');
  await expect(label).toHaveAttribute('lang', 'fr');

  for (const width of [320, 390, 414, 768, 850, 1024, 1280]) {
    await page.setViewportSize({ width, height: 896 });

    await expect(async () => {
      const bounds = await control.boundingBox();
      const labelBounds = await label.boundingBox();
      const containerBounds = await container.boundingBox();

      expect(bounds).not.toBeNull();
      expect(labelBounds).not.toBeNull();
      expect(containerBounds).not.toBeNull();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
      expect(bounds!.x).toBeGreaterThanOrEqual(containerBounds!.x);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(containerBounds!.x + containerBounds!.width);
      expect(labelBounds!.x).toBeGreaterThanOrEqual(bounds!.x);
      expect(labelBounds!.x + labelBounds!.width).toBeLessThanOrEqual(bounds!.x + bounds!.width);
      expect(labelBounds!.y).toBeGreaterThanOrEqual(bounds!.y);
      expect(labelBounds!.y + labelBounds!.height).toBeLessThanOrEqual(bounds!.y + bounds!.height);
    }).toPass();

    if (width === 320) {
      expect(await label.evaluate((element) =>
        element.getBoundingClientRect().height > Number.parseFloat(getComputedStyle(element).lineHeight))).toBe(true);
    }
  }
}

async function expectTitleOnlyOption(programs: Locator, code: string, title: string) {
  await programs.locator('input').fill(code);
  const option = programs.getByRole('option', { name: title, exact: true });

  await expect(option).toBeVisible();
  await expect(option).toHaveText(title);

  const bounds = await programs.boundingBox();
  const optionBounds = await option.boundingBox();

  expect(optionBounds!.x).toBeGreaterThanOrEqual(bounds!.x);
  expect(optionBounds!.x + optionBounds!.width).toBeLessThanOrEqual(bounds!.x + bounds!.width);
  expect(await option.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
}

async function expectOptionsWrap(options: Locator, control: Locator) {
  const bounds = await control.boundingBox();

  for (const option of await options.all()) {
    const label = option.locator('span[lang="fr"]');

    await expect(label).toHaveCSS('white-space', 'normal');
    await expect(label).toHaveCSS('hyphens', 'auto');

    const optionBounds = await option.boundingBox();

    expect(optionBounds!.x).toBeGreaterThanOrEqual(bounds!.x);
    expect(optionBounds!.x + optionBounds!.width).toBeLessThanOrEqual(bounds!.x + bounds!.width);
    expect(await label.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  }
}

test('course program selector wraps the full label without overflowing', async ({ page }) => {
  enableMockApi(page);
  await page.goto('/welcome');
  const input = page.getByTestId('programs-select').locator('input');
  await input.fill(PROGRAM_TITLE);
  await input.press('Enter');
  await page.getByTestId('onboarding-complete').click();

  await expect(page).toHaveURL(/\/planner$/);

  await page.goto('/course/352413');

  const control = page.getByTestId('course-details-program-select');
  await expectContainedLabel(page, control);

  await page.setViewportSize({ width: 320, height: 896 });
  await control.click();

  await expect(page.getByRole('option', { name: PROGRAM_LABEL, exact: true })).toBeVisible();

  await expectOptionsWrap(page.getByRole('option'), control);
});

test('welcome program chips wrap the full title and keep removal accessible', async ({ page }) => {
  enableMockApi(page);
  await page.setViewportSize({ width: 320, height: 896 });
  await page.goto('/welcome');

  const programs = page.getByTestId('programs-select');
  const input = programs.locator('input');
  await input.click();

  await expect(programs.getByRole('option')).toHaveCount(6);

  await expectOptionsWrap(programs.getByRole('option'), programs);
  await expectTitleOnlyOption(programs, '7086', PROGRAM_TITLE);
  await input.press('Enter');
  await input.fill('Baccalauréat en génie logiciel');
  await input.press('Enter');

  const chip = page.getByTestId('program-chip-182912');
  const container = programs.locator('[data-slot="command"] > div').first();
  await expectContainedLabel(page, chip, container, PROGRAM_TITLE);

  await expect(page.getByTestId('program-chip-182848')).toBeVisible();

  await page.setViewportSize({ width: 320, height: 896 });
  await chip.getByRole('button', { name: `Remove ${PROGRAM_TITLE}`, exact: true }).click();

  await expect(chip).toHaveCount(0);
  await expect(page.getByTestId('program-chip-182848')).toBeVisible();
});

test('planner program chips stay inside the input border', async ({ page }) => {
  enableMockApi(page);
  await page.setViewportSize({ width: 414, height: 896 });
  await page.goto('/welcome');

  const programs = page.getByTestId('programs-select');
  const input = programs.locator('input');
  await input.fill(PROGRAM_TITLE);
  await input.press('Enter');
  await page.getByTestId('onboarding-complete').click();

  await expect(page).toHaveURL(/\/planner$/);

  const chip = page.getByTestId('program-chip-182912');
  const container = programs.locator('[data-slot="command"] > div').first();
  await expectContainedLabel(page, chip, container, PROGRAM_TITLE);
  await page.setViewportSize({ width: 320, height: 896 });
  await input.click();

  await expect(programs.getByRole('option')).toHaveCount(5);

  await expectOptionsWrap(programs.getByRole('option'), programs);
  await expectTitleOnlyOption(programs, '7084', 'Baccalauréat en génie logiciel');
});
