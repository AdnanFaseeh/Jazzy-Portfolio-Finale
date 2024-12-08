'use client';

import { CSSProperties } from 'react';

interface CircleProps {
  index: number;
  style?: CSSProperties;
}

export const Circle = ({ index, style }: CircleProps) => {
  return (
    <div
      key={index}
      className="trail-circle absolute w-8 h-8 rounded-full bg-white opacity-20"
      style={{
        transform: 'translate(-50%, -50%)',
        ...style
      }}
    />
  );
};