import os
import json
import requests
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

def get_crypto_price(coin_id, currency="usd"):
    """
    Fetches the current price of a cryptocurrency from CoinGecko.
    """
    url = f"https://api.coingecko.com/api/v3/simple/price?ids={coin_id}&vs_currencies={currency}"
    try:
        response = requests.get(url)
        data = response.json()
        price = data.get(coin_id, {}).get(currency)
        return json.dumps({"coin": coin_id, "price": price, "currency": currency})
    except Exception as e:
        return json.dumps({"error": str(e)})

def main():
    api_key = os.environ.get("OPENAI_API_KEY")
    client = OpenAI(api_key=api_key)

    tools = [
        {
            "type": "function",
            "function": {
                "name": "get_crypto_price",
                "description": "Get the current price of a cryptocurrency",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "coin_id": {
                            "type": "string",
                            "description": "The ID of the coin on CoinGecko (e.g., bitcoin, ethereum, solana)",
                        },
                        "currency": {
                            "type": "string",
                            "description": "The target currency (e.g., usd, eur)",
                        },
                    },
                    "required": ["coin_id"],
                },
            },
        }
    ]

    messages = [{"role": "user", "content": "What is the price of Bitcoin and Solana right now?"}]

    print("User Question:", messages[0]["content"])
    print("Sending request to OpenAI with tools...")

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        tools=tools,
        tool_choice="auto",
    )

    response_message = response.choices[0].message
    tool_calls = response_message.tool_calls

    if tool_calls:
        print(f"Model decided to call {len(tool_calls)} tool(s).")
        messages.append(response_message)

        for tool_call in tool_calls:
            function_name = tool_call.function.name
            function_args = json.loads(tool_call.function.arguments)
            
            if function_name == "get_crypto_price":
                print(f"Executing: {function_name}({function_args})")
                function_response = get_crypto_price(
                    coin_id=function_args.get("coin_id"),
                    currency=function_args.get("currency", "usd")
                )
                print(f"Result: {function_response}")
                
                messages.append(
                    {
                        "tool_call_id": tool_call.id,
                        "role": "tool",
                        "name": function_name,
                        "content": function_response,
                    }
                )

        print("\nSending follow-up request for final answer...")
        final_response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
        )
        print("\nFinal Answer:")
        print(final_response.choices[0].message.content)

if __name__ == "__main__":
    main()
