import os
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def main():
    """
    Demonstrates generating text embeddings using the OpenAI API.
    """
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("Error: OPENAI_API_KEY not found or empty.")
        return

    client = OpenAI(api_key=api_key)

    text_to_embed = "The quick brown fox jumps over the lazy dog."
    print(f"Generating embedding for: '{text_to_embed}'")

    response = client.embeddings.create(
        input=text_to_embed,
        model="text-embedding-3-small" # Efficient OpenAI embedding model
    )

    embedding = response.data[0].embedding
    
    print(f"\nEmbedding vector length: {len(embedding)}")
    print(f"First 5 dimensions: {embedding[:5]}")

if __name__ == "__main__":
    main()
