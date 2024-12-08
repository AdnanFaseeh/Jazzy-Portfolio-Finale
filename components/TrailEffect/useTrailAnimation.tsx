import { RefObject, useEffect } from 'react';
import gsap from 'gsap';

interface Position {
  x: number;
  y: number;
}

export const useTrailAnimation = (containerRef: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const imageElements = container.querySelectorAll('.trail-image');
    const position: Position = { x: 0, y: 0 };
    const current: Position = { x: 0, y: 0 };
    
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      position.x = e.clientX - rect.left;
      position.y = e.clientY - rect.top;
    };

    const animate = () => {
      current.x += (position.x - current.x) * 0.15;
      current.y += (position.y - current.y) * 0.15;

      imageElements.forEach((image, index) => {
        const delay = index * 0.1;
        gsap.set(image, {
          x: current.x,
          y: current.y,
          rotation: Math.sin(current.x * 0.01 + index) * 10,
          scale: 1 - (index * 0.08),
          opacity: 1 - (index * 0.15),
          delay: delay,
        });
      });

      requestAnimationFrame(animate);
    };

    container.addEventListener('mousemove', onMouseMove);
    animate();

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
    };
  }, [containerRef]);
};