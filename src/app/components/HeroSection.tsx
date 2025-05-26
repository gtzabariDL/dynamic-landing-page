'use client'

import Image from 'next/image';
import { DoorLoopLogo } from './DoorLoopLogo';
import { useState } from 'react';

const reviewPlatforms = [
  { src: 'softwareAdvice.svg', alt: 'Software Advice', width: 120, height: 40 },
  { src: 'capterra.svg', alt: 'Capterra', width: 120, height: 40 },
  { src: 'g2crowd.svg', alt: 'G2 Crowd', width: 120, height: 40 },
  { src: 'getApp.svg', alt: 'GetApp', width: 120, height: 40 },
];

export default function HeroSection() {
  const [email, setEmail] = useState('');
  const onRequestDemo = () => {
    window.open(`https://demo.doorloop.com/demo/additional-info?email=${email}`);
  };

  const basePath = process.env.NODE_ENV === 'production' ? '/dynamic-landing-page' : '';
  const backgroundStyle = {
    backgroundImage: `url(${basePath}/hero-background.webp)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <section className="relative flex-grow flex-col flex items-center justify-center px-4 py-8 w-full h-[98vh] bg-[#2F3E83] md:bg-transparent">
      <div
        className="fixed top-0 left-0 w-full h-[98vh] bg-no-repeat -z-10 hidden md:block md:opacity-90"
        style={backgroundStyle}
      />
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-6">
          <DoorLoopLogo color="white" width={200} height={54} />
        </div>

        <h1 className="text-white text-4xl text-center font-normal mb-6">
          The Highest-Rated Property Management Software
        </h1>

        <span className="text-center text-white max-w-3xl text-base md:text-lg">
          Save 15 hours a month, put your rental portfolio on autopilot and make accounting a breeze.
        </span>

        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-2xl space-y-2 md:space-y-0 md:my-12 ">
          <div className="flex items-center w-full md:w-80 bg-white rounded-md md:rounded-md md:rounded-r-none px-3 py-2 shadow-sm ">
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
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your Email"
              className="w-full outline-none text-gray-400 text-base placeholder:text-gray-400 h-10"
            />
          </div>
          <button onClick={onRequestDemo} className="w-full md:w-52 md:px-8 h-14 bg-[#01cc74] text-white py-2 rounded-md md:rounded-l-none md:rounded-r-md font-medium shadow hover:bg-[#00b27f] transition-colors whitespace-nowrap">
            Request a Demo
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-sm md:max-w-full space-y-2 mt-6 space-x-5">
          <Image
            className="dark:invert"
            src={`${basePath}/saleIcon.svg`}
            alt="Spring Sale Icon"
            width={120}
            height={60}
            priority={false}
            loading="lazy"
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
              src={`${basePath}/${platform.src}`}
              alt={platform.alt}
              width={platform.width}
              height={platform.height}
              className="w-auto h-auto"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
} 