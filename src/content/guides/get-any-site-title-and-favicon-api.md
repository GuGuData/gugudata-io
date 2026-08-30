---
title: Website Metadata and Favicon API Integration Guide
description: >-
  Fetch website titles, verified favicon URLs, descriptions, and keywords for
  link previews, directories, company profiles, and enrichment workflows.
slug: get-any-site-title-and-favicon-api
date: '2026-04-10'
updated: '2026-08-30'
category: Website Tools
apiName: Website Metadata and Favicon API
apiMethod: GET
apiEndpoint: /v1/websitetools/favicon
detailUrl: 'https://gugudata.io/details/favicon'
demoUrl: 'https://api.gugudata.io/v1/websitetools/favicon/demo'
keywords:
  - Get Any Site Title and Favicon API
  - GuGuData Get Any Site Title and Favicon
  - favicon API
  - Website Tools APIs
  - developer API documentation
featured: false
---

# Website Metadata and Favicon API Integration Guide

The Website Metadata and Favicon API from GuGuData returns a public page title, a usable favicon URL, description, and keywords from a URL or domain. When a page has no usable website icon, the response keeps the metadata and returns `favicon: null`.



> Start here: [Try the live demo](https://api.gugudata.io/v1/websitetools/favicon/demo) or [view the current API details](https://gugudata.io/details/favicon).

## API details

| Item | Value |
| --- | --- |
| API name | Website Metadata and Favicon API |
| Category | Website Tools APIs |
| Method | `GET` |
| Endpoint | `https://api.gugudata.io/v1/websitetools/favicon` |
| Content type | `query parameters` |
| Demo endpoint | [https://api.gugudata.io/v1/websitetools/favicon/demo](https://api.gugudata.io/v1/websitetools/favicon/demo) |
| Detail page | [https://gugudata.io/details/favicon](https://gugudata.io/details/favicon) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

## When to use this API

- Fetch a site title and usable favicon for link previews.
- Enrich bookmark, CRM, and discovery tools.
- Normalize title, description, and keyword metadata for UI cards.

## Request parameters

This endpoint accepts parameters through the query string. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `url` | `string` | Yes | - | Public HTTP or HTTPS URL or domain. Domains without a scheme use HTTPS. |

## Example request

```bash
curl -G "https://api.gugudata.io/v1/websitetools/favicon" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "url=https://gugudata.io/"
```

## Response fields

The response body contains the fields below for successful requests.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dataStatus.requestParameter` | `string` | Yes | Normalized request parameters echoed by the service. Sensitive credentials are omitted when available. |
| `dataStatus.statusCode` | `integer` | Yes | Application-level status code returned by the API response. |
| `dataStatus.status` | `string` | Yes | Application-level status enum returned by the API response. |
| `dataStatus.statusDescription` | `string` | Yes | Application-level status message returned by the API response. |
| `dataStatus.responseDateTime` | `string` | Yes | Response timestamp returned by the API response. |
| `dataStatus.dataTotalCount` | `integer` | Yes | Total number of records that match the request. |
| `data.title` | `string` | Yes | Site title |
| `data.favicon` | `string \| null` | Yes | Usable favicon URL, or `null` when the page has no usable website icon. |
| `data.description` | `string` | Yes | Site description, or an empty string when unavailable. |
| `data.keywords` | `string` | Yes | Site keywords, or an empty string when unavailable. |

## Response example

```json
{
  "dataStatus": {
    "statusCode": 200,
    "statusDescription": "successfully",
    "responseDateTime": "2026-08-25T08:00:00Z",
    "dataTotalCount": 1,
    "status": "SUCCESS",
    "requestParameter": "url=https://gugudata.io/"
  },
  "data": {
    "title": "GuGuData.io - Unlimited API Marketplace",
    "favicon": "https://gugudata.io/favicon.ico",
    "description": "Production-ready APIs for data, documents, websites, and automation.",
    "keywords": "API marketplace, developer APIs"
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
| `502` | The target timed out, refused the request, returned non-HTML content, or returned an invalid response. | Check the target page and retry later if the failure is temporary. |
| `503` | Website metadata capability is temporarily unavailable. | Retry later or contact support if the error persists. |

## Implementation notes

- Validate required parameters before sending the request so `400` responses are easier to diagnose.
- Keep server-side retries conservative for `429`, `502`, and `503` responses.
- Cache stable metadata responses when your use case allows it, especially for lookup and directory endpoints.
- Treat `favicon: null` as a valid result and render a product-defined placeholder when needed.
- Log the HTTP status code and `dataStatus.statusDescription` together for easier debugging.
- Use the demo endpoint for a quick connectivity check, then switch to the authenticated endpoint for production data.

## FAQ

### Where is the official API detail page?

The official detail page is [https://gugudata.io/details/favicon](https://gugudata.io/details/favicon). It is the best place to review the latest public endpoint information before publishing or integrating.

### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

## Related GuGuData APIs

- [Webpage Readable Content Extraction](https://gugudata.io/details/readability)
- [Domain SSL Certificate Information Parsing](https://gugudata.io/details/sslcertinfo)
- [Domain DNS Information Query](https://gugudata.io/details/dnslookup)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
