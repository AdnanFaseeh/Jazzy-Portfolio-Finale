'use client';

import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function LiquidCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <svg width="40" height="40" viewBox="0 0 50 50">
        <defs>
          <linearGradient id="cursorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
        </defs>
        <motion.circle
          cx="25"
          cy="25"
          r="12"
          fill="#94BA28"
          opacity="0.9"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>
    </motion.div>
  );
}
