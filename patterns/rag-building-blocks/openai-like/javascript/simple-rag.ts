import 'dotenv/config';
import OpenAI from 'openai';

// 1. Simple in-memory knowledge base
const KNOWLEDGE_BASE = [
    "The capital of France is Paris.",
    "The capital of Germany is Berlin.",
    "The capital of Italy is Rome.",
    "Python is a high-level programming language.",
    "JavaScript is often used for web development.",
];

function cosineSimilarity(v1: number[], v2: number[]): number {
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;

    for (let i = 0; i < v1.length; i++) {
        dotProduct += v1[i] * v2[i];
        magnitude1 += v1[i] * v1[i];
        magnitude2 += v2[i] * v2[i];
    }

    return dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
}

async function main() {
    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const query = "What is the capital of France?";
    console.log(`Query: ${query}`);

    console.log("Generating embeddings...");

    try {
        // 2. Embed knowledge base (Batch)
        const kbResponse = await client.embeddings.create({
            input: KNOWLEDGE_BASE,
            model: "text-embedding-3-small",
        });
        const kbEmbeddings = kbResponse.data.map((item: any) => item.embedding);

        // Embed query
        const queryResponse = await client.embeddings.create({
            input: query,
            model: "text-embedding-3-small",
        });
        const queryEmbedding = queryResponse.data[0].embedding;

        // 3. Retrieve relevant context
        console.log("Calculating similarities...");
        const similarities = kbEmbeddings.map((docEmb: number[], index: number) => ({
            score: cosineSimilarity(queryEmbedding, docEmb),
            text: KNOWLEDGE_BASE[index],
        }));

        // Sort by score descending
        similarities.sort((a: { score: number }, b: { score: number }) => b.score - a.score);

        // Get top 2 results
        const topResults = similarities.slice(0, 2);
        const contextText = topResults.map((r: { text: string }) => r.text).join("\n");

        console.log(`Top context found:\n---\n${contextText}\n---`);

        // 4. Generate Answer
        console.log("Generating answer with context...");
        const prompt = `
    Answer the question based ONLY on the context below.
    
    Context:
    ${contextText}
    
    Question: ${query}
    `;

        const completion = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: prompt },
            ],
        });

        console.log("\nAnswer:");
        console.log(completion.choices[0].message.content);
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
