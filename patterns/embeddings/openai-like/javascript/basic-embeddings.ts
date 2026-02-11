import 'dotenv/config';
import OpenAI from 'openai';

/**
 * Demonstrates generating text embeddings using the OpenAI API.
 */
async function main() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error('Error: OPENAI_API_KEY not found in environment variables.');
        return;
    }

    const client = new OpenAI({
        apiKey: apiKey,
    });

    const textToEmbed = 'The quick brown fox jumps over the lazy dog.';
    console.log(`Generating embedding for: '${textToEmbed}'`);

    try {
        const response = await client.embeddings.create({
            input: textToEmbed,
            model: 'text-embedding-3-small',
        });

        const embedding = response.data[0].embedding;

        console.log(`\nEmbedding vector length: ${embedding.length}`);
        console.log(`First 5 dimensions: ${embedding.slice(0, 5)}`);
    } catch (error) {
        console.error('Error creating embedding:', error);
    }
}

main();
