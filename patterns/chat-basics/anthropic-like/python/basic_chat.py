import os
import anthropic
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def main():
    """
    Demonstrates a basic chat interaction using Anthropic's Claude API.
    """
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("Error: ANTHROPIC_API_KEY not found in environment variables.")
        return

    # Initialize the client
    client = anthropic.Anthropic(api_key=api_key)

    print("Sending request to Claude...")

    # Create a message
    message = client.messages.create(
        model="claude-3-haiku-20240307",
        max_tokens=1024,
        messages=[
            {"role": "user", "content": "Explain quantum computing in one sentence."}
        ]
    )

    print("\nChat response:")
    # Helper to get text content from Block
    print(message.content[0].text)

if __name__ == "__main__":
    main()
