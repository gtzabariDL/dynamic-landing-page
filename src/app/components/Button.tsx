import { useDialogTrigger } from '../hooks/useDialogTrigger';
import { cn } from '../utils/component';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  dialogId?: string;
}

export const Button = ({ children, onClick, dialogId, className, ...props }: ButtonProps) => {
  const triggerDialog = useDialogTrigger(dialogId || '');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (dialogId) {
      triggerDialog();
    } else if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={cn(
        'bg-[#01CC74] text-white p-4 rounded-md font-medium shadow hover:bg-[#00b27f] transition-colors w-36 h-14 text-sm cursor-pointer',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};
