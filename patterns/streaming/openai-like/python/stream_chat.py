import os
import sys
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def main():
    """
    Demonstrates streaming chat completions with OpenAI.
    """
    api_key = os.environ.get("OPENAI_API_KEY")
    client = OpenAI(api_key=api_key)

    print("Sending streaming request to OpenAI...\n")

    stream = client.chat.completions.create(
        model="gpt-3.5-turbo",
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
