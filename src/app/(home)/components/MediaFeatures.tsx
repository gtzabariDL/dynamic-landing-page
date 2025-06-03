import Image from 'next/image';
import { MaxWidthContainer } from '../../../components/layouts/MaxWidthContainer';

const mediaFeatures = [
  { src: 'mediaLogos/nbc.svg', alt: 'NBC' },
  { src: 'mediaLogos/techcrunch.svg', alt: 'TechCrunch' },
  { src: 'mediaLogos/insider.svg', alt: 'Insider' },
  { src: 'mediaLogos/forbes.svg', alt: 'Forbes' },
  { src: 'mediaLogos/cbs.svg', alt: 'CBS' },
  { src: 'mediaLogos/therealdeal.svg', alt: 'The Real Deal' },
  { src: 'mediaLogos/foxnews.svg', alt: 'Fox News' },
];

export default function MediaFeatures() {
  return (
    <section className="flex-grow flex-col flex items-center justify-center bg-white p-18 space-y-6 w-full md:py-20">
      <MaxWidthContainer className="text-center py-20">
        <div className="text-[#182c4c] font-semibold text-lg opacity-80">As seen on</div>
        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center items-center gap-8 mt-6">
          {mediaFeatures.map((platform, index) => {
            const isLast = index === mediaFeatures.length - 1;
            const isOdd = mediaFeatures.length % 2 !== 0;

            return (
              <div
                key={platform.alt}
                className={`flex justify-center ${isLast && isOdd ? 'col-span-2 md:col-span-1' : ''}`}
              >
                <Image
                  src={platform.src}
                  alt={platform.alt}
                  width={70}
                  height={40}
                  className="w-auto h-auto"
                />
              </div>
            );
          })}
        </div>
      </MaxWidthContainer>
    </section>
  );
}
