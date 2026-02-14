import 'dotenv/config';
import OpenAI from 'openai';

// Define the function interface
async function getCryptoPrice(coinId: string, currency: string = 'usd') {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=${currency}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const price = data[coinId] ? data[coinId][currency] : null;
        return JSON.stringify({ coin: coinId, price: price, currency: currency });
    } catch (error) {
        return JSON.stringify({ error: String(error) });
    }
}

async function main() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error('Please set OPENAI_API_KEY.');
        return;
    }

    const client = new OpenAI({ apiKey });

    const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
        {
            type: 'function',
            function: {
                name: 'get_crypto_price',
                description: 'Get the current price of a cryptocurrency',
                parameters: {
                    type: 'object',
                    properties: {
                        coin_id: {
                            type: 'string',
                            description: 'The ID of the coin on CoinGecko (e.g., bitcoin, ethereum)',
                        },
                        currency: {
                            type: 'string',
                            description: 'The target currency (e.g., usd, eur)',
                        },
                    },
                    required: ['coin_id'],
                },
            },
        },
    ];

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: 'user', content: 'What is the price of Ethereum right now in USD?' },
    ];

    console.log(`User Question: ${messages[0].content}`);
    console.log('Sending request to OpenAI with tools...');

    const response = await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        tools: tools,
        tool_choice: 'auto',
    });

    const responseMessage = response.choices[0].message;
    const toolCalls = responseMessage.tool_calls;

    if (toolCalls) {
        console.log(`Model decided to call ${toolCalls.length} tool(s).`);
        messages.push(responseMessage);

        for (const toolCall of toolCalls) {
            const functionName = toolCall.function.name;
            const functionArgs = JSON.parse(toolCall.function.arguments);

            if (functionName === 'get_crypto_price') {
                console.log(`Executing: ${functionName}(${JSON.stringify(functionArgs)})`);

                const functionResponse = await getCryptoPrice(
                    functionArgs.coin_id,
                    functionArgs.currency
                );
                console.log(`Result: ${functionResponse}`);

                messages.push({
                    tool_call_id: toolCall.id,
                    role: 'tool',
                    content: functionResponse,
                });
            }
        }

        console.log('\nSending follow-up request for final answer...');
        const finalResponse = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
        });

        console.log('\nFinal Answer:');
        console.log(finalResponse.choices[0].message.content);
    }
}

main();
