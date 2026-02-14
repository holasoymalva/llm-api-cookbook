import os
import requests
import google.generativeai as genai
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv

load_dotenv()

def main():
    """
    Demonstrates sending an image to Gemini 1.5 Flash for analysis.
    Downloads an image from a URL and passes it to the model.
    """
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Please set GEMINI_API_KEY.")
        return

    genai.configure(api_key=api_key)

    # 1. Download image
    image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
    print(f"Downloading image from: {image_url}...")
    
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content))

    # 2. Initialize Model
    model = genai.GenerativeModel('gemini-1.5-flash')

    print("Analyzing image with Gemini...")

    # 3. Generate Content
    response = model.generate_content(["Describe this image specifically focusing on the colors.", img])

    print("\nDescription:")
    print(response.text)

if __name__ == "__main__":
    main()
