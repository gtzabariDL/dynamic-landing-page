import Image from 'next/image';

const testimonials = [
  {
    quote: "We operate 120 units of affordable housing and we used to keep track of rent in a note section on Teams. We originally switched to DoorLoop to have a better rent ledger, but realized we can easily do every other property management tasks on the software too.",
    name: "Alan Owen",
    title: "Landlord, The Xandria Foundation",
    image: "comment.svg"
  },
  {
    quote: "My company specializes in helping tenants become homeowners. I switched to DoorLoop because it's a great all-in-one tool, and a lot more affordable than other programs.",
    name: "Walter Wolford",
    title: "Investors To Deal Maker",
    image: "comment.svg"
  },
  {
    quote: "DoorLoop has made my life very easy with automating everything from rent payments, recurring expenses, taxes, insurance and more. It saves me at least 3 hours a month just on these 2 items alone.",
    name: "Harrison Furman",
    title: "Owner, Green Wave Capital",
    image: "comment.svg"
  },
  {
    quote: "DoorLoop is unlike anything I've experienced before. I added my first property myself within minutes, not hours.",
    name: "David Burian",
    title: "Property Manager RE Equity LLC",
    image: "comment.svg"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="flex flex-col items-center justify-center bg-white px-4 md:px-16 py-16 w-full" id="testimonials">
      <div className="text-center max-w-4xl mx-auto">
        <span className="text-[#A8A8A8] text-sm uppercase mb-4 block">
          THE #1 HIGHEST RATED PROPERTY MANAGEMENT SOFTWARE ONLINE
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-16">
          Trusted by hundreds of thousands
          <br />
          worldwide
        </h2>
      </div>

      {/* Scrolling container for all screen sizes */}
      <div className="w-full overflow-hidden">
        <div className="flex animate-scroll gap-6 py-4">
          {[...Array(2)].map((_, repeatIndex) => (
            <div key={repeatIndex} className="flex gap-6 shrink-0">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex flex-col space-y-4 w-[300px] md:w-[400px] shrink-0">
                  <p className="text-gray-700 text-sm leading-relaxed min-h-[120px]">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium text-black">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.title}</p>
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
} 