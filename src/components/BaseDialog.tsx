import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

type BaseDialogProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

const BaseDialog: React.FC<BaseDialogProps> = ({ isOpen, title, onClose, children }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="rounded-t-md bg-navbar text-lg font-bold text-textDarkBackground">
        {title}
      </DialogTitle>
      <DialogContent className="rounded-b-md bg-background p-4">
        {children}
      </DialogContent>
      <DialogActions className="rounded-b-md bg-navbar">
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BaseDialog;
