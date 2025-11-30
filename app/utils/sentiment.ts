export interface SentimentResult {
    mood: string;
    color: string;
    advice: string;
    keywords: string[];
    score: number; // 0-100 "Vibe Check"
}

const KEYWORDS = {
    positive: ['happy', 'joy', 'excited', 'love', 'great', 'awesome', 'vui', 'hạnh phúc', 'tuyệt', 'thích', 'yêu', 'good'],
    negative: ['sad', 'depressed', 'angry', 'hate', 'bad', 'terrible', 'buồn', 'chán', 'ghét', 'tệ', 'khóc', 'mệt', 'stress'],
    neutral: ['okay', 'fine', 'normal', 'bình thường', 'ổn', 'nothing', 'không có gì'],
};

export function analyzeSentiment(text: string): SentimentResult {
    const lowerText = text.toLowerCase();
    const foundKeywords: string[] = [];
    let score = 50; // Default neutral score

    let positiveCount = 0;
    let negativeCount = 0;

    // Check Positive
    KEYWORDS.positive.forEach((word) => {
        if (lowerText.includes(word)) {
            foundKeywords.push(word);
            positiveCount++;
        }
    });

    // Check Negative
    KEYWORDS.negative.forEach((word) => {
        if (lowerText.includes(word)) {
            foundKeywords.push(word);
            negativeCount++;
        }
    });

    // Calculate Score
    if (positiveCount > negativeCount) {
        score = Math.min(100, 50 + (positiveCount * 10));
    } else if (negativeCount > positiveCount) {
        score = Math.max(0, 50 - (negativeCount * 10));
    }

    // Determine Mood & Advice
    let mood = 'Neutral';
    let color = 'text-gray-200';
    let advice = 'Just vibing? That’s cool. Stay hydrated!';

    if (score >= 70) {
        mood = 'Radiant';
        color = 'text-yellow-400';
        advice = 'You are glowing! Keep spreading that energy.';
    } else if (score >= 60) {
        mood = 'Chill';
        color = 'text-green-400';
        advice = 'Good vibes only. Enjoy your day!';
    } else if (score <= 30) {
        mood = 'Gloomy';
        color = 'text-blue-400';
        advice = 'It’s okay not to be okay. Take a deep breath.';
    } else if (score <= 40) {
        mood = 'Stressed';
        color = 'text-red-400';
        advice = 'Don’t let the bad vibes win. Go touch some grass.';
    }

    return {
        mood,
        color,
        advice,
        keywords: [...new Set(foundKeywords)], // Unique keywords
        score,
    };
}
