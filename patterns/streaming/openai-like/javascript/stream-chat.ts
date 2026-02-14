import 'dotenv/config';
import OpenAI from 'openai';

/**
 * Demonstrates streaming chat completions with OpenAI.
 */
async function main() {
    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    console.log('Sending streaming request to OpenAI...\n');
    console.log('--- Stream Start ---');

    try {
        const stream = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
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
