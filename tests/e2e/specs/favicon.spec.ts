import { expect, test } from '@playwright/test';

test('uses only the custom favicon with its correct image type', async ({ page, request }) => {
  await page.goto('/welcome');

  const icons = page.locator('link[rel="icon"]');

  await expect(icons).toHaveCount(1);
  await expect(icons).toHaveAttribute('href', '/favicon.webp');
  await expect(icons).toHaveAttribute('type', 'image/webp');

  const response = await request.get('/favicon.webp');

  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toContain('image/webp');
});
