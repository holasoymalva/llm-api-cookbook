import 'dotenv/config';
import OpenAI from 'openai';

/**
 * Demonstrates a basic chat completion call using the OpenAI API.
 */
async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('Error: OPENAI_API_KEY not found in environment variables.');
    return;
  }

  // Initialize the client
  const client = new OpenAI({
    apiKey: apiKey,
  });

  console.log('Sending request to OpenAI...');

  try {
    // Create a chat completion
    const completion = await client.chat.completions.create({
      model: 'gpt-3.5-turbo', // or 'gpt-4'
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Explain quantum computing in one sentence.' },
      ],
    });

    // Extract the response content
    const response = completion.choices[0].message.content;
    console.log('\nChat response:');
    console.log(response);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
  }
}

main();
