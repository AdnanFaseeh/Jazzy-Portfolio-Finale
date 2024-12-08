'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: React.ReactElement;
}

const Magnetic: React.FC<MagneticProps> = ({ children }) => {
  const magnetic = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const magneticElement = magnetic.current;
    if (!magneticElement) return;

    // GSAP animations
    const xTo = gsap.quickTo(magneticElement, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(magneticElement, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    // Mousemove and mouseleave handlers
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = magneticElement.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    // Add event listeners
    magneticElement.addEventListener("mousemove", handleMouseMove);
    magneticElement.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      magneticElement.removeEventListener("mousemove", handleMouseMove);
      magneticElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return React.cloneElement(children, { ref: magnetic });
};

export default Magnetic;
