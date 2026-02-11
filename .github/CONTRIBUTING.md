# Contributing to llm-api-cookbook

We welcome contributions to make this cookbook more comprehensive and useful for everyone!

## How to Contribute

1.  **Fork the repository**.
2.  **Create a new branch** for your feature or fix.
3.  **Make your changes**.
4.  **Submit a Pull Request**.

## Adding a New Example

When adding a new example, please follow the existing structure:

```
patterns/<Pattern>/<Provider>/<Language>/<Title>.<ext>
```

-   **Pattern**: Ensure the pattern exists or propose a new one in an issue first.
-   **Provider**: Use the provider's standard name (e.g., `openai-like`, `groq`, `gemini`, `anthropic`).
-   **Language**: Use standard language folders (`javascript`, `python`, `go`, `rust`).
-   **Description**: Keep file names short and descriptive (e.g., `basic-chat.ts`, `tools_example.py`).

### Rules for Examples

1.  **Minimal Dependencies**: Use official SDKs or standard HTTP clients (`fetch`, `axios`, `requests`). Avoid heavy frameworks unless necessary for the specific pattern.
2.  **Self-Contained**: The example should run standalone.
3.  **Environment Variables**: Use `.env` for API keys. **NEVER hardcode API keys.**
4.  **Clear Comments**: Explain the key parts of the code.
5.  **Standard Formatting**: Please format your code before submitting (Prettier for JS/TS, Black for Python).

## Adding a New Provider

1.  Create a new folder under `providers/` for documentation/metadata about the provider.
2.  Add a Markdown file explaining the provider's specifics if needed.
3.  Implement the "Chat Basics" pattern for the new provider in at least one language.

## Adding a New Language

1.  Create a new folder under `languages/` for language-specific setup instructions (e.g., how to install dependencies).
2.  Add a `README.md` in that folder.
3.  Implement existing patterns in the new language.

## Reporting Issues

Use the Issue Template to report bugs or request features. Please be specific about which provider/language/pattern is affecting you.
