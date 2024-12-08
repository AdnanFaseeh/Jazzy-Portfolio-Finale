"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const menuItems: { path: string; label: string }[] = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/work", label: "Work" },
  { path: "/contact", label: "Contact" },
];

import "./menu.css";


const Menu: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useGSAP(() => {
    if (!container.current) return;
    gsap.set(".menu-link-item-holder", { y: 75 });
    tl.current = gsap
      .timeline({ paused: true })
      .to(".menu-overlay", {
        duration: 1.25,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4.inOut",
      })
      .to(".menu-link-item-holder", {
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.inOut",
        delay: -0.75,
      });
  }, { scope: container });

  useEffect(() => {
    if (tl.current) {
      isMenuOpen ? tl.current.play() : tl.current.reverse();
    }
  }, [isMenuOpen]);

  return (
    <div className="menu-container" ref={container}>
      <div className="menu-bar text-[#9035EA] h-20 flex items-center z-50 justify-between px-10">
        
        <div className="ml-[85%]">
         
        </div>
        <div className="menu-open" onClick={toggleMenu}>
          <p className="text-3xl cursor-pointer">&#x2630;</p>
        </div>
      </div>
      <div className="menu-overlay">
        <div className="menu-overlay-bar">
          <div className="menu-logo">
            <Link className="absolute top-5 text-3xl gradient-text" href="/">
              Jazzy@
            </Link>
          </div>
          <div className="menu-close gradient-text" onClick={toggleMenu}>
            <p className="absolute top-5 gradient-text font-extrabold text-3xl right-10 cursor-pointer">
              &#x2715;
            </p>
          </div>
        </div>
        <div className="menu-close-btn" onClick={toggleMenu}>
          <p className="absolute bottom-5 gradient-text cursor-pointer">&#x2715;</p>
        </div>
        <div className="menu-copy">
          <div className="menu-links">
            {menuItems.map((link, index) => (
              <div className="menu-link-item" key={index}>
                <div className="menu-link-item-holder" onClick={toggleMenu}>
                  <Link href={link.path} className="menu-link gradient-text">
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="menu-info">
            <div className="menu-info-co absolute bottom-5 flex flex-col gap-y-2">
              <a href="#" className="gradient-text">X &#8599;</a>
              <a href="#" className="gradient-text">Instagram &#8599;</a>
              <a href="#" className="gradient-text">LinkedIn &#8599;</a>
              <a href="#" className="gradient-text">Github &#8599;</a>
            </div>
          </div>
          <div className="menu-info-col  absolute bottom-5 right-60 flex flex-col gap-y-2">
            <p className="gradient-text">AdnanDani@gmail.com</p>
            <p className="gradient-text">+1 (123) 456 7890</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Menu;
