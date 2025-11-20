import { toast } from 'sonner';

export function showError(message: string) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    toast.error(message);
  } catch {
    // swallow
  }
}

export function showSuccess(message: string) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    toast.success(message);
  } catch {
    // swallow
  }
}

export function showInfo(message: string) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    toast(message);
  } catch {
    // swallow
  }
}
