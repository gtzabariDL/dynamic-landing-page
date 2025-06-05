import Image from 'next/image';

interface DoorLoopLogoProps {
  width?: number;
  height?: number;
  color?: 'white' | 'blue';
}

export const DoorLoopLogo = ({ width = 120, height = 32, color = 'blue' }: DoorLoopLogoProps) => {
  if (color === 'white') {
    return <Image alt="DoorLoop Logo" width={width} height={height} src="/doorloopLogoWhite.svg" />;
  }
  return <Image alt="DoorLoop Logo" width={width} height={height} src="/doorloopLogo.svg" />;
};
