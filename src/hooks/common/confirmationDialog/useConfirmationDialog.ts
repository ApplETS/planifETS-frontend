import { useCallback, useState } from 'react';

type ConfirmationDialogOptions = {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
};

type ConfirmationDialogState = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmDialogLabel: string;
  cancelLabel: string;
  isLoading: boolean;
};

type UseConfirmationDialogReturn = {
  isConfirmationDialogOpen: boolean;
  confirmationDialogMessage: string;
  confirmationDialogTitle: string;
  confirmDialogLabel: string;
  cancelLabel: string;
  isLoading: boolean;
  handleConfirm: () => Promise<void>;
  handleCancel: () => void;
  showConfirmation: (options: ConfirmationDialogOptions) => void;
};

const DEFAULT_LABELS = {
  confirm: 'Confirm',
  cancel: 'Cancel',
} as const;

const INITIAL_STATE: ConfirmationDialogState = {
  isOpen: false,
  title: '',
  message: '',
  confirmDialogLabel: DEFAULT_LABELS.confirm,
  cancelLabel: DEFAULT_LABELS.cancel,
  isLoading: false,
};

/**
 * Hook for managing confirmation dialog state and actions
 * Provides a reusable confirmation dialog with customizable messages, labels, and callbacks
 * Supports both synchronous and asynchronous confirmation actions.
 *
 * @returns {UseConfirmationDialogReturn} Dialog state and control functions
 */
export const useConfirmationDialog = (): UseConfirmationDialogReturn => {
  const [state, setState] = useState<ConfirmationDialogState>(INITIAL_STATE);
  const [onConfirmCallback, setOnConfirmCallback] = useState<(() => void | Promise<void>) | null>(null);
  const [onCancelCallback, setOnCancelCallback] = useState<(() => void) | null>(null);

  const showConfirmation = useCallback(
    ({
      title,
      message,
      confirmLabel = DEFAULT_LABELS.confirm,
      cancelLabel = DEFAULT_LABELS.cancel,
      onConfirm,
      onCancel,
    }: ConfirmationDialogOptions) => {
      if (!title || !message) {
        throw new Error('Title and message are required for confirmation dialog');
      }

      setState({
        isOpen: true,
        title,
        message,
        confirmDialogLabel: confirmLabel,
        cancelLabel,
        isLoading: false,
      });

      setOnConfirmCallback(() => onConfirm);
      setOnCancelCallback(() => onCancel);
    },
    [],
  );

  const handleConfirm = useCallback(async () => {
    if (!onConfirmCallback) {
      return;
    }

    try {
      setState(prev => ({ ...prev, isLoading: true }));
      await onConfirmCallback();
    } catch (error) {
      console.error('Confirmation action failed:', error);
      throw error;
    } finally {
      setState(prev => ({ ...prev, isLoading: false, isOpen: false }));
      setOnConfirmCallback(null);
      setOnCancelCallback(null);
    }
  }, [onConfirmCallback]);

  const handleCancel = useCallback(() => {
    setState(INITIAL_STATE);
    if (onCancelCallback) {
      onCancelCallback();
    }
    setOnConfirmCallback(null);
    setOnCancelCallback(null);
  }, [onCancelCallback]);

  return {
    isConfirmationDialogOpen: state.isOpen,
    confirmationDialogMessage: state.message,
    confirmationDialogTitle: state.title,
    confirmDialogLabel: state.confirmDialogLabel,
    cancelLabel: state.cancelLabel,
    isLoading: state.isLoading,
    handleConfirm,
    handleCancel,
    showConfirmation,
  };
};
