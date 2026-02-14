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

| Provider | Folder Name | Chat | JSON Mode | Tools | Streaming | Embeddings | Vision | Audio |
|----------|-------------|------|-----------|-------|-----------|------------|--------|-------|
| **OpenAI** | `openai-like` | ✅ | ✅ | ✅ | ✅ | ✅ | 🚧 | 🚧 |
| **Groq** | `groq` | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Gemini** | `gemini` | 🚧 | 🚧 | 🚧 | 🚧 | 🚧 | 🚧 | 🚧 |
| **Anthropic** | `anthropic-like` | 🚧 | 🚧 | 🚧 | 🚧 | 🚧 | 🚧 | 🚧 |

## Supported Languages

| Language | Folder Name | Status |
|----------|-------------|--------|
| **Node.js / TypeScript** | `javascript` | ✅ |
| **Python** | `python` | ✅ |
| **Go** | `go` | 🚧 (Planned) |
| **Rust** | `rust` | 🚧 (Planned) |

## Patterns

We are currently implementing the following patterns (Phase 1 & 2):

1.  **Chat Basics**: Single-turn and simple multi-turn chat.
2.  **Structured Output**: JSON mode and structured parsing.
3.  **Function Calling**: Tool use basics.
4.  **Streaming**: Handling streamed responses.
5.  **Embeddings**: Generating text embeddings.
6.  **RAG Building Blocks**: Simple retrieval augmentation.
7.  **Vision**: Image analysis (Planned Phase 3).
8.  **Audio**: Speech-to-Text / Text-to-Speech (Planned Phase 3).

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](.github/CONTRIBUTING.md) for details on how to add new examples, providers, or languages.

---

**Disclaimer**: This project is not affiliated with any specific LLM provider.
