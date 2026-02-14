import 'dotenv/config';
import Groq from 'groq-sdk';

/**
 * Demonstrates using JSON mode with Groq.
 */
async function main() {
    const client = new Groq({
        apiKey: process.env.GROQ_API_KEY,
    });

    console.log('Sending request for JSON output to Groq...');

    try {
        const completion = await client.chat.completions.create({
            model: 'llama3-8b-8192',
            messages: [
                { role: 'system', content: 'You are a helpful assistant designed to output JSON.' },
                { role: 'user', content: 'List 3 planets in the solar system with their distance from the sun (AU).' },
            ],
            response_format: { type: 'json_object' },
        });

        const content = completion.choices[0]?.message?.content;
        console.log('\nRaw Response:', content);

        if (content) {
            const data = JSON.parse(content);
            console.log('\nParsed JSON:');
            console.log(JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
