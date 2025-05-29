import { useDialogTrigger } from '../hooks/useDialogTrigger';
import { cn } from '../utils/component';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  dialogId?: string;
  variant?: 'default' | 'text';
}

export const Button = ({
  children,
  onClick,
  dialogId,
  className,
  variant = 'default',
  ...props
}: ButtonProps) => {
  const triggerDialog = useDialogTrigger(dialogId || '');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (dialogId) {
      triggerDialog();
    } else if (onClick) {
      onClick(e);
    }
  };

  const baseClasses = 'font-medium transition-colors cursor-pointer';

  const variantClasses = {
    default: 'bg-[#01CC74] text-white p-4 rounded-md shadow hover:bg-[#00b27f] w-36 h-14 text-sm',
    text: 'bg-transparent border-none shadow-none p-0 hover:opacity-80',
  };

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};
