import React from 'react';
import { SentimentResult } from '../utils/sentiment';

interface ResultViewProps {
    result: SentimentResult;
    onReset: () => void;
}

export default function ResultView({ result, onReset }: ResultViewProps) {
    return (
        <div className="w-full max-w-2xl p-4 animate-in slide-in-from-bottom-10 duration-700">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">Your Aura</h2>
                <button
                    onClick={onReset}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm transition-colors"
                >
                    Scan Again
                </button>
            </div>

            <div className="bento-grid">
                {/* Main Mood Card */}
                <div className={`bento-card bento-large border-2 ${result.color.replace('text-', 'border-')}`}>
                    <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-2">Current Mood</h3>
                    <p className={`text-6xl font-black ${result.color} drop-shadow-lg`}>{result.mood}</p>
                </div>

                {/* Keywords Card */}
                <div className="bento-card items-start text-left">
                    <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-3">Detected Vibes</h3>
                    <div className="flex flex-wrap gap-2">
                        {result.keywords.length > 0 ? (
                            result.keywords.map((k, i) => (
                                <span key={i} className="px-2 py-1 rounded-md bg-white/10 text-xs">#{k}</span>
                            ))
                        ) : (
                            <span className="text-gray-500 text-sm italic">No specific keywords</span>
                        )}
                    </div>
                </div>

                {/* Vibe Check Score */}
                <div className="bento-card">
                    <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-1">Vibe Check</h3>
                    <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="absolute w-full h-full transform -rotate-90">
                            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                            <circle
                                cx="48" cy="48" r="40"
                                stroke="currentColor" strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={251.2}
                                strokeDashoffset={251.2 - (251.2 * result.score) / 100}
                                className={result.color}
                                strokeLinecap="round"
                            />
                        </svg>
                        <span className="text-2xl font-bold">{result.score}</span>
                    </div>
                </div>

                {/* Advice Card */}
                <div className="bento-card bento-large bg-gradient-to-br from-white/5 to-white/0">
                    <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-2">Universe Says</h3>
                    <p className="text-xl font-medium italic">"{result.advice}"</p>
                </div>
            </div>
        </div>
    );
}
