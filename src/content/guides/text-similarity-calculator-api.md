---
title: Text Similarity Calculator API Integration Guide
description: >-
  Learn how to integrate the Text Similarity Calculator API with documented
  request parameters, response fields, error handling, and practical examples.
slug: text-similarity-calculator-api
date: '2026-04-10'
updated: '2026-08-07'
category: Text
apiName: Text Similarity Calculator
apiMethod: POST
apiEndpoint: /v1/text/similarity
detailUrl: 'https://gugudata.io/details/textsimilarity'
demoUrl: 'https://api.gugudata.io/v1/text/similarity/demo'
keywords:
  - Text Similarity Calculator API
  - GuGuData Text Similarity Calculator
  - textsimilarity API
  - Text Processing APIs
  - developer API documentation
featured: false
---

# Text Similarity Calculator API Integration Guide

The Text Similarity Calculator API from GuGuData helps developers calculate semantic similarity between two text inputs using the documented text similarity model.



> Start here: [Try the live demo](https://api.gugudata.io/v1/text/similarity/demo) or [view the current API details](https://gugudata.io/details/textsimilarity).

## API details

| Item | Value |
| --- | --- |
| API name | Text Similarity Calculator |
| Category | Text Processing APIs |
| Method | `POST` |
| Endpoint | `https://api.gugudata.io/v1/text/similarity` |
| Content type | `application/json` |
| Demo endpoint | [https://api.gugudata.io/v1/text/similarity/demo](https://api.gugudata.io/v1/text/similarity/demo) |
| Detail page | [https://gugudata.io/details/textsimilarity](https://gugudata.io/details/textsimilarity) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

## When to use this API

- Compare two pieces of text for semantic similarity.
- Build duplicate detection and matching workflows.
- Score text pairs before search, review, or moderation.

## Request parameters

This endpoint accepts parameters through the query string plus request body. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `content1` | `string` | Yes | - | First text input used in the semantic similarity calculation. |
| `content2` | `string` | Yes | - | Second text input used in the semantic similarity calculation. |

## Example request

```bash
curl -X POST "https://api.gugudata.io/v1/text/similarity?appkey=YOUR_APPKEY" \
  -H "Content-Type: application/json" \
  -d '
{
  "content1": "The weather is good today.",
  "content2": "It is a sunny day."
}
'
```

## Response fields

The response body contains the fields below for successful JSON responses. For binary endpoints, the success response is returned as binary content and JSON is used for error responses.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dataStatus` | `object` | Yes | Response metadata. `dataStatus.statusCode` is a response body status field, not the HTTP status code. |
| `dataStatus.requestParameter` | `string` | Yes | Normalized request parameters echoed by the service. Sensitive credentials are omitted when available. |
| `dataStatus.statusCode` | `integer` | Yes | Response body status field. Successful demo responses currently return `100`. |
| `dataStatus.statusDescription` | `string` | Yes | Response body status message. Successful demo responses currently return a Chinese message. |
| `dataStatus.responseDateTime` | `string` | Yes | Response timestamp returned by the API response. |
| `dataStatus.dataTotalCount` | `integer` | Yes | Total number of records that match the request. |
| `data` | `object` | Yes | Primary response payload returned by the endpoint. |
| `data.similarity` | `string` | Yes | Similarity score returned as a string by the current API contract. |

## Response example

```json
{
  "dataStatus": {
    "statusCode": 100,
    "statusDescription": "请求成功。",
    "responseDateTime": "2026-04-10T00:00:00Z",
    "dataTotalCount": 1,
    "requestParameter": ""
  },
  "data": {
    "similarity": "sample value"
  }
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
- Cache stable metadata responses when your use case allows it, especially for lookup and directory endpoints.
- Log the HTTP status code and `dataStatus.statusDescription` together for easier debugging.
- Use the demo endpoint for a quick connectivity check, then switch to the authenticated endpoint for production data.

## FAQ

### Where is the official API detail page?

The official detail page is [https://gugudata.io/details/textsimilarity](https://gugudata.io/details/textsimilarity). It is the best place to review the latest public endpoint information before publishing or integrating.

### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

## Related GuGuData APIs

- [HTML/URL to PDF](https://gugudata.io/details/html2pdf)
- [Webpage Readable Content Extraction](https://gugudata.io/details/readability)
- [Domain SSL Certificate Information Parsing](https://gugudata.io/details/sslcertinfo)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
