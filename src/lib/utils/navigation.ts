import { getUTMParameters, trackEmailAttempt, trackLeadCreated } from './analytics';

export const navigateToDemoForm = (email: string) => {
  if (typeof window === 'undefined') return;

  const utmParams = getUTMParameters();
  const params = new URLSearchParams();

  params.set('email', email);
  params.set('utm_source', utmParams.utm_source);
  params.set('utm_medium', utmParams.utm_medium);
  params.set('utm_campaign', utmParams.utm_campaign);
  params.set('utm_content', utmParams.utm_content);
  params.set('utm_term', utmParams.utm_term);

  trackEmailAttempt();
  trackLeadCreated(email);
  const redirectUrl = `https://demo.doorloop.com/demo/additional-info?${params.toString()}`;

  window.location.href = redirectUrl;
};
