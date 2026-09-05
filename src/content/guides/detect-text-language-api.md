---
title: Detect Text Language API Integration Guide
description: >-
  Detect more than 50 languages and return ranked language codes with confidence
  scores for localization, moderation, search, and content-routing workflows.
slug: detect-text-language-api
date: '2026-04-17'
updated: '2026-09-05'
category: Text
apiName: Detect Text Language
apiMethod: POST
apiEndpoint: /v1/text/detectlanguage
detailUrl: 'https://gugudata.io/details/nlpdetectlanguage'
demoUrl: 'https://api.gugudata.io/v1/text/detectlanguage/demo'
keywords:
  - language detection API
  - text language identifier
  - multilingual content routing
  - language confidence score
featured: false
---

# Detect Text Language API

Identify the most likely language in a text sample and receive ranked candidates with standard two-letter codes and confidence scores.

> [Try the live demo](https://api.gugudata.io/v1/text/detectlanguage/demo) or [view API details](https://gugudata.io/details/nlpdetectlanguage).

## Common uses

- Route support messages to the right language queue.
- Select localized content or translation workflows.
- Organize multilingual documents before indexing.
- Add language signals to moderation and analytics pipelines.

## Request

Send `appkey` as a query parameter and `content` in a JSON body. Text must contain meaningful characters and may contain up to 100,000 Unicode characters or 512 KiB of UTF-8 data.

```bash
curl -X POST "https://api.gugudata.io/v1/text/detectlanguage?appkey=YOUR_APPKEY" \
  -H "Content-Type: application/json" \
  -d '{"content":"Bonjour, ceci est un exemple stable pour identifier la langue française."}'
```

## Response

Candidates are ordered by descending probability. `LanguageAbbr` uses a lowercase two-letter language code; Simplified and Traditional Chinese results are represented as `zh`.

```json
{
  "dataStatus": {
    "requestParameter": "content_chars=72,content_bytes=73",
    "statusCode": 200,
    "status": "SUCCESS",
    "statusDescription": "successfully",
    "responseDateTime": "2026-09-05 05:30:00+0000",
    "dataTotalCount": 1
  },
  "data": [
    {
      "Language": "French",
      "LanguageAbbr": "fr",
      "Probability": 0.999996
    }
  ]
}
```

| Field | Type | Description |
| --- | --- | --- |
| `data[].Language` | `string` | English language name. |
| `data[].LanguageAbbr` | `string` | Lowercase two-letter language code. |
| `data[].Probability` | `number` | Relative confidence from 0 to 1. |

## Detection guidance

Longer natural-language samples generally produce stronger results. Short phrases, names, mixed-language text, URLs, and shared vocabulary can reduce confidence. The API returns ranked candidates without imposing a subjective confidence threshold.

Pure numbers, symbols, or URLs do not provide enough language evidence and return `422`.

## HTTP status codes

| Status | Meaning |
| --- | --- |
| `200` | Language candidates returned. |
| `400` | Missing, empty, malformed, or oversized input. |
| `401` | Missing or invalid application key. |
| `403` | The application key cannot access this API. |
| `422` | Valid text format without detectable language evidence. |
| `429` | Request or usage limit exceeded. |
| `500` | Unexpected processing error. |
| `502` | The detector returned an invalid result. |
| `503` | Language detection is temporarily unavailable. |

Do not automatically retry `400`, `401`, `403`, or `422`. For temporary `502` or `503` responses, use bounded backoff.

## Related APIs

- [Text Similarity Calculator](https://gugudata.io/details/textsimilarity)
- [Simplified and Traditional Chinese Converter](https://gugudata.io/details/stconvert)
- [Chinese Classical Poetry Database](https://gugudata.io/details/chinesepoem)

Explore more developer APIs at [GuGuData](https://gugudata.io/).
