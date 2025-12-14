'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SentimentResult, ScanHistory } from '../utils/sentiment';
import ProWaitlistModal from './ProWaitlistModal';

interface ResultViewProps {
    result: SentimentResult;
    history: ScanHistory[];
    onReset: () => void;
}

export default function ResultView({ result, onReset }: ResultViewProps) {
    const [isStoryMode, setIsStoryMode] = useState(false);
    const [showPremiumModal, setShowPremiumModal] = useState(false);

    return (
        <>
            <ProWaitlistModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />

            <AnimatePresence mode="wait">
                {!isStoryMode ? (
                    /* ================= STANDARD GRID VIEW ================= */
                    <motion.div
                        key="grid-view"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-5xl p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]"
                    >

                        {/* 1. Main Mood Card */}
                        <div className="col-span-1 md:col-span-2 row-span-2 relative overflow-hidden bg-white/5 backdrop-blur-2xl rounded-[2rem] p-10 flex flex-col items-center justify-center text-center shadow-2xl group transition-all duration-500 hover:bg-white/10">
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <span className="text-9xl mb-6 drop-shadow-[0_0_60px_rgba(255,255,255,0.4)] animate-float">
                                {result.emoji}
                            </span>
                            <h2 className="text-5xl font-black text-white tracking-tight mb-2 drop-shadow-md">
                                {result.label}
                            </h2>
                            <p className="mt-4 text-white/80 text-xl max-w-lg font-medium leading-relaxed italic">
                                "{result.advice}"
                            </p>
                        </div>

                        {/* 2. Energy Score Card */}
                        <div className="bg-white/5 backdrop-blur-2xl rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl hover:bg-white/10 transition-colors duration-300">
                            <div>
                                <h3 className="text-white/40 text-sm font-bold uppercase tracking-widest mb-2">
                                    Energy Level
                                </h3>
                                <span className="text-6xl font-mono font-bold text-white tracking-tighter">
                                    {result.score}%
                                </span>
                            </div>
                            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden mt-6">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${result.score}%` }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                    className="h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                                />
                            </div>
                        </div>

                        {/* 3. Action Buttons */}
                        <div className="bg-white/5 backdrop-blur-2xl rounded-[2rem] p-6 flex flex-col justify-center gap-4 shadow-2xl">
                            {/* Story Mode Toggle */}
                            <button
                                onClick={() => setIsStoryMode(true)}
                                className="w-full py-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 text-white rounded-xl font-bold transition-all border border-white/5 hover:border-white/20 active:scale-95 flex items-center justify-center gap-2 group"
                            >
                                <span>📸</span>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-200 to-purple-200 group-hover:text-white transition-colors">
                                    Story Mode
                                </span>
                            </button>

                            <button
                                onClick={onReset}
                                className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-all border border-white/5 hover:border-white/10 active:scale-95"
                            >
                                Scan Again
                            </button>

                            <button
                                onClick={() => setShowPremiumModal(true)}
                                className="w-full py-4 bg-white text-black hover:bg-white/90 text-center rounded-xl font-bold shadow-lg shadow-white/10 transition-all active:scale-95"
                            >
                                Unlock Pro ✨
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    /* ================= VIRAL STORY MODE ================= */
                    <motion.div
                        key="story-view"
                        initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="relative w-full h-screen flex flex-col items-center justify-between py-20 px-8"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsStoryMode(false)}
                            className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center bg-black/20 backdrop-blur-xl rounded-full text-white/50 hover:text-white hover:bg-black/40 transition-all z-50"
                        >
                            ✕
                        </button>

                        {/* Top Branding */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-center"
                        >
                            <h2 className="text-3xl font-black tracking-tighter text-white/90 drop-shadow-xl">
                                MOODSCAN AI
                            </h2>
                            <p className="text-white/50 text-xs tracking-widest uppercase mt-1">
                                Daily Vibes
                            </p>
                        </motion.div>

                        {/* Center Content */}
                        <div className="flex flex-col items-center text-center space-y-8">
                            <motion.div
                                initial={{ scale: 0.5, rotate: -10 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                                className="text-[12rem] drop-shadow-[0_0_100px_rgba(255,255,255,0.5)]"
                            >
                                {result.emoji}
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-8xl font-black text-white tracking-tighter drop-shadow-2xl"
                            >
                                {result.label}
                            </motion.h1>
                        </div>

                        {/* Bottom Advice */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="max-w-md text-center"
                        >
                            <div className="w-16 h-1 bg-white/30 rounded-full mx-auto mb-6" />
                            <p className="text-2xl text-white font-medium leading-relaxed drop-shadow-lg">
                                "{result.advice}"
                            </p>
                            <p className="mt-8 text-white/30 text-sm font-mono">
                                moodscan.ai • {new Date().toLocaleDateString()}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
