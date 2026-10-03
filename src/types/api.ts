/**
 * API Types
 * Common types used across API services
 */

export type ApiResponse<T> = {
  data: T;
  status: number;
  headers: Headers;
};

// Optional normalized shape for UI code
export type ApiError = {
  statusCode: number | null;
  message: string; // human-friendly message
  raw?: unknown;
};
