import Image from 'next/image';
import { getImagePath } from '../../lib/utils/image';

interface DoorLoopLogoProps {
  width?: number;
  height?: number;
  color?: 'white' | 'blue';
}

export const DoorLoopLogo = ({ width = 120, height = 32, color = 'blue' }: DoorLoopLogoProps) => {
  if (color === 'white') {
    return (
      <Image
        alt="DoorLoop Logo"
        width={width}
        height={height}
        src={getImagePath('/doorloopLogoWhite.svg')}
      />
    );
  }
  return (
    <Image
      alt="DoorLoop Logo"
      width={width}
      height={height}
      src={getImagePath('/doorloopLogo.svg')}
    />
  );
};
