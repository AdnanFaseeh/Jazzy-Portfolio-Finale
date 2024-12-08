import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const TrailEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circles = Array(20).fill(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const circleElements = container.querySelectorAll('.trail-circle');
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const animate = () => {
      // Smooth follow effect
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;

      // Animate each circle with delay
      circleElements.forEach((circle, index) => {
        const delay = index * 0.05;
        gsap.set(circle, {
          x: currentX,
          y: currentY,
          scale: 1 - (index * 0.03),
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
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-transparent z-40  overflow-hidden cursor-none"
    >
      {circles.map((_, index) => (
        <div
          key={index}
          className="trail-circle absolute w-10 h-10  z-40 rounded-full gradient-bg opacity-20"
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        
      </div>
    </div>
  );
};