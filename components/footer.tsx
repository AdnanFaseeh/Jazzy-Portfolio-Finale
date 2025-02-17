"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { useInView } from "react-intersection-observer";
import { useScroll, motion, useTransform } from "framer-motion";
import { useForm } from "@formspree/react";
import Rounded from "./common/RoundedButton";
import Magnetic from "./common/Magnetic";

export function Footer() {
    function ContactForm() {
        const [state, handleSubmit] = useForm("xvgolwyk");
        const [tooltip, setTooltip] = useState<string | null>(null);
        const [formData, setFormData] = useState({
            name: "",
            Service: "",
            email: "",
            message: "",
        });

        const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        };

        const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                const result = await handleSubmit(e); // Pass the event directly
                if (state && state.succeeded) {
                    setTooltip("Thank you for your attention!");
                    setFormData({ name: "", Service: "", email: "", message: "" });
                } else {
                    setTooltip("Submission failed. Please try again.");
                }
            } catch (error) {
                console.error("Submission Error:", error);
                setTooltip("An error occurred. Please try again.");
            } finally {
                setTimeout(() => setTooltip(null), 3000);
            }
        };

        return (
            <form method="post" onSubmit={onSubmit} aria-live="polite">
                <div className="flex flex-col gap-6 mt-10">
                    <div className="flex gap-5">
                        <label htmlFor="name" className="text-3xl gradient-text">
                            My name is
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={onInputChange}
                            className="gradient-text w-[250px] border-b-2 border-gradient bg-transparent"
                            required
                        />
                    </div>
                    <div className="flex gap-5">
                        <label htmlFor="Service" className="text-3xl gradient-text">
                            Type Your Interest
                        </label>
                        <input
                            id="Service"
                            name="Service"
                            type="text"
                            placeholder="Service Name"
                            value={formData.Service}
                            onChange={onInputChange}
                            className="gradient-text w-[250px] border-b-2 border-gradient bg-transparent"
                            required
                        />
                    </div>
                    <div className="flex gap-5">
                        <label htmlFor="email" className="text-3xl gradient-text">
                            Please contact me with
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="example@gmail.com"
                            value={formData.email}
                            onChange={onInputChange}
                            className="gradient-text w-[250px] border-b-2 border-gradient bg-transparent"
                            required
                        />
                    </div>
                    <div className="flex gap-5">
                        <label htmlFor="message" className="text-3xl gradient-text">
                            Let me explain:
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Type your message"
                            value={formData.message}
                            onChange={onInputChange}
                            className="gradient-text w-[250px] border-b-2 border-gradient bg-transparent"
                            required
                        />
                    </div>
                    <button type="submit" className="text-2xl gradient-text w-24 h-24 rounded-full">
                        Submit
                    </button>
                </div>
                {tooltip && <div className="tooltip">{tooltip}</div>}
            </form>
        );
    }

    const { ref: inViewRef, inView } = useInView({ threshold: 0.25, triggerOnce: true });
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sceneRef.current || !inView) return;

        const Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies;

        const engine = Engine.create();
        const render = Render.create({
            element: sceneRef.current,
            engine,
            options: {
                width: sceneRef.current.clientWidth,
                height: 700,
                wireframes: false,
                background: "transparent",
            },
        });

        const colors = ["#9333ea", "#b05ffa", "#3b82f6", "#5c9aff"];
        const balls = Array.from({ length: 50 }).map(() =>
            Bodies.circle(Math.random() * render.options.width!, -50, Math.random() * 20 + 10, {
                restitution: 0.8,
                render: { fillStyle: colors[Math.floor(Math.random() * colors.length)] },
            })
        );

        const ground = Bodies.rectangle(render.options.width! / 2, render.options.height! + 50, render.options.width!, 100, { isStatic: true });

        World.add(engine.world, [...balls, ground]);
        Engine.run(engine);
        Render.run(render);

        return () => {
            Render.stop(render);
            World.clear(engine.world, false);
            Engine.clear(engine);
            render.canvas.remove();
        };
    }, [inView]);

    return (
        <footer ref={inViewRef} className="relative ">
            <div ref={sceneRef} className="absolute inset-0 pointer-events-none" />
            <div className="container px-6 relative z-10">
                <motion.div className="contact">
                    <div className="body">
                        <div className="title ">
                            <h2 className="gradient-text mr-[70%] ">Hey! I'm ready </h2>
                            <h2 className="gradient-text mb-10 mr-[700%] ">to consult you </h2>
                            <ContactForm />
                        </div>
                        <div className="nav flex gap-5 mb-24 ml-48 mr-48">
                            <Rounded>
                                <p className="gradient-text">danie274@gmail.com</p>
                            </Rounded>
                            <Rounded>
                                <p className="gradient-text">+92 03176827836</p>
                            </Rounded>
                            
                        </div>
                        <div className="social absolute bottom-[55%] rotate-90  right-[5%] flex gap-10 ml-5 mt-5 ">  
                               <a href="http://www.linkedin.com/in/jas-mine-272a58272/" target="_blank" rel="noreferrer"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6 " stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-linkedin  ">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path> 
                                             <rect x="2" y="9" width="4" height="12"></rect>
                                                 <circle cx="4" cy="4" r="2"></circle>  
                                 </svg>   
                                 </a>     
                                 
                                 <a href="https://www.fiverr.com/s/BRXQRZl" target="_blank" rel="noreferrer"> 
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-fiverr">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9 12h6m-6 3h6m-3-6v6" stroke-linecap="round"></path>
</svg>


                                </a>  
                                <a href="https://www.instagram.com/adnan_dani/" target="_blank" rel="noreferrer">     
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6 " stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-instagram">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect> 
                                     <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>  
                                         <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>  
                                          </svg>   
                                  </a>         
                                <a href="https://www.youtube.com/channel/UC3-9y0z9u4-w0u-6-8-0-2-4" target="_blank" rel="noreferrer"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6 " stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-youtube">  
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>  
                                     <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>   
                                        </svg>    
                                </a>    
                             </div>
                        <div className="info flex justify-between mt-15 p-5">
                            <div className="flex gap-2 items-end">
                                <h3 className="font-light text-xl gradient-text">Powered By Adnan Dani</h3>
                                <p className="font-light text-xl gradient-text">2024 © Edition</p>
                            </div>
                        </div>
                       
                           
                        
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
