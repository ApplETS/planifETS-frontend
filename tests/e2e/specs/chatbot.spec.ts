import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { TermEnum } from '@/types/session';
import { selectors } from '../../assets/selectors';
import { reliableDragAndDrop } from '../fixtures/dnd';
import { getMessages } from '../fixtures/language';
import { setupTestPage } from '../fixtures/setup';

const messages = getMessages('en');

type MockStream = EventTarget & { url: string; onerror?: (event: Event) => void };
type StreamTestWindow = Window & { chatbotStreams: MockStream[] };

async function mockRecommendationStream(page: Page) {
  await page.addInitScript(() => {
    const streams: EventTarget[] = [];
    Object.assign(window, { chatbotStreams: streams });
    const nativeFetch = window.fetch.bind(window);
    window.fetch = async (input, init) => {
      const url = input instanceof Request ? input.url : input.toString();
      if (!url.includes('/api/chatbot/recommend/stream')) {
        return nativeFetch(input, init);
      }
      const source = Object.assign(new EventTarget(), { url });
      streams.push(source);
      let ended = false;
      const body = new ReadableStream<Uint8Array>({
        start(controller) {
          for (const type of ['status', 'reason', 'model', 'courses', 'error']) {
            source.addEventListener(type, (event) => {
              if (ended) {
                return;
              }
              const data = (event as MessageEvent<string>).data;
              controller.enqueue(new TextEncoder().encode(
                `event: ${type}\n${data.split('\n').map((line) => `data: ${line}`).join('\n')}\n\n`,
              ));
              if (type === 'courses' || type === 'error') {
                ended = true;
                controller.close();
              }
            });
          }
          init?.signal?.addEventListener('abort', () => {
            if (!ended) {
              ended = true;
              controller.error(new DOMException('Aborted', 'AbortError'));
            }
          }, { once: true });
        },
      });
      return new Response(body, { headers: { 'Content-Type': 'text/event-stream' } });
    };
  });
}

async function emitStreamEvent(page: Page, type: string, data: string) {
  await page.evaluate(({ type, data }) => {
    const source = (window as StreamTestWindow).chatbotStreams.at(-1);
    if (!source) {
      throw new Error('No recommendation stream was opened.');
    }
    const event = new MessageEvent(type, { data });
    source.dispatchEvent(event);
    if (type === 'error') {
      source.onerror?.(event);
    }
  }, { type, data });
}

