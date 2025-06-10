'use client';

import Image from 'next/image';
import { DoorLoopLogo } from '../../../components/ui/DoorLoopLogo';
import { UIErrorMessage } from '../../../components/ui/UIErrorMessage';
import { useState, memo, useMemo, useCallback } from 'react';
import { MaxWidthContainer } from '../../../components/layouts/MaxWidthContainer';
import { trackEmailAttempt, trackEmailBegan } from '../../../lib/utils/analytics';
import { navigateToDemoForm } from '../../../lib/utils/navigation';
import { validateEmail, getErrorMessage } from '../../../lib/utils/validation';
import { useTranslationWithSlug } from '../../../lib/hooks/useTranslationWithSlug';
import { useScreenSize } from '../../../lib/hooks/useScreenSize';

const reviewPlatforms = [
  { src: 'softwareAdvice.svg', alt: 'Software Advice', width: 120, height: 40 },
  { src: 'capterra.svg', alt: 'Capterra', width: 120, height: 40 },
  { src: 'g2crowd.svg', alt: 'G2 Crowd', width: 120, height: 40 },
  { src: 'getApp.svg', alt: 'GetApp', width: 120, height: 40 },
];

function HeroSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasTrackedEmailBegan, setHasTrackedEmailBegan] = useState(false);
  const [error, setError] = useState<string>('');

  const { getTranslation } = useTranslationWithSlug();
  const { isMedium } = useScreenSize();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!email.trim()) {
        setError('Please enter your email address');
        return;
      }

      trackEmailAttempt();
      setIsSubmitting(true);
      setError('');

      try {
        const validation = await validateEmail(email.trim());

        if (!validation.isValid) {
          setError(getErrorMessage(validation.result));
          setIsSubmitting(false);
          return;
        }

        navigateToDemoForm(email);
        setEmail('');
        setHasTrackedEmailBegan(false);
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [email]
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newEmail = e.target.value;
      setEmail(newEmail);

      if (error) {
        setError('');
      }

      if (newEmail.length > 0 && !hasTrackedEmailBegan) {
        trackEmailBegan();
        setHasTrackedEmailBegan(true);
      }
    },
    [error, hasTrackedEmailBegan]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        // Create a synthetic form event
        const formEvent = {
          preventDefault: () => {},
        } as React.FormEvent;
        handleSubmit(formEvent);
      }
    },
    [handleSubmit]
  );

  // Memoize the background style
  const backgroundStyle = useMemo(
    () => ({
      backgroundImage: `url(/hero-background.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'scroll',
    }),
    []
  );

  return (
    <section className="relative flex-grow flex-col flex items-center justify-center px-4 py-8 w-full md:h-[100vh] bg-[#2F3E83] md:bg-transparent md:-mt-[58px] lg:-mt-20 overflow-hidden">
      {isMedium && (
        <>
          <div
            className="absolute top-0 left-0 w-full h-full -z-10 opacity-90"
            style={backgroundStyle}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-blue-500/20 -z-10" />
        </>
      )}

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pt-14 sm:pt-0">
        <MaxWidthContainer className="h-full flex flex-col items-center justify-center text-center">
          <div className="items-center justify-center mb-6 hidden sm:flex">
            <DoorLoopLogo color="white" width={200} height={54} />
          </div>

          <h1 className="text-white text-[28px] md:text-[42px] text-center font-bold leading-none">
            {getTranslation('hero.title')}
          </h1>

          <span className="text-center mt-6 mb-14 md:mb-6 text-white max-w-4xl text-[16px] xs:text-[20px]">
            {getTranslation('hero.description')}
          </span>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-center justify-center w-full max-w-2xl space-y-2 md:space-y-0 md:my-12"
          >
            <div className="flex flex-col w-full md:w-80">
              <div className="flex relative items-center w-full bg-white rounded-md md:rounded-md md:rounded-r-none px-3 py-2 shadow-sm">
                <Image
                  src="/email-icon.svg"
                  alt="Email"
                  width={24}
                  height={24}
                  className="text-gray-400 mr-3 ml-1"
                  priority
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

          <UIErrorMessage
            className=" w-full md:max-w-[525px] md:-mt-10 "
            message={error}
            variant="hero"
          />

          {/* Review Platforms Grid - Lazy load these images */}
          <div className="grid grid-cols-2 md:flex md:items-center max-w-6xl mt-8 gap-6 md:gap-10">
            {reviewPlatforms.map((platform) => (
              <Image
                key={platform.alt}
                src={`${platform.src}`}
                alt={platform.alt}
                width={platform.width}
                height={platform.height}
                className="w-auto h-auto"
                priority
              />
            ))}
          </div>
        </MaxWidthContainer>
      </div>
    </section>
  );
}

export default memo(HeroSection);
