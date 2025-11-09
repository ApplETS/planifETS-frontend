/**
 * API Types
 * Common types used across API services
 */

export type ApiResponse<T> = {
  data: T;
  status: number;
  headers: Headers;
};

export type BackendApiMessage = string | string[] | Record<string, unknown>;

export type BackendErrorDto = {
  statusCode: number;
  timestamp: string; // ISO string
  path: string;
  message: BackendApiMessage;
  // backend currently doesn't send extras, but keep optional slot for future
  details?: unknown;
};

// Optional normalized shape for UI code
export type ApiError = {
  statusCode: number | null;
  message: string; // human-friendly message
  raw?: BackendErrorDto | unknown;
};
