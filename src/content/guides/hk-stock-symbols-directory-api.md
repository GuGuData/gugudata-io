---
title: HK Stock Symbols Directory API Integration Guide
description: >-
  Search five-digit Hong Kong-listed security symbols, English short names,
  and Chinese display names through a paginated JSON API.
slug: hk-stock-symbols-directory-api
date: '2026-04-10'
updated: '2026-08-27'
category: Data
apiName: HK Stock Symbols Directory
apiMethod: GET
apiEndpoint: /v1/stock/hk/symbols
detailUrl: 'https://gugudata.io/details/hk-stock-symbols'
demoUrl: 'https://api.gugudata.io/v1/stock/hk/symbols/demo'
keywords:
  - HK stock symbols API
  - Hong Kong ticker directory
  - HK security master data
  - Hong Kong listed securities
  - symbol lookup API
featured: false
---

# HK Stock Symbols Directory API Integration Guide

The GuGuData HK Stock Symbols Directory API helps finance applications search active Hong Kong-listed securities by five-digit symbol, exchange English short name, or Chinese display name. It returns stable, symbol-ordered pages that work well in security selectors, reference-data validation, and enrichment workflows.

> Start here: [Try the live demo](https://api.gugudata.io/v1/stock/hk/symbols/demo) or [view the API details](https://gugudata.io/details/hk-stock-symbols).

## API overview

| Item | Value |
| --- | --- |
| Method | `GET` |
| Endpoint | `https://api.gugudata.io/v1/stock/hk/symbols` |
| Demo | [https://api.gugudata.io/v1/stock/hk/symbols/demo](https://api.gugudata.io/v1/stock/hk/symbols/demo) |
| Detail page | [https://gugudata.io/details/hk-stock-symbols](https://gugudata.io/details/hk-stock-symbols) |
| Main use case | Search and validate Hong Kong-listed security reference data |

This is a symbol directory, not a real-time quote, price-history, or trading API.

## Request parameters

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | - | GuGuData application key, sent as a query parameter from a trusted server environment. |
| `query` | `string` | No | Empty | Case-insensitive substring matched against symbol, English short name, and Chinese display name. Surrounding whitespace is ignored. Maximum 100 Unicode characters. |
| `pageIndex` | `integer` | No | `1` | One-based page index. Values below 1 are rejected. |
| `pageSize` | `integer` | No | `20` | Records per page. Zero also uses 20, values from 1 to 20 are preserved, and larger values are reduced to 20. Negative values are rejected. |

Search for Tencent by symbol:

```bash
curl -G "https://api.gugudata.io/v1/stock/hk/symbols" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "query=00700" \
  --data-urlencode "pageIndex=1" \
  --data-urlencode "pageSize=20"
```

You can also search with an English or Chinese name:

```bash
curl -G "https://api.gugudata.io/v1/stock/hk/symbols" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "query=腾讯"
```

## Response fields

| Field | Type | Description |
| --- | --- | --- |
| `dataStatus.requestParameter` | `string` | Normalized query and pagination values. The application key is not included. |
| `dataStatus.statusCode` | `integer` | Application-level status code. A successful directory lookup returns `100`. |
| `dataStatus.statusDescription` | `string` | Application-level status description. |
| `dataStatus.responseDateTime` | `string` | Response timestamp in `YYYY-MM-DD HH:mm:ss.SSS` format. |
| `dataStatus.dataTotalCount` | `integer` | Total number of active records matching the query. |
| `data` | `array<object>` | Symbol-ordered result page. It is an empty array when no records match. |
| `data[].symbol` | `string` | Five-digit Hong Kong-listed security symbol, such as `00700`. |
| `data[].stockName` | `string` | Exchange English short name, such as `TENCENT`. |
| `data[].stockChineseName` | `string` | Chinese display name, such as `腾讯控股`. |

Example response:

```json
{
  "dataStatus": {
    "requestParameter": "query=00700&pageindex=1&pagesize=20",
    "statusCode": 100,
    "statusDescription": "请求成功。",
    "responseDateTime": "2026-08-27 10:57:00.000",
    "dataTotalCount": 1
  },
  "data": [
    {
      "symbol": "00700",
      "stockName": "TENCENT",
      "stockChineseName": "腾讯控股"
    }
  ]
}
```

If the search has no match or the requested page is beyond the final page, the request still succeeds with `data: []` and `dataTotalCount: 0`.

## Integration patterns

### Security selectors

Query as the user types, display the five-digit symbol with both names, and store the symbol as the stable lookup value. Debounce interactive searches so the interface does not send a request for every keystroke.

### Reference-data validation

Use an exact symbol search before accepting a Hong Kong security identifier. A successful HTTP response with an empty `data` array means the directory has no matching active record.

### Paginated synchronization

Request pages in order, retain `dataTotalCount` for progress, and stop when a page is empty. Because results are ordered by symbol, repeated directory reads are predictable for comparison and review.

## HTTP status handling

| HTTP status | Meaning | Recommended handling |
| --- | --- | --- |
| `200` | Search completed, including empty results. | Read `dataTotalCount` and process the `data` array. |
| `400` | Query or pagination value is invalid. | Correct the parameter before retrying. |
| `401` | Application key is missing or unknown. | Send a valid key from the server side. |
| `403` | The key does not have access to this API. | Check the subscription and authorization. |
| `429` | Request limit reached. | Reduce concurrency and retry after the limit window. |
| `500` | The request could not be completed. | Retry later or contact support if it persists. |
| `503` | The symbol directory is temporarily unavailable. | Retry with bounded backoff. |

Always use the HTTP status for request-level handling. `dataStatus.statusCode` is a separate application-level field inside the JSON response.

## Practical recommendations

- Keep `appkey` in backend configuration rather than browser code or mobile bundles.
- Store symbols as strings so leading zeroes are preserved.
- Do not convert `00700` to the number `700`.
- Treat names as display and search fields; use `symbol` for identifier matching.
- Cache stable directory results when suitable for your product, while keeping a clear refresh policy.
- Do not use this directory as evidence of current price, trading status, or investment suitability.

## Related GuGuData APIs

- [US Stock Symbols Directory](https://gugudata.io/details/us-stock-symbols): search US-listed security reference records.

For more developer APIs, visit [GuGuData](https://gugudata.io/).
