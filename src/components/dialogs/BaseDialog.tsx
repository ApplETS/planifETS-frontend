import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

type BaseDialogProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

const BaseDialog: React.FC<BaseDialogProps> = ({ isOpen, title, onClose, children }) => {
  const t = useTranslations('Commons');

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      slotProps={{
        paper: {
          className: 'bg-background border border-border',
        },
      }}
    >
      <DialogTitle className="rounded-t-md bg-secondary text-lg font-bold text-secondary-foreground">
        {title}
      </DialogTitle>
      <DialogContent className="rounded-b-md bg-background p-4">
        {children}
      </DialogContent>
      <DialogActions className="rounded-b-md bg-secondary p-2">
        <Button
          onClick={onClose}
          variant="outlined"
          className="text-secondary-foreground border-secondary-foreground hover:bg-secondary-foreground/10"
        >
          {t('cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BaseDialog;
