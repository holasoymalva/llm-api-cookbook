import os
import sys
from groq import Groq
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def main():
    """
    Demonstrates streaming chat completions with Groq.
    """
    api_key = os.environ.get("GROQ_API_KEY")
    client = Groq(api_key=api_key)

    print("Sending streaming request to Groq...\n")

    stream = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role": "user", "content": "Write a short poem about the ocean."}
        ],
        stream=True,
    )

    print("--- Stream Start ---")
    for chunk in stream:
        content = chunk.choices[0].delta.content
        if content:
            sys.stdout.write(content)
            sys.stdout.flush()
    print("\n--- Stream End ---")

if __name__ == "__main__":
    main()
