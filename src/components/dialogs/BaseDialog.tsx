import { useTranslations } from 'next-intl';
import React from 'react';
import { Button } from '@/shadcn/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/ui/dialog';

type BaseDialogProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

const BaseDialog: React.FC<BaseDialogProps> = ({ isOpen, title, onClose, children }) => {
  const t = useTranslations('Commons');

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent
        className={` border border-border`}
      >
        <DialogHeader>
          <DialogTitle className="rounded-t-md ">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="rounded-b-md p-4">
          {children}
        </div>
        <DialogFooter className="rounded-b-md p-2">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-secondary-foreground hover:bg-secondary-foreground/10"
          >
            {t('cancel')}
          </Button>
        </DialogFooter>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};

export default BaseDialog;
