import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Demonstrates sending an image to Gemini 1.5 Flash for analysis.
 * Note: In Node.js, we typically read files or use fetch to get buffers.
 */
async function main() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error('Please set GEMINI_API_KEY.');
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const imageUrl =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg';

    console.log(`Fetching image from: ${imageUrl}...`);

    try {
        // 1. Fetch Image
        const response = await fetch(imageUrl);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 2. Prepare Part
        const imagePart = {
            inlineData: {
                data: buffer.toString('base64'),
                mimeType: 'image/jpeg',
            },
        };

        // 3. Generate Content
        console.log("Analyzing image with Gemini...");
        const result = await model.generateContent([
            "Describe this image specifically focusing on the colors.",
            imagePart
        ]);
        const text = result.response.text();

        console.log('\nDescription:');
        console.log(text);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
