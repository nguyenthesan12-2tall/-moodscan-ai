import React, { useState, useMemo } from 'react';
import { SentimentResult, ScanHistory } from '../utils/sentiment';
import ProWaitlistModal from './ProWaitlistModal';
import MoodAvatar from './MoodAvatar';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

interface ResultViewProps {
    result: SentimentResult;
    history: ScanHistory[];
    onReset: () => void;
}

export default function ResultView({ result, history, onReset }: ResultViewProps) {
    const [showModal, setShowModal] = useState(false);

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    // Mood color mappings with neon colors
    const MOOD_COLORS: Record<string, string> = {
        'Happy': '#FACC15',      // Yellow (neon)
        'Sad': '#60A5FA',        // Blue (neon)
        'Angry': '#F87171',      // Red (neon)
        'Anxious': '#FB923C',    // Orange (neon)
        'Chill': '#4ADE80',      // Green (neon)
        'Energized': '#C084FC',  // Purple (neon)
    };

    // Calculate mood distribution from history + current result
    const moodDistribution = useMemo(() => {
        // All 6 moods
        const allMoods = ['Happy', 'Sad', 'Angry', 'Anxious', 'Chill', 'Energized'];
        const moodCounts: Record<string, number> = {
            'Happy': 0,
            'Sad': 0,
            'Angry': 0,
            'Anxious': 0,
            'Chill': 0,
            'Energized': 0,
        };

        // Count from history
        history.forEach(scan => {
            const mood = scan.mood;
            if (moodCounts[mood] !== undefined) {
                moodCounts[mood]++;
            }
        });

        // Add current result
        if (moodCounts[result.mood] !== undefined) {
            moodCounts[result.mood]++;
        }

        const total = Object.values(moodCounts).reduce((sum, count) => sum + count, 0);

        // Convert to chart data with percentages
        return allMoods.map(mood => ({
            name: mood,
            value: moodCounts[mood],
            percentage: total > 0 ? ((moodCounts[mood] / total) * 100).toFixed(1) : '0.0',
            color: MOOD_COLORS[mood] || '#9CA3AF',
        }));
    }, [history, result.mood]);

    return (
        <div className="w-full max-w-4xl p-4 animate-in slide-in-from-bottom-10 duration-700">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">Your Aura</h2>
                <button
                    onClick={onReset}
                    className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm transition-colors font-medium"
                >
                    Scan Again
                </button>
            </div>

            {/* 4-Part Bento Grid */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {/* Top Left: Main Mood + Quote (Large - 2 columns) */}
                <motion.div
                    className="col-span-2 p-8 rounded-[1.5rem] min-h-[280px] flex flex-col items-center justify-center relative overflow-hidden group"
                    animate={{ scale: [1, 1.005, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: `1px solid ${result.borderColor}`,
                        boxShadow: `
              0 8px 32px 0 rgba(0, 0, 0, 0.37),
              0 0 80px -20px ${result.borderColor},
              inset 0 0 40px rgba(255, 255, 255, 0.02)
            `
                    }}
                >
                    {/* Animated Background Gradient */}
                    <div
                        className="absolute inset-0 opacity-20 transition-opacity duration-700 group-hover:opacity-30"
                        style={{
                            background: `radial-gradient(circle at center, ${result.borderColor}, transparent 70%)`
                        }}
                    />

                    <div className="text-center relative z-10 flex flex-col items-center">
                        <p className="text-sm uppercase tracking-[0.3em] text-white/60 mb-6 font-medium">Current Mood</p>

                        <div className="w-40 h-40 mb-6 transform transition-transform duration-500 hover:scale-110">
                            <MoodAvatar mood={result.mood} className={result.color} />
                        </div>

                        <h1
                            className={`text-5xl font-black mb-4 ${result.color} tracking-tight`}
                            style={{
                                textShadow: `0 0 30px ${result.borderColor}`
                            }}
                        >
                            {result.mood}
                        </h1>
                        <p className="text-lg text-gray-300 italic leading-relaxed max-w-md font-light">
                            "{result.quote}"
                        </p>
                    </div>
                </motion.div>

                {/* Top Right: Mood Distribution Chart (Medium - 2 columns) */}
                <div
                    className="col-span-2 p-6 rounded-[1.5rem] min-h-[280px] flex flex-col"
                    style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                    }}
                >
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <span>📊</span> Mood Distribution
                    </h3>
                    <p className="text-xs text-gray-400 mb-4">Based on all scans</p>

                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={moodDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={(entry: any) => `${entry.name}: ${entry.percentage}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                animationBegin={0}
                                animationDuration={800}
                            >
                                {moodDistribution.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        style={{
                                            filter: `drop-shadow(0 0 8px ${entry.color})`,
                                        }}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: '8px',
                                    color: 'white',
                                }}
                                formatter={(value: number, name: string) => [`${value} scans`, name]}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Bottom: AI Coach CTA (Small - Full width below) */}
                <div
                    className="col-span-4 p-6 rounded-[1.5rem] flex items-center justify-between"
                    style={{
                        background: 'rgba(168, 85, 247, 0.1)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '2px solid rgba(168, 85, 247, 0.3)',
                        boxShadow: `
              0 8px 32px 0 rgba(0, 0, 0, 0.37),
              0 0 30px rgba(168, 85, 247, 0.4)
            `
                    }}
                >
                    <div className="flex items-center gap-4">
                        <div className="text-5xl">🤖</div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">AI Coach</h3>
                            <p className="text-sm text-gray-300">Get personalized insights & emotional guidance based on your mood patterns</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-base hover:opacity-90 transition-all whitespace-nowrap"
                        style={{
                            boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)'
                        }}
                    >
                        Unlock Pro
                    </button>
                </div>
            </div >

            {/* Bottom: Recent History (Wide - Full width) */}
            < div
                className="p-6 rounded-[1.5rem]"
                style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                }
                }
            >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span>📊</span> Recent Scans
                </h3>

                {
                    history.length === 0 ? (
                        <p className="text-gray-400 text-sm italic text-center py-4">
                            No previous scans yet. This will be your first!
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {history.slice(0, 5).map((scan) => (
                                <div
                                    key={scan.id}
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all"
                                    style={{
                                        borderLeft: `3px solid ${scan.borderColor}`
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`font-bold ${scan.color}`}>{scan.mood}</span>
                                        <span className="text-gray-400 text-sm">•</span>
                                        <span className="text-gray-400 text-sm italic truncate max-w-md">
                                            "{scan.quote.length > 50 ? scan.quote.substring(0, 50) + '...' : scan.quote}"
                                        </span>
                                    </div>
                                    <span className="text-gray-500 text-xs">
                                        {formatTimestamp(scan.timestamp)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )
                }
            </div >

            {/* Pro Waitlist Modal */}
            < ProWaitlistModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </div >
    );
}
