export const parsePositiveInteger = (value: unknown): number | null => {
  if (value === undefined || value === null) {
    return null;
  }

  // Treat empty strings as invalid input (Number('') === 0)
  if (typeof value === 'string' && value.trim() === '') {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
};
