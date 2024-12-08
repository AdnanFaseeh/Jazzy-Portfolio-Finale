'use client';

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import Magnetic from '../Magnetic';

interface RoundedButtonProps {
  children: React.ReactNode;
  backgroundColor?: string;
  [key: string]: any;
}

export default function RoundedButton({
  children, 
  backgroundColor="linear-gradient(90deg, #9333ea, #3b82f6)", 
  ...attributes
}: RoundedButtonProps) {
  const circle = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  let timeoutId: NodeJS.Timeout | null = null;

  useEffect(() => {
    timeline.current = gsap.timeline({paused: true})
    timeline.current
      .to(circle.current, {top: "-25%", width: "150%", duration: 0.4, ease: "power3.in"}, "enter")
      .to(circle.current, {top: "-150%", width: "125%", duration: 0.25}, "exit")
  }, [])
  
  const manageMouseEnter = () => {
    if(timeoutId) clearTimeout(timeoutId)
    timeline.current?.tweenFromTo('enter', 'exit');
  }

  const manageMouseLeave = () => {
    timeoutId = setTimeout(() => {
      timeline.current?.play();
    }, 300)
  }

  return (
    <Magnetic>
      <div 
        className="rounded-full border border-blue-500 cursor-pointer relative flex items-center justify-center px-16 py-4" 
        style={{overflow: "hidden"}} 
        onMouseEnter={manageMouseEnter} 
        onMouseLeave={manageMouseLeave} 
        {...attributes}
      >
        {children}
        <div 
          ref={circle} 
          style={{background: backgroundColor}} 
          className="absolute w-full h-[150%] rounded-full top-full" 
          onMouseEnter={manageMouseEnter} 
          onMouseLeave={manageMouseLeave}
        />
      </div>
    </Magnetic>
  )
}
