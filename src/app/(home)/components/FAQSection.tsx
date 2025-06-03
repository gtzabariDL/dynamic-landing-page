'use client';

import React, { useState } from 'react';
import { MaxWidthContainer } from '../../../components/layouts/MaxWidthContainer';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: (question: string) => void;
}

const FAQItemComponent = ({ item, isOpen, onToggle }: FAQItemProps) => {
  return (
    <div className="flex flex-col rounded-lg">
      <div
        onClick={() => onToggle(item.question)}
        onTouchEnd={(e) => {
          e.preventDefault();
          onToggle(item.question);
        }}
        className="overflow-hidden cursor-pointer select-none"
      >
        <div className="flex justify-between items-center py-8 px-6 text-[#182C4C] bg-white">
          <h3 className={`font-bold hover:text-[#FF3366] text-gray-900 transition-colors`}>
            {item.question}
          </h3>
          <svg
            className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      <div
        className={`transition-all duration-200 ease-in-out ${isOpen ? 'max-h-[500px]' : 'max-h-0'} overflow-hidden bg-white`}
      >
        <div className="p-4 rounded-lg text-gray-700">
          <div className="text-[#333333] text-base">{item.answer}</div>
        </div>
      </div>
    </div>
  );
};

const faqItems = [
  {
    question: 'What is DoorLoop and whom is it for?',
    answer: (
      <>
        <p className="mb-4">
          DoorLoop is the easiest property management software that helps manage tens of thousands
          of units in over 100 countries. Managing someone else&apos;s portfolio? DoorLoop has you
          covered too.
        </p>
        <p className="mb-4">
          DoorLoop is built for property managers, management companies, owners, landlords,
          investors, tenants, or anyone managing any property worldwide.
        </p>
        <p>
          Our goal is to make your life easier so you get more done in less time, increase occupancy
          and profitability, and decrease turnover and workload. Soon you&apos;ll have the time and
          energy to focus on what matters most.
        </p>
      </>
    ),
  },
  {
    question: 'We are not computer savvy. Is it easy to use?',
    answer: (
      <>
        <p className="mb-4">
          DoorLoop is so easy to use, most people need very little (if any) training. We recommend
          1-2 virtual training sessions with us (only an hour long) so we can show you some best
          practices.
        </p>
        <p className="mb-4">
          If you need more help, we have training and support for you and your entire team. We also
          include tutorial videos, articles, and more.
        </p>
        <p>
          The best part is, you no longer have to train your team or answer any questions about the
          software; we&apos;ll do it for you!
        </p>
      </>
    ),
  },
  {
    question: 'Why should I choose you over other programs?',
    answer: (
      <>
        <p className="mb-4">We take pride in our three main differentiators:</p>
        <ol className="list-decimal pl-6 mb-4">
          <li className="mb-2">
            <span className="font-semibold">Ease of use:</span> Take our complex competitor test.
            Get a free demo from our top three competitors, and see for yourself which is the
            easiest.
          </li>
          <li className="mb-2">
            <span className="font-semibold">Comprehensiveness:</span> We built the most important
            features you need to successfully manage your properties.
          </li>
          <li className="mb-2">
            <span className="font-semibold">World-class support:</span> Our average response time to
            any messages, emails, or chats is 5 minutes!
          </li>
        </ol>
        <p>
          Sign up today and see why everyone is switching to DoorLoop. We&apos;ll even import your
          current leases for free.
        </p>
      </>
    ),
  },
  {
    question: 'What properties can I manage?',
    answer: (
      <>
        <p className="mb-4">If it has a door, you can manage it with DoorLoop!</p>
        <p className="mb-4">Manage any combination of properties and spaces:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Residential properties</li>
          <li>Commercial properties</li>
          <li>Student housing</li>
          <li>Mobile homes</li>
          <li>Affordable and workforce housing</li>
          <li>Community associations and HOAs</li>
        </ul>
      </>
    ),
  },
  {
    question: 'I use Excel, Word, and Outlook. Why use DoorLoop?',
    answer: (
      <>
        <p className="mb-4">
          Why juggle multiple programs when one can do it all? With DoorLoop&apos;s all-in-one
          software, skip toggling between numerous platforms. Use our prefilled templates, automated
          reminders, and integrated tracking instead of manual document handling.
        </p>
        <p>
          Automate your repetitive tasks so you can focus on what really matters: building better
          relationships and efficiently growing your business.
        </p>
      </>
    ),
  },
  {
    question: 'What is the process to get started?',
    answer: (
      <>
        <p className="mb-4">
          After years of trial and error, we came up with the Perfect Portfolio Plan:
        </p>
        <ol className="list-decimal pl-6 mb-4">
          <li className="mb-2">
            Step 1:{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Schedule a demo
            </a>
            .
          </li>
          <li className="mb-2">
            Step 2: If you&apos;re using another software, migrate your data with our team&apos;s
            assistance.
          </li>
          <li className="mb-2">Step 3: Complete a one-hour basic training.</li>
          <li className="mb-2">
            Step 4: Input properties, tenants, and leases; email your tenants a link to their new
            tenant portal; and activate the owner portal for your investors.
          </li>
        </ol>
        <p>
          It really is that simple.{' '}
          <a href="#" className="text-blue-600 hover:text-blue-800">
            Click here
          </a>{' '}
          to schedule your demo and get started.
        </p>
      </>
    ),
  },
];

const pricingFaqItems = [
  {
    question: 'What are your prices?',
    answer: (
      <>
        <p className="mb-4">Prices start at only $69/month for your first 20 units.</p>
        <p>You will receive free updates, data migration, training and support.</p>
      </>
    ),
  },
  {
    question: 'Do I need a credit card to try it?',
    answer: (
      <>
        <p className="mb-4">Absolutely not! All you need is your email address.</p>
        <p>
          You can schedule your free demo today and see how the software works with a dedicated
          account manager to answer as many questions as you like.
        </p>
      </>
    ),
  },
  {
    question: 'Why is your price so low?',
    answer: (
      <>
        <p>
          We are a privately owned company that is able to keep a low overhead and pass those
          savings onto you. By comparison, many of our competitors are publicly traded and need to
          charge high fees to please their shareholders.
        </p>
      </>
    ),
  },
  {
    question: 'Are there any contracts?',
    answer: (
      <>
        <p>
          No. We believe you should have the freedom to use any software you like without being tied
          down by corporate contracts. With DoorLoop, you are free to cancel your account at any
          time or export your data and use another software.
        </p>
      </>
    ),
  },
  {
    question: 'Who pays for rent payments, screening and eSignatures?',
    answer: (
      <>
        <p className="mb-4">
          There are two premium services you can offer your tenants at <i>no cost to you</i>.
        </p>
        <p className="mb-4">
          <strong>Tenant Screening (by TransUnion)</strong>: The cost to your prospective tenants is
          only $45 on the Starter plan, $35 on the Pro, and $25 on the Premium. It includes a US
          national criminal background check, eviction history, and credit report. You can also
          markup the cost and keep any profits.
        </p>
        <p className="mb-4">
          <strong>Credit Card and ACH Payments (by Stripe)</strong>: Automate your rent collection
          with a one-time setup fee of $49 per bank account on the Starter plan, $25 on the Pro, and
          free on the Premium.
        </p>
        <p className="mb-4">
          Your tenants pay a 3.25% service fee for credit card payments or $2.49 for ACH ($1 on the
          Pro plan and free on the Premium plan). Tenants see their convenience fees upfront for
          transparency.
        </p>
        <p className="mb-4">Other benefits include:</p>
        <ol className="list-decimal pl-6">
          <li className="mb-2">
            <strong>Outgoing EFT payments</strong>: $1 each under the Pro and Premium plans. You can
            also mail checks for $1.50.
          </li>
          <li>
            <strong>eSignatures</strong>: $1 per document regardless of how many people need to
            sign.
          </li>
        </ol>
      </>
    ),
  },
];

const dataFaqItems = [
  {
    question: 'Can I migrate my data to DoorLoop?',
    answer: (
      <>
        <p>
          Yes. If you&apos;re using another software or even a spreadsheet, our migration team will
          transfer your current properties, units, tenants, owners, leases, and vendors into
          DoorLoop.
        </p>
      </>
    ),
  },
  {
    question: 'Is my data backed up and protected?',
    answer: (
      <>
        <p className="mb-4">
          Yes, sleep well knowing your data is automatically backed to numerous servers. If you
          wish, you can export and save a physical copy of your data to your computer.
        </p>
        <p>DoorLoop is hosted by Amazon Web Services (AWS), the leader in data security.</p>
      </>
    ),
  },
  {
    question: 'Can I block parts of the software from my team?',
    answer: (
      <>
        <p className="mb-4">
          With user access roles, you can allow or block access to certain parts of the software
          from any user.
        </p>
        <p>
          For example, you could allow someone to add new tenants but not delete tenants. Or, you
          could completely block access to all financials, accounting and reports.
        </p>
      </>
    ),
  },
  {
    question: 'How often do you add new features and make updates?',
    answer: (
      <>
        <p className="mb-4">
          You can expect updates at least monthly. The best part is that they&apos;re done
          automatically for you; there&apos;s no need to download or install anything.
        </p>
        <p>
          We also accept feature suggestions and prioritize them based on demand. So please, keep
          them coming!
        </p>
      </>
    ),
  },
];

export default function FAQSection() {
  const [activeTab, setActiveTab] = useState('About');
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  const toggleQuestion = (question: string) => {
    setOpenQuestions((prev) =>
      prev.includes(question) ? prev.filter((q) => q !== question) : [...prev, question]
    );
  };

  // Get the appropriate FAQ items based on the active tab
  const currentFaqItems =
    activeTab === 'Pricing' ? pricingFaqItems : activeTab === 'Data' ? dataFaqItems : faqItems;

  const firstColumnItems = currentFaqItems.slice(0, Math.ceil(currentFaqItems.length / 2));
  const secondColumnItems = currentFaqItems.slice(Math.ceil(currentFaqItems.length / 2));

  return (
    <section
      id="faqs"
      className="flex flex-col items-center justify-center bg-[#F5F7FA] py-16 w-full"
    >
      <MaxWidthContainer>
        <div className="text-center mb-8">
          <div className="text-[#A8A8A8] text-sm uppercase mb-2 font-bold">FAQS</div>
          <h2 className="text-4xl font-bold text-[#333333]">Your Questions Answered</h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-8 mb-8">
          {['About', 'Pricing', 'Data'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              onTouchEnd={() => setActiveTab(tab)}
              className={`cursor-pointer hover:text-black transition-colors relative py-2 ${activeTab === tab ? ' text-black' : 'text-[#9C9C9C]'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* FAQ Lists */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* First Column */}
          <div className="flex-1 flex flex-col gap-4">
            {firstColumnItems.map((item, index) => (
              <FAQItemComponent
                key={index}
                item={item}
                isOpen={openQuestions.includes(item.question)}
                onToggle={toggleQuestion}
              />
            ))}
          </div>

          {/* Second Column */}
          <div className="flex-1 flex flex-col gap-4">
            {secondColumnItems.map((item, index) => (
              <FAQItemComponent
                key={index}
                item={item}
                isOpen={openQuestions.includes(item.question)}
                onToggle={toggleQuestion}
              />
            ))}
          </div>
        </div>
      </MaxWidthContainer>
    </section>
  );
}
