import 'dotenv/config';
import fs from 'fs';
import OpenAI from 'openai';

/**
 * Demonstrates Speech-to-Text (transcription) using OpenAI's Whisper model.
 */
async function main() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error('Please set OPENAI_API_KEY.');
        return;
    }

    const client = new OpenAI({ apiKey });

    const audioFilePath = 'speech.mp3';

    if (!fs.existsSync(audioFilePath)) {
        console.log(`Note: '${audioFilePath}' not found. Please place an audio file to run this.`);
        console.log('Code structure is provided for reference.\n');
        return;
    }

    console.log('Transcribing audio...');

    try {
        const transcription = await client.audio.transcriptions.create({
            file: fs.createReadStream(audioFilePath),
            model: 'whisper-1',
        });

        console.log('\nTranscription:');
        console.log(transcription.text);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
