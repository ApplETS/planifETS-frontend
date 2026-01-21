import { useTranslations } from 'next-intl';
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/shadcn/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
  footerActions?: React.ReactNode;
  description: React.ReactNode;
  hideHeader?: boolean;
  hideDescription?: boolean;
};
const BaseDialog: React.FC<BaseDialogProps> = ({
  isOpen,
  title,
  onClose,
  children,
  footerActions,
  hideHeader,
  hideDescription,
  description,
}) => {
  const t = useTranslations('Commons');
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent>
          <DrawerHeader className={hideHeader ? 'sr-only' : ''}>
            <DrawerTitle>{title}</DrawerTitle>
            <div
              className={hideDescription ? 'sr-only' : 'text-sm text-muted-foreground'}
            >
              {description}
            </div>
          </DrawerHeader>
          <div className="px-4 pb-4 overflow-y-auto">{children}</div>
          <DrawerFooter>
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                onClick={onClose}
                variant="outline"
                className="border-secondary-foreground hover:bg-secondary-foreground/10"
              >
                {t('cancel')}
              </Button>
              <div className="flex items-center gap-2">{footerActions}</div>
            </div>
          </DrawerFooter>
          <DrawerClose />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={` border border-border`}>
        <DialogHeader className={hideHeader ? 'sr-only' : ''}>
          <DialogTitle className="rounded-t-md ">{title}</DialogTitle>
          <DialogDescription
            className={hideDescription ? 'sr-only' : 'text-sm text-muted-foreground'}
          >
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-b-md p-4">{children}</div>
        <DialogFooter className="rounded-b-md p-2">
          <div className="flex items-center justify-end gap-2 w-full">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-secondary-foreground hover:bg-secondary-foreground/10"
            >
              {t('cancel')}
            </Button>
            <div className="flex items-center gap-2">{footerActions}</div>
          </div>
        </DialogFooter>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};

export default BaseDialog;
