// PostHog Analytics Events Enum
export enum PostHogEvents {
  PAGEVIEW = 'Pageview',
  LEAD_BEGAN_EMAIL_ONLY_FORM = 'lead_began_email_only_form',
  LEAD_ATTEMPTED_EMAIL_ONLY_FORM = 'lead_attempted_email_only_form',
  LEAD_CREATED = 'lead_created',
}

// Type definitions for analytics tracking
export interface PostHogProperties {
  [key: string]: string | boolean | number | undefined;
}

// PostHog interface extension for our needs
interface PostHogWithCapture {
  capture?: (eventName: string, properties?: Record<string, unknown>) => void;
  get_distinct_id?: () => string;
  onFeatureFlags: (callback: () => void) => void;
  isFeatureEnabled: (feature: string) => boolean;
  startSessionRecording: () => void;
}

// Helper function to safely access PostHog methods
const getPostHog = (): PostHogWithCapture | undefined => {
  if (typeof window !== 'undefined' && window.posthog) {
    return window.posthog as PostHogWithCapture;
  }
  return undefined;
};

// Helper function to safely access gtag
const getGtag = ():
  | ((
      command: string,
      eventName: string,
      properties?: Record<string, string | boolean | number | undefined>
    ) => void)
  | undefined => {
  if (typeof window !== 'undefined' && window.gtag) {
    return window.gtag as (
      command: string,
      eventName: string,
      properties?: Record<string, string | boolean | number | undefined>
    ) => void;
  }
  return undefined;
};

/**
 * Native PostHog and Google Analytics tracking function
 * Tracks events to both PostHog and Google Analytics (gtag)
 *
 * @param name - Event name from PostHogEvents enum
 * @param properties - Event properties (optional)
 */
export const trackPostHogEvent = (
  name: PostHogEvents,
  properties?: PostHogProperties
) => {
  try {
    // Always log events for debugging
    console.log('🔥 PostHog Event Tracked:', {
      event: name,
      properties: properties || {},
      timestamp: new Date().toISOString(),
    });

    // Track with PostHog
    const posthog = getPostHog();
    if (posthog?.capture) {
      posthog.capture(name, properties);
      console.log('✅ PostHog capture successful for:', name);
    } else {
      console.warn('⚠️ PostHog not available for event:', name);
    }

    // Track with Google Analytics (gtag)
    const gtag = getGtag();
    if (gtag) {
      gtag('event', name, properties);
      console.log('✅ Google Analytics (gtag) tracking successful for:', name);
    } else {
      console.warn('⚠️ Google Analytics (gtag) not available for event:', name);
    }
  } catch (error) {
    console.error('❌ Analytics tracking error for event:', name, error);
  }
};

/**
 * Helper function to track page views
 */
export const trackPageView = () => {
  console.log('📄 Tracking Page View');
  trackPostHogEvent(PostHogEvents.PAGEVIEW);
};

/**
 * Helper function to track when user begins email form interaction
 */
export const trackEmailBegan = () => {
  console.log('📧 Tracking Email Began');
  trackPostHogEvent(PostHogEvents.LEAD_BEGAN_EMAIL_ONLY_FORM);
};

/**
 * Helper function to track email input attempts
 */
export const trackEmailAttempt = () => {
  console.log('📝 Tracking Email Attempt');
  trackPostHogEvent(PostHogEvents.LEAD_ATTEMPTED_EMAIL_ONLY_FORM);
};

/**
 * Helper function to track lead creation
 */
export const trackLeadCreated = () => {
  console.log('🎯 Tracking Lead Created');
  trackPostHogEvent(PostHogEvents.LEAD_CREATED);
};
