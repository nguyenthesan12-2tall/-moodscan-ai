export interface SentimentResult {
    mood: 'happy' | 'sad' | 'angry' | 'chill';
    emoji: string;
    score: number;
    label: string;
    color: string;
    advice: string;
}

export type ScanHistory = SentimentResult & {
    timestamp: number;
};

// Hybrid Logic: Keyword matching first, then fallback to random simulation for demo purposes
export const analyzeSentiment = (text: string): SentimentResult => {
    const lowerText = text.toLowerCase();

    // Tech-Witty Quotes Database
    const quotes = {
        happy: [
            "Vibe check: Passed! ⚡️",
            "Running on 100% Battery 🔋",
            "No bugs detected in your day ✨",
            "Vibe này nét căng 4K! 📸"
        ],
        sad: [
            "Error 404: Mood not found 🌧️",
            "System needs a reboot 🔄",
            "Low power mode activated 🪫",
            "Laggy connection to happiness..."
        ],
        angry: [
            "Warning: CPU Overheated 🔥",
            "Firewall breached! 🛡️",
            "Ping 999ms (Laggy) 💢",
            "Who broke your production build?"
        ],
        chill: [
            "System Idle 🍃",
            "Incognito Mode: ON 🕶️",
            "Smooth sailing 60FPS 🌊",
            "Zen Mode Activated 🧘"
        ],
        default: [
            "A blank canvas. What emotion do you want to paint today?",
            "System standing by... 🤖",
            "Awaiting user input ⌨️"
        ]
    };

    const getRandomQuote = (mood: keyof typeof quotes) => {
        const list = quotes[mood];
        return list[Math.floor(Math.random() * list.length)];
    };

    if (lowerText.match(/(happy|vui|joy|excited|tuyệt)/)) {
        return {
            mood: 'happy',
            emoji: '🤩',
            score: Math.floor(Math.random() * (100 - 80) + 80), // 80-100
            label: 'Radiant Joy',
            color: 'happy',
            advice: getRandomQuote('happy'),
        };
    }

    if (lowerText.match(/(sad|buồn|cry|depressed|khóc)/)) {
        return {
            mood: 'sad',
            emoji: '🌧️',
            score: Math.floor(Math.random() * (40 - 10) + 10), // 10-40
            label: 'Melancholy Blue',
            color: 'sad',
            advice: getRandomQuote('sad'),
        };
    }

    if (lowerText.match(/(angry|tức|mad|furious|ghét)/)) {
        return {
            mood: 'angry',
            emoji: '😡',
            score: Math.floor(Math.random() * (100 - 90) + 90), // High energy negative
            label: 'Fiery Rage',
            color: 'angry',
            advice: getRandomQuote('angry'),
        };
    }

    if (lowerText.match(/(chill|relax|calm|ổn|fine)/)) {
        return {
            mood: 'chill',
            emoji: '🍃',
            score: Math.floor(Math.random() * (70 - 40) + 40), // 40-70
            label: 'Zen Balance',
            color: 'chill',
            advice: getRandomQuote('chill'),
        };
    }

    // Default fallback (Neutral/Chill)
    return {
        mood: 'chill',
        emoji: '😶‍🌫️',
        score: 50,
        label: 'Neutral Fog',
        color: 'default',
        advice: getRandomQuote('default'),
    };
};

export const saveScanToHistory = (result: SentimentResult) => {
    if (typeof window === 'undefined') return;
    const history = getScanHistory();
    const newScan = { ...result, timestamp: Date.now() };
    const updatedHistory = [newScan, ...history].slice(0, 10); // Keep last 10
    localStorage.setItem('scanHistory', JSON.stringify(updatedHistory));
};

export const getScanHistory = (): ScanHistory[] => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('scanHistory');
    return saved ? JSON.parse(saved) : [];
};