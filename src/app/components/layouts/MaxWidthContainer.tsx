import { ReactNode } from 'react';

interface MaxWidthContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'content';
}

export function MaxWidthContainer({
  children,
  className = '',
  maxWidth = 'content',
}: MaxWidthContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-3xl', // 768px
    md: 'max-w-5xl', // 1024px
    lg: 'max-w-6xl', // 1152px
    xl: 'max-w-7xl', // 1280px
    '2xl': 'max-w-[1400px]', // 1400px
    content: 'max-w-[1200px]', // 1200px - Our main content width (matches Navigation)
  };

  return (
    <div
      className={`
        ${maxWidthClasses[maxWidth]} 
        mx-auto 
        px-4 md:px-8 lg:px-4
        w-full 
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
}
