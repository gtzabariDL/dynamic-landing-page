import { cn } from '../../lib/utils/component';

interface UIErrorMessageProps {
  message: string;
  className?: string;
  variant?: 'hero' | 'dialog';
}

export const UIErrorMessage = ({ message, className, variant = 'dialog' }: UIErrorMessageProps) => {
  if (!message) return null;

  const baseClasses = 'text-sm mt-2 text-red-500';

  const variantClasses = {
    hero: 'text-left',
    dialog: '',
  };

  return <span className={cn(baseClasses, variantClasses[variant], className)}>{message}</span>;
};
