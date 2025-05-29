import { useCallback } from 'react';
import {
  trackPageView as trackPageViewUtil,
  trackEmailBegan as trackEmailBeganUtil,
  trackEmailAttempt as trackEmailAttemptUtil,
  trackLeadCreated as trackLeadCreatedUtil,
  PostHogEvents,
  trackPostHogEvent,
  type PostHogProperties,
} from '../utils/analytics';

/**
 * Custom hook for PostHog analytics tracking
 * Provides easy-to-use functions for tracking user interactions
 */
export function useAnalytics() {
  /**
   * Track when the landing page is viewed
   */
  const trackPageView = useCallback(() => {
    trackPageViewUtil();
  }, []);

  /**
   * Track when a user begins email form interaction (first time)
   */
  const trackEmailBegan = useCallback(() => {
    trackEmailBeganUtil();
  }, []);

  /**
   * Track when a user continues filling their email
   */
  const trackEmailAttempt = useCallback(() => {
    trackEmailAttemptUtil();
  }, []);

  /**
   * Track when a lead is created (demo requested)
   */
  const trackLeadCreated = useCallback(() => {
    trackLeadCreatedUtil();
  }, []);

  /**
   * Generic event tracking function
   * @param event - The event name from PostHogEvents enum
   * @param properties - Event properties
   */
  const trackEvent = useCallback((event: PostHogEvents, properties?: PostHogProperties) => {
    trackPostHogEvent(event, properties);
  }, []);

  return {
    trackPageView,
    trackEmailBegan,
    trackEmailAttempt,
    trackLeadCreated,
    trackEvent,
    // Export the enum for easy access
    events: PostHogEvents,
  };
}
