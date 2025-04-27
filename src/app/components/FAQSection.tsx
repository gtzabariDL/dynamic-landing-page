import { useState } from 'react';

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
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <section id="faqs" className="flex flex-col items-center justify-center bg-[#F5F7FA] px-4 md:px-16 py-16 w-full">
      <div className="text-center mb-8">
        <div className="text-[#A8A8A8] text-sm uppercase mb-2">
          FAQS
        </div>
        <h2 className="text-3xl font-bold text-black">
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
            className={`text-gray-600 hover:text-black transition-colors relative py-2 ${
              activeTab === tab ? 'text-black' : ''
            }`}
          >
            {tab}
            <div 
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#FF3366] transform transition-transform duration-200 ${
                activeTab === tab ? 'scale-x-100' : 'scale-x-0'
              }`} 
            />
          </button>
        ))}
      </div>

      {/* Questions Grid */}
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 w-full max-w-6xl">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col"
          >
            <div
              onClick={() => setOpenQuestion(openQuestion === item.question ? null : item.question)}
              onTouchEnd={(e) => {
                e.preventDefault();
                setOpenQuestion(openQuestion === item.question ? null : item.question);
              }}
              className="border border-gray-200 rounded-lg bg-white overflow-hidden cursor-pointer select-none"
            >
              <div className="flex justify-between items-center p-4">
                <h3 className={`font-medium ${
                  openQuestion === item.question ? 'text-[#FF3366]' : 'text-gray-900'
                } transition-colors`}>
                  {item.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                    openQuestion === item.question ? 'rotate-180' : ''
                  }`}
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
              className={`transition-all duration-200 ease-in-out ${
                openQuestion === item.question ? 'max-h-[500px]' : 'max-h-0'
              } overflow-hidden bg-white rounded-lg mt-1`}
            >
              <div className="p-4 rounded-lg text-gray-700">
                {typeof item.answer === 'string' ? (
                  <p>{item.answer}</p>
                ) : (
                  <div className="text-gray-700">
                    {item.answer}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 