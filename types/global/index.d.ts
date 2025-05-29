// Global Window interface extensions only

// PostHog interface extension for window.posthog
interface PostHogWithCapture {
  capture?: (eventName: string, properties?: Record<string, unknown>) => void;
  get_distinct_id?: () => string;
  identify?: (distinctId: string, properties?: Record<string, unknown>) => void;
  onFeatureFlags: (callback: () => void) => void;
  isFeatureEnabled: (feature: string) => boolean;
  startSessionRecording: () => void;
}

declare global {
  interface Window {
    // Google Analytics
    gtag?: (
      command: string,
      eventName: string,
      properties?: Record<string, string | boolean | number | undefined>
    ) => void;
    dataLayer?: unknown[];

    // PostHog Analytics
    posthog?: PostHogWithCapture;

    // Analytics integrations
    analytics?: {
      track: (eventName: string, properties?: Record<string, unknown>) => void;
    };

    // Application specific
    isPMSPost?: boolean;

    // Third-party integrations
    Intercom?: (action: string, data?: Record<string, unknown>) => void;

    // Other tracking services
    uetq?: unknown[];
    fbq?: unknown;
    wootric?: unknown;
    profitwell?: unknown;
  }
}

export {};
