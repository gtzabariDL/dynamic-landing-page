import Image from 'next/image';
import { MaxWidthContainer } from '../../../components/layouts/MaxWidthContainer';

const features = [
  {
    icon: 'cutting-edge-tech.svg',
    title: 'Cutting-edge technology',
    description: 'Simple, secure, and reliable software.',
  },
  {
    icon: 'world-class-support.svg',
    title: 'World-class support',
    description: 'US-based experts committed to your success.',
  },
  {
    icon: 'free-educational-resources.svg',
    title: 'Free educational resources',
    description: 'Thousands of videos, guides, and more.',
  },
];

export default function WhyDoorLoopSection() {
  return (
    <section className="relative bg-[#2F3E83] pt-32 w-full overflow-hidden">
      <MaxWidthContainer className="px-0!">
        <div className="text-center mb-12 md:mb-16 px-4 md:px-8 lg:px-4">
          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Why DoorLoop?
          </h2>

          {/* Description */}
          <p className="text-white text-lg leading-relaxed">
            We&apos;re reshaping how property managers organize, make money, and grow their
            portfolio. From landlords to property management companies—and tenants too—we strive to
            power the lasting tools and relationships necessary for flourishing properties and
            people.
          </p>
        </div>

        <div className="flex justify-center px-4 md:px-8 lg:px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-6">
                <div className="w-8 h-8 mt-1.5">
                  <Image src={`/${feature.icon}`} alt="" width={32} height={32} />
                </div>

                <div className="flex flex-col">
                  <h3 className="mb-4 text-[22px] font-bold text-white">{feature.title}</h3>
                  <p className="text-white text-lg leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src="/why-doorloop-web.png"
            alt="DoorLoop Dashboard Interface"
            width={1450}
            height={540}
            className="hidden md:block"
            priority
          />
          <Image
            src="/why-doorloop-mobile.png"
            alt="DoorLoop Dashboard Interface"
            width={1450}
            height={540}
            className="block md:hidden -mt-20"
            priority
          />
        </div>
      </MaxWidthContainer>
    </section>
  );
}
