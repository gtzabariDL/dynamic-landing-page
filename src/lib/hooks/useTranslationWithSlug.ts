'use client';

import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import { getCurrentSlug } from '../utils/slug';
import { useMemo, useCallback } from 'react';

/**
 * Custom hook that combines useTranslation with slug detection
 * Provides easy access to translated content based on current slug
 */
export function useTranslationWithSlug() {
  const { t } = useTranslation();
  const pathname = usePathname();

  // Memoize the slug computation to prevent recalculation on every render
  const currentSlug = useMemo(() => getCurrentSlug(pathname), [pathname]);

  /**
   * Get translated text for the current slug - memoized for performance
   * @param key - The translation key (e.g., 'hero.title')
   * @param fallbackSlug - Optional fallback slug if current slug doesn't have the translation
   */
  const getTranslation = useCallback(
    (key: string, fallbackSlug: string = 'default') => {
      // Try current slug first
      const currentKey = `${currentSlug}.${key}`;
      const translation = t(currentKey);

      // If translation exists and is not the same as the key (meaning it was found)
      if (translation !== currentKey) {
        return translation;
      }

      // Fall back to default or specified fallback
      return t(`${fallbackSlug}.${key}`);
    },
    [t, currentSlug]
  );

  return useMemo(
    () => ({
      t,
      currentSlug,
      getTranslation,
      pathname,
    }),
    [t, currentSlug, getTranslation, pathname]
  );
}
