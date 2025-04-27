'use client';

import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = (section: string) => {
    setIsMenuOpen(false); // Close the menu
    
    // Wait for the menu to close before scrolling
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        // Add a small offset to account for the fixed header
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 300);
  };

  const menuItems = [
    { label: 'Features', section: 'features' },
    { label: 'Testimonials', section: 'testimonials' },
    { label: 'FAQs', section: 'faqs' }
  ];

  return (
    <>
      <nav className="w-full bg-white px-4 lg:px-8 py-3 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="flex items-center">
          <img
            src={`${process.env.NODE_ENV === 'production' ? '/dynamic-landing-page' : ''}/doorloopLogo.svg`}
            alt="DoorLoop Logo"
            width={120}
            height={32}
          />
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center ml-12 space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className="text-[#2F3E83] hover:text-[#00C48C] transition-colors font-medium"
                onClick={() => handleMenuClick(item.section)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          {/* Desktop Demo Button */}
          <button className="hidden lg:block bg-[#00C48C] text-white px-6 py-2 rounded-md font-medium hover:bg-[#00b27f] transition-colors">
            Request A Demo
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="text-[#2F3E83] lg:hidden"
            aria-label="Open menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3">
              <img
                src={`${process.env.NODE_ENV === 'production' ? '/dynamic-landing-page' : ''}/doorloopLogo.svg`}
                alt="DoorLoop Logo"
                width={120}
                height={32}
              />
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-[#2F3E83]"
                aria-label="Close menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 6L18 18M6 18L18 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 px-4 py-6">
              <div className="space-y-6">
                {menuItems.map((item) => (
                  <div
                    key={item.label}
                    className="py-3 border-b border-white/20"
                  >
                    <button 
                      className="text-[#2F3E83] text-lg w-full text-left"
                      onClick={() => handleMenuClick(item.section)}
                    >
                      {item.label}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Demo Button */}
            <div className="px-4 py-6">
              <button className="w-full bg-[#00C48C] text-white py-4 rounded-md font-medium hover:bg-[#00b27f] transition-colors">
                Get A Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 