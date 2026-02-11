# LLM API Cookbook

A language-agnostic cookbook of working LLM API examples, organized by **task (pattern)**, **provider**, and **language**.

The goal of this project is to provide a highly practical reference for software engineers who want to quickly copy-paste idiomatic snippets for calling various LLM APIs without wading through dense documentation.

## Table of Contents

- [Why this repo?](#why-this-repo)
- [Structure](#structure)
- [Supported Providers](#supported-providers)
- [Supported Languages](#supported-languages)
- [Usage](#usage)
- [Patterns](#patterns)
- [Contributing](#contributing)

## Why this repo?

- **Less time reading docs, more time building.** Get working code snippets in seconds.
- **Consistent patterns.** See how to do the same task (e.g., streaming, function calling) across different providers and languages.
- **Provider-agnostic.** We cover multiple providers, not just one ecosystem.
- **Community-driven.** Designed to be easily extended with new languages and providers.

## Structure

The repository is organized by **Pattern** → **Provider** → **Language**.

```
patterns/
  ├── chat-basics/
  │   ├── openai-like/
  │   │   ├── javascript/
  │   │   └── python/
  │   └── groq/
  │       ├── javascript/
  │       └── python/
  ├── structured-output/
  ├── function-calling/
  ├── streaming/
  ├── embeddings/
  └── ...
```

## Supported Providers

| Provider | Folder Name | Status |
|----------|-------------|--------|
| **OpenAI (and compatible)** | `openai-like` | ✅ |
| **Groq** | `groq` | ✅ |
| **Gemini** | `gemini` | 🚧 (Planned) |
| **Anthropic** | `anthropic-like` | 🚧 (Planned) |
| **Open Gateways** | `open-gateway` | 🚧 (Planned) |

## Supported Languages

| Language | Folder Name | Status |
|----------|-------------|--------|
| **Node.js / TypeScript** | `javascript` | ✅ |
| **Python** | `python` | ✅ |
| **Go** | `go` | 🚧 (Planned) |
| **Rust** | `rust` | 🚧 (Planned) |

## Usage

### 1. Prerequisites

- **Node.js** (for JavaScript/TypeScript examples)
- **Python 3.8+** (for Python examples)
- API Keys for the providers you want to use.

### 2. Setup Environment Variables

Copy the example environment file and add your API keys:

```bash
cp .env.example .env
```

Edit `.env` and fill in your keys:

```ini
OPENAI_API_KEY=sk-...
GROQ_API_KEY=gsk_...
GEMINI_API_KEY=...
ANTHROPIC_API_KEY=...
```

### 3. Install Dependencies

**For Node.js / TypeScript:**

```bash
cd languages/javascript
npm install
# or
npm install openai groq-sdk dotenv
```

**For Python:**

```bash
cd languages/python
pip install -r requirements.txt
# or
pip install openai groq python-dotenv
```

### 4. Run an Example

Navigate to the root of the repository and run the desired example file.

**Node.js/TypeScript:**

```bash
# Chat Basics with Groq
npx ts-node patterns/chat-basics/groq/javascript/basic-chat.ts
```

**Python:**

```bash
# Chat Basics with OpenAI
python patterns/chat-basics/openai-like/python/basic_chat.py
```

## Patterns

We are currently implementing the following patterns (Phase 1 & 2):

1.  **Chat Basics**: Single-turn and simple multi-turn chat.
2.  **Structured Output**: JSON mode and structured parsing.
3.  **Function Calling**: Tool use basics.
4.  **Streaming**: Handling streamed responses.
5.  **Embeddings**: Generating text embeddings.
6.  **Vision**: Image analysis.
7.  **RAG Building Blocks**: Simple retrieval augmentation.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](.github/CONTRIBUTING.md) for details on how to add new examples, providers, or languages.

---

**Disclaimer**: This project is not affiliated with any specific LLM provider.
