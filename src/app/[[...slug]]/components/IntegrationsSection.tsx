import Image from 'next/image';
import { Button } from '../../../components/ui/Button';
import { MaxWidthContainer } from '../../../components/layouts/MaxWidthContainer';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { useScreenSize } from '../../../lib/hooks/useScreenSize';

export default function IntegrationsSection() {
  const { isMedium } = useScreenSize();

  return (
    <section className="relative  bg-white py-0 md:py-32 lg:py-40 w-full overflow-hidden">
      <div className="md:mt-14">
        {isMedium && (
          <div className="absolute top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/integrations-background-web.svg"
              alt="Integration apps arranged in a circular pattern"
              width={1230}
              height={800}
              className="w-[90vw] max-w-[1180px] h-auto"
              loading="lazy"
            />
          </div>
        )}

        {/* Content Overlay */}
        <MaxWidthContainer className="relative z-10 md:pt-32">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Section Tag */}
            <div className="text-[#A8A8A8] text-sm font-bold mb-6 tracking-wide">
              ONE-CLICK INTEGRATIONS POWERED BY ZAPIER & OUR API
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl font-bold text-[#333333] text-gray-900 mb-6">
              Integrated with thousands of apps
            </h2>

            {/* Description */}
            <p className="text-[#333333] text-lg leading-relaxed mb-8 max-w-2xl">
              Use our one-click integrations powered by Zapier, or connect to any app worldwide with
              our Open API, a first in property management software.
            </p>

            {/* CTA Button */}
            <Button
              dialogId="request-demo"
              variant="text"
              className="text-[#1665D8] hover:text-[#1454C7] font-bold text-base flex whitespace-nowrap items-center gap-2"
            >
              Request A Demo
              <ArrowRightIcon className="w-4 h-4" />
            </Button>

            {/* Mobile Image - Below content */}
            {!isMedium && (
              <div className="w-full max-w-[500px] mx-auto mt-12 mb-16">
                <Image
                  src="/integrations-background-mobile.svg"
                  alt="Integration apps arranged for mobile view"
                  width={500}
                  height={600}
                  className="w-full h-auto"
                  sizes="(max-width: 500px) 100vw, 500px"
                  priority
                />
              </div>
            )}
          </div>
        </MaxWidthContainer>
      </div>
    </section>
  );
}
