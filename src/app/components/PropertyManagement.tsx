import Image from 'next/image';

export default function PropertyManagement() {
  return (
    <section className="flex-grow flex-col md:flex-row flex items-start justify-between bg-white px-4 md:px-16 py-10 space-y-6 md:space-y-0 w-full">
      {/* Left side - Image */}
      <div className="w-full md:w-1/2 relative hidden md:block">
        <Image
          src="/manageAnyProperty.svg"
          alt="Property Management Dashboard"
          width={600}
          height={500}
          className="w-full h-auto rounded-lg"
        />
      </div>

      {/* Right side - Content */}
      <div className="w-full md:w-1/2 md:pl-16 flex flex-col space-y-6">
        <div className="text-[#A8A8A8] text-sm">
          IF IT HAS A DOOR, YOU CAN MANAGE IT WITH DOORLOOP
        </div>

        <h2 className="text-black text-4xl font-bold">
          Manage any property.<br />
          Anytime, anywhere.
        </h2>

        <div className="flex flex-wrap gap-3">
          {['Residential', 'Commercial', 'Student Housing', 'HOA'].map((type) => (
            <div
              key={type}
              className="bg-gray-100 text-[#2F3E83] font-medium py-2 px-4 rounded-lg"
            >
              {type}
            </div>
          ))}
        </div>

        <p className="text-gray-700 text-lg">
          DoorLoop&apos;s property management software helps manage, grow, and
          automate hundreds of thousands of properties.
        </p>

        <button className="bg-[#01CC74] text-white py-3 px-6 rounded-md font-medium shadow hover:bg-[#00b27f] transition-colors w-fit">
          Request A Demo
        </button>
      </div>
    </section>
  );
} 