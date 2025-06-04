import { INITIAL_BANNER_HEIGHT } from '../../../lib/data/consts';
import { useScrollPosition } from '../../../lib/hooks/useScrollPosition';
import { navigateToDemoForm } from '../../../lib/utils/navigation';
import { Button } from '../../ui/Button';

export const WelcomeOfferStickyBanner = () => {
  const scrollY = useScrollPosition();
  const showTopBanner = scrollY > INITIAL_BANNER_HEIGHT;

  return (
    <div
      className={`w-full gap-12 px-4 md:px-8 flex items-center justify-between md:justify-center bg-[#1665D8] text-white overflow-hidden transition-all duration-300 ease-out ${
        showTopBanner ? 'max-h-24 opacity-100 py-[22px]' : 'max-h-0 opacity-0'
      }`}
      style={{
        transform: showTopBanner ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      <div className="flex md:items-center flex-col md:flex-row">
        <div className="text-white text-[16px] md:text-[20px] font-bold">
          WELCOME OFFER: 30% off DoorLoop for 3 months
          <span className="hidden md:inline"> + ZERO onboarding fees</span>
          <span className="text-white text-[16px] md:text-[20px] font-[200] md:whitespace-nowrap ml-1">
            on annual plans.
          </span>
        </div>
      </div>
      <Button
        className="text-[14px] px-2 py-0 whitespace-nowrap md:text-[20px] font-semibold"
        onClick={() => navigateToDemoForm()}
      >
        Claim Offer
      </Button>
    </div>
  );
};
