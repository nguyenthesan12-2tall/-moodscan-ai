import React from 'react';

interface MoodAvatarProps {
    mood: string;
    className?: string;
}

export default function MoodAvatar({ mood, className = '' }: MoodAvatarProps) {
    const getAvatar = () => {
        switch (mood) {
            case 'Happy':
                return (
                    <svg viewBox="0 0 100 100" className="w-full h-full animate-bounce-slow">
                        <circle cx="50" cy="50" r="45" fill="#FACC15" />
                        <circle cx="35" cy="40" r="5" fill="#333" />
                        <circle cx="65" cy="40" r="5" fill="#333" />
                        <path d="M 30 60 Q 50 80 70 60" stroke="#333" strokeWidth="5" fill="none" strokeLinecap="round" />
                        {/* Cheeks */}
                        <circle cx="25" cy="55" r="5" fill="#F87171" opacity="0.5" />
                        <circle cx="75" cy="55" r="5" fill="#F87171" opacity="0.5" />
                    </svg>
                );
            case 'Sad':
                return (
                    <svg viewBox="0 0 100 100" className="w-full h-full animate-float">
                        <circle cx="50" cy="50" r="45" fill="#60A5FA" />
                        <circle cx="35" cy="45" r="5" fill="#333" />
                        <circle cx="65" cy="45" r="5" fill="#333" />
                        <path d="M 35 70 Q 50 60 65 70" stroke="#333" strokeWidth="5" fill="none" strokeLinecap="round" />
                        {/* Tear */}
                        <path d="M 65 50 Q 65 60 60 55" stroke="#3B82F6" strokeWidth="3" fill="#93C5FD" className="animate-drop" />
                    </svg>
                );
            case 'Angry':
                return (
                    <svg viewBox="0 0 100 100" className="w-full h-full animate-shake">
                        <circle cx="50" cy="50" r="45" fill="#F87171" />
                        {/* Eyebrows */}
                        <path d="M 25 35 L 45 45" stroke="#333" strokeWidth="5" strokeLinecap="round" />
                        <path d="M 75 35 L 55 45" stroke="#333" strokeWidth="5" strokeLinecap="round" />
                        <circle cx="35" cy="50" r="4" fill="#333" />
                        <circle cx="65" cy="50" r="4" fill="#333" />
                        <path d="M 35 75 Q 50 65 65 75" stroke="#333" strokeWidth="5" fill="none" strokeLinecap="round" />
                        {/* Steam */}
                        <path d="M 20 20 L 25 10" stroke="#FFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
                        <path d="M 80 20 L 75 10" stroke="#FFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
                    </svg>
                );
            case 'Anxious':
                return (
                    <svg viewBox="0 0 100 100" className="w-full h-full animate-tremble">
                        <circle cx="50" cy="50" r="45" fill="#FB923C" />
                        {/* Wide Eyes */}
                        <circle cx="35" cy="45" r="10" fill="#FFF" />
                        <circle cx="35" cy="45" r="3" fill="#333" />
                        <circle cx="65" cy="45" r="10" fill="#FFF" />
                        <circle cx="65" cy="45" r="3" fill="#333" />
                        {/* Wavy Mouth */}
                        <path d="M 35 70 Q 42 65 50 70 T 65 70" stroke="#333" strokeWidth="4" fill="none" strokeLinecap="round" />
                        {/* Sweat Drop */}
                        <circle cx="80" cy="30" r="3" fill="#93C5FD" opacity="0.8" />
                    </svg>
                );
            case 'Chill':
                return (
                    <svg viewBox="0 0 100 100" className="w-full h-full animate-pulse-slow">
                        <circle cx="50" cy="50" r="45" fill="#4ADE80" />
                        {/* Sunglasses */}
                        <path d="M 20 45 L 80 45 L 75 60 L 25 60 Z" fill="#333" />
                        <line x1="50" y1="45" x2="50" y2="60" stroke="#4ADE80" strokeWidth="2" />
                        <path d="M 35 75 Q 50 80 65 75" stroke="#333" strokeWidth="4" fill="none" strokeLinecap="round" />
                        {/* Sparkle */}
                        <path d="M 80 25 L 82 30 L 87 32 L 82 34 L 80 39 L 78 34 L 73 32 L 78 30 Z" fill="#FFF" />
                    </svg>
                );
            case 'Energized':
                return (
                    <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
                        <circle cx="50" cy="50" r="45" fill="#C084FC" />
                        {/* Star Eyes */}
                        <path d="M 35 35 L 37 45 L 45 47 L 37 50 L 35 60 L 33 50 L 25 47 L 33 45 Z" fill="#FFF" />
                        <path d="M 65 35 L 67 45 L 75 47 L 67 50 L 65 60 L 63 50 L 55 47 L 63 45 Z" fill="#FFF" />
                        <path d="M 30 70 Q 50 90 70 70" stroke="#FFF" strokeWidth="5" fill="none" strokeLinecap="round" />
                        {/* Lightning Bolt */}
                        <path d="M 85 20 L 75 40 L 85 40 L 75 60" stroke="#FACC15" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );
            default: // Neutral/Default
                return (
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="45" fill="#9CA3AF" />
                        <circle cx="35" cy="45" r="5" fill="#333" />
                        <circle cx="65" cy="45" r="5" fill="#333" />
                        <line x1="35" y1="70" x2="65" y2="70" stroke="#333" strokeWidth="5" strokeLinecap="round" />
                    </svg>
                );
        }
    };

    return (
        <div className={`relative ${className}`}>
            {/* Glow Effect */}
            <div className="absolute inset-0 blur-xl opacity-50 rounded-full bg-current scale-110" />
            <div className="relative z-10 w-full h-full drop-shadow-2xl">
                {getAvatar()}
            </div>

            {/* Custom Animations Styles */}
            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                @keyframes shake {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-5deg); }
                    75% { transform: rotate(5deg); }
                }
                @keyframes tremble {
                    0% { transform: translate(0, 0); }
                    25% { transform: translate(1px, 1px); }
                    50% { transform: translate(-1px, -1px); }
                    75% { transform: translate(-1px, 1px); }
                    100% { transform: translate(1px, -1px); }
                }
                .animate-bounce-slow { animation: bounce 2s infinite; }
                .animate-float { animation: float 3s ease-in-out infinite; }
                .animate-shake { animation: shake 0.5s ease-in-out infinite; }
                .animate-tremble { animation: tremble 0.2s linear infinite; }
                .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                .animate-spin-slow { animation: spin 8s linear infinite; }
            `}</style>
        </div>
    );
}
