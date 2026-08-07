---
title: US Stock Symbols Directory API Integration Guide
description: >-
  Learn how to integrate the US Stock Symbols Directory API with documented
  request parameters, response fields, error handling, and practical examples.
slug: us-stock-symbols-directory-api
date: '2026-04-10'
updated: '2026-08-07'
category: Data
apiName: US Stock Symbols Directory
apiMethod: GET
apiEndpoint: /v1/stock/us/symbols
detailUrl: 'https://gugudata.io/details/us-stock-symbols'
demoUrl: 'https://api.gugudata.io/v1/stock/us/symbols/demo'
keywords:
  - US Stock Symbols Directory API
  - GuGuData US Stock Symbols Directory
  - us-stock-symbols API
  - Metadata APIs
  - developer API documentation
featured: false
---

# US Stock Symbols Directory API Integration Guide

The US Stock Symbols Directory API from GuGuData helps developers search United States stock ticker symbols and company names with paginated results.



> Start here: [Try the live demo](https://api.gugudata.io/v1/stock/us/symbols/demo) or [view the current API details](https://gugudata.io/details/us-stock-symbols).

## API details

| Item | Value |
| --- | --- |
| API name | US Stock Symbols Directory |
| Category | Metadata APIs |
| Method | `GET` |
| Endpoint | `https://api.gugudata.io/v1/stock/us/symbols` |
| Content type | `query parameters` |
| Demo endpoint | [https://api.gugudata.io/v1/stock/us/symbols/demo](https://api.gugudata.io/v1/stock/us/symbols/demo) |
| Detail page | [https://gugudata.io/details/us-stock-symbols](https://gugudata.io/details/us-stock-symbols) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

## When to use this API

- Search United States stock symbols and company names.
- Build ticker lookup in finance tools.
- Normalize US market symbol metadata.

## Request parameters

This endpoint accepts parameters through the query string. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `query` | `string` | No | - | Search keyword used for partial matching against the documented dataset fields. |
| `pageIndex` | `integer` | No | `1` | One-based page index for pagination. |
| `pageSize` | `integer` | No | `20` | Number of records returned per page. |

## Example request

```bash
curl -G "https://api.gugudata.io/v1/stock/us/symbols" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "query=AAPL" \
  --data-urlencode "pageIndex=1" \
  --data-urlencode "pageSize=20"
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
| `data` | `array<string>` | Yes | Primary response payload returned by the endpoint. |
| `data[].symbol` | `string` | Yes | US stock ticker symbol |
| `data[].stockName` | `string` | Yes | English company name returned by the dataset. |

## Response example

```json
{
  "dataStatus": {
    "statusCode": 100,
    "statusDescription": "请求成功",
    "responseDateTime": "2026-04-10T00:00:00Z",
    "dataTotalCount": 1,
    "requestParameter": ""
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

The official detail page is [https://gugudata.io/details/us-stock-symbols](https://gugudata.io/details/us-stock-symbols). It is the best place to review the latest public endpoint information before publishing or integrating.

### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

## Related GuGuData APIs

- [Global QS World University Rankings](https://gugudata.io/details/qs-global-university-ranking)
- [Chinese Classical Poetry Database](https://gugudata.io/details/chinesepoem)
- [Global University Data](https://gugudata.io/details/global-university)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
