import { INITIAL_BANNER_HEIGHT } from '../../../lib/data/consts';
import { trackLeadClickedBanner } from '../../../lib/utils/analytics';
import { MaxWidthContainer } from '../../layouts/MaxWidthContainer';
import { Button } from '../../ui/Button';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useScreenSize } from '../../../lib/hooks/useScreenSize';
import { getImagePath } from '../../../lib/utils/image';

export const WelcomeOfferStaticBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isMedium } = useScreenSize();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    trackLeadClickedBanner();
  };

  return (
    <>
      <div
        className="transition-all duration-700 ease-out overflow-hidden"
        style={{
          height: isVisible ? `${INITIAL_BANNER_HEIGHT}px` : '0px',
        }}
      />

      <div
        className="fixed bg-[#1665D8] left-0 w-full transition-all duration-700 ease-out"
        style={{
          height: `${INITIAL_BANNER_HEIGHT}px`,
          top: isVisible ? '0px' : `-${INITIAL_BANNER_HEIGHT}px`,
        }}
      >
        <div className="relative" style={{ height: `${INITIAL_BANNER_HEIGHT}px` }}>
          <MaxWidthContainer className="relative flex flex-col md:flex-row items-center justify-center h-full">
            <div className="flex items-center justify-center w-full">
              {isMedium && (
                <Image
                  src={getImagePath('/welcome-offer-banner.svg')}
                  alt="Welcome offer banner"
                  width={300}
                  height={350}
                  className="w-[350px] h-auto"
                  priority
                />
              )}
              <span className="text-white text-[22px] md:text-[54px] text-center md:text-start font-bold md:-ml-10">
                REDEEM YOUR
                <br />
                WELCOME OFFER
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex">
                <span className="text-white font-bold text-[125px] md:text-[160px] leading-[100px] md:leading-[120px]">
                  30
                </span>
                <div className="flex flex-col text-white ">
                  <span className="leading-[60px]  md:leading-[80px] text-[60px] md:text-[80px] font-bold">
                    %
                  </span>
                  <span className="leading-[40px] md:leading-[48px] text-[40px] md:text-[48px] font-bold">
                    OFF
                  </span>
                </div>
              </div>
              <span className="text-white text-[19px] md:text-[24px] text-center font-bold mt-4">
                3 months + ZERO
                <br />
                onboarding fees
              </span>
              <Button
                className="mt-[30px]! md:mt-6 mb-4 z-10"
                onClick={handleClick}
                dialogId="request-demo"
              >
                Claim Offer
              </Button>
              <span className="text-white text-[16px] z-10 text-center font-bold">
                * Annual plans only
              </span>
            </div>
          </MaxWidthContainer>
          {!isMedium && (
            <>
              <Image
                src="/welcome-offer-banner-mobile-left.svg"
                alt="Welcome offer banner"
                width={300}
                height={350}
                className="absolute bottom-0 left-0 w-[64px] h-[154px]"
                priority
              />
              <Image
                src="/welcome-offer-banner-mobile-right.svg"
                alt="Welcome offer banner"
                width={300}
                height={350}
                className="absolute bottom-0 right-0 h-[162px] w-[136px]"
                priority
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
