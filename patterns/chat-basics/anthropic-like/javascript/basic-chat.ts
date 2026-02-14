import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';

/**
 * Demonstrates a basic chat interaction using Anthropic's Claude API.
 */
async function main() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        console.error('Error: ANTHROPIC_API_KEY not found in environment variables.');
        return;
    }

    // Initialize the client
    const anthropic = new Anthropic({
        apiKey: apiKey,
    });

    console.log('Sending request to Claude...');

    try {
        const message = await anthropic.messages.create({
            model: 'claude-3-haiku-20240307',
            max_tokens: 1024,
            messages: [
                { role: 'user', content: 'Explain quantum computing in one sentence.' },
            ],
        });

        console.log('\nChat response:');
        // Helper to extract text from ContentBlock
        if (message.content[0].type === 'text') {
            console.log(message.content[0].text);
        }
    } catch (error) {
        console.error('Error calling Anthropic API:', error);
    }
}

main();
