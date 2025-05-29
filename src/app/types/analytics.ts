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

// UTM parameters interface
export interface UTMParameters {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
}
