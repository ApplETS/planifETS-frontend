import type { ApiError } from '@/types/api';

export class ApiNetworkError extends Error {
  statusCode: number | null;
  raw: unknown;
  constructor(message: string, raw?: unknown) {
    super(message);
    this.name = 'ApiNetworkError';
    this.statusCode = null;
    this.raw = raw;
  }
}

export class ApiErrorHandler {
  static formatErrorMessage(error: ApiError): string {
    const statusCode = error.statusCode;

    // If we already have a normalized message, use it with context
    if (error.message) {
      return error.message;
    }

    switch (statusCode) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'You are not authenticated. Please login.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'A conflict occurred. The resource may already exist.';
      case 422:
        return 'Validation failed. Please check your input.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'An internal server error occurred. Please try again later.';
      case 503:
        return 'Service is temporarily unavailable. Please try again later.';
      default:
        return 'An unexpected error occurred.';
    }
  }

  /**
   * Check if error is network error
   */
  static isNetworkError(error: unknown): boolean {
    return error instanceof ApiNetworkError
      || (typeof error === 'object'
        && error !== null
        && 'statusCode' in error
        && (error as any).statusCode === null);
  }
}

export function handleApiError(error: unknown): string {
  if (ApiErrorHandler.isNetworkError(error)) {
    return (error as ApiNetworkError).message;
  }

  if (typeof error === 'object' && error !== null && 'statusCode' in error) {
    return ApiErrorHandler.formatErrorMessage(error as ApiError);
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred.';
}
