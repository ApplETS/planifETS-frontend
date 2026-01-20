import { useTranslations } from 'next-intl';
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/shadcn/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/shadcn/ui/drawer';

type BaseDialogProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

const BaseDialog: React.FC<BaseDialogProps> = ({ isOpen, title, onClose, children }) => {
  const t = useTranslations('Commons');
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4 overflow-y-auto">
            {children}
          </div>
          <DrawerFooter>
            <Button
              onClick={onClose}
              variant="outline"
              className="border-secondary-foreground hover:bg-secondary-foreground/10"
            >
              {t('cancel')}
            </Button>
          </DrawerFooter>
          <DrawerClose />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
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
