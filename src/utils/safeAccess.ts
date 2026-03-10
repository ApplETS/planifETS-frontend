// Get a value from a Record, avoiding prototype pollution
export function safeGet<T>(record: Record<string, T>, key: string): T | undefined {
  if (Object.prototype.hasOwnProperty.call(record, key)) {
    return record[key];
  }
  return undefined;
}

// Get a value from a Record with numeric keys
export function safeGetNumber<T>(record: Record<number, T>, key: number): T | undefined {
  if (Object.prototype.hasOwnProperty.call(record, key)) {
    return record[key];
  }
  return undefined;
}

// Check if a key exists in a Record
export function safeHas<T>(record: Record<string, T>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(record, key);
}

// Check if a numeric key exists in a Record
export function safeHasNumber<T>(record: Record<number, T>, key: number): boolean {
  return Object.prototype.hasOwnProperty.call(record, key);
}
