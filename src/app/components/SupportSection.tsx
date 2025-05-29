import Image from 'next/image';
import { Button } from './Button';

export default function SupportSection() {
  return (
    <section className="flex flex-col-reverse md:flex-row items-start md:items-center md:space-x-24 bg-white px-6 md:px-16 py-14 md:space-y-0 w-full">
      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <Image
          src="supportStats/supportStats.svg"
          alt="Support Statistics"
          width={520}
          height={660}
          className="w-auto h-auto"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col space-y-5 mb-12 md:mb-0 max-w-[500px]">
        {/* Satisfaction Rating */}
        <div className="text-[#A8A8A8] text-sm font-medium">98.6% CUSTOMER SATISFACTION RATING</div>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-black">
          World-class support in minutes
        </h2>

        {/* Description */}
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          Our customer service philosophy is simple: treat others as you want them to treat you.
          We&apos;re here to help you every step of the way with white glove service, training, and
          support.
        </p>

        {/* Support Features List */}
        <ul className="text-gray-800 grid grid-cols-1 md:grid-cols-2 gap-4">
          {['Support included', 'Help Center', 'Training by phone or Zoom', 'Data Migration'].map(
            (item) => (
              <li key={item} className="flex items-start gap-2">
                <span>✔</span>
                <span>{item}</span>
              </li>
            )
          )}
        </ul>

        {/* CTA button */}
        <Button
          dialogId="request-demo"
          className="mt-4 text-sm bg-[#01CC74] text-white rounded-md font-medium shadow hover:bg-[#00b27f] transition-colors w-36 h-14"
        >
          Request a Demo
        </Button>
      </div>
    </section>
  );
}
