'use client';

import Image from 'next/image';
import { DoorLoopLogo } from '../../../components/ui/DoorLoopLogo';
import { useState } from 'react';
import { MaxWidthContainer } from '../../../components/layouts/MaxWidthContainer';
import { trackEmailAttempt, trackEmailBegan } from '../../../lib/utils/analytics';
import { navigateToDemoForm } from '../../../lib/utils/navigation';

const reviewPlatforms = [
  { src: 'softwareAdvice.svg', alt: 'Software Advice', width: 120, height: 40 },
  { src: 'capterra.svg', alt: 'Capterra', width: 120, height: 40 },
  { src: 'g2crowd.svg', alt: 'G2 Crowd', width: 120, height: 40 },
  { src: 'getApp.svg', alt: 'GetApp', width: 120, height: 40 },
];

export default function HeroSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasTrackedEmailBegan, setHasTrackedEmailBegan] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Track email began when user starts typing (only once)
    if (newEmail.length > 0 && !hasTrackedEmailBegan) {
      trackEmailBegan();
      setHasTrackedEmailBegan(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Create a synthetic form event
      const formEvent = {
        preventDefault: () => {},
      } as React.FormEvent;
      handleSubmit(formEvent);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    setIsSubmitting(true);
    trackEmailAttempt();
    try {
      navigateToDemoForm(email);

      // Reset form on success
      setEmail('');
      setHasTrackedEmailBegan(false);
    } catch {
      // Handle any errors silently
    } finally {
      setIsSubmitting(false);
    }
  };

  const basePath = process.env.NODE_ENV === 'production' ? '/dynamic-landing-page' : '';
  const backgroundStyle = {
    backgroundImage: `url(${basePath}/hero-background.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  };

  return (
    <section className="relative flex-grow flex-col flex items-center justify-center px-4 py-8 w-full md:h-[100vh] bg-[#2F3E83] md:bg-transparent">
      <div
        className="fixed top-0 left-0 w-full h-[100vh] -z-10 hidden md:block md:opacity-90"
        style={backgroundStyle}
      />
      <div className="fixed top-0 left-0 w-full h-[100vh] bg-blue-500/20 -z-10 hidden md:block" />
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pt-14 sm:pt-0">
        <MaxWidthContainer className="h-full flex flex-col items-center justify-center text-center">
          <div className="items-center justify-center mb-6 hidden sm:flex">
            <DoorLoopLogo color="white" width={200} height={54} />
          </div>

          <h1 className="text-white text-[28px] md:text-[42px] text-center font-bold leading-none">
            The Highest-Rated Property Management Software
          </h1>

          <span className="text-center mt-6 mb-14 md:mb-6 text-white max-w-4xl text-[16px] xs:text-[20px]">
            Save 15 hours a month, put your rental portfolio on autopilot and make accounting a
            breeze.
          </span>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-center justify-center w-full max-w-2xl space-y-2 md:space-y-0 md:my-12"
          >
            <div className="flex flex-col w-full md:w-80">
              <div className="flex items-center w-full bg-white rounded-md md:rounded-md md:rounded-r-none px-3 py-2 shadow-sm">
                <Image
                  src={`${basePath}/email-icon.svg`}
                  alt="Email"
                  width={24}
                  height={24}
                  className="text-gray-400 mr-3 ml-1"
                  priority={false}
                />
                <input
                  value={email}
                  onChange={handleEmailChange}
                  onKeyDown={handleKeyDown}
                  type="email"
                  placeholder="Your Email"
                  className="w-full outline-none text-gray-700 text-base placeholder:text-gray-400 h-10"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full md:w-52 md:px-8 h-14 text-white py-2 rounded-md md:rounded-l-none md:rounded-r-md font-medium shadow transition-colors whitespace-nowrap ${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#01cc74] hover:bg-[#00b27f]'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Request a Demo'}
            </button>
          </form>

          <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-sm md:max-w-full space-y-2 mt-14 space-x-5">
            <Image
              // className="dark:invert"
              src={`${basePath}/saleIcon.svg`}
              alt="Spring Sale Icon"
              width={120}
              height={60}
              priority={false}
              loading="lazy"
            />
            <span className="text-white text-center text-[16px] font-normal mt-4 mb-6">
              A fresh path to real growth. Get one month free + zero onboarding fees on all annual
              plans. Hurry—offer ends <span className="font-bold">Friday May 23rd</span>.
            </span>
          </div>

          {/* Review Platforms Grid */}
          <div className="grid grid-cols-2 md:flex md:items-center max-w-6xl mt-8 gap-6 md:gap-10">
            {reviewPlatforms.map((platform) => (
              <Image
                key={platform.alt}
                src={`${basePath}/${platform.src}`}
                alt={platform.alt}
                width={platform.width}
                height={platform.height}
                className="w-auto h-auto"
                loading="lazy"
              />
            ))}
          </div>
        </MaxWidthContainer>
      </div>
    </section>
  );
}
