import type { ApiError, BackendErrorDto } from '@/types/api';

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
   * Check if error is validation error
   */
  static isValidationError(error: ApiError): boolean {
    return error.statusCode === 400 || error.statusCode === 422;
  }

  /**
   * Check if error is not found error
   */
  static isNotFoundError(error: ApiError): boolean {
    return error.statusCode === 404;
  }

  /**
   * Check if error is network error
   */
  static isNetworkError(error: unknown): boolean {
    return error instanceof ApiNetworkError;
  }

  /**
   * Get the raw backend error if available
   */
  static getBackendError(error: ApiError): BackendErrorDto | null {
    if (error.raw && typeof error.raw === 'object' && 'statusCode' in error.raw) {
      return error.raw as BackendErrorDto;
    }
    return null;
  }

  /**
   * Get validation errors from backend error details
   */
  static getValidationErrors(error: ApiError): Record<string, string> | null {
    if (!this.isValidationError(error)) {
      return null;
    }

    const backendError = this.getBackendError(error);
    if (!backendError?.details) {
      return null;
    }

    return backendError.details as Record<string, string>;
  }
}

/**
 * Hook-friendly error handler
 */
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