test.describe('Chatbot', () => {
  test('keeps recommendations with their replies across follow-up requests', async ({ page }) => {
    await mockRecommendationStream(page);
    await setupTestPage(page);
    const course = {
      id: 980680,
      code: 'LOG680',
      title: 'Introduction à l’approche DevOps',
      credits: 3,
      prerequisites: [],
      sessionAvailability: [],
    };
    await page.route('**/courses/search?query=LOG680&limit=1', (route) => route.fulfill({
      json: { courses: [course], total: 1, hasMore: false },
    }));
    await page.route('**/api/courses/980680', (route) => route.fulfill({ json: course }));
    await page.locator(selectors.chatbotButton).click();
    const panel = page.locator(selectors.chatbotPanel);
    const input = panel.getByPlaceholder(messages.Chatbot.inputPlaceholder);
    const cards = panel.locator(selectors.courseCard('LOG680'));
    const send = panel.getByRole('button', { name: messages.Chatbot.sendButtonAriaLabel });

    await input.fill('DevOps');
    await send.click();
    await emitStreamEvent(page, 'reason', 'First recommendation.');
    await emitStreamEvent(page, 'courses', '[{"code":"LOG680","reason":"First match"}]');

    await expect(cards).toHaveCount(1);
    await expect(input).toBeEnabled();

    await input.fill('What else?');
    await send.click();

    await expect(cards).toHaveCount(1);

    await emitStreamEvent(page, 'reason', 'Second recommendation.');
    await emitStreamEvent(page, 'courses', '[{"code":"LOG680","reason":"Second match"}]');

    await expect(cards).toHaveCount(2);
    await expect(input).toBeEnabled();
    await expect(panel.getByText('First recommendation.', { exact: true }).locator('../../..')).toContainText('First match');
    await expect(panel.getByText('Second recommendation.', { exact: true }).locator('../../..')).toContainText('Second match');

    await input.fill('Thanks');
    await send.click();
    await emitStreamEvent(page, 'reason', 'You are welcome.');
    await emitStreamEvent(page, 'courses', '[]');

    await expect(input).toBeEnabled();
    await expect(cards).toHaveCount(2);

    await input.fill('Another topic');
    await send.click();
    await emitStreamEvent(page, 'error', '');

    await expect(input).toBeEnabled();
    await expect(cards).toHaveCount(2);
  });

  test('shows the busy message for HTTP 503 and allows one manual retry', async ({ page }) => {
    await setupTestPage(page);
    let requests = 0;
    await page.route('**/api/chatbot/recommend/stream?**', (route) => {
      requests += 1;
      return requests === 1
        ? route.fulfill({ status: 503, json: { message: 'Chatbot is busy. Try again shortly.' } })
        : route.fulfill({ contentType: 'text/event-stream', body: 'event: reason\ndata: Ready now.\n\nevent: courses\ndata: []\n\n' });
    });
    await page.locator(selectors.chatbotButton).click();
    const panel = page.locator(selectors.chatbotPanel);
    const input = panel.getByPlaceholder(messages.Chatbot.inputPlaceholder);
    await input.fill('DevOps');
    await panel.getByRole('button', { name: messages.Chatbot.sendButtonAriaLabel }).click();

    await expect(panel).toContainText(messages.Chatbot.busyError);
    await expect(panel).not.toContainText(messages.Chatbot.streamClosedBeforeCoursesError);
    await expect(input).toBeEnabled();
    expect(requests).toBe(1);

    await panel.getByRole('button', { name: messages.Commons.retry, exact: true }).click();

    await expect(panel).toContainText('Ready now.');
    await expect(input).toBeEnabled();
    await expect(panel.getByRole('button', { name: messages.Commons.retry, exact: true })).toHaveCount(0);
    expect(requests).toBe(2);
  });

  test('should show the default assistant message when opening the chatbot', async ({ page }) => {
    await setupTestPage(page);

    await page.locator(selectors.chatbotButton).click();

    const panel = page.locator(selectors.chatbotPanel);

    await expect(panel).toBeVisible();
    await expect(panel).toContainText(messages.Chatbot.initialMessage);

    const bubble = panel.getByText(messages.Chatbot.initialMessage, { exact: true }).locator('..');
    const radius = await bubble.evaluate((element) => {
      const reference = document.createElement('div');
      reference.style.borderRadius = 'var(--radius)';
      element.append(reference);
      const value = getComputedStyle(reference).borderRadius;
      reference.remove();
      return value;
    });

    await expect(bubble).toHaveCSS('border-radius', radius);
  });

  test('restricts recommendations to selected programs', async ({ page }) => {
    await mockRecommendationStream(page);
    await setupTestPage(page);

    await expect(page.locator(selectors.programChip('182848'))).toBeVisible();

    await page.locator(selectors.chatbotButton).click();
    const panel = page.locator(selectors.chatbotPanel);
    const input = panel.getByPlaceholder(messages.Chatbot.inputPlaceholder);
    const prompt = 'je veux faire un cours en aéroo';
    await input.fill(prompt);
    await panel.getByRole('button', { name: messages.Chatbot.sendButtonAriaLabel }).click();
    const streams = await page.evaluate(() => (window as StreamTestWindow).chatbotStreams.map((stream) => stream.url));

    expect(streams).toHaveLength(1);
    expect(new URL(streams[0]!).searchParams.get('prompt')).toBe(prompt);
    expect(new URL(streams[0]!).searchParams.get('programIds')).toBe('182848');

    await emitStreamEvent(page, 'reason', 'Global search complete.');
    await emitStreamEvent(page, 'courses', '[]');

    await expect(input).toBeEnabled();
    await expect(page.locator(selectors.programChip('182848'))).toBeVisible();
  });

  test('shows model and request duration on hover only after completion', async ({ page }) => {
    await mockRecommendationStream(page);
    await setupTestPage(page);
    await page.clock.install();
    await page.locator(selectors.chatbotButton).click();
    const panel = page.locator(selectors.chatbotPanel);
    const input = panel.getByPlaceholder(messages.Chatbot.inputPlaceholder);
    const cursor = panel.getByTestId('chatbot-streaming-indicator');

    let releaseLookup!: () => void;
    let notifyLookup!: () => void;
    const lookupStarted = new Promise<void>((resolve) => {
      notifyLookup = resolve;
    });
    const lookupGate = new Promise<void>((resolve) => {
      releaseLookup = resolve;
    });
    await page.route('**/courses/search?query=LOG680&limit=1', async (route) => {
      notifyLookup();
      await lookupGate;
      await route.fulfill({ json: { courses: [], total: 0, hasMore: false } });
    });

    await input.fill('DevOps');
    await panel.getByRole('button', { name: messages.Chatbot.sendButtonAriaLabel }).click();
    await emitStreamEvent(page, 'reason', 'Try LOG');

    await expect(panel).toContainText('Try LOG');
    await expect(cursor).toBeVisible();
    await expect(panel.getByText(/Completed in/)).toHaveCount(0);
    await expect(panel.getByTestId('stop-message-button')).toBeVisible();
    await expect(panel.getByTestId('chatbot-response-metadata')).toHaveCount(0);

    await page.clock.fastForward(1000);
    await emitStreamEvent(page, 'reason', '680.\nIt covers DevOps.');

    await expect(panel).toContainText('Try LOG680.');
    await expect(panel.getByText('It covers DevOps.', { exact: false })).toHaveCSS('white-space', 'pre-wrap');

    await emitStreamEvent(page, 'model', 'gemma-4-e2b-it-qat');
    await emitStreamEvent(page, 'courses', JSON.stringify([{ code: 'LOG680' }]));
    await lookupStarted;
    await page.clock.fastForward(1000);

    await expect(panel.getByText(/Completed in/)).toHaveCount(0);
    await expect(panel.getByTestId('stop-message-button')).toBeVisible();
    await expect(panel.getByTestId('chatbot-response-metadata')).toHaveCount(0);

    releaseLookup();

    await expect(panel.getByText(/Completed in/)).toHaveCount(0);
    await expect(cursor).toHaveCount(0);
    await expect(input).toBeEnabled();

    const metadata = panel.getByTestId('chatbot-response-metadata');

    await expect(metadata).toContainText('gemma-4-e2b-it-qat ·');
    await expect(metadata).toHaveCSS('opacity', '0');

    const answer = panel.getByText('Try LOG680.\nIt covers DevOps.', { exact: true }).locator('..');
    await answer.hover();

    await expect(metadata).toHaveCSS('opacity', '1');

    await input.hover();

    await expect(metadata).toHaveCSS('opacity', '0');

    await answer.focus();

    await expect(metadata).toHaveCSS('opacity', '1');

    await input.fill('Another request');
    await panel.getByRole('button', { name: messages.Chatbot.sendButtonAriaLabel }).click();
    await emitStreamEvent(page, 'reason', 'Second answer.');

    await expect(panel.getByText(/Completed in/)).toHaveCount(0);

    await emitStreamEvent(page, 'courses', '[]');

    await expect(panel.getByText(/Completed in/)).toHaveCount(0);
    await expect(input).toBeEnabled();
  });

  test('keeps partial text after a stream error without starting another generation', async ({ page }) => {
    await mockRecommendationStream(page);
    await setupTestPage(page);
    let generationRequests = 0;
    await page.route('**/api/chatbot/recommend', (route) => {
      generationRequests += 1;
      return route.fulfill({ json: { courses: [], explanation: 'Replacement answer.' } });
    });
    await page.locator(selectors.chatbotButton).click();
    const panel = page.locator(selectors.chatbotPanel);
    const input = panel.getByPlaceholder(messages.Chatbot.inputPlaceholder);

    await input.fill('DevOps');
    await panel.getByRole('button', { name: messages.Chatbot.sendButtonAriaLabel }).click();
    await emitStreamEvent(page, 'reason', 'Partial answer');

    await expect(panel).toContainText('Partial answer');

    await emitStreamEvent(page, 'error', '');

    await expect(input).toBeEnabled();
    await expect(panel).toContainText('Partial answer');
    await expect(panel).not.toContainText('Replacement answer.');
    await expect(panel.getByRole('alert')).toBeVisible();
    await expect(panel.getByTestId('chatbot-response-duration')).toHaveCount(0);
    await expect(panel.getByTestId('chatbot-streaming-indicator')).toHaveCount(0);
    expect(generationRequests).toBe(0);
    expect(await page.evaluate(() => (window as StreamTestWindow).chatbotStreams.length)).toBe(1);

    await panel.getByRole('button', { name: messages.Commons.retry, exact: true }).click();

    expect(await page.evaluate(() => (window as StreamTestWindow).chatbotStreams.length)).toBe(2);

    await emitStreamEvent(page, 'reason', 'Retried answer.');
    await emitStreamEvent(page, 'courses', '[]');

    await expect(input).toBeEnabled();
    await expect(panel).toContainText('Retried answer.');
    await expect(panel.getByRole('button', { name: messages.Commons.retry, exact: true })).toHaveCount(0);
  });

  for (const [prompt, answer] of [
    ['how we doing broski', 'Doing well! What kind of courses are you looking for?'],
    ['Suggest something', 'What subjects or goals would you like to explore?'],
    ['Courses on underwater basket weaving', 'No matching courses were found.'],
  ]) {
    test(`does not offer retry for a successful empty result: ${prompt}`, async ({ page }) => {
      await mockRecommendationStream(page);
      await setupTestPage(page);
      let generationRequests = 0;
      await page.route('**/api/chatbot/recommend', (route) => {
        generationRequests += 1;
        return route.fulfill({ json: { courses: [{ code: 'LOG680' }], explanation: 'LOG680 covers DevOps.' } });
      });
      await page.locator(selectors.chatbotButton).click();
      const panel = page.locator(selectors.chatbotPanel);
      const input = panel.getByPlaceholder(messages.Chatbot.inputPlaceholder);
      await input.fill(prompt!);
      await panel.getByRole('button', { name: messages.Chatbot.sendButtonAriaLabel }).click();
      await emitStreamEvent(page, 'reason', answer!);
      await emitStreamEvent(page, 'courses', '[]');

      await expect(input).toBeEnabled();
      await expect(panel).toContainText(answer!);
      await expect(panel.locator(selectors.courseCard('LOG680'))).toHaveCount(0);
      expect(generationRequests).toBe(0);
      expect(await page.evaluate(() => (window as StreamTestWindow).chatbotStreams.length)).toBe(1);

      await expect(panel.getByRole('button', { name: messages.Commons.retry, exact: true })).toHaveCount(0);
    });
  }

  for (const detailStatus of [200, 503]) {
    test(`streams numeric course-code chunks once and keeps draggable cards when description lookup returns ${detailStatus}`, async ({ page }) => {
      await mockRecommendationStream(page);
      await setupTestPage(page);
      const course = {
        id: 980680,
        code: 'LOG680',
        title: 'Introduction à l’approche DevOps',
        credits: 3,
        prerequisites: [],
        sessionAvailability: [],
      };
      let generationRequests = 0;
      await page.route('**/api/chatbot/recommend', (route) => {
        generationRequests += 1;
        return route.fulfill({ json: { courses: [], explanation: 'Replacement answer.' } });
      });
      await page.route('**/courses/search?query=LOG680&limit=1', (route) => route.fulfill({
        json: { courses: [course], total: 1, hasMore: false },
      }));
      await page.route('**/api/courses/980680', (route) => route.fulfill({
        status: detailStatus,
        json: detailStatus === 200 ? { ...course, description: ' ' } : { message: 'Details unavailable' },
      }));
      await page.locator(selectors.chatbotButton).click();
      const panel = page.locator(selectors.chatbotPanel);
      const input = panel.getByPlaceholder(messages.Chatbot.inputPlaceholder);
      await input.fill('DevOps');
      await panel.getByRole('button', { name: messages.Chatbot.sendButtonAriaLabel }).click();
      await emitStreamEvent(page, 'reason', 'Try LOG6');
      await emitStreamEvent(page, 'reason', '80');
      await emitStreamEvent(page, 'reason', '.');

      await expect(panel).toContainText('Try LOG680.');

      await emitStreamEvent(page, 'courses', '[{"code":"LOG680","reason":"CI/CD"}]');

      const card = panel.locator(selectors.courseCard('LOG680'));

      await expect(card).toBeVisible();
      await expect(card).toHaveAttribute('draggable', 'true');
      await expect(card).toContainText('CI/CD');
      await expect(panel.getByTestId('chatbot-response-duration')).toHaveCount(0);
      await expect(input).toBeEnabled();
      expect(generationRequests).toBe(0);
      expect(await page.evaluate(() => (window as StreamTestWindow).chatbotStreams.length)).toBe(1);

      const session = page.locator(selectors.sessionDropTarget(TermEnum.A, new Date().getFullYear()));
      const courseInSession = session.locator(selectors.courseInSession('LOG680'));
      const description = card.getByText('CI/CD', { exact: true });
      await reliableDragAndDrop(page, description, session, courseInSession);

      await expect(courseInSession).toBeVisible();
      await expect(session).toContainText(course.title);

      await expect(card.getByRole('link')).toHaveCount(0);
    });
  }

  test('expands and collapses long recommended course descriptions', async ({ page }) => {
    await mockRecommendationStream(page);
    await setupTestPage(page);
    const description = 'A'.repeat(200);
    const course = {
      id: 980680,
      code: 'LOG680',
      title: 'Introduction à l’approche DevOps',
      credits: 3,
      prerequisites: [],
      sessionAvailability: [],
    };
    await page.route('**/courses/search?query=LOG680&limit=1', (route) => route.fulfill({
      json: { courses: [course], total: 1, hasMore: false },
    }));
    await page.route('**/api/courses/980680', (route) => route.fulfill({
      json: { ...course, description },
    }));
    await page.locator(selectors.chatbotButton).click();
    const panel = page.locator(selectors.chatbotPanel);
    await panel.getByPlaceholder(messages.Chatbot.inputPlaceholder).fill('DevOps');
    await panel.getByRole('button', { name: messages.Chatbot.sendButtonAriaLabel }).click();
    await emitStreamEvent(page, 'reason', 'Recommended course.');
    await emitStreamEvent(page, 'courses', '[{"code":"LOG680"}]');

    const card = panel.locator(selectors.courseCard('LOG680'));
    const showMore = card.getByRole('button', { name: messages.Chatbot.showMore, exact: true });

    await expect(showMore).toBeVisible();

    await expect(card).toContainText(`${'A'.repeat(180)}...`);

    await showMore.click();

    await expect(card).toContainText(description);

    await card.getByRole('button', { name: messages.Chatbot.showLess, exact: true }).click();

    await expect(card).not.toContainText(description);
  });

  test('keeps multiline course descriptions intact and removes blank lines', async ({ page }) => {
    await mockRecommendationStream(page);
    await setupTestPage(page);
    const description = `First line ${'A'.repeat(180)}\n\n   \nSecond line ${'B'.repeat(180)}`;
    const course = {
      id: 980680,
      code: 'LOG680',
      title: 'Introduction à l’approche DevOps',
      credits: 3,
      prerequisites: [],
      sessionAvailability: [],
    };
    await page.route('**/courses/search?query=LOG680&limit=1', (route) => route.fulfill({
      json: { courses: [course], total: 1, hasMore: false },
    }));
    await page.route('**/api/courses/980680', (route) => route.fulfill({
      json: { ...course, description },
    }));
    await page.locator(selectors.chatbotButton).click();
    const panel = page.locator(selectors.chatbotPanel);
    await panel.getByPlaceholder(messages.Chatbot.inputPlaceholder).fill('DevOps');
    await panel.getByRole('button', { name: messages.Chatbot.sendButtonAriaLabel }).click();
    await emitStreamEvent(page, 'reason', 'Recommended course.');
    await emitStreamEvent(page, 'courses', '[{"code":"LOG680"}]');

    const card = panel.locator(selectors.courseCard('LOG680'));

    await expect(card).toContainText(`First line ${'A'.repeat(180)} Second line ${'B'.repeat(180)}`);
    await expect(card.getByRole('button', { name: messages.Chatbot.showMore, exact: true })).toHaveCount(0);
  });

  test('clears the streaming indicator without reporting successful completion after failure', async ({ page }) => {
    await mockRecommendationStream(page);
    await setupTestPage(page);
    await page.route('**/api/chatbot/recommend', (route) => route.fulfill({
      status: 503,
      json: { message: 'Recommendation unavailable' },
    }));
    await page.locator(selectors.chatbotButton).click();
    const panel = page.locator(selectors.chatbotPanel);
    const input = panel.getByPlaceholder(messages.Chatbot.inputPlaceholder);

    await input.fill('DevOps');
    await panel.getByRole('button', { name: messages.Chatbot.sendButtonAriaLabel }).click();
    await emitStreamEvent(page, 'reason', 'Partial answer');

    await expect(panel.getByTestId('chatbot-streaming-indicator')).toBeVisible();

    await emitStreamEvent(page, 'error', '');

    await expect(input).toBeEnabled();
    await expect(panel.getByTestId('chatbot-streaming-indicator')).toHaveCount(0);
    await expect(panel.getByTestId('chatbot-response-duration')).toHaveCount(0);
  });
});
