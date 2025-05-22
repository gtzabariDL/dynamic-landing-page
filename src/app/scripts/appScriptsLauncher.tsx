import type { PropsWithChildren } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { EventHelmet } from "./eventHelmet";

declare global {
  interface Window {
    gtag?: any;
    posthog?: any;
  }
}

const GoogleTagScript = () => (
  <Helmet>
    <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-KLSVFF2"></script>
    <script async>
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "G-CSHBWMC49K");
        gtag("config", "AW-659948507");
      `}
    </script>
  </Helmet>
);

const startSessionRecording = () => {
  const FORCE_RECORDING_PATHS: string[] = ["/demo"];

  enum PosthogFeatureFlagKeysEnum {
    ALLOW_RECORDING_SESSIONS = "record-20-percent-of-users-sessions",
    TENANT_AUTO_PAY_PAYMENT_FLOW = "autoPayPaymentFlow",
    TENANT_PAYMENT_WIZARD_BUTTONS_POSITION = "tenantPaymentProcessButtonsPosition"
  }

  if (window.posthog) {
    // posthog session screen recording
    window.posthog.onFeatureFlags(() => {
      const forceRecordingSession = FORCE_RECORDING_PATHS.some((x) => window.location.href.includes(x));
      if (
        window.posthog.isFeatureEnabled(PosthogFeatureFlagKeysEnum.ALLOW_RECORDING_SESSIONS) ||
        forceRecordingSession
      ) {
        window.posthog.startSessionRecording();
      }
    });
  }
}

export const AppScriptsLauncher = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <HelmetProvider>
      <EventHelmet
        scriptSrc={"posthog.js"}
        onScriptLoad={() => {
          startSessionRecording();
        }}
      >
        <script src="posthog.js" async></script>
      </EventHelmet>
      <GoogleTagScript />
      {children}
    </HelmetProvider>
  )
};
