'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const VISIT_STORAGE_KEY = 'website_visited';

export interface VisitTrackerContextType {
  isFirstVisit: boolean;
  isClient: boolean;
  isLoaded: boolean;
}

const VisitTrackerContext = createContext<VisitTrackerContextType | undefined>(undefined);

interface VisitTrackerProviderProps {
  children: ReactNode;
}

export function VisitTrackerProvider({ children }: VisitTrackerProviderProps) {
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Initialize on client side to avoid hydration issues
  useEffect(() => {
    setIsClient(true);

    try {
      const visitedStatus = localStorage.getItem(VISIT_STORAGE_KEY);
      const hasVisitedBefore = visitedStatus === 'true';

      // Set first visit status (inverse of has visited before)
      setIsFirstVisit(!hasVisitedBefore);

      // Mark as visited in localStorage for future visits
      if (!hasVisitedBefore) {
        localStorage.setItem(VISIT_STORAGE_KEY, 'true');
      }
    } catch (error) {
      // Handle localStorage access errors (e.g., disabled cookies, SSR)
      console.warn('Failed to read visit status from localStorage:', error);
      setIsFirstVisit(true); // Default to first visit on error
    } finally {
      // Always mark as loaded after determining the visit status
      setIsLoaded(true);
    }
  }, []);

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    if (!isClient) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === VISIT_STORAGE_KEY && e.newValue !== null) {
        const hasVisitedBefore = e.newValue === 'true';
        setIsFirstVisit(!hasVisitedBefore);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isClient]);

  const value: VisitTrackerContextType = {
    isFirstVisit,
    isClient,
    isLoaded,
  };

  return <VisitTrackerContext.Provider value={value}>{children}</VisitTrackerContext.Provider>;
}

export function useVisitTrackerContext() {
  const context = useContext(VisitTrackerContext);

  if (!context) {
    throw new Error('useVisitTrackerContext must be used within a VisitTrackerProvider');
  }

  return context;
}
