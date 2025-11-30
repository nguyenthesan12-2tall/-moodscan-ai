import React from 'react';
import { motion } from 'framer-motion';

export default function LiquidBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black">
            {/* Blob 1 - Pink/Purple */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40"
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -100, 50, 0],
                    scale: [1, 1.2, 0.9, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            />

            {/* Blob 2 - Blue/Cyan */}
            <motion.div
                className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40"
                animate={{
                    x: [0, -100, 50, 0],
                    y: [0, 100, -50, 0],
                    scale: [1, 1.1, 0.8, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            />

            {/* Blob 3 - Pink/Red */}
            <motion.div
                className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-pink-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30"
                animate={{
                    x: [0, 50, -100, 0],
                    y: [0, -50, 100, 0],
                    scale: [1, 1.3, 0.9, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            />

            {/* Blob 4 - Turquoise/Teal (New) */}
            <motion.div
                className="absolute bottom-[10%] right-[10%] w-[45vw] h-[45vw] bg-teal-400 rounded-full mix-blend-screen filter blur-[100px] opacity-30"
                animate={{
                    x: [0, -60, 30, 0],
                    y: [0, 80, -40, 0],
                    scale: [1, 1.2, 0.8, 1],
                }}
                transition={{
                    duration: 28,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            />

            {/* Noise Overlay for texture (optional) */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
    );
}
