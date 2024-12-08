import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';

const slider1 = [
    {
        color: "#e3e5e7",
        src: "c2.jpg"
    },
    {
        color: "#d6d7dc",
        src: "decimal.jpg"
    },
    {
        color: "#e3e3e3",
        src: "funny.jpg"
    },
    {
        color: "#21242b",
        src: "google.jpg"
    }
]

const slider2 = [
    {
        color: "#d4e3ec",
        src: "maven.jpg"
    },
    {
        color: "#e5e0e1",
        src: "panda.jpg"
    },
    {
        color: "#d7d4cf",
        src: "powell.jpg"
    },
    {
        color: "#e1dad6",
        src: "wix.jpg"
    }
]

export default function Index() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    })

    const x1 = useTransform(scrollYProgress, [0, 1], [0, 150])
    const x2 = useTransform(scrollYProgress, [0, 1], [0, -150])
    const height = useTransform(scrollYProgress, [0, 0.9], [50, 0])

    return (
        <div ref={container} className="flex flex-col gap-[2vw] relative mt-[200px] bg-white z-[1]">
            <motion.div style={{ x: x1 }} className="flex relative gap-[3vw] w-[120vw] left-[-10vw]">
                <div className="w-full flex justify-center">
                    <p className="text-[11vw] ml-14 gradient-text">Freelance Jazzy@ -</p>
                </div>
            </motion.div>
            <motion.div style={{ x: x2 }} className="flex relative gap-[3vw] w-[120vw] left-[-10vw]">
                <div className="w-full flex justify-center">
                    <p className="stroke-txt text-[11vw] gradient-text">Freelance Jazzy@ -</p>
                </div>
            </motion.div>
            <motion.div style={{ height }} className="relative mt-[100px]">
                <div className="h-[1550%] w-[120%] left-[-10%] rounded-[50%] bg-white z-[1] absolute shadow-[0px_60px_50px_rgba(0,0,0,0.214)]"></div>
            </motion.div>
        </div>
    )
}
