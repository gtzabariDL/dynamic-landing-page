'use client';

import { Button } from '../ui/Button';
import { MaxWidthContainer } from './MaxWidthContainer';

export default function FooterSection() {
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
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <span className="text-[#ffffffcc]">|</span>
              <a href="#" className="hover:text-white transition-colors">
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

          <button className="mt-4 text-[#ffffff] hover:text-white transition-colors cursor-pointer">
            Manage your Cookie Preferences
          </button>
        </div>
      </MaxWidthContainer>
    </section>
  );
}
