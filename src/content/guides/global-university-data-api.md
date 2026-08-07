---
title: Global University Data API for Search and Enrichment
description: >-
  Search structured global university profiles by name, country, region, or city
  for directories, research, and enrichment workflows.
slug: global-university-data-api
date: '2026-04-10'
updated: '2026-08-07'
category: Data
apiName: Global University Data
apiMethod: GET
apiEndpoint: /v1/metadata/global-university
detailUrl: 'https://gugudata.io/details/global-university'
demoUrl: 'https://api.gugudata.io/v1/metadata/global-university/demo'
keywords:
  - Global University Data API
  - GuGuData Global University Data
  - global-university API
  - Metadata APIs
  - developer API documentation
featured: true
---

# Global University Data API for Search and Enrichment

Search structured university profiles with geographic filters, sorting, and pagination. The API is designed for directories, education research, institution enrichment, and other products that need consistent university metadata.



> Start here: [Try the live demo](https://api.gugudata.io/v1/metadata/global-university/demo) or [view the current API details](https://gugudata.io/details/global-university).

## API details

| Item | Value |
| --- | --- |
| API name | Global University Data |
| Category | Metadata APIs |
| Method | `GET` |
| Endpoint | `https://api.gugudata.io/v1/metadata/global-university` |
| Content type | `query parameters` |
| Demo endpoint | [https://api.gugudata.io/v1/metadata/global-university/demo](https://api.gugudata.io/v1/metadata/global-university/demo) |
| Detail page | [https://gugudata.io/details/global-university](https://gugudata.io/details/global-university) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

## When to use this API

- Search global university metadata for education products.
- Build university discovery and comparison tools.
- Normalize institution data in research workflows.

## Request parameters

This endpoint accepts parameters through the query string. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `name` | `string` | No | - | Name filter used by the endpoint dataset. |
| `country` | `string` | No | - | Country filter used by the endpoint dataset. |
| `region` | `string` | No | - | Region filter used by the endpoint dataset. |
| `city` | `string` | No | - | City filter used by the endpoint dataset. |
| `sort` | `string` | No | `rank\|asc` | Sort expression in `field\|direction` format, for example `rank\|asc`. |
| `pageIndex` | `integer` | No | `1` | One-based page index for pagination. |
| `pageSize` | `integer` | No | `10` | Number of records returned per page. |

## Example request

```bash
curl -G "https://api.gugudata.io/v1/metadata/global-university" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "name=Harvard" \
  --data-urlencode "country=United States" \
  --data-urlencode "region=North America" \
  --data-urlencode "city=Cambridge" \
  --data-urlencode "sort=rank|asc" \
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
| `dataStatus.status` | `string` | Yes | Application-level status enum returned by the API response. |
| `dataStatus.statusDescription` | `string` | Yes | Application-level status message returned by the API response. |
| `dataStatus.responseDateTime` | `string` | Yes | Response timestamp returned by the API response. |
| `dataStatus.dataTotalCount` | `integer` | Yes | Total number of records that match the request. |
| `data` | `object` | Yes | Primary response payload returned by the endpoint. |
| `DataStatus.RequestParameter` | `string` | Yes | Normalized request parameters echoed by the service. Sensitive credentials are omitted when available. |
| `DataStatus.StatusCode` | `integer` | Yes | Application-level status code returned by the API response. |
| `DataStatus.StatusDescription` | `string` | Yes | Application-level status message returned by the API response. |
| `DataStatus.ResponseDateTime` | `string` | Yes | Response timestamp returned by the API response. |
| `DataStatus.DataTotalCount` | `integer` | Yes | Total number of records that match the request. |
| `Data.rank` | `integer` | Yes | QS World University Ranking position |
| `Data.website` | `string` | Yes | University official website URL |
| `Data.universityName` | `string` | Yes | Official university name |
| `Data.logo` | `string` | Yes | URL to university logo image |
| `Data.region` | `string` | Yes | Geographic region |
| `Data.country` | `string` | Yes | Country name |
| `Data.city` | `string` | Yes | City location |
| `Data.internationalStudents` | `integer` | Yes | Number of international students enrolled |
| `Data.subjectCount` | `integer` | Yes | Number of academic subjects offered |
| `Data.schoolUUID` | `string` | Yes | Unique university identifier in Gugudata system for data correlation |

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

The official detail page is [https://gugudata.io/details/global-university](https://gugudata.io/details/global-university). It is the best place to review the latest public endpoint information before publishing or integrating.

### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

## Related GuGuData APIs

- [Global QS World University Rankings](https://gugudata.io/details/qs-global-university-ranking)
- [Chinese Classical Poetry Database](https://gugudata.io/details/chinesepoem)
- [HK Stock Symbols Directory](https://gugudata.io/details/hk-stock-symbols)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
