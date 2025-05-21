import Image from 'next/image';
const reviewPlatforms = [
  { src: 'softwareAdvice.svg', alt: 'Software Advice' },
  { src: 'capterra.svg', alt: 'Capterra' },
  { src: 'g2crowd.svg', alt: 'G2 Crowd' },
  { src: 'getApp.svg', alt: 'GetApp' },
];

export default function HeroSection() {
  return (
    <section className="flex-grow flex-col flex items-center justify-center bg-[#2F3E83] px-4 py-10 space-y-6 w-full h-dvh">
      <h1 className="text-white text-4xl md:text-5xl text-center font-normal">
        The <span className="font-bold">Highest-Rated</span> Property Management Software
      </h1>

      <span className="text-center text-white max-w-3xl text-base md:text-lg">
        Save 15 hours a month, put your rental portfolio on autopilot and make accounting a breeze.
      </span>

      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-2xl space-y-2 md:space-y-0 mt-6 ">
        <div className="flex items-center w-full md:w-80 bg-white rounded-md md:rounded-md md:rounded-r-none px-3 py-2 shadow-sm h-14">
          <Image
            src="email-icon.svg"
            alt="Email"
            width={24}
            height={24}
            className="text-gray-400 mr-3 ml-1"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full outline-none text-gray-400 text-base placeholder:text-gray-400"
          />
        </div>
        <button className="w-full md:w-52 md:px-8 h-14 bg-[#01cc74] text-white py-2 rounded-md md:rounded-l-none md:rounded-r-md font-medium shadow hover:bg-[#00b27f] transition-colors whitespace-nowrap">
          Request a Demo
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-sm md:max-w-full space-y-2 mt-6 space-x-5">
        <Image
          className="dark:invert"
          src="saleIcon.svg"
          alt="Spring Sale Icon"
          width={120}
          height={60}
          priority
        />
        <span className="text-white text-center text-sm font-normal mt-2">
          A fresh path to real growth. Get one month free + zero onboarding fees on all annual plans. Hurry—offer ends <span className="font-bold">Friday May 23rd</span>.
        </span>
      </div>

      {/* Review Platforms Grid */}
      <div className="grid grid-cols-2 md:flex md:items-center max-w-6xl mt-8 gap-6 md:gap-10">
        {reviewPlatforms.map((platform) => (
          <Image
            key={platform.alt}
            src={platform.src}
            alt={platform.alt}
            width={120}
            height={40}
            className="w-auto h-auto"
          />
        ))}
      </div>
    </section>
  );
} 