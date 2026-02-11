import os
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def main():
    """
    Demonstrates a basic chat completion call using the OpenAI API.
    """
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("Error: OPENAI_API_KEY not found in environment variables.")
        return

    # Initialize the client
    client = OpenAI(api_key=api_key)

    print("Sending request to OpenAI...")
    
    # Create a chat completion
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo", # or "gpt-4"
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Explain quantum computing in one sentence."}
        ]
    )

    # Extract the response content
    response = completion.choices[0].message.content
    print("\nChat response:")
    print(response)

if __name__ == "__main__":
    main()
