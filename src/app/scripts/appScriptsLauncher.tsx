import type { PropsWithChildren } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { EventHelmet } from './eventHelmet';

declare global {
  interface Window {
    gtag?: unknown;
    posthog?: {
      onFeatureFlags: (callback: () => void) => void;
      isFeatureEnabled: (feature: string) => boolean;
      startSessionRecording: () => void;
    };
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

const CookiebotScripts = () => (
  <Helmet>
    <script
      id="CookieDeclaration"
      src="https://consent.cookiebot.com/f18618fc-4d5a-4699-b053-c4414808837b/cd.js"
      type="text/javascript"
      async
    ></script>
    <script
      id="CookieDeclaration2"
      src="https://consent.cookiebot.com/7c632bb2-0429-4ba5-9ae8-4d96615db5a7/cd.js"
      type="text/javascript"
      async
    ></script>
  </Helmet>
);

const AccessibilityBotScript = () => (
  <Helmet>
    <script src="https://cdn.userway.org/widget.js" data-account="xgauVP7jzb" async></script>
  </Helmet>
);

const ClickceaseScript = () => (
  <Helmet>
    <script type="text/javascript">
      {`
        var script = document.createElement('script');
        script.async = true; 
        script.type = 'text/javascript';
        var target = 'https://www.clickcease.com/monitor/stat.js';
        script.src = target;
        var elemClickCease = document.head;
        elemClickCease.appendChild(script);
      `}
    </script>
    <noscript>
      <a href="https://www.clickcease.com" rel="nofollow">
        <img src="https://monitor.clickcease.com" alt="ClickCease" />
      </a>
    </noscript>
  </Helmet>
);

const startSessionRecording = () => {
  const FORCE_RECORDING_PATHS: string[] = ['/demo'];

  enum PosthogFeatureFlagKeysEnum {
    ALLOW_RECORDING_SESSIONS = 'record-20-percent-of-users-sessions',
    TENANT_AUTO_PAY_PAYMENT_FLOW = 'autoPayPaymentFlow',
    TENANT_PAYMENT_WIZARD_BUTTONS_POSITION = 'tenantPaymentProcessButtonsPosition',
  }

  if (window.posthog) {
    // posthog session screen recording
    window.posthog.onFeatureFlags(() => {
      const forceRecordingSession = FORCE_RECORDING_PATHS.some((x) =>
        window.location.href.includes(x)
      );
      if (
        window.posthog?.isFeatureEnabled(PosthogFeatureFlagKeysEnum.ALLOW_RECORDING_SESSIONS) ||
        forceRecordingSession
      ) {
        window.posthog?.startSessionRecording();
      }
    });
  }
};

export const AppScriptsLauncher = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <HelmetProvider>
      <EventHelmet
        scriptSrc={'posthog.js'}
        onScriptLoad={() => {
          startSessionRecording();
        }}
      />
      <GoogleTagScript />
      <CookiebotScripts />
      <AccessibilityBotScript />
      <ClickceaseScript />
      {children}
    </HelmetProvider>
  );
};
