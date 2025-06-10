import { PostHogEvents, PostHogProperties, UTMParameters } from '../types/analytics';
import { PostHogWithCapture } from '../types/posthog';

const getPostHog = (): PostHogWithCapture | undefined => {
  if (typeof window !== 'undefined' && window.posthog) {
    return window.posthog;
  }
  return undefined;
};

const getGtag = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    return window.gtag as (
      command: string,
      eventName: string,
      properties?: Record<string, string | boolean | number | undefined>
    ) => void;
  }
  return undefined;
};

export const getUTMParameters = (): UTMParameters => {
  if (typeof window === 'undefined')
    return {
      utm_source: 'direct',
      utm_medium: 'direct',
      utm_campaign: 'direct',
      utm_content: 'direct',
      utm_term: 'direct',
    };

  const searchParams = new URLSearchParams(window.location.search);
  const getOrDefault = (key: string, fallback: string): string => {
    const value = searchParams.get(key);
    return value || fallback;
  };

  return {
    utm_source: getOrDefault('utm_source', 'direct'),
    utm_medium: getOrDefault('utm_medium', 'direct'),
    utm_campaign: getOrDefault('utm_campaign', 'direct'),
    utm_content: getOrDefault('utm_content', 'direct'),
    utm_term: getOrDefault('utm_term', 'direct'),
  };
};

export const trackPostHogEvent = (
  name: PostHogEvents,
  properties?: PostHogProperties,
  email?: string
) => {
  try {
    let finalProperties = { ...properties };

    if (name === PostHogEvents.LEAD_CREATED) {
      const utmParams = getUTMParameters();
      const posthog = getPostHog();

      finalProperties = {
        ...finalProperties,
        ...utmParams,
        lead_created_location: typeof window !== 'undefined' ? window.location.pathname : '',
        lead_created_pms_post: typeof window !== 'undefined' ? !!window.isPMSPost : false,
        redirected_to_app_demo_form: true,
      };

      if (typeof window !== 'undefined' && window.analytics) {
        window.analytics.track('lead_created', {
          $set: { email: email },
          ...finalProperties,
        });
      }

      if (email && posthog?.identify && posthog?.get_distinct_id) {
        const distinctId = posthog.get_distinct_id();
        posthog.identify(distinctId || email, { email: email });
      }
    }

    const posthog = getPostHog();
    if (posthog?.capture) {
      posthog.capture(name, finalProperties);
    }

    const gtag = getGtag();
    if (gtag) {
      gtag('event', name, finalProperties);
    }
  } catch (error) {
    console.error('❌ Analytics tracking error for event:', name, error);
  }
};

export const trackEmailBegan = () => {
  trackPostHogEvent(PostHogEvents.LEAD_BEGAN_EMAIL_ONLY_FORM);
};

export const trackEmailAttempt = () => {
  trackPostHogEvent(PostHogEvents.LEAD_ATTEMPTED_EMAIL_ONLY_FORM);
};

export const trackLeadCreated = (email?: string) => {
  trackPostHogEvent(PostHogEvents.LEAD_CREATED, {}, email);
};

export const trackLeadClickedBanner = () => {
  trackPostHogEvent(PostHogEvents.LEAD_CLICKED_BANNER);
};
