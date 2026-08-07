---
title: QS World University Rankings API Integration Guide
description: >-
  Query QS university ranking records and documented indicators for education
  research, comparison tools, and institution profiles.
slug: global-qs-world-university-rankings-api
date: '2026-04-10'
updated: '2026-08-07'
category: Data
apiName: Global QS World University Rankings
apiMethod: GET
apiEndpoint: /v1/metadata/qs-global-university-ranking
detailUrl: 'https://gugudata.io/details/qs-global-university-ranking'
demoUrl: 'https://api.gugudata.io/v1/metadata/qs-global-university-ranking/demo'
keywords:
  - Global QS World University Rankings API
  - GuGuData Global QS World University Rankings
  - qs-global-university-ranking API
  - Metadata APIs
  - developer API documentation
featured: true
---

# QS World University Rankings API Integration Guide

Query university ranking records by name with pagination and documented ranking indicators. This guide focuses on practical integration for education research, comparison products, and institution profile enrichment.



> Start here: [Try the live demo](https://api.gugudata.io/v1/metadata/qs-global-university-ranking/demo) or [view the current API details](https://gugudata.io/details/qs-global-university-ranking).

## API details

| Item | Value |
| --- | --- |
| API name | Global QS World University Rankings |
| Category | Metadata APIs |
| Method | `GET` |
| Endpoint | `https://api.gugudata.io/v1/metadata/qs-global-university-ranking` |
| Content type | `query parameters` |
| Demo endpoint | [https://api.gugudata.io/v1/metadata/qs-global-university-ranking/demo](https://api.gugudata.io/v1/metadata/qs-global-university-ranking/demo) |
| Detail page | [https://gugudata.io/details/qs-global-university-ranking](https://gugudata.io/details/qs-global-university-ranking) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

## When to use this API

- Query QS ranking records for education research.
- Power university ranking pages and comparison tools.
- Enrich institution profiles with ranking indicators.

## Request parameters

This endpoint accepts parameters through the query string. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `name` | `string` | No | - | Name filter used by the endpoint dataset. |
| `pageIndex` | `integer` | No | `1` | One-based page index for pagination. |
| `pageSize` | `integer` | No | `10` | Number of records returned per page. |

## Example request

```bash
curl -G "https://api.gugudata.io/v1/metadata/qs-global-university-ranking" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "name=Harvard" \
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
| `data.id` | `string` | Yes | Unique university identifier in Gugudata system |
| `data.universityName` | `string` | Yes | Official university name |
| `data.region` | `string` | Yes | Geographic region |
| `data.country` | `string` | Yes | Country name |
| `data.city` | `string` | Yes | City location |
| `data.logoUrl` | `string` | Yes | URL to university logo image |
| `data.rank` | `string` | Yes | Overall QS world ranking position |
| `data.academicReputationRank` | `string` | Yes | Academic reputation ranking position |
| `data.academicReputationScore` | `string` | Yes | Academic reputation score (0-100) |
| `data.citationsPerFacultyRank` | `string` | Yes | Citations per faculty ranking position |
| `data.citationsPerFacultyScore` | `string` | Yes | Citations per faculty score (0-100) |
| `data.facultyStudentRatioRank` | `string` | Yes | Faculty-to-student ratio ranking position |
| `data.facultyStudentRatioScore` | `string` | Yes | Faculty-to-student ratio score (0-100) |
| `data.employerReputationRank` | `string` | Yes | Employer reputation ranking position |
| `data.employerReputationScore` | `string` | Yes | Employer reputation score (0-100) |
| `data.employmentOutcomesRank` | `string` | Yes | Employment outcomes ranking position |
| `data.employmentOutcomesScore` | `string` | Yes | Employment outcomes score (0-100) |
| `data.internationalStudentRatioRank` | `string` | Yes | International student ratio ranking position |
| `data.internationalStudentRatioScore` | `string` | Yes | International student ratio score (0-100) |
| `data.internationalResearchNetworkRank` | `string` | Yes | International research network ranking position |
| `data.internationalResearchNetworkScore` | `string` | Yes | International research network score (0-100) |
| `data.internationalFacultyRatioRank` | `string` | Yes | International faculty ratio ranking position |
| `data.internationalFacultyRatioScore` | `string` | Yes | International faculty ratio score (0-100) |
| `data.sustainabilityRank` | `string` | Yes | Sustainability ranking position |
| `data.sustainabilityScore` | `string` | Yes | Sustainability score (0-100) |

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
    "id": "sample value",
    "universityName": "sample value",
    "region": "sample value",
    "country": "sample value",
    "city": "sample value"
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

The official detail page is [https://gugudata.io/details/qs-global-university-ranking](https://gugudata.io/details/qs-global-university-ranking). It is the best place to review the latest public endpoint information before publishing or integrating.

### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

## Related GuGuData APIs

- [Chinese Classical Poetry Database](https://gugudata.io/details/chinesepoem)
- [Global University Data](https://gugudata.io/details/global-university)
- [HK Stock Symbols Directory](https://gugudata.io/details/hk-stock-symbols)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
