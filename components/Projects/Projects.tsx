'use client';
import { useState, useEffect, useRef } from 'react';
import Project from './components/project/index';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import Rounded from '../common/RoundedButton';

interface ProjectData {
  title: string;
  src: string;
  color: string;
}

const projects: ProjectData[] = [
  {
    title: "crypko",
    src: "https://dribbble.com/shots/22875945-Podcasts-Platform-UI?utm_source=Clipboard_Shot&utm_campaign=awsmd&utm_content=Podcasts%20Platform%20UI&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=awsmd&utm_content=Podcasts%20Platform%20UI&utm_medium=Social_Share",
    color: "#000000",
  },
  {
    title: "Baghban Project",
    src: "Capture3.PNG",
    color: "#8C8C8C",
  },
  {
    title: "amaeya",
    src: "Capture2.PNG",
    color: "#EFE8D3",
  },
  {
    title: "Silencio",
    src: "Capture.PNG",
    color: "#706D63",
  },
];

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

interface ModalState {
  active: boolean;
  index: number;
}

export default function Home() {
  const [modal, setModal] = useState<ModalState>({ active: false, index: 0 });
  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  // Fixing the type of the quickSetter functions
  let xMoveContainer = useRef<((value: number) => void) | null>(null);
  let yMoveContainer = useRef<((value: number) => void) | null>(null);
  let xMoveCursor = useRef<((value: number) => void) | null>(null);
  let yMoveCursor = useRef<((value: number) => void) | null>(null);
  let xMoveCursorLabel = useRef<((value: number) => void) | null>(null);
  let yMoveCursorLabel = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    if (!modalContainer.current || !cursor.current || !cursorLabel.current) return;

    // Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });

    // Move Cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });

    // Move Cursor Label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });
  }, []);

  const moveItems = (x: number, y: number) => {
    xMoveContainer.current?.(x);
    yMoveContainer.current?.(y);
    xMoveCursor.current?.(x);
    yMoveCursor.current?.(y);
    xMoveCursorLabel.current?.(x);
    yMoveCursorLabel.current?.(y);
  };

  const manageModal = (active: boolean, index: number, x: number, y: number) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  return (
    <main onMouseMove={(e) => moveItems(e.clientX, e.clientY)} className="flex flex-col items-center pt-[300px] px-[200px]">
      <div className="max-w-[1400px] w-full flex flex-col items-center justify-center mb-[100px]">
        {projects.map((project, index) => (
          <Project index={index} title={project.title} manageModal={manageModal} key={index} />
        ))}
      </div>
      <Rounded>
        <p className="gradient-text">More work</p>
      </Rounded>

      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="fixed top-[50%] left-[50%] w-[400px] h-[350px] bg-white pointer-events-none overflow-hidden z-[3]"
      >
        <div style={{ top: `${index * -100}%` }} className="relative w-full h-full transition-all duration-[0.5s] cubic-bezier(0.76, 0, 0.24, 1)">
          {projects.map((project, index) => {
            const { src, color } = project;
            return (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: color }}
                key={`modal_${index}`}
              >
                <Image src={`/images/${src}`} width={300} height={0} alt="image" />
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        ref={cursor}
        className="w-[80px] h-[80px] rounded-full bg-[#455CE9] text-white fixed z-[3] flex items-center justify-center font-light text-[14px] pointer-events-none"
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      ></motion.div>

      <motion.div
        ref={cursorLabel}
        className="w-[80px] h-[80px] rounded-full bg-transparent text-white fixed z-[3] flex items-center justify-center font-light text-[14px] pointer-events-none"
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      >
        View
      </motion.div>
    </main>
  );
}
