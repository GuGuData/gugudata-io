---
title: Article Extractor API Integration Guide
description: >-
  Learn how to integrate the Article Extractor API with documented request
  parameters, response fields, error handling, and practical examples.
slug: article-extractor-api
date: '2026-04-10'
updated: '2026-08-07'
category: Website Tools
apiName: Article Extractor
apiMethod: POST
apiEndpoint: /v1/article/extract
detailUrl: 'https://gugudata.io/details/article-extract'
demoUrl: 'https://api.gugudata.io/v1/article/extract/demo'
keywords:
  - Article Extractor API
  - GuGuData Article Extractor
  - article-extract API
  - Website Tools APIs
  - developer API documentation
featured: false
---

# Article Extractor API Integration Guide

The Article Extractor API from GuGuData helps developers extract the primary article content, title, byline, publication date, and clean body text from a target webpage or raw HTML input.



> Start here: [Try the live demo](https://api.gugudata.io/v1/article/extract/demo) or [view the current API details](https://gugudata.io/details/article-extract).

## API details

| Item | Value |
| --- | --- |
| API name | Article Extractor |
| Category | Website Tools APIs |
| Method | `POST` |
| Endpoint | `https://api.gugudata.io/v1/article/extract` |
| Content type | `application/json` |
| Demo endpoint | [https://api.gugudata.io/v1/article/extract/demo](https://api.gugudata.io/v1/article/extract/demo) |
| Detail page | [https://gugudata.io/details/article-extract](https://gugudata.io/details/article-extract) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

## When to use this API

- Extract article title, author, and body content from target pages.
- Build article ingestion workflows for research or monitoring.
- Normalize web article content before analysis.

## Request parameters

This endpoint accepts parameters through the query string plus request body. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `url` | `string` | Yes | - | Target webpage URL. |

## Example request

```bash
curl -X POST "https://api.gugudata.io/v1/article/extract?appkey=YOUR_APPKEY" \
  -H "Content-Type: application/json" \
  -d '
{
  "url": "https://example.com/article"
}
'
```

## Response fields

The response body contains the fields below for successful JSON responses. For binary endpoints, the success response is returned as binary content and JSON is used for error responses.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `DataStatus.StatusCode` | `integer` | Yes | Application-level status code returned by the API response. |
| `DataStatus.StatusDescription` | `string` | Yes | Application-level status message returned by the API response. |
| `DataStatus.ResponseDateTime` | `string` | Yes | Response timestamp returned by the API response. |
| `DataStatus.DataTotalCount` | `integer` | Yes | Total number of records that match the request. |
| `Data.url` | `string` | Yes | Source URL of the article |
| `Data.title` | `string` | Yes | Extracted article title |
| `Data.description` | `string` | No | Article description/summary |
| `Data.links` | `array<string>` | No | Array of links contained in the article |
| `Data.image` | `string` | No | Main article image URL |
| `Data.content` | `string` | Yes | Extracted article content (HTML format, with ads and navigation removed) |
| `Data.author` | `string` | No | Article author (if available, may be empty string) |
| `Data.favicon` | `string` | No | Website favicon URL |
| `Data.source` | `string` | No | Source website domain (e.g., sohu.com) |
| `Data.published` | `string` | No | Article publication date/time (format: YYYY-MM-DD HH:MM) |
| `Data.ttr` | `integer` | No | Estimated reading time (Time to Read, in minutes) |
| `Data.type` | `string` | No | Article type (e.g., news, article, etc.) |

## Response example

```json
{
  "dataStatus": {
    "statusCode": 200,
    "statusDescription": "successfully",
    "responseDateTime": "2026-04-10T00:00:00Z",
    "dataTotalCount": 1
  },
  "data": "sample value"
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

The official detail page is [https://gugudata.io/details/article-extract](https://gugudata.io/details/article-extract). It is the best place to review the latest public endpoint information before publishing or integrating.

### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

## Related GuGuData APIs

- [Webpage Readable Content Extraction](https://gugudata.io/details/readability)
- [Domain SSL Certificate Information Parsing](https://gugudata.io/details/sslcertinfo)
- [Domain DNS Information Query](https://gugudata.io/details/dnslookup)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
