import type { Page } from '@playwright/test';
import type { SearchCoursesDto } from '@/api/types/course';
import { COURSE_SEARCH_RESULTS } from './data/course-search-results';

function jsonResponse(status: number, body: unknown) {
  return {
    status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

export function registerCourseSearchRoutes(page: Page) {
  // /courses/search?query=LOG&limit=100
  page.route('**/courses/search**', (route) => {
    const url = new URL(route.request().url());
    const query = url.searchParams.get('query')?.toUpperCase() || '';
    const limit = Number.parseInt(url.searchParams.get('limit') || '100', 10);

    // Check if we have predefined results for this query
    const predefinedResults = COURSE_SEARCH_RESULTS[query];

    if (predefinedResults) {
      const limitedCourses = predefinedResults.courses.slice(0, limit);

      const response: SearchCoursesDto = {
        courses: limitedCourses,
        total: predefinedResults.total,
        hasMore: predefinedResults.total > limit,
      };

      route.fulfill(jsonResponse(200, response));
    } else {
      // Return empty results for unmocked queries
      route.fulfill(jsonResponse(200, {
        courses: [],
        total: 0,
        hasMore: false,
      }));
    }
  });
}
