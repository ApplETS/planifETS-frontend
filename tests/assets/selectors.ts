export const selectors = {
  // Program selection
  programSelect: '[data-testid="program-select"]',
  programOption: (program: string) => `[data-testid="program-option-${program}"]`,

  // Course sidebar
  courseSidebar: '[data-testid="course-sidebar"]',

  // Course search and display
  searchInput: '[data-testid="course-search-input"]',
  courseCard: (code: string) => `[data-testid="course-card-${code}"]`,
  courseDeleteButton: (code: string, sessionName: string, year: number) =>
    `[data-testid="delete-course-${code}-${sessionName}-${year}"]`,
  courseInSession: (code: string) => `[data-testid="course-box-${code}"]`,

  // Session targets
  sessionDropTarget: (sessionName: string, year: number) =>
    `[data-testid="session-${sessionName}-${year}-drop-target"]`,

  // Credit display
  totalCredits: '[data-testid="total-credits"]',
  sessionCredits: (sessionName: string, year: number) =>
    `[data-testid="session-${sessionName}-${year}-credits"]`,

  // Navigation
  navbar: '[data-testid="navbar"]',
  navbarButton: '[data-testid="navbar-button"]',
} as const;
