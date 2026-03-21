const { analyze } = require('./server/services/sentimentService');

const testCases = [
    { text: "This service was amazing and fast!", expected: "low" },
    { text: "Worst experience ever, a total scam. Avoid at all costs.", expected: "high" },
    { text: "It was okay, but the wait was a bit long.", expected: "medium" },
    { text: "I love this product, thank you!", expected: "low" },
    { text: "Terrible customer service and rude staff. Garbage.", expected: "high" }
];

testCases.forEach(({ text, expected }) => {
    const score = analyze(text);
    let level = "medium";
    if (score >= 0.6) level = "high";
    else if (score <= 0.4) level = "low";
    
    console.log(`Text: "${text}"`);
    console.log(`Score: ${score} (Detected: ${level}, Expected: ${expected})`);
    console.log('---');
});
