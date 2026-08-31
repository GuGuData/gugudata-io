---
title: "Knowledge Base Chat API with Document Citations"
description: "Upload private documents, ask evidence-grounded questions, stream answers in real time, manage conversation context, and delete indexed documents with the GuGuData Knowledge Base Chat API."
slug: "knowledge-base-chat-api"
date: "2026-08-31"
updated: "2026-08-31"
category: "AI & RAG"
keywords:
  - "knowledge base chat API"
  - "RAG API"
  - "document question answering API"
  - "OpenAI compatible RAG API"
  - "SSE chat API"
featured: false
---

# Knowledge Base Chat API with Document Citations

The [GuGuData Knowledge Base Chat API](https://gugudata.io/details/knowledge-chat/) turns approved documents into a private question-answering resource. Upload source files, send an OpenAI-compatible message array, receive answers grounded in retrieved passages, and retain source references for review.

The API supports PDF, plain text, Markdown, HTML, and DOCX documents. It is designed for product documentation, customer support libraries, policy collections, research archives, and project-specific assistants where answers need traceable evidence.

## API workflow

1. Choose a stable `knowledge_base_id` for a product, project, or customer library.
2. Upload one or more documents and save each returned `document_id`.
3. Send the complete conversation context in `messages` whenever you ask a question.
4. Read `sources` alongside the answer to show where the response came from.
5. Delete obsolete documents by `document_id` when they should no longer be retrievable.

## Upload documents

```bash
curl -X POST \
  "https://api.gugudata.io/ai/knowledge-bases/product-manuals/documents?appkey=YOUR_APPKEY" \
  -F "files=@./installation-guide.pdf" \
  -F "files=@./support-policy.md" \
  -F "tenant_id=default" \
  -F 'metadata={"collection":"support","language":"en"}' \
  -F "replace_existing=true"
```

Each request accepts one to five files, with a maximum of 20 MiB per file. `replace_existing=true` replaces a ready document with the same file name only after the new document has been processed successfully.

A successful response identifies each document:

```json
{
  "knowledge_base_id": "product-manuals",
  "documents": [
    {
      "document_id": "doc_7c2f7a27d66a4d80a1b5a18c8434f445",
      "file_name": "installation-guide.pdf",
      "status": "ready",
      "chunk_count": 18
    }
  ],
  "ready_count": 1,
  "failed_count": 0
}
```

Store `document_id` with your source record. It is required when the source needs to be removed later.

## Ask a question

```bash
curl -X POST \
  "https://api.gugudata.io/ai/knowledge-bases/product-manuals/chat/completions?appkey=YOUR_APPKEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gugudata-knowledge-chat",
    "messages": [
      {
        "role": "user",
        "content": "Which operating systems are supported by the installation guide?"
      }
    ],
    "tenant_id": "default",
    "stream": false,
    "top_k": 6
  }'
```

The JSON response follows the familiar Chat Completions shape and adds document references:

```json
{
  "id": "chatcmpl-7be35836faba4bd293da2b738a614ef4",
  "object": "chat.completion",
  "created": 1788166800,
  "model": "gugudata-knowledge-chat",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The installation guide lists Windows 11, macOS 15, and Ubuntu 24.04."
      },
      "finish_reason": "stop"
    }
  ],
  "thread_id": "thread_58f4d66bed57431a8fc6eb63029e1824",
  "message_id": "msg_58dd1240312e41a29e83dc7ba58ac613",
  "sources": [
    {
      "document_id": "doc_7c2f7a27d66a4d80a1b5a18c8434f445",
      "source_name": "installation-guide.pdf",
      "location": "page:3",
      "score": 0.892314,
      "text": "Supported systems: Windows 11, macOS 15, and Ubuntu 24.04."
    }
  ],
  "usage": {
    "top_k": 6,
    "source_count": 1
  }
}
```

If the uploaded documents do not support an answer, the API says that no supporting evidence was found instead of filling the gap with an unsupported claim.

## Manage multi-turn context

Conversation history is client-managed. Send the complete set of relevant `system`, `user`, and `assistant` messages on every request:

```json
{
  "model": "gugudata-knowledge-chat",
  "messages": [
    {"role": "user", "content": "What platforms are supported?"},
    {"role": "assistant", "content": "Windows 11, macOS 15, and Ubuntu 24.04."},
    {"role": "user", "content": "Which Linux version did you mention?"}
  ],
  "thread_id": "installation-session-42",
  "stream": false
}
```

`thread_id` is an optional correlation identifier for your application. It does not reload earlier messages, so the client remains in control of what context is supplied to each answer.

## Stream an answer with SSE

Set `stream` to `true` and accept `text/event-stream` to receive answer text as it is generated:

```bash
curl -N -X POST \
  "https://api.gugudata.io/ai/knowledge-bases/product-manuals/chat/completions?appkey=YOUR_APPKEY" \
  -H "Content-Type: application/json" \
  -H "Accept: text/event-stream" \
  -d '{
    "model": "gugudata-knowledge-chat",
    "messages": [{"role":"user","content":"Summarize the installation steps."}],
    "stream": true
  }'
```

Text arrives in `chat.completion.chunk` events. The final chunk contains `thread_id`, `sources`, `usage`, and `finish_reason: "stop"`, followed by:

```text
data: [DONE]
```

Render text deltas as they arrive, but wait for the final chunk before finalizing citations and usage information.

## Delete a document

```bash
curl -X DELETE \
  "https://api.gugudata.io/ai/knowledge-bases/product-manuals/documents/doc_7c2f7a27d66a4d80a1b5a18c8434f445?tenant_id=default&appkey=YOUR_APPKEY"
```

A successful deletion returns HTTP `204` with no response body. A document that is not available in the selected knowledge base returns `404`.

## Request limits and errors

| HTTP status | Meaning |
| --- | --- |
| `400` | An identifier, message array, JSON value, or parameter is invalid. |
| `404` | The document requested for deletion is unavailable. |
| `413` | The request or an uploaded file exceeds the supported size. |
| `422` | The file format is unsupported, unreadable, or has no usable text. |
| `429` | The applicable request or usage limit has been reached. |
| `502` | An answer could not be generated at this time. |
| `503` | The knowledge-base capability is temporarily unavailable. |

Do not retry `400`, `404`, `413`, or `422` without changing the request. For temporary failures, use bounded retries with backoff and preserve the original `document_id` and client request identifier for reconciliation.

## Integration checklist

- Keep application keys in a trusted server-side environment.
- Use stable knowledge-base and tenant identifiers.
- Save the `document_id` returned for every uploaded source.
- Send only the conversation messages relevant to the current answer.
- Display source name and location beside material claims.
- Treat a no-evidence answer as a valid outcome that needs more source material.
- Delete documents when they are obsolete or no longer authorized for retrieval.
- Test JSON and SSE modes before enabling streaming in the user interface.

Review the current request and response schemas in the [GuGuData OpenAPI document](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json).
