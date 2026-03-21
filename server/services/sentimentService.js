/**
 * Keyword-based sentiment analysis service.
 * Returns a score between 0 (positive) and 1 (negative).
 */

const negativeKeywords = [
    'bad', 'terrible', 'awful', 'horrible', 'worst', 'scam', 'fraud', 'poor',
    'disappointed', 'disappointing', 'hate', 'waste', 'useless', 'rude',
    'expensive', 'overpriced', 'slow', 'broken', 'rip off', 'fake', 'avoid',
    'don\'t buy', 'regret', 'angry', 'shame', 'pathetic', 'clueless',
    'stole', 'stolen', 'failed', 'failure', 'garbage', 'trash', 'unprofessional',
    'unhelpful', 'wait', 'waiting', 'hours', 'days', 'weeks', 'never', 'again'
];

const positiveKeywords = [
    'good', 'great', 'excellent', 'amazing', 'wonderful', 'best', 'love',
    'happy', 'satisfied', 'thanks', 'thank', 'helpful', 'professional',
    'fast', 'quick', 'easy', 'recommend', 'perfect', 'brilliant', 'awesome',
    'friendly', 'efficient', 'outstanding', 'reliable', 'trustworthy'
];

const analyze = (text) => {
    if (!text) return 0;
    
    const lowerText = text.toLowerCase();
    const words = lowerText.split(/\W+/);
    
    let negCount = 0;
    let posCount = 0;
    
    // Check for negative phrases first (exact match)
    negativeKeywords.forEach(keyword => {
        if (lowerText.includes(keyword)) {
            // Count occurrences
            const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            const matches = lowerText.match(regex);
            if (matches) negCount += matches.length;
        }
    });

    positiveKeywords.forEach(keyword => {
        if (lowerText.includes(keyword)) {
            const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            const matches = lowerText.match(regex);
            if (matches) posCount += matches.length;
        }
    });

    // Calculate score
    if (negCount === 0 && posCount === 0) return 0.5; // Neutral
    
    // Weighted score favoring negative keywords for flagging
    const total = negCount + (posCount * 0.8);
    const score = negCount / total;
    
    return parseFloat(score.toFixed(2));
};

module.exports = { analyze };
