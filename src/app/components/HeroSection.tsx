import Image from 'next/image';

const reviewPlatforms = [
  { src: 'softwareAdvice.svg', alt: 'Software Advice' },
  { src: 'capterra.svg', alt: 'Capterra' },
  { src: 'g2crowd.svg', alt: 'G2 Crowd' },
  { src: 'getapp.svg', alt: 'GetApp' },
];

export default function HeroSection() {
  return (
    <section className="flex-grow flex-col flex items-center justify-center bg-[#2F3E83] px-4 py-10 space-y-6 w-full">
      <div className="text-center">
        <h1 className="text-white font-bold">
          <span className="md:inline-block md:space-x-2">
            <span className="text-4xl md:text-5xl">The</span>{' '}
            <span className="text-4xl md:text-5xl">Highest-Rated</span>{' '}
            <span className="text-4xl md:text-5xl">Property</span>{' '}
            <span className="text-4xl md:text-5xl">Management</span>{' '}
            <span className="text-4xl md:text-5xl">Software</span>
          </span>
        </h1>
      </div>

      <span className="text-center text-white max-w-xl text-base md:text-lg">
        With cutting-edge technology and world-class support, DoorLoop&apos;s property management
        software helps you make more money, get organized, and grow.
      </span>

      <div className="flex flex-col items-center w-full max-w-sm space-y-2 mt-6">
        <div className="flex items-center w-full bg-white rounded-md px-3 py-2 shadow-sm">
          <svg
            className="w-5 h-5 text-gray-400 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 4h16v16H4V4z" stroke="none" />
            <path d="M22 6l-10 7L2 6" />
          </svg>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full outline-none text-gray-700"
          />
        </div>
        <button className="w-full bg-[#00C48C] text-white py-2 rounded-md font-medium shadow hover:bg-[#00b27f] transition-colors">
          Request a Demo
        </button>
      </div>

      <div className="flex flex-col items-center w-full max-w-sm space-y-2 mt-6">
        <Image
          className="dark:invert"
          src="saleIcon.svg"
          alt="Spring Sale Icon"
          width={120}
          height={60}
          priority
        />
        <span className="text-white text-center text-sm font-bold mt-2">
          Zero onboarding fees on all annual plans. Hurry—offer ends April 7th.
        </span>
      </div>

      {/* Review Platforms Grid */}
      <div className="grid grid-cols-2 md:flex md:justify-between md:items-center w-full max-w-6xl gap-6 md:gap-0 mt-8">
        {reviewPlatforms.map((platform) => (
          <div key={platform.alt} className="flex justify-center md:flex-1">
            <Image 
              src={platform.src} 
              alt={platform.alt} 
              width={120} 
              height={40}
              className="w-auto h-auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
} 