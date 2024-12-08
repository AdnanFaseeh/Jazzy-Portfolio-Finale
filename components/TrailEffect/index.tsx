'use client';

import { useRef } from 'react';
import { ImageTrail } from './ImageTrail';
import { Title } from './Title';
import { Container } from './Container';
import { useTrailAnimation } from './useTrailAnimation';

export const TrailEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const images = Array(8).fill(null); // Reduced number of images for better performance
  
  useTrailAnimation(containerRef);

  return (
    <Container ref={containerRef}>
      {images.map((_, index) => (
        <ImageTrail key={index} index={index} />
      ))}
      <Title text="Move Your Mouse" />
    </Container>
  );
};