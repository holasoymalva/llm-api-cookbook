import os
import math
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# 1. Simple in-memory knowledge base
KNOWLEDGE_BASE = [
    "The capital of France is Paris.",
    "The capital of Germany is Berlin.",
    "The capital of Italy is Rome.",
    "Python is a high-level programming language.",
    "JavaScript is often used for web development.",
]

def cosine_similarity(v1, v2):
    """Calculate cosine similarity between two vectors."""
    dot_product = sum(a * b for a, b in zip(v1, v2))
    magnitude1 = math.sqrt(sum(a * a for a in v1))
    magnitude2 = math.sqrt(sum(b * b for b in v2))
    return dot_product / (magnitude1 * magnitude2)

def main():
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("Please set OPENAI_API_KEY environment variable.")
        return
        
    client = OpenAI(api_key=api_key)

    query = "What is the capital of France?"
    print(f"Query: {query}")

    # 2. Embed the query and the knowledge base
    # (In a real app, you would pre-compute and store the KB embeddings)
    print("Generating embeddings...")
    
    # We can batch embed the KB
    kb_response = client.embeddings.create(input=KNOWLEDGE_BASE, model="text-embedding-3-small")
    kb_embeddings = [item.embedding for item in kb_response.data]

    # Embed query
    query_response = client.embeddings.create(input=query, model="text-embedding-3-small")
    query_embedding = query_response.data[0].embedding

    # 3. Retrieve relevant context
    print("Calculating similarities...")
    similarities = [
        (cosine_similarity(query_embedding, doc_emb), doc_text)
        for doc_emb, doc_text in zip(kb_embeddings, KNOWLEDGE_BASE)
    ]
    
    # Sort by similarity (descending)
    similarities.sort(key=lambda x: x[0], reverse=True)
    
    # Get top 2 results
    top_results = similarities[:2]
    context_text = "\n".join([item[1] for item in top_results])
    
    print(f"Top context found:\n---\n{context_text}\n---")

    # 4. Generate Answer
    print("Generating answer with context...")
    prompt = f"""
    Answer the question based ONLY on the context below.
    
    Context:
    {context_text}
    
    Question: {query}
    """

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )

    print("\nAnswer:")
    print(completion.choices[0].message.content)

if __name__ == "__main__":
    main()
