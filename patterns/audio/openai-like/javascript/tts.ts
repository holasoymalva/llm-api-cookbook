import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

/**
 * Demonstrates Text-to-Speech (TTS) using OpenAI's tts-1 model.
 */
async function main() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error('Please set OPENAI_API_KEY.');
        return;
    }

    const client = new OpenAI({ apiKey });

    const outputFilePath = path.join(__dirname, 'speech_output.mp3');

    console.log('Generating speech from text...');

    try {
        const mp3 = await client.audio.speech.create({
            model: 'tts-1',
            voice: 'alloy',
            input: 'The quick brown fox jumps over the lazy dog.',
        });

        const buffer = Buffer.from(await mp3.arrayBuffer());
        await fs.promises.writeFile(outputFilePath, buffer);

        console.log(`\nAudio saved to: ${outputFilePath}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
