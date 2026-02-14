import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def main():
    """
    Demonstrates a basic chat interaction using Google's Gemini API.
    """
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY not found in environment variables.")
        return

    # Configure the library
    genai.configure(api_key=api_key)

    print("Sending request to Gemini...")

    # Initialize the model
    model = genai.GenerativeModel('gemini-1.5-flash')

    # Generate content (single turn)
    response = model.generate_content("Explain quantum computing in one sentence.")

    print("\nChat response:")
    print(response.text)

if __name__ == "__main__":
    main()
