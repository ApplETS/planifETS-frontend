import type { Page } from '@playwright/test';
import { selectors } from '../../assets/selectors';
import enableMockApi from './mock';
import completeOnboarding from './onboarding';

const PROGRAM_NAME = 'Baccalauréat en génie logiciel';
const PROGRAM_ID_LOG = '182848';
export const setupTestPage = async (page: Page) => {
  enableMockApi(page);
  const searchInput = page.locator(selectors.searchInput);
  const welcomePage = page.locator(selectors.welcomePage);

  await page.goto('/welcome');
  await page.waitForLoadState('domcontentloaded');

  const initialRouteState = await Promise.race([
    searchInput.waitFor({ state: 'visible', timeout: 15000 }).then(() => 'planner' as const),
    welcomePage.waitFor({ state: 'visible', timeout: 15000 }).then(() => 'welcome' as const),
  ]);

  if (initialRouteState === 'welcome') {
    await completeOnboarding(
      page,
      PROGRAM_NAME,
      PROGRAM_ID_LOG,
      new Date().getFullYear() - 2,
    );
  }

  // Wait until the planner sidebar is mounted before individual tests continue.
  await searchInput.waitFor({ state: 'visible', timeout: 15000 });

  // Disable animations for faster tests
  if (process.env.CI) {
    await page.addStyleTag({
      content: `* { transition: none !important; animation: none !important; }`,
    });
  }
};
