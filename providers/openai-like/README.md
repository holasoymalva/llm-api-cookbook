# OpenAI-Compatible Providers

This folder contains examples for providers that implement the OpenAI Chat Completions API. This includes:

-   **OpenAI** (Official API)
-   **DeepSeek** (via OpenAI client)
-   **Together AI** (via OpenAI client)
-   **Anyscale** (via OpenAI client)
-   **Local LLMs** (via Ollama/vLLM/LocalAI using OpenAI compatibility)

## Setup

Set `OPENAI_API_KEY` in your `.env` file. If using a custom base URL (e.g., for local models), ensure your code supports setting `baseURL` or modifies the client configuration.
