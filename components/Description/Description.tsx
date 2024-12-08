'use client';

import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, opacity } from './animation';
import Rounded from '../common/RoundedButton';

export default function Description() {
  const phrase = 
    "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.";
    
  const description = useRef<HTMLDivElement>(null);
  const isInView = useInView(description);

  return (
    <div ref={description} className="px-52 mt-52 flex justify-center bg-white">
      <div className="max-w-7xl flex gap-12 relative">
        <p className="text-4xl gradient-text gap-2 leading-10">
          {phrase.split(' ').map((word, index) => (
            <span key={index} className="relative overflow-hidden inline-flex text-blue-500">
              <motion.span
                variants={slideUp}
                custom={index}
                animate={isInView ? 'open' : 'closed'}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>
        <motion.p
          className="text-2xl font-light w-4/5 gradient-text"
          variants={opacity}
          animate={isInView ? 'open' : 'closed'}
        >
          The combination of my passion for animation, design & interaction
          positions me in a unique place in the Animation world.
        </motion.p>
        <div data-scroll data-scroll-speed={0.1}>
          <Rounded className="absolute top-[80%] left-[calc(100%-200px)] w-44 h-44 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer">
            <p className="m-0 text-lg font-light text-white">About me</p>
          </Rounded>
        </div>
      </div>
    </div>
  );
}
