'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { MaxWidthContainer } from '../../../components/layouts/MaxWidthContainer';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  imageSrc: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  features,
  imageSrc,
}: FeatureCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '-100px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#ECEEF5] py-12 md:py-20 w-full">
      <MaxWidthContainer className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left side - Content */}
        <div className="w-full md:w-1/2 flex flex-col space-y-5 max-w-[560px]">
          {/* Icon */}
          <div className="text-[#2F3E83]">
            <Image src={`/${icon}`} alt={`${title} Icon`} width={32} height={32} />
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-[#333333]">{title}</h2>

          {/* Description */}
          <p className="text-[#333333] text-base md:text-lg leading-relaxed">{description}</p>

          {/* Bullet list */}
          <ul className="text-[#333333] space-y-4">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 justify-start">
                <span>✔</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA button */}
          <Button dialogId="request-demo">Request A Demo</Button>
        </div>

        {/* Right side - Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div
            className={`md:transition-all md:duration-700 transform
              ${
                isVisible
                  ? 'md:opacity-100 md:translate-x-0'
                  : 'md:opacity-0 md:translate-x-20 md:invisible'
              }`}
          >
            <Image src={`/${imageSrc}`} alt={title} width={560} height={380} loading="lazy" />
          </div>
        </div>
      </MaxWidthContainer>
    </section>
  );
}
