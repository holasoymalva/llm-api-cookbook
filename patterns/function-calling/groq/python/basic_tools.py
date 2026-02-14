import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

def get_current_weather(location, unit="celsius"):
    """Get the current weather in a given location"""
    if "tokyo" in location.lower():
        return json.dumps({"location": "Tokyo", "temperature": "10", "unit": unit})
    elif "san francisco" in location.lower():
        return json.dumps({"location": "San Francisco", "temperature": "72", "unit": "fahrenheit"})
    elif "paris" in location.lower():
        return json.dumps({"location": "Paris", "temperature": "22", "unit": unit})
    else:
        return json.dumps({"location": location, "temperature": "unknown"})

def main():
    client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
    model = "llama3-70b-8192" # Use a capable model for function calling

    tools = [
        {
            "type": "function",
            "function": {
                "name": "get_current_weather",
                "description": "Get the current weather in a given location",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "location": {
                            "type": "string",
                            "description": "The city and state, e.g. San Francisco, CA",
                        },
                        "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
                    },
                    "required": ["location"],
                },
            },
        }
    ]

    messages = [{"role": "user", "content": "What's the weather like in San Francisco?"}]

    print(f"Sending request to Groq ({model}) with tools...")
    
    response = client.chat.completions.create(
        model=model,
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
            
            if function_name == "get_current_weather":
                print(f"Calling tool: {function_name} with args: {function_args}")
                function_response = get_current_weather(
                    location=function_args.get("location"),
                    unit=function_args.get("unit"),
                )
                
                messages.append(
                    {
                        "tool_call_id": tool_call.id,
                        "role": "tool",
                        "name": function_name,
                        "content": function_response,
                    }
                )
        
        print("Sending follow-up request to get final answer...")
        second_response = client.chat.completions.create(
            model=model,
            messages=messages,
        )
        print("\nFinal Answer:")
        print(second_response.choices[0].message.content)

if __name__ == "__main__":
    main()
