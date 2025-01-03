"use client";

import { motion } from "framer-motion";

export function AnimatedText({ text }: { text: string }) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap"
    >
      {words.map((word, idx) => (
        <motion.span
          variants={child}
          key={idx}
          className="mr-2 gradient-text"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}