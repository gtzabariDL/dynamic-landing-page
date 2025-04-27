import Image from 'next/image';

export default function SupportSection() {
  return (
    <section className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white px-6 md:px-16 py-14 space-y-5 md:space-y-0 w-full">
      {/* Left side - Content */}
      <div className="w-full md:w-1/2 flex flex-col space-y-5">
        {/* Satisfaction Rating */}
        <div className="text-[#A8A8A8] text-sm font-medium">
          98.6% CUSTOMER SATISFACTION RATING
        </div>

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
        <ul className="text-gray-800 space-y-4">
          {[
            'Support included',
            'Help Center',
            'Training by phone or Zoom',
            'Data Migration'
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✔</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <button className="mt-4 bg-[#01CC74] text-white py-2 px-6 rounded-md font-medium shadow hover:bg-[#00b27f] transition-colors w-fit">
          Request a Demo
        </button>
      </div>

      {/* Right side - Image */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <Image 
          src="/supportStats.svg" 
          alt="Support Statistics" 
          width={350} 
          height={300}
          className="w-auto h-auto" 
        />
      </div>
    </section>
  );
} 