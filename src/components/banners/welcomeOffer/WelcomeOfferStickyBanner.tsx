import { INITIAL_BANNER_HEIGHT } from '../../../lib/data/consts';
import { useScrollPosition } from '../../../lib/hooks/useScrollPosition';
import { trackLeadClickedBanner } from '../../../lib/utils/analytics';
import { Button } from '../../ui/Button';
// import { useVisitTracker } from '../../../lib/hooks/useVisitTracker';

export const WelcomeOfferStickyBanner = () => {
  // const { isFirstVisit } = useVisitTracker();
  const scrollY = useScrollPosition();
  const showTopBanner = scrollY > INITIAL_BANNER_HEIGHT;

  const handleClick = () => {
    trackLeadClickedBanner();
  };

  return (
    <div
      className={`w-full gap-12 px-4 md:px-8 flex items-center justify-between md:justify-center bg-[#1665D8] text-white overflow-hidden ${
        showTopBanner ? 'max-h-24 visible py-[22px]' : 'max-h-0 invisible py-0'
      }`}
      style={{
        transition: showTopBanner
          ? 'max-height 300ms ease-out, visibility 300ms ease-out, padding 300ms ease-out'
          : 'max-height 150ms ease-in, visibility 150ms ease-in, padding 150ms ease-in',
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
        dialogId="request-demo"
        onClick={handleClick}
      >
        Claim Offer
      </Button>
    </div>
  );
};
