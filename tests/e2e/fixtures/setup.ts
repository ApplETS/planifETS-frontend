import type { Page } from '@playwright/test';
import { selectors } from '../../assets/selectors';
import enableMockApi from './mock';
import completeOnboarding from './onboarding';

const PROGRAM_NAME = 'Baccalauréat en génie logiciel';
const PROGRAM_ID_LOG = '182848';
type SetupTestPageOptions = {
  programName?: string;
  programId?: string;
  admissionYear?: number;
};

export const setupTestPage = async (
  page: Page,
  options: SetupTestPageOptions = {},
) => {
  enableMockApi(page);
  const searchInput = page.locator(selectors.searchInput);
  const welcomePage = page.locator(selectors.welcomePage);
  const programName = options.programName ?? PROGRAM_NAME;
  const programId = options.programId ?? PROGRAM_ID_LOG;
  const admissionYear = options.admissionYear ?? new Date().getFullYear() - 2;

  await page.goto('/welcome');
  await page.waitForLoadState('domcontentloaded');

  const initialRouteState = await Promise.race([
    searchInput.waitFor({ state: 'visible', timeout: 15000 }).then(() => 'planner' as const),
    welcomePage.waitFor({ state: 'visible', timeout: 15000 }).then(() => 'welcome' as const),
  ]);

  if (initialRouteState === 'welcome') {
    await completeOnboarding(
      page,
      programName,
      programId,
      admissionYear,
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
