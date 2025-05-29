export interface PostHogWithCapture {
  capture?: (eventName: string, properties?: Record<string, unknown>) => void;
  get_distinct_id?: () => string;
  identify?: (distinctId: string, properties?: Record<string, unknown>) => void;
  onFeatureFlags: (callback: () => void) => void;
  isFeatureEnabled: (feature: string) => boolean;
  startSessionRecording: () => void;
}
