import os
import json
from groq import Groq
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def main():
    """
    Demonstrates using JSON mode with Groq.
    """
    api_key = os.environ.get("GROQ_API_KEY")
    client = Groq(api_key=api_key)

    print("Sending request for JSON output to Groq...")

    completion = client.chat.completions.create(
        model="llama3-8b-8192", # Supports JSON mode
        messages=[
            {"role": "system", "content": "You are a helpful assistant designed to output JSON."},
            {"role": "user", "content": "List 3 planets in the solar system with their distance from the sun (AU)."}
        ],
        response_format={"type": "json_object"}
    )

    response_content = completion.choices[0].message.content
    print("\nRaw Response:", response_content)

    try:
        data = json.loads(response_content)
        print("\nParsed JSON:")
        print(json.dumps(data, indent=2))
    except json.JSONDecodeError:
        print("Error: Could not decode JSON.")

if __name__ == "__main__":
    main()
