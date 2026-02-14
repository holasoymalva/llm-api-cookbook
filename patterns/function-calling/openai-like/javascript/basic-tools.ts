import 'dotenv/config';
import OpenAI from 'openai';

// Mock function
function getCurrentWeather(location: string, unit: string = 'celsius') {
    if (location.toLowerCase().includes('tokyo')) {
        return JSON.stringify({ location: 'Tokyo', temperature: '10', unit: unit });
    } else if (location.toLowerCase().includes('san francisco')) {
        return JSON.stringify({ location: 'San Francisco', temperature: '72', unit: 'fahrenheit' });
    } else if (location.toLowerCase().includes('paris')) {
        return JSON.stringify({ location: 'Paris', temperature: '22', unit: unit });
    } else {
        return JSON.stringify({ location: location, temperature: 'unknown' });
    }
}

async function main() {
    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
        {
            type: 'function',
            function: {
                name: 'get_current_weather',
                description: 'Get the current weather in a given location',
                parameters: {
                    type: 'object',
                    properties: {
                        location: {
                            type: 'string',
                            description: 'The city and state, e.g. San Francisco, CA',
                        },
                        unit: { type: 'string', enum: ['celsius', 'fahrenheit'] },
                    },
                    required: ['location'],
                },
            },
        },
    ];

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: 'user', content: "What's the weather like in San Francisco, Tokyo, and Paris?" },
    ];

    console.log('Sending request with tools...');

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

            if (functionName === 'get_current_weather') {
                console.log(`Calling tool: ${functionName} with args:`, functionArgs);

                const functionResponse = getCurrentWeather(
                    functionArgs.location,
                    functionArgs.unit
                );

                messages.push({
                    tool_call_id: toolCall.id,
                    role: 'tool',
                    content: functionResponse,
                });
            }
        }

        console.log('Sending follow-up request to get final answer...');
        const secondResponse = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
        });

        console.log('\nFinal Answer:');
        console.log(secondResponse.choices[0].message.content);
    }
}

main();
