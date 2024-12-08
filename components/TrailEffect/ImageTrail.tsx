'use client';

import Image from 'next/image';
import { CSSProperties } from 'react';

interface ImageTrailProps {
  index: number;
  style?: CSSProperties;
}

const images = [
  '/trail1.png',
  '/trail2.jpg',
  '/trail3.jpg',
  '/trail4.jpg',
  '/trail5.jpg'
];

export const ImageTrail = ({ index, style }: ImageTrailProps) => {
  const imageIndex = index % images.length;
  
  return (
    <div
      className="trail-image absolute w-32 h-32 rounded-lg overflow-hidden"
      style={{
        transform: 'translate(-50%, -50%)',
        ...style
      }}
    >
      <Image
        src={images[imageIndex]}
        alt={`Jazzy@ ${index + 1}`}
        width={128}
        height={128}
        className="object-cover w-full h-full"
        priority={index < 5}
      />
    </div>
  );
};