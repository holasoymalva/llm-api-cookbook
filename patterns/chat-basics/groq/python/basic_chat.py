import os
from groq import Groq
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def main():
    """
    Demonstrates a basic chat completion call using the Groq API.
    Functionally similar to OpenAI but optimized for speed.
    """
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        print("Error: GROQ_API_KEY not found in environment variables.")
        return

    # Initialize the Groq client
    client = Groq(api_key=api_key)

    print("Sending request to Groq...")

    # Create a chat completion
    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Explain quantum computing in one sentence."}
        ],
        model="llama3-8b-8192", # Example Groq model
    )

    # Extract the response
    response = chat_completion.choices[0].message.content
    print("\nChat response:")
    print(response)

if __name__ == "__main__":
    main()
