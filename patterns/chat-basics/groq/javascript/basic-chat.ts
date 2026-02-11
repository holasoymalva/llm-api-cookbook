import 'dotenv/config';
import Groq from 'groq-sdk';

/**
 * Demonstrates a basic chat completion call using the Groq API.
 */
async function main() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        console.error('Error: GROQ_API_KEY not found in environment variables.');
        return;
    }

    // Initialize the Groq client
    const client = new Groq({
        apiKey: apiKey,
    });

    console.log('Sending request to Groq...');

    try {
        // Create a chat completion
        const completion = await client.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: 'Explain quantum computing in one sentence.' },
            ],
            model: 'llama3-8b-8192', // Example Groq model
        });

        // Extract the response content
        const response = completion.choices[0]?.message?.content || '';
        console.log('\nChat response:');
        console.log(response);
    } catch (error) {
        console.error('Error calling Groq API:', error);
    }
}

main();
