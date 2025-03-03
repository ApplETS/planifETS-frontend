export const selectors = {
  // Program selection
  programChip: (programCode: string) => `[data-testid="program-chip-${programCode}"]`,
  programsSelect: '[data-testid="programs-select"]',

  // Course search and display
  searchInput: '[data-testid="course-search-input"]',
  courseCard: (code: string) => `[data-testid="course-card-${code}"]`,
  courseDeleteButton: (code: string, sessionName: string, sessionYear: number) =>
    `[data-testid="delete-course-${code}-${sessionName}-${sessionYear}"]`,
  courseInSession: (code: string) => `[data-testid="course-box-${code}"]`,

  // Session targets
  sessionDropTarget: (sessionName: string, sessionYear: number) =>
    `[data-testid="session-${sessionName}-${sessionYear}-drop-target"]`,

  // Credit display
  totalCredits: '[data-testid="total-credits"]',
  sessionCredits: (sessionName: string, sessionYear: number) =>
    `[data-testid="session-${sessionName}-${sessionYear}-credits"]`,

  // Navigation
  navbar: '[data-testid="navbar"]',
  navbarButton: '[data-testid="navbar-button"]',
} as const;
