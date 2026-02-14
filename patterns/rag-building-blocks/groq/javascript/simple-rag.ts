import 'dotenv/config';
import OpenAI from 'openai';
import Groq from 'groq-sdk';

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
    const openaiKey = process.env.OPENAI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;

    if (!openaiKey || !groqKey) {
        console.error("Please set OPENAI_API_KEY (for embeddings) and GROQ_API_KEY (for chat).");
        return;
    }

    const openai = new OpenAI({ apiKey: openaiKey });
    const groq = new Groq({ apiKey: groqKey });

    const query = "What is the capital of France?";
    console.log(`Query: ${query}`);

    console.log("Generating embeddings (via OpenAI)...");

    try {
        // Embeddings via OpenAI
        const kbResponse = await openai.embeddings.create({
            input: KNOWLEDGE_BASE,
            model: "text-embedding-3-small",
        });
        const kbEmbeddings = kbResponse.data.map((item: any) => item.embedding);

        const queryResponse = await openai.embeddings.create({
            input: query,
            model: "text-embedding-3-small",
        });
        const queryEmbedding = queryResponse.data[0].embedding;

        // Retrieve
        console.log("Calculating similarities...");
        const similarities = kbEmbeddings.map((docEmb: number[], index: number) => ({
            score: cosineSimilarity(queryEmbedding, docEmb),
            text: KNOWLEDGE_BASE[index],
        }));

        similarities.sort((a: { score: number }, b: { score: number }) => b.score - a.score);

        const topResults = similarities.slice(0, 2);
        const contextText = topResults.map((r: { text: string }) => r.text).join("\n");
        console.log(`Top context found:\n---\n${contextText}\n---`);

        // Generate Answer via Groq
        console.log("Generating answer with context (via Groq)...");
        const prompt = `
    Answer the question based ONLY on the context below.
    
    Context:
    ${contextText}
    
    Question: ${query}
    `;

        const completion = await groq.chat.completions.create({
            model: "llama3-8b-8192",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: prompt },
            ],
        });

        console.log("\nAnswer:");
        console.log(completion.choices[0]?.message?.content);

    } catch (error) {
        console.error("Error:", error);
    }
}

main();
