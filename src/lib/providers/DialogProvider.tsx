'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export type DialogConfig = {
  id: string;
  component: React.ComponentType<{ onClose: () => void }>;
};

interface DialogContextType {
  openDialog: (dialogId: string) => void;
  closeDialog: () => void;
  isDialogOpen: (dialogId: string) => boolean;
  currentDialog: string | null;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface DialogProviderProps {
  children: React.ReactNode;
  dialogs: DialogConfig[];
}

export function DialogProvider({ children, dialogs }: DialogProviderProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [currentDialog, setCurrentDialog] = useState<string | null>(null);

  useEffect(() => {
    const dialogParam = searchParams.get('dialog');
    setCurrentDialog(dialogParam);
  }, [searchParams]);

  const openDialog = (dialogId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('dialog', dialogId);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const closeDialog = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('dialog');
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(newUrl, { scroll: false });
  };

  const isDialogOpen = (dialogId: string) => {
    return currentDialog === dialogId;
  };

  const activeDialog = dialogs.find((dialog) => dialog.id === currentDialog);

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, isDialogOpen, currentDialog }}>
      {children}
      {activeDialog && <activeDialog.component onClose={closeDialog} />}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}

export function useOpenDialog() {
  const { openDialog } = useDialog();
  return openDialog;
}
