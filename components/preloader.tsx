"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { motion } from "framer-motion";

interface PreloaderProps {
  onEnter: () => void;
  colors?: string[];
  ballCount?: number;
  buttonText?: string;
}

export function Preloader({
  onEnter,
  colors = ["#9333ea","#b05ffa", "#3b82f6","#5c9aff"],
  ballCount = 80,
  buttonText = "Enter Portfolio",
}: PreloaderProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>();
  const mouseConstraintRef = useRef<Matter.MouseConstraint>();

  useEffect(() => {
    if (!sceneRef.current) return;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create();
    engineRef.current = engine;

    const section = sceneRef.current;

    const render = Render.create({
      element: section,
      engine: engine,
      options: {
        width: section.offsetWidth,
        height: section.offsetHeight,
        wireframes: false,
        background: "transparent",
      },
    });

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    mouseConstraintRef.current = mouseConstraint;
    World.add(engine.world, mouseConstraint);

    render.mouse = mouse;

    const balls = [];
    const minBallSize = 20; // Increased ball size
    const maxBallSize = 40;

    for (let i = 0; i < ballCount; i++) {
      const ball = Bodies.circle(
        Math.random() * section.offsetWidth,
        -50 - Math.random() * 300,
        Math.random() * (maxBallSize - minBallSize) + minBallSize,
        {
          restitution: 0.8,
          friction: 0.001,
          render: {
            fillStyle: colors[Math.floor(Math.random() * colors.length)],
          },
        }
      );
      balls.push(ball);
    }

    // Static walls to contain balls within the section
    const ground = Bodies.rectangle(
      section.offsetWidth / 2,
      section.offsetHeight + 50,
      section.offsetWidth,
      100,
      { isStatic: true, render: { visible: false } }
    );

    const leftWall = Bodies.rectangle(
      -50,
      section.offsetHeight / 2,
      100,
      section.offsetHeight,
      { isStatic: true, render: { visible: false } }
    );

    const rightWall = Bodies.rectangle(
      section.offsetWidth + 50,
      section.offsetHeight / 2,
      100,
      section.offsetHeight,
      { isStatic: true, render: { visible: false } }
    );

    World.add(engine.world, [...balls, ground, leftWall, rightWall]);
    Engine.run(engine);
    Render.run(render);

    const handleResize = () => {
      render.canvas.width = section.offsetWidth;
      render.canvas.height = section.offsetHeight;

      Matter.Body.setPosition(ground, {
        x: section.offsetWidth / 2,
        y: section.offsetHeight + 50,
      });

      Matter.Body.setPosition(leftWall, {
        x: -50,
        y: section.offsetHeight / 2,
      });

      Matter.Body.setPosition(rightWall, {
        x: section.offsetWidth + 50,
        y: section.offsetHeight / 2,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      Render.stop(render);
      World.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
      mouseConstraintRef.current = undefined;
    };
  }, [ballCount, colors]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div ref={sceneRef} className="w-full h-[100vh] relative overflow-hidden flex items-center justify-center" />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 2 }}
        className="gradient-text absolute text-black text-[6rem] top-[30%] left-[43%]"
      >
        D@ni
      </motion.h1>
      <motion.button
        aria-label={buttonText}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 2 }}
        onClick={onEnter}
        className="hover-btn gradient-bg absolute  h-16 w-[150px] left-[46%] top-[50%] flex items-center justify-center px-10 py-4 text-white  rounded-full shadow-lg  hover:shadow-xl hover:bg-white transition-all duration-300"
      >
        {buttonText}
      </motion.button>
    </motion.div>
  );
}
