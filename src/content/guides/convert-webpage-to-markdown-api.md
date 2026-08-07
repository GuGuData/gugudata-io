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
  - webpage to Markdown for RAG
  - URL to Markdown API
  - website content ingestion
  - knowledge base pipeline
featured: true
---

# Webpage to Markdown API for RAG and Content Pipelines

Turning a webpage into plain text is easy. Turning it into Markdown that remains useful inside a retrieval pipeline is harder: navigation can overwhelm the article, headings may disappear, and links can lose their context. This guide shows how to use a webpage-to-Markdown API as one stage in a production RAG or content-ingestion workflow.



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

- Convert public documentation into Markdown before chunking and embedding.
- Migrate articles into Git-based knowledge bases while retaining headings and links.
- Normalize public webpages for search indexing, classification, summarization, or change tracking.
- Remove browser automation and HTML parsing from an application that only needs readable content.

## Why Markdown is useful for RAG ingestion

Raw HTML contains presentation and navigation elements that usually add noise to retrieval. Plain text removes that noise, but it also removes useful document structure. Markdown provides a practical middle layer:

- Headings remain explicit chunk boundaries.
- Lists and tables retain more meaning than flattened text.
- Links preserve citations and follow-up context.
- The output is readable during debugging and can be stored in Git or object storage.

Markdown conversion is not the whole ingestion pipeline. You should still validate the source URL, store provenance, split the result into task-appropriate chunks, and decide when stale pages need to be fetched again.

## Recommended ingestion workflow

1. Normalize and validate the URL before sending it to the API.
2. Convert the webpage to Markdown.
3. Reject empty or unexpectedly short results.
4. Store the source URL, retrieval time, content hash, and Markdown together.
5. Split on headings first, then apply a token-size limit inside long sections.
6. Embed or index only after the content passes your quality checks.

This separation makes failures easier to diagnose. A fetch or conversion failure should not be confused with an embedding, indexing, or retrieval-quality problem.

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

## Node.js ingestion example

The following example keeps the AppKey on the server, verifies both HTTP and application-level status, and returns provenance alongside the Markdown.

```javascript
async function webpageToMarkdown(sourceUrl) {
  const endpoint = new URL(
    "https://api.gugudata.io/v1/websitetools/url2markdown",
  );
  endpoint.searchParams.set("appkey", process.env.GUGUDATA_APPKEY);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: sourceUrl }),
  });

  if (!response.ok) {
    throw new Error(`Conversion failed with HTTP ${response.status}`);
  }

  const payload = await response.json();
  if (payload.dataStatus?.statusCode !== 200) {
    throw new Error(payload.dataStatus?.statusDescription ?? "Conversion failed");
  }

  const markdown = payload.data?.result?.trim();
  if (!markdown) {
    throw new Error("The conversion returned empty Markdown");
  }

  return {
    sourceUrl,
    retrievedAt: new Date().toISOString(),
    markdown,
  };
}
```

Use an environment variable or secret manager for the AppKey. Do not expose it in browser-side JavaScript or commit it to a repository.

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

- Validate the URL and allow only the schemes and destinations your application intends to process.
- Keep server-side retries conservative for `429`, `500`, and `503`; retrying a malformed URL will not help.
- Log the source URL, HTTP status, application status, duration, and output length without logging the AppKey.
- Use a content hash to avoid embedding unchanged pages repeatedly.
- Keep the original URL and retrieval timestamp with every chunk so answers can cite their source.
- Run the demo endpoint for a connectivity check, then test the authenticated endpoint with representative pages from your own workload.

## How to evaluate conversion quality

Do not judge a webpage converter from one clean blog post. Build a small evaluation set that represents the pages your product actually ingests.

| Check | What to inspect |
| --- | --- |
| Main-content coverage | Important paragraphs are present and in the correct order. |
| Structural fidelity | Headings, lists, tables, and code blocks remain understandable. |
| Noise level | Navigation, cookie notices, and repeated footer text do not dominate the result. |
| Link preservation | Important citations and internal references remain usable. |
| Determinism | Reprocessing an unchanged page does not create unnecessary differences. |
| Failure behavior | Empty, blocked, redirected, and invalid pages produce observable errors. |

Measure these checks before comparing price or latency. A fast conversion that produces poor retrieval chunks usually creates more work downstream.

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
