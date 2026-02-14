import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

def main():
    """
    Demonstrates sending an image URL to GPT-4o for analysis.
    """
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("Please set OPENAI_API_KEY.")
        return

    client = OpenAI(api_key=api_key)

    # Image URL (Publicly accessible)
    image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"

    print(f"Analyzing image at: {image_url}...")

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "What is in this image? Describe the scenery."},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": image_url,
                        },
                    },
                ],
            }
        ],
        max_tokens=300,
    )

    print("\nDescription:")
    print(response.choices[0].message.content)

if __name__ == "__main__":
    main()
