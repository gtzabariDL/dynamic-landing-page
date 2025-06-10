'use client';

import { useState, useEffect } from 'react';

interface ScreenSize {
  width: number | null;
  isMobile: boolean;
  isTablet: boolean;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isExtraLarge: boolean;
}

/**
 * The useScreenSize hook returns the current screen size and responsive breakpoint booleans.
 * Follows Tailwind CSS breakpoints:
 * - sm: 640px
 * - md: 768px
 * - lg: 1024px
 * - xl: 1280px
 * @returns {ScreenSize} The current screen size and breakpoint information.
 */
export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => {
    if (typeof window === 'undefined') {
      return {
        width: null,
        isMobile: false,
        isTablet: false,
        isSmall: false,
        isMedium: false,
        isLarge: false,
        isExtraLarge: false,
      };
    }

    const width = window.innerWidth;
    return {
      width,
      isMobile: width < 640,
      isTablet: width >= 640 && width < 768,
      isSmall: width >= 640,
      isMedium: width >= 768,
      isLarge: width >= 1024,
      isExtraLarge: width >= 1280,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        width,
        isMobile: width < 640,
        isTablet: width >= 640 && width < 768,
        isSmall: width >= 640,
        isMedium: width >= 768,
        isLarge: width >= 1024,
        isExtraLarge: width >= 1280,
      });
    };

    // Set initial size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};
