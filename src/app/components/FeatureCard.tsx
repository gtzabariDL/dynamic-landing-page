import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  imageSrc: string;
}

export default function FeatureCard({ icon, title, description, features, imageSrc }: FeatureCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once the section is visible, we can disconnect the observer
          observer.disconnect();
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px',
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
    <section 
      ref={sectionRef}
      className="flex flex-col md:flex-row items-start md:items-center justify-between bg-[#F5F7FA] px-6 md:px-16 py-14 space-y-5 md:space-y-0 w-full"
    >
      {/* Left side - Content */}
      <div className="w-full md:w-1/2 flex flex-col space-y-5">
        {/* Icon */}
        <div className="text-[#2F3E83]">
          <Image src={icon} alt={`${title} Icon`} width={24} height={24} />
        </div>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-black">{title}</h2>

        {/* Description */}
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          {description}
        </p>

        {/* Bullet list */}
        <ul className="text-gray-800 space-y-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✔</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <button className="mt-4 bg-[#01CC74] text-white py-2 px-6 rounded-md font-medium shadow hover:bg-[#00b27f] transition-colors w-fit">
          Request A Demo
        </button>
      </div>

      {/* Right side - Image */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <div
          className={`transition-all duration-1000 transform md:transform-none
            ${isVisible 
              ? 'opacity-100 md:translate-x-0 translate-x-0' 
              : 'opacity-100 md:opacity-0 md:translate-x-20 translate-x-0'
            }`}
        >
          <Image 
            src={imageSrc}
            alt={title}
            width={350}
            height={270}
            className="w-auto h-auto"
          />
        </div>
      </div>
    </section>
  );
} 