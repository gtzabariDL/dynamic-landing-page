export const DoorLoopLogo = () => {
    return (
        <img
            src={`${process.env.NODE_ENV === 'production' ? '/dynamic-landing-page' : ''}/doorloopLogo.svg`}
            alt="DoorLoop Logo"
            width={120}
            height={32}
        />
    );
};