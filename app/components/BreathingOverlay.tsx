import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BreathingOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BreathingOverlay({ isOpen, onClose }: BreathingOverlayProps) {
    const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
    const [seconds, setSeconds] = useState(4);

    useEffect(() => {
        if (!isOpen) return;

        const phaseDurations = {
            inhale: 4,
            hold: 7,
            exhale: 8
        };

        const interval = setInterval(() => {
            setSeconds((prev) => {
                if (prev > 1) return prev - 1;

                // Move to next phase
                if (phase === 'inhale') {
                    setPhase('hold');
                    return phaseDurations.hold;
                } else if (phase === 'hold') {
                    setPhase('exhale');
                    return phaseDurations.exhale;
                } else {
                    setPhase('inhale');
                    return phaseDurations.inhale;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isOpen, phase]);

    const getCircleScale = () => {
        if (phase === 'inhale') return 1.5;
        if (phase === 'hold') return 1.5;
        return 0.8;
    };

    const getPhaseText = () => {
        if (phase === 'inhale') return 'Breathe In';
        if (phase === 'hold') return 'Hold';
        return 'Breathe Out';
    };

    const getPhaseDuration = () => {
        if (phase === 'inhale') return 4;
        if (phase === 'hold') return 7;
        return 8;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    style={{
                        background: 'rgba(0, 0, 0, 0.92)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <div className="relative flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/60 hover:text-white text-4xl transition-colors"
                            style={{ zIndex: 60 }}
                        >
                            ×
                        </button>

                        {/* Breathing Circle */}
                        <motion.div
                            className="w-64 h-64 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6), rgba(147, 51, 234, 0.4))',
                                boxShadow: '0 0 80px rgba(59, 130, 246, 0.6), 0 0 150px rgba(147, 51, 234, 0.4)'
                            }}
                            animate={{ scale: getCircleScale() }}
                            transition={{ duration: getPhaseDuration(), ease: "easeInOut" }}
                        />

                        {/* Phase Text */}
                        <motion.div
                            className="mt-12 text-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={phase}
                        >
                            <h2 className="text-5xl font-bold text-white mb-4">
                                {getPhaseText()}
                            </h2>
                            <p className="text-6xl font-black text-blue-300" style={{
                                textShadow: '0 0 20px rgba(59, 130, 246, 0.8)'
                            }}>
                                {seconds}
                            </p>
                        </motion.div>

                        {/* Instructions */}
                        <p className="mt-8 text-gray-400 text-sm">
                            4-7-8 Breathing Exercise • Tap anywhere to close
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
