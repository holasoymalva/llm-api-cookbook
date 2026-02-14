import 'dotenv/config';
import Groq from 'groq-sdk';

/**
 * Demonstrates streaming chat completions with Groq.
 */
async function main() {
    const client = new Groq({
        apiKey: process.env.GROQ_API_KEY,
    });

    console.log('Sending streaming request to Groq...\n');
    console.log('--- Stream Start ---');

    try {
        const stream = await client.chat.completions.create({
            model: 'llama3-8b-8192',
            messages: [{ role: 'user', content: 'Write a short poem about the ocean.' }],
            stream: true,
        });

        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            process.stdout.write(content);
        }

        console.log('\n--- Stream End ---');
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
