import type { ApiError, ApiResponse } from '@/types/api';

type RequestConfig = RequestInit & {
  params?: Record<string, string | number | boolean>;
};

class ApiClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || process.env.NEXT_PUBLIC_API_BASE_URL || '';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private buildURL(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(endpoint, this.baseURL);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    return url.toString();
  }

  private normalizeErrorMessage(message: unknown): string {
    if (typeof message === 'string') {
      return message;
    }
    if (Array.isArray(message)) {
      return message.join(', ');
    }
    if (typeof message === 'object' && message !== null) {
      return JSON.stringify(message);
    }
    return 'An error occurred';
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    let data: T | null = null;
    let error: ApiError | null = null;

    try {
      if (isJson) {
        const jsonData = await response.json();

        if (!response.ok) {
          // Backend error format
          error = {
            statusCode: jsonData.statusCode || response.status,
            message: this.normalizeErrorMessage(jsonData.message) || response.statusText,
            raw: jsonData,
          };
        } else {
          data = jsonData;
        }
      } else if (!response.ok) {
        error = {
          statusCode: response.status,
          message: response.statusText || 'Request failed',
          raw: undefined,
        };
      }
    } catch {
      error = {
        statusCode: response.status,
        message: 'Failed to parse response',
        raw: undefined,
      };
    }

    if (error) {
      throw error;
    }

    return {
      data: data as T,
      status: response.status,
      headers: response.headers,
    };
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = this.buildURL(endpoint, config?.params);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...this.defaultHeaders,
        ...config?.headers,
      },
      ...config,
    });

    return this.handleResponse<T>(response);
  }
}

export const apiClient = new ApiClient();
