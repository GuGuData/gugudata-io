---
title: Chinese Classical Poetry Database API Integration Guide
description: >-
  Learn how to integrate the Chinese Classical Poetry Database API with
  documented request parameters, response fields, error handling, and practical
  examples.
slug: chinese-classical-poetry-database-api
date: '2026-04-10'
updated: '2026-08-24'
category: Data
apiName: Chinese Classical Poetry Database
apiMethod: GET
apiEndpoint: /v1/text/chinese-poem
detailUrl: 'https://gugudata.io/details/chinesepoem'
demoUrl: 'https://api.gugudata.io/v1/text/chinese-poem/demo'
keywords:
  - Chinese Classical Poetry Database API
  - GuGuData Chinese Classical Poetry Database
  - chinesepoem API
  - Metadata APIs
  - developer API documentation
featured: false
---

# Chinese Classical Poetry Database API Integration Guide

The Chinese Classical Poetry Database API from GuGuData helps developers search Chinese classical poetry, including Tang poetry, Song poetry, and Song lyrics, with keyword and type filters.



> Start here: [Try the live demo](https://api.gugudata.io/v1/text/chinese-poem/demo) or [view the current API details](https://gugudata.io/details/chinesepoem).

## API details

| Item | Value |
| --- | --- |
| API name | Chinese Classical Poetry Database |
| Category | Metadata APIs |
| Method | `GET` |
| Endpoint | `https://api.gugudata.io/v1/text/chinese-poem` |
| Content type | `query parameters` |
| Demo endpoint | [https://api.gugudata.io/v1/text/chinese-poem/demo](https://api.gugudata.io/v1/text/chinese-poem/demo) |
| Detail page | [https://gugudata.io/details/chinesepoem](https://gugudata.io/details/chinesepoem) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

## When to use this API

- Search Chinese classical poetry by keyword and type.
- Build education and cultural content tools.
- Use poetry metadata in language learning applications.

## Request parameters

This endpoint accepts parameters through the query string. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `keywords` | `string` | No | - | Literal keyword, up to 100 characters. Simplified Chinese also matches traditional Chinese poem content. |
| `pagesize` | `integer` | No | `10` | Number of records returned per page, from 1 to 20. |
| `pagenumber` | `integer` | No | `1` | One-based page number, starting at 1. |
| `type` | `string` | No | - | Canonical values are `tang`, `song`, and `ci`; `唐诗`, `宋诗`, and `宋词` are accepted aliases. |
| `searchtype` | `string` | No | `all` | Search scope: `all`, `author`, `title`, or `content`. |

## Example request

```bash
curl -G "https://api.gugudata.io/v1/text/chinese-poem" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "keywords=李白" \
  --data-urlencode "pagesize=10" \
  --data-urlencode "pagenumber=1" \
  --data-urlencode "type=tang" \
  --data-urlencode "searchtype=all"
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
| `data` | `array<object>` | Yes | Matching poetry records for the requested page. |
| `data[].title` | `string` | Yes | Title of the poem or lyric |
| `data[].author` | `string` | Yes | Author name |
| `data[].content` | `array<string>` | Yes | Array of strings containing the poem/lyric content, each element is one line |
| `data[].type` | `string` | Yes | Poetry type returned by the dataset, such as `唐诗`, `宋诗`, or `宋词`. |

## Response example

```json
{
  "dataStatus": {
    "statusCode": 100,
    "statusDescription": "请求成功。",
    "responseDateTime": "2026-08-24 10:00:00.000",
    "dataTotalCount": 244,
    "requestParameter": "keywords=烽火&pagesize=10&pagenumber=1&type=&searchtype=all"
  },
  "data": [
    {
      "title": "贺新凉・贺新郎",
      "author": "吴泳",
      "content": [
        "额扣龙墀苦。",
        "对南宫、春风侍女，掉头不顾。"
      ],
      "type": "宋词"
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
| `503` | Poetry data is temporarily unavailable. | Retry later and contact support if the condition persists. |

## Implementation notes

- Validate required parameters before sending the request so `400` responses are easier to diagnose.
- Keep server-side retries conservative for `429`, `500`, and `503` responses.
- Cache stable metadata responses when your use case allows it, especially for lookup and directory endpoints.
- Log the HTTP status code and `dataStatus.statusDescription` together for easier debugging.
- Use the demo endpoint for a quick connectivity check, then switch to the authenticated endpoint for production data.
- Treat `keywords` as text. Regular-expression syntax is matched literally.

## FAQ

### Where is the official API detail page?

The official detail page is [https://gugudata.io/details/chinesepoem](https://gugudata.io/details/chinesepoem). It is the best place to review the latest public endpoint information before publishing or integrating.

### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

## Related GuGuData APIs

- [Global QS World University Rankings](https://gugudata.io/details/qs-global-university-ranking)
- [Global University Data](https://gugudata.io/details/global-university)
- [HK Stock Symbols Directory](https://gugudata.io/details/hk-stock-symbols)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
