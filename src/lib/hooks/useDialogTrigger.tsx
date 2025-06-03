import { useOpenDialog } from '../providers/DialogProvider';

export interface DialogTriggerConfig {
  dialogId: string;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export function useDialogTrigger(dialogId: string) {
  const openDialog = useOpenDialog();

  const triggerDialog = () => {
    openDialog(dialogId);
  };

  return triggerDialog;
}
