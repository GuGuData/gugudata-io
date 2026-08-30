---
title: ISBN Book Metadata Lookup API Integration Guide
description: >-
  Search books by ISBN or title and retrieve publishing metadata, authors,
  translators, introductions, page counts, bindings, and cover images.
slug: isbn-book-metadata-lookup-api
date: '2026-04-17'
updated: '2026-08-30'
category: Text
apiName: ISBN Book Metadata Lookup
apiMethod: GET
apiEndpoint: /v1/text/isbn
detailUrl: 'https://gugudata.io/details/isbn'
demoUrl: 'https://api.gugudata.io/v1/text/isbn/demo'
keywords:
  - ISBN Book Metadata Lookup API
  - GuGuData ISBN Book Metadata Lookup
  - isbn API
  - Text Processing APIs
  - developer API documentation
featured: false
---

# ISBN Book Metadata Lookup API Integration Guide

The GuGuData ISBN Book Metadata Lookup API searches by ISBN or title keywords and returns a structured book record. Available fields include the title, author, translator, publisher, publication date, page count, binding, book and author introductions, and cover image.



> Start here: [Try the live demo](https://api.gugudata.io/v1/text/isbn/demo) or [view the current API details](https://gugudata.io/details/isbn).

## API details

| Item | Value |
| --- | --- |
| API name | ISBN Book Metadata Lookup |
| Category | Text Processing APIs |
| Method | `GET` |
| Endpoint | `https://api.gugudata.io/v1/text/isbn` |
| Content type | `query parameters` |
| Demo endpoint | [https://api.gugudata.io/v1/text/isbn/demo](https://api.gugudata.io/v1/text/isbn/demo) |
| Detail page | [https://gugudata.io/details/isbn](https://gugudata.io/details/isbn) |

## When to use this API

- Populate bookstore, library, publishing, and education catalogs from an ISBN.
- Discover books by title keywords when the exact identifier is unavailable.
- Enrich product pages and reading lists with covers, introductions, and publishing details.

## Request parameters

This endpoint accepts parameters through the query string. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `isbn` | `string` | No | - | ISBN number for an exact book lookup. |
| `keywords` | `string` | No | - | Book title keywords for fuzzy search. |
| `pageIndex` | `integer` | No | `1` | Page number used for keyword search. |
| `pageSize` | `integer` | No | `10` | Page size used for keyword search. |

## Example request

```bash
curl -G "https://api.gugudata.io/v1/text/isbn" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "isbn=9780132350884" \
  --data-urlencode "pageIndex=1" \
  --data-urlencode "pageSize=10"
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
| `data` | `array<object>` | Yes | Book metadata records returned by the endpoint. |
| `data[].Title` | `string` | No | Book title. |
| `data[].Author` | `string` | No | Author name. |
| `data[].ISBN` | `string` | No | ISBN number of the book. |
| `data[].Publisher` | `string` | No | Publisher name. |
| `data[].PublisherDateTime` | `string` | No | Publication date or year. |
| `data[].PageNumber` | `integer` | No | Number of pages. |
| `data[].Binding` | `string` | No | Binding type. |
| `data[].BriefIntroduction` | `string` | No | Short introduction or summary. |
| `data[].CoverImage` | `string` | No | Book cover image URL. |

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
      "Title": "Sample Book",
      "Author": "Sample Author",
      "ISBN": "9780132350884",
      "Publisher": "Sample Publisher",
      "PublisherDateTime": "2026",
      "PageNumber": 320,
      "Binding": "Paperback",
      "BriefIntroduction": "Sample introduction",
      "CoverImage": "https://example.com/cover.jpg"
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

- Prefer `isbn` for exact lookup and use `keywords` with pagination for discovery workflows.
- Validate that at least one lookup parameter is provided before sending the request.
- Cache stable book metadata when your use case allows it.
- Log the HTTP status code and `dataStatus.statusDescription` together for easier debugging.
- Use the demo endpoint for a quick connectivity check, then switch to the authenticated endpoint for production data.

## FAQ

### Where is the official API detail page?

The official detail page is [https://gugudata.io/details/isbn](https://gugudata.io/details/isbn). It is the best place to review the latest public endpoint information before publishing or integrating.

### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

## Related GuGuData APIs

- [Chinese Classical Poetry Database](https://gugudata.io/details/chinesepoem)
- [Global University Data](https://gugudata.io/details/global-university)
- [Text Similarity Calculator](https://gugudata.io/details/textsimilarity)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
