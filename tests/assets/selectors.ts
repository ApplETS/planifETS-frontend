import type { TermEnum } from '@/types/session';

export const selectors = {
  // Program
  programChip: (programId: string) => `[data-testid="program-chip-${programId}"]`,
  programChipRemoveButton: (programId: string) => `[data-testid="program-chip-${programId}"] button[name="remove-option"]`,
  programChipItem: '[data-testid^="program-chip-"]',
  programsSelect: '[data-testid="programs-select"]',
  courseDetailsProgramSelect: '[data-testid="course-details-program-select"]',
  onboardingCompleteButton: '[data-testid="onboarding-complete"]',
  welcomePage: '[data-testid="welcome-page"]',

  // Course
  searchInput: '[data-testid="course-search-input"]',
  courseCard: (code: string) => `[data-testid="course-card-${code}"]`,
  courseActionsButton: (code: string, sessionTerm: string, sessionYear: number) =>
    `[data-testid="course-actions-${code}-${sessionTerm}-${sessionYear}"]`,
  courseDeleteButton: (code: string, sessionTerm: string, sessionYear: number) =>
    `[data-testid="delete-course-${code}-${sessionTerm}-${sessionYear}"]`,
  courseInSession: (code: string) => `[data-testid="course-box-${code}"]`,
  courseOffering: (sessionKey: string) => `[data-testid="course-offering-${sessionKey}"]`,
  courseOfferingAvailability: (sessionKey: string, availability: string) =>
    `[data-testid="course-offering-${sessionKey}-availability-${availability}"]`,

  // Session
  sessionDropTarget: (sessionTerm: TermEnum, sessionYear: number) =>
    `[data-testid="session-${sessionTerm}-${sessionYear}-drop-target"]`,
  infoIcon: (sessionTerm: string, sessionYear: number) =>
    `[data-testid="info-icon-${sessionTerm}-${sessionYear}"]`,
  year: (year: number) =>
    `[data-testid="year-${year}-sessions"] [data-testid$="-drop-target"]`,

  // Credits
  totalCredits: '[data-testid="total-credits"]',
  sessionCredits: (sessionTerm: TermEnum, sessionYear: number) =>
    `[data-testid="session-${sessionTerm}-${sessionYear}-credits"]`,

  // Navigation
  navbar: '[data-testid="navbar"]',

  // Buttons
  addYearButton: '[data-testid="add-year-button"]',

  // Language settings
  settingsToggleButton: '[data-testid="settings-toggle-button"]',
  languageOption: (locale: string) => `[data-testid="language-option-${locale}"]`,

  // Theme settings
  themeOption: (themeName: string) => `[data-testid="theme-option-${themeName}"]`,
  themeContainer: '[data-testid="theme-container"]',

  // Global Search
  globalSearchLink: '[data-testid="global-search-link"]',
  globalSearchButton: '[data-testid="global-search-button"]',
  globalSearchActive: '[data-testid="global-search-active"]',
  courseCardItem: '[data-testid^="course-card-"]',

  // Tabs
  favoritesTab: 'role=tab[name=/favorites/i]',
  coursesTab: 'role=tab[name=/courses/i]',

  // Onboarding dialog
  admissionYearInput: '[data-testid="admission-year"]',
} as const;
