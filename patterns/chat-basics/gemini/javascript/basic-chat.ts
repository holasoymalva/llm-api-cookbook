import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Demonstrates a basic chat interaction using Google's Gemini API.
 */
async function main() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error('Error: GEMINI_API_KEY not found in environment variables.');
        return;
    }

    // Initialize the client
    const genAI = new GoogleGenerativeAI(apiKey);

    console.log('Sending request to Gemini...');

    try {
        // Get the model
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Generate content
        const result = await model.generateContent('Explain quantum computing in one sentence.');
        const response = await result.response;
        const text = response.text();

        console.log('\nChat response:');
        console.log(text);
    } catch (error) {
        console.error('Error calling Gemini API:', error);
    }
}

main();
