import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Cross2Icon } from '@radix-ui/react-icons';

export interface UIDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}

export default function UIDialog({
  open,
  onOpenChange,
  children,
  header,
  footer,
  title,
  description,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  showCloseButton = true,
  onClose,
  ...props
}: UIDialogProps) {
  const handleClose = () => {
    onOpenChange(false);
    onClose?.();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={`
            fixed inset-0 bg-black/80 z-40 data-[state=open]:animate-in data-[state=closed]:animate-out 
            data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
            ${overlayClassName}
          `}
        />
        <Dialog.Content
          className={`
            fixed z-50 px-12 py-10 w-full max-w-md mx-auto bg-white rounded-[5px] shadow-lg 
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            data-[state=open]:animate-in data-[state=closed]:animate-out 
            data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
            data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
            data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]
            data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]
            ${contentClassName} ${className}
          `}
          {...props}
        >
          {/* Accessibility: Required Dialog.Title */}
          {title ? (
            <Dialog.Title className="sr-only">{title}</Dialog.Title>
          ) : (
            <VisuallyHidden.Root asChild>
              <Dialog.Title>Dialog</Dialog.Title>
            </VisuallyHidden.Root>
          )}

          {/* Accessibility: Optional Dialog.Description */}
          {description && (
            <Dialog.Description className="sr-only">{description}</Dialog.Description>
          )}

          {showCloseButton && (
            <Dialog.Close asChild>
              <button
                className="absolute cursor-pointer right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                onClick={handleClose}
                aria-label="Close dialog"
              >
                <Cross2Icon className="h-8 w-8" color="gray" />
              </button>
            </Dialog.Close>
          )}

          {header && (
            <>
              <div className="pb-8">{header}</div>
              <div className="border-b border-gray-200" />
            </>
          )}

          <div className="pt-5 pb-3">{children}</div>

          {footer && <div className="px-6 pb-6 mt-20">{footer}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
