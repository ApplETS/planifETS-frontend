import { expect, test } from '@playwright/test';
import { selectors } from '../../assets/selectors';
import { getMessages } from '../fixtures/language';
import { setupTestPage } from '../fixtures/setup';

const messages = getMessages('en');

test.describe('Chatbot', () => {
  test('should show the default assistant message when opening the chatbot', async ({ page }) => {
    await setupTestPage(page);

    await page.locator(selectors.chatbotButton).click();

    const panel = page.locator(selectors.chatbotPanel);

    await expect(panel).toBeVisible();
    await expect(panel).toContainText(messages.Chatbot.initialMessage);
  });
});
