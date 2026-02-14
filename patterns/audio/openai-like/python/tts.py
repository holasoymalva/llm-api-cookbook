import os
from openai import OpenAI
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

def main():
    """
    Demonstrates Text-to-Speech (TTS) using OpenAI's tts-1 model.
    """
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("Please set OPENAI_API_KEY.")
        return

    client = OpenAI(api_key=api_key)
    
    output_file_path = Path(__file__).parent / "speech_output.mp3"
    
    print("Generating speech from text...")

    response = client.audio.speech.create(
        model="tts-1",
        voice="alloy",
        input="The quick brown fox jumps over the lazy dog."
    )

    # Save to file
    response.stream_to_file(output_file_path)
    
    print(f"\nAudio saved to: {output_file_path}")

if __name__ == "__main__":
    main()
