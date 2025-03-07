import { API_CONFIG } from './config';

/**
 * Error type for API request failures
 */
export type ApiError = {
  status: number;
  message: string;
  details?: any;
};

/**
 * Options for API requests
 */
export type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  pathParams?: Record<string, string | number>;
  queryParams?: Record<string, string | number | boolean>;
};

/**
 * Makes an API request with error handling
 * @param endpoint - API endpoint path
 * @param options - Request configuration options
 * @returns Promise with the typed response data
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = 'GET', headers = {}, body, pathParams, queryParams } = options;

  try {
    // Format URL with path and query parameters
    let formattedEndpoint = endpoint;

    // Replace path parameters (e.g., :id with actual value)
    if (pathParams) {
      Object.entries(pathParams).forEach(([key, value]) => {
        formattedEndpoint = formattedEndpoint.replace(`:${key}`, value.toString());
      });
    }

    // Add query parameters
    let url = `${API_CONFIG.baseUrl}${formattedEndpoint}`;
    if (queryParams) {
      const searchParams = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        searchParams.append(key, value.toString());
      });

      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    // Prepare request
    const requestOptions: RequestInit = {
      method,
      headers: {
        ...API_CONFIG.defaultHeaders,
        ...headers,
      },
      credentials: 'include',
    };

    // Add body if provided
    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    // Execute request
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    // Handle error responses
    if (!response.ok) {
      const error: ApiError = {
        status: response.status,
        message: data.message || `API Error: ${response.statusText}`,
        details: data.details,
      };
      throw error;
    }

    return data as T;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Creates an AbortController for canceling in-flight requests
 */
export function createRequestController(): {
  controller: AbortController;
  signal: AbortSignal;
} {
  const controller = new AbortController();
  return {
    controller,
    signal: controller.signal,
  };
}
