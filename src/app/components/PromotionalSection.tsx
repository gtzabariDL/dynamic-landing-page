import Image from 'next/image';

export default function PromotionalSection() {
    return (

        <section className="pl-[7%] px-[5%] py-12 md:py-20 w-full" >
            <div className="max-w-7xl mx-auto bg-[#2B3674]  text-white px-6 md:px-16 py-14 relative md:py-28 rounded-lg">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Content */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-5xl font-bold mb-3">Winter Sale</h2>
                        <p className="text-lg text-gray-[#FFFFFF] mb-4">
                            Get 50% off your first 2 months on annual plans.
                        </p>

                        {/* Features List */}
                        <ul className="space-y-4">
                            {[
                                'Get started for only $59/month for your first 20 units',
                                'Try us risk-free, no credit card needed',
                                'Offer ends Friday January 31st'
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-[#01CC74]" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <button className="w-full md:w-[300px] bg-[#01CC74] text-white p-4 rounded-md font-medium shadow hover:bg-[#00b27f] transition-colors h-14 text-sm cursor-pointer mt-8">
                            Request a Demo
                        </button>
                    </div>

                    {/* Image */}
                    <Image
                        src="matt.svg"
                        alt="Support Representative"
                        width={400}
                        height={400}
                        className="md:w-auto md:h-auto md:absolute md:right-10 md:bottom-0 hidden md:block"
                    />

                </div>
            </div>
        </section >
    );
} 