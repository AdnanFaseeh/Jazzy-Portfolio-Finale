"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "@/components/preloader";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

import { LiquidCursor } from "@/components/cursor/liquid-cursor";
import Landing from "@/components/Landing/Landing";
import Description from '@/components/Description/Description';
import Projects from '@/components/Projects/Projects';
import SlidingImages from '@/components/SlidingImages/SlidingImages';

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      <LiquidCursor />
      <AnimatePresence>
        {showPreloader && (
          <Preloader onEnter={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>

      <Navigation />
      <main className="pt-20">
        <Landing />
        <Description />
        <Projects />
        <SlidingImages />
        <Footer />
      </main>
    </>
  );
}