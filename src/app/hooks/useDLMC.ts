import { useEffect, useState, useCallback } from 'react';
import { DLMCManager, DLMCData } from '../utils/dlmc';

/**
 * React Hook for DLMC Cookie Management
 *
 * Handles initialization, provides data access, and manages cleanup
 */
export const useDLMC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [dlmcData, setDlmcData] = useState<DLMCData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize DLMC on mount
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

    initializeDLMC();

    // Cleanup on unmount
    return () => {
      DLMCManager.cleanup();
    };
  }, []);

  // Refresh DLMC data
  const refreshData = useCallback(() => {
    setDlmcData(DLMCManager.getDLMCData());
  }, []);

  // Manual sync with cookie
  const syncWithCookie = useCallback(() => {
    try {
      DLMCManager.syncWithCookie();
      console.log('✅ DLMC: Manual sync completed');
    } catch (err) {
      console.error('❌ DLMC: Manual sync failed:', err);
    }
  }, []);

  return {
    isInitialized,
    dlmcData,
    error,
    refreshData,
    syncWithCookie,
  };
};
