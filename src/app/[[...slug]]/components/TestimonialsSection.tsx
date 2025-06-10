import Image from 'next/image';
import { MaxWidthContainer } from '../../../components/layouts/MaxWidthContainer';
import { memo } from 'react';
import { getImagePath } from '../../../lib/utils/image';

const testimonials = [
  {
    quote:
      'We operate 120 units of affordable housing and we used to keep track of rent in a note section on Teams. We originally switched to DoorLoop to have a better rent ledger, but realized we can easily do every other property management tasks on the software too.',
    name: 'Alan Oviatt',
    title: 'Property Manager, Lakeland Rentals',
    image: '/AlanOviatt.png',
  },
  {
    quote:
      "My company specializes in helping tenants become homeowners. I switched to DoorLoop because it's a great all-in-one tool, and a lot more affordable than other programs.",
    name: 'Walter Wolford',
    title: 'Ira Deal Maker',
    image: '/WalterWolford.png',
  },
  {
    quote:
      'DoorLoop has made my life very easy with automating everything from rent payments, recurring expenses, taxes, insurance and more. It saves me at least 3 hours a month just on these 2 items alone.',
    name: 'Harrison Furman',
    title: 'Owner, Green Wave Capital',
    image: '/HarrisonFurman.png',
  },
  {
    quote:
      "DoorLoop is unlike anything I've experienced before. I added my first property myself within minutes, not hours.",
    name: 'David Bonan',
    title: 'Property Manager RE Equity LLC',
    image: '/DavidBonan.png',
  },
  {
    quote:
      "DoorLoop doesn't just offer all of the features I could want–it makes them faster and easier to implement. I can do things in seconds that used to take me hours.",
    name: 'Josh Blitz',
    title: 'Partner, Blitz Capital',
    image: '/JoshBlitz.png',
  },
  {
    quote:
      "By far the most user-friendly and robust property management software I've ever worked with.",
    title: 'Property Manager, Lakeland Rentals',
    name: 'Anisha Malhoutra',
    image: '/AnishaMalhoutra.png',
  },
  {
    quote:
      "I've been using DoorLoop for a few months now, and I've been very impressed with the software. It's very user-friendly and has a lot of features that I use daily.",
    title: 'Owner, Sivia Rentals',
    name: 'Todd Sivia',
    image: '/ToddSivia.jpeg',
  },
  {
    quote:
      'Since the transition from our previous software of 8 years, everything has been amazing. Their product is exactly what we needed and more. We were blown away by the attention we were given, excellent customer service, and a top notch product.',
    title: 'Chief Operating Officer',
    name: 'Andrew H',
    image: '/AndrewH.jpg',
  },
  {
    quote:
      'With DoorLoop, we can get answers through instant chats or zoom calls, and the support team is just superior to the competition. Our experience with DoorLoop over the past year has just been tremendous!',
    name: 'Kenneth Durst',
    title: 'Midwest Financial LLC',
    image: '/KennethDurst.png',
  },
];

const TestimonialsSection = memo(function TestimonialsSection() {
  return (
    <section
      className="flex flex-col items-center justify-center bg-white py-16 w-full"
      id="testimonials"
    >
      <MaxWidthContainer className="text-center">
        <span className="text-[#A8A8A8] text-sm uppercase font-bold">
          THE #1 HIGHEST RATED PROPERTY MANAGEMENT SOFTWARE ONLINE
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-16 mt-4">
          Trusted by hundreds of thousands worldwide
        </h2>
      </MaxWidthContainer>

      {/* Scrolling container for all screen sizes */}
      <div className="w-full overflow-hidden">
        <div className="flex animate-scroll gap-6 py-4">
          {[...Array(2)].map((_, repeatIndex) => (
            <div key={repeatIndex} className="flex gap-6 shrink-0 ">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col space-y-4 w-[300px] md:w-[400px] shrink-0 border-[1px] border-[#F2F2F2] rounded-lg p-8 justify-between"
                >
                  <p className="text-[#182C4C] text-lg leading-relaxed min-h-[120px]">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={getImagePath(testimonial.image)}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                      loading="lazy"
                      onError={(e) => {
                        console.log(`Failed to load image: ${testimonial.image}`);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div>
                      <p className="font-bold text-[#182C4C] text-sm">{testimonial.name}</p>
                      <p className="text-xs text-[#182C4C]">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default TestimonialsSection;
