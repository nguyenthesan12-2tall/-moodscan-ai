import React, { useState } from 'react';

interface HomeViewProps {
    onScan: (text: string) => void;
}

export default function HomeView({ onScan }: HomeViewProps) {
    const [text, setText] = useState('');

    const handleScan = () => {
        if (text.trim()) {
            onScan(text);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-md p-8 animate-in fade-in zoom-in duration-500">
            {/* Neon Pink Title with Glow */}
            <h1
                className="text-6xl font-black mb-2 text-pink-500"
                style={{
                    textShadow: `
            0 0 10px rgba(236, 72, 153, 0.8),
            0 0 20px rgba(236, 72, 153, 0.6),
            0 0 30px rgba(236, 72, 153, 0.4),
            0 0 40px rgba(59, 130, 246, 0.3)
          `
                }}
            >
                MoodScan AI
            </h1>
            <p className="text-gray-300 mb-10 tracking-[0.3em] text-sm uppercase font-light">Aura Edition</p>

            {/* Super Glassmorphic Card with Deep Rounding */}
            <div
                className="w-full p-8 rounded-[2rem]"
                style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                }}
            >
                {/* Enhanced Glass Input */}
                <textarea
                    className="w-full h-36 p-5 mb-6 resize-none text-lg placeholder-gray-400 rounded-[1.5rem]"
                    style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        outline: 'none'
                    }}
                    placeholder="How are you feeling right now? (English or Vietnamese)"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(0, 212, 255, 0.5)';
                        e.target.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.boxShadow = 'none';
                    }}
                />

                {/* Glowing Neon Button */}
                <button
                    onClick={handleScan}
                    disabled={!text.trim()}
                    className="w-full py-5 rounded-[1.5rem] bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 font-black text-2xl tracking-[0.2em] hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                        color: 'white',
                        textShadow: `
              0 0 10px rgba(255, 255, 255, 0.8),
              0 0 20px rgba(236, 72, 153, 0.6),
              0 0 30px rgba(236, 72, 153, 0.4)
            `,
                        boxShadow: `
              0 0 25px rgba(236, 72, 153, 0.6),
              0 0 50px rgba(168, 85, 247, 0.4),
              0 4px 15px rgba(0, 0, 0, 0.3)
            `
                    }}
                    onMouseEnter={(e) => {
                        if (!e.currentTarget.disabled) {
                            e.currentTarget.style.boxShadow = `
                0 0 35px rgba(236, 72, 153, 0.9),
                0 0 70px rgba(168, 85, 247, 0.6),
                0 4px 20px rgba(0, 0, 0, 0.4)
              `;
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!e.currentTarget.disabled) {
                            e.currentTarget.style.boxShadow = `
                0 0 25px rgba(236, 72, 153, 0.6),
                0 0 50px rgba(168, 85, 247, 0.4),
                0 4px 15px rgba(0, 0, 0, 0.3)
              `;
                        }
                    }}
                >
                    SCAN MOOD
                </button>
            </div>
        </div>
    );
}
