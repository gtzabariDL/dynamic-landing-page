'use client';

import { useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import MediaFeatures from './components/MediaFeatures';
import PropertyManagement from './components/PropertyManagement';
import FeaturesSection from './components/FeaturesSection';
import FeatureCard from './components/FeatureCard';
import SupportSection from './components/SupportSection';
import PromotionalSection from './components/PromotionalSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import FooterSection from './components/FooterSection';
import { AppScriptsLauncher } from './scripts/appScriptsLauncher';
import { trackPageView } from './utils/analytics';

const featureCards = [
  {
    icon: 'person.svg',
    title: 'Automate rent collection',
    description:
      "Tired of chasing down rent & late fees? With DoorLoop, you don't have to. Get tenants to pay you automatically on the 1st of each month. Make more money and spend less time collecting.",
    features: [
      'Collect rent by credit card, debit card, ACH, cash & check',
      'Send automated payment reminders',
      'Track paid or overdue rent',
    ],
    imageSrc: 'creditCards.svg',
  },
  {
    icon: 'calculator.svg',
    title: 'Accounting for non-accountants',
    description:
      'Run custom reports, track all of your cash flow, and make data-driven decisions with accounting features that are as robust as they are easy to use.',
    features: [
      'Connect with any bank and sync with QuickBooks',
      'Real time reporting',
      'Customizable chart of accounts',
    ],
    imageSrc: 'chartsOfAccounts.svg',
  },
  {
    icon: 'drill.svg',
    title: 'Handle maintenance requests & vendors',
    description:
      'Keep your residents & vendors happy & make sure nothing falls through the cracks with an easy-to-use online portal.',
    features: [
      'Get maintenance requests online',
      'Assign & track work orders & issue 1099 forms',
      'Automatically mail checks or wire money to vendors',
    ],
    imageSrc: 'doorLock.svg',
  },
  {
    icon: 'listing.svg',
    title: 'Market your listings online and get a custom website',
    description:
      'Find new tenants or owners faster, fill your vacancies in record time, screen tenants, collect new applications from your website, and eSign lease agreements online.',
    features: [
      'Market your properties on Zillow, Trulia, Hotpads & more',
      'Receive electronic rental applications & background checks',
      'Build your own custom website',
    ],
    imageSrc: 'listingPlatforms.svg',
  },
];

export default function Page() {
  useEffect(() => {
    // Track page view when the landing page loads
    trackPageView();
  }, []);

  return (
    <AppScriptsLauncher>
      <div className="flex flex-col justify-start items-start w-full">
        <Navigation />
        <div className="w-full pt-[56px]">
          <HeroSection />
          <MediaFeatures />
          <PropertyManagement />
          <FeaturesSection />
          {featureCards.map((card, index) => (
            <FeatureCard key={index} {...card} />
          ))}
          <SupportSection />
          <PromotionalSection />
          <TestimonialsSection />
          <FAQSection />
          <FooterSection />
        </div>
      </div>
    </AppScriptsLauncher>
  );
}
