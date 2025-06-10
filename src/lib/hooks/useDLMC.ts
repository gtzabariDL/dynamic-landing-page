import { useEffect, useState, useCallback } from 'react';
import { DLMCManager, DLMCData } from '../utils/dlmc';

/**
 * React Hook for DLMC Cookie Management
 *
 * Handles initialization, provides data access, and manages cleanup
 * Optimized to defer initialization and prevent render blocking
 */
export const useDLMC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [dlmcData, setDlmcData] = useState<DLMCData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Defer DLMC initialization to avoid blocking initial render
  useEffect(() => {
    const initializeDLMC = async () => {
      try {
        await DLMCManager.initialize();
        setIsInitialized(true);
        setDlmcData(DLMCManager.getDLMCData());
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'DLMC initialization failed';
        setError(errorMessage);
        console.error('❌ useDLMC: Initialization error:', err);
      }
    };

    // Defer initialization to after initial render
    const timeoutId = setTimeout(() => {
      initializeDLMC();
    }, 0);

    // Cleanup on unmount
    return () => {
      clearTimeout(timeoutId);
      DLMCManager.cleanup();
    };
  }, []);

  // Refresh DLMC data
  const refreshData = useCallback(() => {
    if (isInitialized) {
      setDlmcData(DLMCManager.getDLMCData());
    }
  }, [isInitialized]);

  // Manual sync with cookie
  const syncWithCookie = useCallback(() => {
    if (isInitialized) {
      try {
        DLMCManager.syncWithCookie();
        console.log('✅ DLMC: Manual sync completed');
      } catch (err) {
        console.error('❌ DLMC: Manual sync failed:', err);
      }
    }
  }, [isInitialized]);

  return {
    isInitialized,
    dlmcData,
    error,
    refreshData,
    syncWithCookie,
  };
};
