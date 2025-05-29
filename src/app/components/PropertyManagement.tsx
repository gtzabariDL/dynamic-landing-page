'use client';

import Image from 'next/image';
import { Button } from './Button';
import { useState } from 'react';

type PropertyType = 'Residential' | 'Commercial' | 'Student Housing' | 'HOA';

const propertyTypes: Record<PropertyType, string> = {
  Residential:
    'Easily manage your residential units from anywhere in the world including single-family, multi-family, condos, apartments, and much more.',
  Commercial:
    'Grow your commercial portfolio with the easiest software to manage your retail, office, industrial, shopping centers, parking, & more.',
  'Student Housing':
    "Effortlessly manage your leases with multiple renters whether it's on or off-campus from dorms, apartments, and more.",
  HOA: 'Efficiently manage your residents, owners, renters, communities, and associations using the top-rated software available online.',
};

export default function PropertyManagement() {
  const [selectedType, setSelectedType] = useState<PropertyType | null>(null);

  return (
    <section className="flex-grow flex-col md:flex-row flex items-start justify-between bg-white px-4 md:px-16 py-10 space-y-6 md:space-y-0 w-full">
      {/* Left side - Image */}
      <div className="relative hidden md:block">
        <Image
          src="manageAnyProperty.svg"
          alt="Property Management Dashboard"
          width={600}
          height={500}
          className="rounded-lg min-w-[600px] min-h-[400px]"
        />
      </div>

      {/* Right side - Content */}
      <div className="w-full md:pl-16 flex flex-col">
        <div className="text-[#A8A8A8] text-sm font-bold mb-2">
          IF IT HAS A DOOR, YOU CAN MANAGE IT WITH DOORLOOP
        </div>

        <div className="text-black text-4xl font-bold mb-12">
          Manage any property.
          <br />
          Anytime, anywhere.
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {Object.keys(propertyTypes).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type as PropertyType)}
              className={`cursor-pointer text-sm rounded-lg font-bold p-4 transition-colors ${
                selectedType === type
                  ? 'bg-[#1665d8] text-white'
                  : 'bg-[#EDEDED] text-[#182C4C] hover:bg-[#1665d8] hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <p className="text-gray-700 text-lg mb-6 md:mb-12">
          {selectedType
            ? propertyTypes[selectedType]
            : "DoorLoop's property management software helps manage, grow, and automate hundreds of thousands of properties."}
        </p>

        <Button dialogId="request-demo">Request A Demo</Button>
      </div>
    </section>
  );
}
