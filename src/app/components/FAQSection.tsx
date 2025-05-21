import React, { useState } from 'react';

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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <div
        className={`transition-all duration-200 ease-in-out ${isOpen ? 'max-h-[500px]' : 'max-h-0'} overflow-hidden bg-white`}
      >
        <div className="p-4 rounded-lg text-gray-700">
          <div className="text-[#333333] text-base">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
};

const faqItems = [
  {
    question: "What is DoorLoop and whom is it for?",
    answer: (
      <>
        <p className="mb-4">
          DoorLoop is the easiest property management software that helps manage tens of thousands of units in over 100 countries. Managing someone else&apos;s portfolio? DoorLoop has you covered too.
        </p>
        <p className="mb-4">
          DoorLoop is built for property managers, management companies, owners, landlords, investors, tenants, or anyone managing any property worldwide.
        </p>
        <p>
          Our goal is to make your life easier so you get more done in less time, increase occupancy and profitability, and decrease turnover and workload. Soon you&apos;ll have the time and energy to focus on what matters most.
        </p>
      </>
    )
  },
  {
    question: "We are not computer savvy. Is it easy to use?",
    answer: "Yes! DoorLoop is designed to be intuitive and user-friendly."
  },
  {
    question: "What properties can I manage?",
    answer: "You can manage any type of property including residential, commercial, and more."
  },
  {
    question: "Why should I choose you over other programs?",
    answer: "DoorLoop offers unique features, better pricing, and superior customer support."
  },
  {
    question: "I use Excel, Word, and Outlook. Why use DoorLoop?",
    answer: "DoorLoop consolidates all your property management needs into one efficient platform."
  },
  {
    question: "What is the process to get started?",
    answer: "Simply request a demo and our team will guide you through the setup process."
  }
];

export default function FAQSection() {
  const [activeTab, setActiveTab] = useState('About');
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  const toggleQuestion = (question: string) => {
    setOpenQuestions(prev =>
      prev.includes(question)
        ? prev.filter(q => q !== question)
        : [...prev, question]
    );
  };

  const firstColumnItems = faqItems.slice(0, Math.ceil(faqItems.length / 2));
  const secondColumnItems = faqItems.slice(Math.ceil(faqItems.length / 2));

  return (
    <section id="faqs" className="flex flex-col items-center justify-center bg-[#F5F7FA] px-4 md:px-16 py-16 w-full">
      <div className="text-center mb-8">
        <div className="text-[#A8A8A8] text-sm uppercase mb-2 font-bold">
          FAQS
        </div>
        <h2 className="text-4xl font-bold text-[#333333]">
          Your Questions Answered
        </h2>
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
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl">
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
    </section>
  );
} 