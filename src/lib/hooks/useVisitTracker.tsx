import {
  useVisitTrackerContext,
  type VisitTrackerContextType,
} from '../providers/VisitTrackerProvider';

const VISIT_STORAGE_KEY = 'website_visited';

/**
 * Custom hook for tracking website visits using shared global state
 * All components using this hook will share the same synchronized state
 *
 * @returns {VisitTrackerContextType} Object containing visit status and methods
 */
export function useVisitTracker(): VisitTrackerContextType {
  return useVisitTrackerContext();
}

/**
 * Utility functions for direct localStorage access (non-hook version)
 * Use these if you need to check/set visit status outside of React components
 */
export const visitTracker = {
  /**
   * Check if this is the user's first visit to the website
   * @returns {boolean} true if it's the first visit, false if user has visited before
   */
  isFirstVisit: (): boolean => {
    if (typeof window === 'undefined') return true;

    try {
      return localStorage.getItem(VISIT_STORAGE_KEY) !== 'true';
    } catch (error) {
      console.warn('Failed to read visit status from localStorage:', error);
      return true; // Default to first visit on error
    }
  },

  /**
   * Mark user as having visited the website (for future visits)
   */
  markAsVisited: (): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(VISIT_STORAGE_KEY, 'true');
    } catch (error) {
      console.warn('Failed to save visit status to localStorage:', error);
    }
  },

  /**
   * Clear the visit status (useful for testing or reset functionality)
   */
  clearVisitStatus: (): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(VISIT_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear visit status from localStorage:', error);
    }
  },
};
