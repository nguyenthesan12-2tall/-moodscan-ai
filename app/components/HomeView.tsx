'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScanHistory } from '../utils/sentiment';

interface HomeViewProps {
    onScan: (text: string) => void;
    history?: ScanHistory[];
}

export default function HomeView({ onScan, history = [] }: HomeViewProps) {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) onScan(input);
    };

    const getPixelStyle = (mood: string) => {
        switch (mood) {
            case 'happy': return { backgroundColor: '#FACC15', boxShadow: '0 0 15px #FACC15' };
            case 'sad': return { backgroundColor: '#3B82F6', boxShadow: '0 0 15px #3B82F6' };
            case 'angry': return { backgroundColor: '#EF4444', boxShadow: '0 0 15px #EF4444' };
            case 'chill': return { backgroundColor: '#34D399', boxShadow: '0 0 15px #34D399' };
            default: return { backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)' };
        }
    };

    return (
        // PRIORITY #1: LAYOUT & SPACING
        // Flex Container with large gap (gap-16) to naturally separate sections
        <div className="flex flex-col items-center justify-center w-full min-h-[70vh] gap-16 z-10 relative">

            {/* PRIORITY #2: UNIQUE TYPOGRAPHY */}
            <div className="text-center flex flex-col items-center gap-4">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 drop-shadow-[0_0_35px_rgba(255,255,255,0.5)] py-2"
                >
                    MoodScan
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm font-mono tracking-[0.8em] text-white uppercase"
                >
                    AI Soul Reader
                </motion.p>
            </div>

            {/* PRIORITY #3: ALIVE INPUT */}
            <form onSubmit={handleSubmit} className="w-full max-w-lg relative group z-20">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="How are you feeling?"
                    className="w-full h-20 rounded-full bg-black/30 backdrop-blur-2xl border border-white/10 text-center text-white text-2xl placeholder-white/20 outline-none transition-all duration-300 focus:scale-105 focus:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    autoFocus
                />
            </form>

            {/* PRIORITY #4: PIXEL TRAIL (Neon History) */}
            <div className="p-4 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md flex gap-3">
                {[...Array(5)].map((_, i) => {
                    // Logic to show latest history at the end, or invisible placeholders if empty
                    // Since the user wants 5 slots, we check existing history.
                    // Assuming we want the most recent ones. if history has 3 items: [0, 1, 2]
                    // We want to show 5 slots. The map index i goes 0..4.

                    // Let's grab the last 5 items if available, or pad with null/undefined.
                    // Actually, let's keep it simple: Map 5 slots.
                    // If we want the *latest* added to appear, we should probably take from the end.
                    // Implementation detail from previous code: history[history.length - 5 + i]

                    const historyIndex = history.length - 5 + i;
                    const item = historyIndex >= 0 ? history[historyIndex] : null;

                    return (
                        <div
                            key={i}
                            style={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '4px', // Squircles
                                transition: 'all 0.3s ease',
                                ...getPixelStyle(item ? item.mood : 'default')
                            }}
                        />
                    );
                })}
            </div>

        </div>
    );
}