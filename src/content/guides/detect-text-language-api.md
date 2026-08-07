---
title: Detect Text Language API Integration Guide
description: >-
  Learn how to integrate the Detect Text Language API with documented request
  parameters, response fields, error handling, and practical examples.
slug: detect-text-language-api
date: '2026-04-17'
updated: '2026-08-07'
category: Text
apiName: Detect Text Language
apiMethod: POST
apiEndpoint: /v1/text/detectlanguage
detailUrl: 'https://gugudata.io/details/nlpdetectlanguage'
demoUrl: 'https://api.gugudata.io/v1/text/detectlanguage/demo'
keywords:
  - Detect Text Language API
  - GuGuData Detect Text Language
  - nlpdetectlanguage API
  - Text Processing APIs
  - developer API documentation
featured: false
---

# Detect Text Language API Integration Guide

The Detect Text Language API from GuGuData helps developers detect the most likely language of a text snippet and return ranked language candidates with confidence scores.



> Start here: [Try the live demo](https://api.gugudata.io/v1/text/detectlanguage/demo) or [view the current API details](https://gugudata.io/details/nlpdetectlanguage).

## API details

| Item | Value |
| --- | --- |
| API name | Detect Text Language |
| Category | Text Processing APIs |
| Method | `POST` |
| Endpoint | `https://api.gugudata.io/v1/text/detectlanguage` |
| Content type | `application/json` |
| Demo endpoint | [https://api.gugudata.io/v1/text/detectlanguage/demo](https://api.gugudata.io/v1/text/detectlanguage/demo) |
| Detail page | [https://gugudata.io/details/nlpdetectlanguage](https://gugudata.io/details/nlpdetectlanguage) |

## When to use this API

- Detect the language of user-generated content before routing or moderation.
- Normalize multilingual form submissions, chatbot messages, or search queries.
- Add language-aware processing to content pipelines without maintaining a custom classifier.

## Request parameters

This endpoint accepts parameters through the query string plus request body. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `content` | `string` | Yes | - | Text content to analyze. |

## Example request

```bash
curl -X POST "https://api.gugudata.io/v1/text/detectlanguage?appkey=YOUR_APPKEY" \
  -H "Content-Type: application/json" \
  -d '
{
  "content": "Bonjour, ceci est un exemple de texte."
}
'
```

## Response fields

The response body contains the fields below for successful JSON responses. For binary endpoints, the success response is returned as binary content and JSON is used for error responses.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dataStatus` | `object` | Yes | Response metadata returned by the API response. |
| `dataStatus.requestParameter` | `string` | Yes | Normalized request parameters echoed by the service. Sensitive credentials are omitted when available. |
| `dataStatus.statusCode` | `integer` | Yes | Application-level status code returned by the API response. |
| `dataStatus.statusDescription` | `string` | Yes | Application-level status message returned by the API response. |
| `dataStatus.responseDateTime` | `string` | Yes | Response timestamp returned by the API response. |
| `dataStatus.dataTotalCount` | `integer` | Yes | Total number of records that match the request. |
| `data` | `array<object>` | Yes | Ranked language detection results returned by the endpoint. |
| `data[].Language` | `string` | Yes | Detected language name. |
| `data[].LanguageAbbr` | `string` | Yes | Language code such as `en`, `fr`, or `zh`. |
| `data[].Probability` | `number` | Yes | Confidence score of the detected language. |

## Response example

```json
{
  "dataStatus": {
    "statusCode": 200,
    "statusDescription": "successfully",
    "responseDateTime": "2026-04-17T00:00:00Z",
    "dataTotalCount": 1,
    "requestParameter": ""
  },
  "data": [
    {
      "Language": "French",
      "LanguageAbbr": "fr",
      "Probability": 0.98
    }
  ]
}
```

## HTTP status codes

Use the HTTP status code for transport-level handling. If the response body contains `dataStatus.statusCode`, treat it as an application-level status field in the JSON payload.

| HTTP status | Meaning | Recommended handling |
| --- | --- | --- |
| `200` | Request processed successfully. | Parse the documented response body for the endpoint result. |
| `400` | Invalid request parameters or request format. | Check required fields, data types, and request body format. |
| `401` | Missing or unknown application key. | Send a valid appkey with the request. |
| `403` | The application key is recognized but access is not allowed. | Check subscription, trial state, and endpoint access. |
| `429` | Request rate or trial usage limit exceeded. | Reduce concurrency or retry after the limit window resets. |
| `500` | Internal service error. | Retry later or contact support if the error persists. |
| `503` | Upstream service unavailable. | Retry later when the dependency is available again. |

## Implementation notes

- Validate required parameters before sending the request so `400` responses are easier to diagnose.
- Keep server-side retries conservative for `429`, `500`, and `503` responses.
- Cache stable language detection results when the same source text is processed repeatedly.
- Log the HTTP status code and `dataStatus.statusDescription` together for easier debugging.
- Use the demo endpoint for a quick connectivity check, then switch to the authenticated endpoint for production data.

## FAQ

### Where is the official API detail page?

The official detail page is [https://gugudata.io/details/nlpdetectlanguage](https://gugudata.io/details/nlpdetectlanguage). It is the best place to review the latest public endpoint information before publishing or integrating.

### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

## Related GuGuData APIs

- [Text Similarity Calculator](https://gugudata.io/details/textsimilarity)
- [Simplified and Traditional Chinese Converter](https://gugudata.io/details/stconvert)
- [Chinese Classical Poetry Database](https://gugudata.io/details/chinesepoem)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
