import os
import json
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def main():
    """
    Demonstrates using JSON mode with OpenAI to ensure valid JSON output.
    """
    api_key = os.environ.get("OPENAI_API_KEY")
    client = OpenAI(api_key=api_key)

    print("Sending request for JSON output...")

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo-1106", # Supports response_format type "json_object"
        messages=[
            {"role": "system", "content": "You are a helpful assistant designed to output JSON."},
            {"role": "user", "content": "List 3 common fruits with their colors and average weight in grams."}
        ],
        response_format={"type": "json_object"}
    )

    response_content = completion.choices[0].message.content
    print("\nRaw Response:", response_content)

    try:
        data = json.loads(response_content)
        print("\nParsed JSON:")
        print(json.dumps(data, indent=2))
        
        # Accessing data programmatically
        if "fruits" in data:
            print(f"\nFirst fruit: {data['fruits'][0]['name']}")
    except json.JSONDecodeError:
        print("Error: Could not decode JSON.")

if __name__ == "__main__":
    main()
