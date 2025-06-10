'use client';

import { lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { AppScriptsLauncher } from '../../../scripts/appScriptsLauncher';
import { useDLMC } from '../../lib/hooks/useDLMC';
import Navigation from '../../components/layouts/Navigation';
// import { WelcomeOfferStaticBanner } from '../../components/banners/welcomeOffer/WelcomeOfferStaticBanner';
// import { useVisitTracker } from '../../lib/hooks/useVisitTracker';
import { UISectionLoader } from '../../components/ui/UISectionLoader';

const HeroSection = dynamic(() => import('./components/HeroSection'), {
  ssr: false,
  loading: () => <div className="h-screen bg-[#2F3E83]" />,
});

const MediaFeatures = lazy(() => import('./components/MediaFeatures'));
const FeaturesSection = lazy(() => import('./components/FeaturesSection'));
const FAQSection = lazy(() => import('./components/FAQSection'));
const FooterSection = lazy(() => import('../../components/layouts/FooterSection'));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection'));

const PropertyManagement = dynamic(() => import('./components/PropertyManagement'), {
  ssr: false,
  loading: () => <UISectionLoader variant="default" />,
});

const FeatureCard = dynamic(() => import('./components/FeatureCard'), {
  ssr: false,
  loading: () => <UISectionLoader variant="feature" />,
});

const SupportSection = dynamic(() => import('./components/SupportSection'), {
  ssr: false,
  loading: () => <UISectionLoader variant="default" />,
});

const PromotionalSection = dynamic(() => import('./components/PromotionalSection'), {
  ssr: false,
  loading: () => <UISectionLoader variant="default" />,
});

const IntegrationsSection = dynamic(() => import('./components/IntegrationsSection'), {
  ssr: false,
  loading: () => <UISectionLoader variant="default" />,
});

const WhyDoorLoopSection = dynamic(() => import('./components/WhyDoorLoopSection'), {
  ssr: false,
  loading: () => <UISectionLoader variant="default" />,
});

const featureCards = [
  {
    icon: '/person.svg',
    title: 'Automate rent collection',
    description:
      "Tired of chasing down rent & late fees? With DoorLoop, you don't have to. Get tenants to pay you automatically on the 1st of each month. Make more money and spend less time collecting.",
    features: [
      'Collect rent by credit card, debit card, ACH, cash & check',
      'Send automated payment reminders',
      'Track paid or overdue rent',
    ],
    imageSrc: '/creditCards.svg',
  },
  {
    icon: '/calculator.svg',
    title: 'Accounting for non-accountants',
    description:
      'Run custom reports, track all of your cash flow, and make data-driven decisions with accounting features that are as robust as they are easy to use.',
    features: [
      'Connect with any bank and sync with QuickBooks',
      'Real time reporting',
      'Customizable chart of accounts',
    ],
    imageSrc: '/chartsOfAccounts.svg',
  },
  {
    icon: '/drill.svg',
    title: 'Handle maintenance requests & vendors',
    description:
      'Keep your residents & vendors happy & make sure nothing falls through the cracks with an easy-to-use online portal.',
    features: [
      'Get maintenance requests online',
      'Assign & track work orders & issue 1099 forms',
      'Automatically mail checks or wire money to vendors',
    ],
    imageSrc: '/doorLock.svg',
  },
  {
    icon: '/listing.svg',
    title: 'Market your listings online and get a custom website',
    description:
      'Find new tenants or owners faster, fill your vacancies in record time, screen tenants, collect new applications from your website, and eSign lease agreements online.',
    features: [
      'Market your properties on Zillow, Trulia, Hotpads & more',
      'Receive electronic rental applications & background checks',
      'Build your own custom website',
    ],
    imageSrc: '/listingPlatforms.svg',
  },
];

export default function Page() {
  const { isInitialized, error } = useDLMC();

  if (error) {
    console.error('❌ DLMC Error:', error);
  } else if (isInitialized) {
    console.log('✅ DLMC: Successfully initialized');
  }

  // const { isFirstVisit } = useVisitTracker();

  return (
    <AppScriptsLauncher>
      <div className="flex flex-col justify-start items-start w-full">
        {/* {isFirstVisit && <WelcomeOfferStaticBanner />} */}
        <div className="relative w-full bg-white z-40">
          <Navigation />
          <HeroSection />
          <Suspense fallback={<UISectionLoader variant="default" />}>
            <MediaFeatures />
          </Suspense>
          <PropertyManagement />

          <Suspense fallback={<UISectionLoader variant="default" />}>
            <FeaturesSection />
          </Suspense>

          {featureCards.map((card, index) => (
            <FeatureCard key={index} {...card} />
          ))}

          <SupportSection />
          <PromotionalSection />

          <Suspense fallback={<UISectionLoader variant="testimonials" />}>
            <TestimonialsSection />
          </Suspense>

          <IntegrationsSection />
          <WhyDoorLoopSection />

          <Suspense fallback={<UISectionLoader variant="compact" />}>
            <FAQSection />
          </Suspense>

          <Suspense fallback={<UISectionLoader variant="compact" />}>
            <FooterSection />
          </Suspense>
        </div>
      </div>
    </AppScriptsLauncher>
  );
}
