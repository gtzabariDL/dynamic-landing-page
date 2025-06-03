import { MaxWidthContainer } from '../../../components/layouts/MaxWidthContainer';

export default function FeaturesSection() {
  return (
    <section
      className="flex-grow flex-col flex items-center justify-center bg-[#ECEEF5] py-12 md:py-40 w-full"
      id="features"
    >
      <MaxWidthContainer className="text-center space-y-6">
        <div className="text-[#A8A8A8] uppercase text-xs font-bold tracking-wider mb-2">
          Spend less time managing, and more time growing
        </div>

        <div className="text-[#333333] text-4xl font-bold leading-snug mb-4">
          One property management software.
          <br />
          All the features.
        </div>

        <div className="text-[#333333] max-w-xl md:max-w-4xl text-base mx-auto">
          We believe property management software should make your life easier, not harder.
        </div>
      </MaxWidthContainer>
    </section>
  );
}
