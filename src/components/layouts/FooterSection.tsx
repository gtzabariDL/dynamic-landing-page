'use client';

import { Button } from '../ui/Button';
import { MaxWidthContainer } from './MaxWidthContainer';

export default function FooterSection() {
  const handleCookiePreferences = () => {
    document.cookie.split(';').forEach((cookie) => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });

    window.location.href = window.location.href.split('#')[0] + '#';

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <section className="flex flex-col items-center justify-center bg-[#2F3E83] w-full text-white py-12 md:py-16">
      <MaxWidthContainer className="flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Request a Demo</h2>
        <p className="text-center text-base md:text-lg mb-8">
          Ask us as many questions as you like to see if we are the right fit.
        </p>
        <Button
          dialogId="request-demo"
          className=" bg-[#01CC74] text-white rounded-md font-medium shadow hover:bg-[#00b27f] transition-colors mb-12 md:mb-16 cursor-pointer"
        >
          Request a Demo
        </Button>

        <div className="w-full text-center text-sm">
          <p className="mb-4">© 2025 DoorLoop Property Management Software.</p>
          <p className="mb-4">All rights reserved.</p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-[#ffffff]">
            <div className="flex items-center gap-2">
              <a
                href="https://www.doorloop.com/legal/privacy"
                className="hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
              <span className="text-[#ffffffcc]">|</span>
              <a
                href="https://www.doorloop.com/legal/terms"
                className="hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </a>
            </div>
            <span className="hidden md:inline text-[#ffffffcc]">|</span>
            <span className="text-center">
              1601 Washington Ave, Suite 200, Miami Beach, FL 33139
            </span>
            <span className="hidden md:inline text-[#ffffffcc]">|</span>
            <a href="tel:+1-888-607-3667" className="hover:text-white transition-colors">
              +1-888-607-3667
            </a>
          </div>

          <button
            onClick={handleCookiePreferences}
            className="mt-4 text-[#ffffff] hover:text-white transition-colors cursor-pointer"
          >
            Manage your Cookie Preferences
          </button>
        </div>
      </MaxWidthContainer>
    </section>
  );
}
