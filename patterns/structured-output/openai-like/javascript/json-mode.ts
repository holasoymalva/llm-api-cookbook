import 'dotenv/config';
import OpenAI from 'openai';

/**
 * Demonstrates using JSON mode with OpenAI to ensure valid JSON output.
 */
async function main() {
    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    console.log('Sending request for JSON output...');

    try {
        const completion = await client.chat.completions.create({
            model: 'gpt-3.5-turbo-1106', // Supports response_format type "json_object"
            messages: [
                { role: 'system', content: 'You are a helpful assistant designed to output JSON.' },
                { role: 'user', content: 'List 3 common fruits with their colors and average weight in grams.' },
            ],
            response_format: { type: 'json_object' },
        });

        const content = completion.choices[0].message.content;
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
