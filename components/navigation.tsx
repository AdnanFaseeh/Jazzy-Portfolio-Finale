"use client";


import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import Menu from "./menu";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0 }
  };

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };

  const menuItems = [
    { title: "Home", href: "#home" },
    { title: "About", href: "#about" },
    { title: "Projects", href: "#projects" },
    { title: "Contact", href: "#contact" }
  ];

  return (
    <>
      <nav className=" fixed top-0 left-0 w-full z-40 flex justify-between items-center p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold gradient-text"
        >
          Jazzy@
        </motion.div>
        <motion.button
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={iconVariants}
          onClick={() => setIsOpen(!isOpen)}
          className="z-50 p-2 hover:bg-primary/10 rounded-full transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          
        </motion.button>
        <Menu />
      </nav>

      
    </>
  );
}