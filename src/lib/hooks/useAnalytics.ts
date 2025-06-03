import { useCallback } from 'react';
import {
  trackEmailBegan as trackEmailBeganUtil,
  trackEmailAttempt as trackEmailAttemptUtil,
  trackLeadCreated as trackLeadCreatedUtil,
  trackPostHogEvent,
} from '../utils/analytics';
import { PostHogEvents } from '../types/analytics';
import { PostHogProperties } from '../types/analytics';

export function useAnalytics() {
  const trackEmailBegan = useCallback(() => {
    trackEmailBeganUtil();
  }, []);

  const trackEmailAttempt = useCallback(() => {
    trackEmailAttemptUtil();
  }, []);

  const trackLeadCreated = useCallback((email?: string) => {
    trackLeadCreatedUtil(email);
  }, []);

  const trackEvent = useCallback(
    (event: PostHogEvents, properties?: PostHogProperties, email?: string) => {
      trackPostHogEvent(event, properties, email);
    },
    []
  );

  return {
    trackEmailBegan,
    trackEmailAttempt,
    trackLeadCreated,
    trackEvent,
    events: PostHogEvents,
  };
}
