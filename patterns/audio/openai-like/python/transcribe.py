import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

def main():
    """
    Demonstrates Speech-to-Text (transcription) using OpenAI's Whisper model.
    """
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("Please set OPENAI_API_KEY.")
        return

    client = OpenAI(api_key=api_key)

    # For this example, we assume you have a local audio file.
    # If the file doesn't exist, we will just print what the code WOULD do.
    audio_file_path = "speech.mp3"

    if not os.path.exists(audio_file_path):
        print(f"Note: '{audio_file_path}' not found. Please place an audio file to run this.")
        print("Code structure is provided below for reference.\n")
        return

    print("Transcribing audio...")
    
    with open(audio_file_path, "rb") as audio_file:
        transcription = client.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file,
            response_format="text"
        )
    
    print("\nTranscription:")
    print(transcription)

if __name__ == "__main__":
    main()
