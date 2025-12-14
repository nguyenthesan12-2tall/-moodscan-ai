'use client';

import { useState, useEffect } from 'react';
import HomeView from './components/HomeView';
import ResultView from './components/ResultView';
import { analyzeSentiment, SentimentResult, ScanHistory, saveScanToHistory, getScanHistory } from './utils/sentiment';
import LiquidBackground from './components/LiquidBackground';

export default function Page() {
    const [view, setView] = useState<'home' | 'result'>('home');
    const [result, setResult] = useState<SentimentResult | null>(null);
    const [history, setHistory] = useState<ScanHistory[]>([]);

    // Default mood color state
    const [currentMoodColor, setCurrentMoodColor] = useState('default');

    useEffect(() => {
        setHistory(getScanHistory());
        // Load last mood color from local storage if available
        const savedMood = localStorage.getItem('lastMoodColor');
        if (savedMood) setCurrentMoodColor(savedMood);

        // FORCE DEBUG: happy background
        setTimeout(() => setCurrentMoodColor('happy'), 1000);
    }, []);

    const handleScan = (text: string) => {
        const analysis = analyzeSentiment(text);

        // 1. STRICTLY UPDATE COLOR FIRST
        // This ensures the background changes BEFORE the view transition starts
        if (analysis.color) {
            console.log('Immediate Color Update:', analysis.color);
            setCurrentMoodColor(analysis.color);
            localStorage.setItem('lastMoodColor', analysis.color);
        }

        // 2. THEN update result and history
        setResult(analysis);
        saveScanToHistory(analysis);
        setHistory(getScanHistory()); // Refresh history for the trail

        // 3. FINALLY change view
        setView('result');
    };

    const handleReset = () => {
        setView('home');
        setResult(null);
        // We keep the current mood color active even when going back home
        // until a new scan changes it.
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-white font-sans selection:bg-white/30 selection:text-white pb-24">
            {/* Dynamic Background receiving the mood prop */}
            <LiquidBackground mood={currentMoodColor} />

            <div className="relative z-10 w-full flex flex-col items-center justify-center p-4">
                {view === 'home' ? (
                    <HomeView onScan={handleScan} history={history} />
                ) : (
                    result && <ResultView result={result} history={history} onReset={handleReset} />
                )}
            </div>

            <footer className="absolute bottom-4 text-white/20 text-xs z-10 text-center w-full pointer-events-none">
                <p>MoodScan AI • Project by Founder San</p>
            </footer>
        </main>
    );
}
