'use client';

import Image from 'next/image';
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { slideUp } from './animation';
import { motion } from 'framer-motion';
import { TrailEffect } from '../TrailEffect';

export default function Home() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: e => direction = e.direction * -1
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    }
    else if (xPercent > 0) {
      xPercent = -100;
    }
    if (firstText.current && secondText.current) {
      gsap.set(firstText.current, { xPercent: xPercent });
      gsap.set(secondText.current, { xPercent: xPercent });
    }
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  };

  return (
    <motion.main variants={slideUp} initial="initial" animate="enter" className="relative flex h-screen overflow-hidden bg-white">
      <TrailEffect />
      <div className="absolute top-[30%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
        <h1 className="gradient-text">Welcome to D@ni Portfolio</h1>
      </div>
      <div className="absolute top-[calc(100vh-350px)]">
        <div ref={slider} className="relative whitespace-nowrap">
          <p ref={firstText} className="gradient-text text-[230px] font-semibold pr-12">Freelance D@ni -</p>
          <p ref={secondText} className="gradient-text text-[230px] font-semibold pr-12 absolute left-full top-0">Freelance D@ni -</p>
        </div>
      </div>
      <div data-scroll data-scroll-speed={0.1} className="absolute top-[48%] left-[70%] gradient-text text-2xl font-light">
        <p className="m-0">Freelance</p>
        <p className="m-0">Web development Expert</p>
      </div>
      <div className="flex flex-col gap-2 gradient-text absolute right-[70%] top-[48%]">
        <h5 className="text-[24px] font-light">Freelance</h5>
        <h5 className="text-[24px] font-light">Wordpress  Expert</h5>
      </div>
    </motion.main>
  );
}
