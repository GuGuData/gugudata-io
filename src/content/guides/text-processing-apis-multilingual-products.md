---
title: Text Processing APIs for Multilingual Developer Products
description: >-
  A developer guide to GuGuData text processing APIs for language detection,
  similarity, Chinese conversion, poems, ISBN lookup, and content enrichment
  workflows.
slug: text-processing-apis-multilingual-products
date: '2026-04-29'
updated: '2026-08-07'
category: Collections
keywords:
  - text processing API
  - language detection API
  - text similarity API
  - ISBN lookup API
  - GuGuData text APIs
featured: false
---

# Text Processing APIs for Multilingual Developer Products

Text processing is a common layer in search, publishing, content review, data enrichment, and multilingual products. Applications need to detect languages, compare text, normalize Chinese scripts, enrich book records, or retrieve structured cultural content.

GuGuData text APIs provide focused endpoints for these workflows. This guide explains how to choose the right API and how to combine them safely in backend systems.

## API lineup

| Workflow | Method | Endpoint | Detail page |
| --- | --- | --- | --- |
| Text language detection | `POST` | `/v1/text/detectlanguage` | [Detect Text Language](https://gugudata.io/details/nlpdetectlanguage) |
| Text similarity | `POST` | `/v1/text/similarity` | [Text Similarity Calculator](https://gugudata.io/details/textsimilarity) |
| Simplified and Traditional Chinese conversion | `POST` | `/v1/text/stconvert` | [Simplified and Traditional Chinese Converter](https://gugudata.io/details/stconvert) |
| Chinese poem lookup | `GET` | `/v1/text/chinese-poem` | [Chinese Poem Query](https://gugudata.io/details/chinesepoem) |
| ISBN book metadata lookup | `GET` | `/v1/text/isbn` | [ISBN Book Metadata Lookup](https://gugudata.io/details/isbn) |

The public OpenAPI JSON is available at [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json).

## When to use these APIs

- Route user content by detected language before translation, moderation, or indexing.
- Compare two pieces of text for semantic similarity in search, deduplication, or review workflows.
- Normalize Simplified and Traditional Chinese content for publishing and regional display.
- Enrich book records from ISBN or title keywords.
- Add structured Chinese poem content to education, literature, or cultural products.

## Choosing the right endpoint

Use language detection before language-specific processing, especially when input can come from many countries or regions. Use text similarity when the question is whether two text inputs are semantically close enough for your product workflow.

Use Chinese conversion when the script needs to match a target locale. Use ISBN lookup when your source data contains book identifiers or title keywords. Use Chinese poem lookup when the product needs structured poem content rather than free-form search results.

## Example requests

Detect the language of text:

```bash
curl -X POST "https://api.gugudata.io/v1/text/detectlanguage?appkey=YOUR_APPKEY" \
  -H "Content-Type: application/json" \
  -d '
{
  "content": "GuGuData provides API products for developers around the world."
}
'
```

Search book metadata by ISBN:

```bash
curl "https://api.gugudata.io/v1/text/isbn?appkey=YOUR_APPKEY&isbn=9780141182803&pageIndex=1&pageSize=10"
```

## Response handling

Text APIs use the standard GuGuData JSON response shape:

```json
{
  "dataStatus": {
    "statusCode": 200,
    "status": "SUCCESS",
    "statusDescription": "successfully",
    "responseDateTime": "2026-04-29T00:00:00Z",
    "dataTotalCount": 1,
    "requestParameter": ""
  },
  "data": [
    {
      "Language": "English",
      "LanguageAbbr": "en",
      "Probability": 0.999341
    }
  ]
}
```

For ranking or confidence-based results, define product-level thresholds in your own service instead of treating every result as equally strong.

## HTTP status codes

| HTTP status | Meaning | Recommended handling |
| --- | --- | --- |
| `200` | Request processed successfully. | Parse the documented response body for the endpoint result. |
| `400` | Invalid request parameters or request format. | Check required fields, text length, and query parameters. |
| `401` | Missing or unknown application key. | Send a valid `appkey` with the request. |
| `403` | The application key is recognized but access is not allowed. | Check subscription, trial state, and endpoint access. |
| `429` | Request rate or trial usage limit exceeded. | Reduce concurrency or retry after the limit window resets. |
| `500` | Internal service error. | Retry later or contact support if the error persists. |
| `503` | Upstream service unavailable. | Retry later when the dependency is available again. |

## Implementation notes

- Keep API calls server-side so the `appkey` is not exposed in public frontend code.
- Normalize input text before similarity checks if whitespace, punctuation, or casing should not affect your workflow.
- Store confidence scores and detected language codes with downstream records.
- Use explicit thresholds for automated actions and route uncertain results to review when needed.
- Cache stable lookup results such as ISBN metadata when your product allows it.

## FAQ

### Should I use language detection before translation?

Yes. Language detection helps route content to the right downstream workflow and can reduce incorrect assumptions when users submit multilingual content.

### Can text similarity replace business review rules?

No. Treat text similarity as one signal. Product-level thresholds, review queues, and domain-specific rules should still be defined in your own application.

### Is ISBN lookup only for exact ISBN searches?

No. The endpoint supports ISBN lookup and keyword search fields, so it can be used for exact book matching and broader title discovery workflows.

For more developer APIs, visit [GuGuData](https://gugudata.io/).
