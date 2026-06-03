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
          <DrawerHeader className={hideHeader ? 'sr-only' : 'border-b border-border pb-4 -mx-4 px-4'}>
            <DrawerTitle>{title}</DrawerTitle>
            <div
              className={hideDescription ? 'sr-only' : 'text-sm text-muted-foreground'}
            >
              {description}
            </div>
          </DrawerHeader>
          <div className="px-4 pb-4 overflow-y-auto">{children}</div>
          <DrawerFooter className="border-t border-border -mx-4 px-4">
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                onClick={onClose}
                variant="outline"
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
        <DialogHeader className={hideHeader ? 'sr-only' : 'border-b border-border pb-4 -mx-6 px-6'}>
          <DialogTitle className="rounded-t-md ">{title}</DialogTitle>
          <DialogDescription
            className={hideDescription ? 'sr-only' : 'text-sm text-muted-foreground'}
          >
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 scrollbar-thin -mr-6 pr-4">{children}</div>
        <DialogFooter className="border-t border-border pt-4 -mx-6 px-6">
          <div className="flex items-center justify-end gap-2 w-full">
            <Button
              onClick={onClose}
              variant="outline"
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
