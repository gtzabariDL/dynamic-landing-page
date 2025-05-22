
interface DoorLoopLogoProps {
    width?: number;
    height?: number;
    color?: "white" | "blue"
}

export const DoorLoopLogo = ({ width = 120, height = 32, color = "blue" }: DoorLoopLogoProps) => {
    if (color === "white") {
        return (
            <img
                alt="DoorLoop Logo"
                width={width}
                height={height}
                src={`${process.env.NODE_ENV === 'production' ? '/dynamic-landing-page' : ''}/doorloopLogoWhite.svg`}
            />
        )
    }

    return (
        <img
            alt="DoorLoop Logo"
            width={width}
            height={height}
            src={`${process.env.NODE_ENV === 'production' ? '/dynamic-landing-page' : ''}/doorloopLogo.svg`}
        />
    );
};