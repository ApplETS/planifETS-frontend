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
  currentDateIso?: string;
};

const freezeBrowserDate = async (page: Page, currentDateIso: string) => {
  await page.addInitScript((dateIso) => {
    const fixedDate = new Date(dateIso);
    const fixedTime = fixedDate.getTime();
    const RealDate = Date;

    const mockDateImpl = function (this: unknown, ...args: unknown[]) {
      if (new.target) {
        if (args.length === 0) {
          return new RealDate(fixedTime);
        }

        return new RealDate(...(args as ConstructorParameters<typeof Date>));
      }

      return new RealDate(fixedTime).toString();
    };
    const MockDate = mockDateImpl as unknown as DateConstructor;

    Object.defineProperty(MockDate, 'UTC', { value: RealDate.UTC });
    Object.defineProperty(MockDate, 'parse', { value: RealDate.parse });
    Object.defineProperty(MockDate, 'now', { value: () => fixedTime });
    Object.defineProperty(MockDate, Symbol.hasInstance, {
      value: (instance: unknown) => instance instanceof RealDate,
    });
    Object.setPrototypeOf(MockDate, RealDate);
    Object.defineProperty(mockDateImpl, 'prototype', { value: RealDate.prototype });

    Object.defineProperty(window, 'Date', {
      value: MockDate,
      configurable: true,
      writable: true,
    });
  }, currentDateIso);
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
  const currentDateIso = options.currentDateIso;
  const currentDate = currentDateIso ? new Date(currentDateIso) : new Date();
  const admissionYear = options.admissionYear ?? currentDate.getFullYear() - 2;

  if (currentDateIso) {
    await freezeBrowserDate(page, currentDateIso);
  }

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
