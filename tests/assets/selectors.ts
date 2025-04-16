export const selectors = {
  // Program
  programChip: (programCode: string) => `[data-testid="program-chip-${programCode}"]`,
  programsSelect: '[data-testid="programs-select"]',

  // Course
  searchInput: '[data-testid="course-search-input"]',
  courseCard: (code: string) => `[data-testid="course-card-${code}"]`,
  courseDeleteButton: (code: string, sessionTerm: string, sessionYear: number) =>
    `[data-testid="delete-course-${code}-${sessionTerm}-${sessionYear}"]`,
  courseInSession: (code: string) => `[data-testid="course-box-${code}"]`,

  // Session
  sessionDropTarget: (sessionTerm: string, sessionYear: number) =>
    `[data-testid="session-${sessionTerm}-${sessionYear}-drop-target"]`,

  // Credits
  totalCredits: '[data-testid="total-credits"]',
  sessionCredits: (sessionTerm: string, sessionYear: number) =>
    `[data-testid="session-${sessionTerm}-${sessionYear}-credits"]`,

  // Navigation
  navbar: '[data-testid="navbar"]',

  // Language settings
  settingsToggleButton: '[data-testid="settings-toggle-button"]',
  languageOption: (locale: string) => `[data-testid="language-option-${locale}"]`,

  // Add sessions
  yearSection: (year?: number) => year
    ? `[data-testid="year-section-${year}"]`
    : '[data-testid^="year-section-"]',
  yearSections: '[data-testid="year-sections"]',
  addYearButton: '[data-testid="add-year-button"]',
  extractYearFromSection: /year-section-(\d+)/,
} as const;
