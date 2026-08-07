---
title: Webpage to Markdown API for RAG and Content Pipelines
description: >-
  Convert public web pages into clean Markdown for knowledge bases,
  documentation migration, RAG ingestion, and text analysis.
slug: convert-webpage-to-markdown-api
date: '2026-04-10'
updated: '2026-08-07'
category: Website Tools
apiName: Convert Webpage to Markdown
apiMethod: POST
apiEndpoint: /v1/websitetools/url2markdown
detailUrl: 'https://gugudata.io/details/url2markdown'
demoUrl: 'https://api.gugudata.io/v1/websitetools/url2markdown/demo'
keywords:
  - Convert Webpage to Markdown API
  - GuGuData Convert Webpage to Markdown
  - url2markdown API
  - Website Tools APIs
  - developer API documentation
featured: true
---

# Webpage to Markdown API for RAG and Content Pipelines

Turn public web pages into clean Markdown for RAG ingestion, documentation migration, knowledge bases, and text analysis. The API preserves links and readable structure so you can avoid maintaining custom extraction code.



> Start here: [Try the live demo](https://api.gugudata.io/v1/websitetools/url2markdown/demo) or [view the current API details](https://gugudata.io/details/url2markdown).

## API details

| Item | Value |
| --- | --- |
| API name | Convert Webpage to Markdown |
| Category | Website Tools APIs |
| Method | `POST` |
| Endpoint | `https://api.gugudata.io/v1/websitetools/url2markdown` |
| Content type | `application/json` |
| Demo endpoint | [https://api.gugudata.io/v1/websitetools/url2markdown/demo](https://api.gugudata.io/v1/websitetools/url2markdown/demo) |
| Detail page | [https://gugudata.io/details/url2markdown](https://gugudata.io/details/url2markdown) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

## When to use this API

- Convert public web content into Markdown for documentation workflows.
- Migrate articles into Git-based knowledge bases.
- Prepare web pages for text analysis while preserving links.

## Request parameters

This endpoint accepts parameters through the query string plus request body. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `url` | `string` | Yes | - | Target webpage URL. |

## Example request

```bash
curl -X POST "https://api.gugudata.io/v1/websitetools/url2markdown?appkey=YOUR_APPKEY" \
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
| `dataStatus` | `object` | Yes | Response metadata returned by the API response. |
| `dataStatus.requestParameter` | `string` | Yes | Normalized request parameters echoed by the service. Sensitive credentials are omitted when available. |
| `dataStatus.statusCode` | `integer` | Yes | Application-level status code returned by the API response. |
| `dataStatus.status` | `string` | Yes | Application-level status enum returned by the API response. |
| `dataStatus.statusDescription` | `string` | Yes | Application-level status message returned by the API response. |
| `dataStatus.responseDateTime` | `string` | Yes | Response timestamp returned by the API response. |
| `dataStatus.dataTotalCount` | `integer` | Yes | Total number of records that match the request. |
| `data` | `object` | Yes | Primary response payload returned by the endpoint. |
| `data.result` | `string` | Yes | Markdown content converted from the webpage |

## Response example

```json
{
  "dataStatus": {
    "statusCode": 200,
    "statusDescription": "successfully",
    "responseDateTime": "2026-04-10T00:00:00Z",
    "dataTotalCount": 1,
    "status": "SUCCESS",
    "requestParameter": ""
  },
  "data": {
    "result": "sample value"
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

The official detail page is [https://gugudata.io/details/url2markdown](https://gugudata.io/details/url2markdown). It is the best place to review the latest public endpoint information before publishing or integrating.

### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

## Related GuGuData APIs

- [Webpage Readable Content Extraction](https://gugudata.io/details/readability)
- [Domain SSL Certificate Information Parsing](https://gugudata.io/details/sslcertinfo)
- [Domain DNS Information Query](https://gugudata.io/details/dnslookup)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
