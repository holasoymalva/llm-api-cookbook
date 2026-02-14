import 'dotenv/config';
import OpenAI from 'openai';

/**
 * Demonstrates sending an image URL to GPT-4o for analysis.
 */
async function main() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error('Please set OPENAI_API_KEY.');
        return;
    }

    const client = new OpenAI({ apiKey });

    const imageUrl =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg';

    console.log(`Analyzing image at: ${imageUrl}...`);

    try {
        const response = await client.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: 'What is in this image? Describe the scenery.' },
                        {
                            type: 'image_url',
                            image_url: {
                                url: imageUrl,
                            },
                        },
                    ],
                },
            ],
            max_tokens: 300,
        });

        console.log('\nDescription:');
        console.log(response.choices[0].message.content);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
