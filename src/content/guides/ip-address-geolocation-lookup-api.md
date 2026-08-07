---
title: IP Address Geolocation Lookup API Integration Guide
description: >-
  Learn how to integrate the IP Address Geolocation Lookup API with documented
  request parameters, response fields, error handling, and practical examples.
slug: ip-address-geolocation-lookup-api
date: '2026-04-10'
updated: '2026-08-07'
category: Website Tools
apiName: IP Address Geolocation Lookup
apiMethod: GET
apiEndpoint: /v1/location/ip
detailUrl: 'https://gugudata.io/details/location-ip'
demoUrl: 'https://api.gugudata.io/v1/location/ip/demo'
keywords:
  - IP Address Geolocation Lookup API
  - GuGuData IP Address Geolocation Lookup
  - location-ip API
  - Website Tools APIs
  - developer API documentation
featured: false
---

# IP Address Geolocation Lookup API Integration Guide

The IP Address Geolocation Lookup API from GuGuData helps developers look up geolocation metadata for an IPv4 or IPv6 address.



> Start here: [Try the live demo](https://api.gugudata.io/v1/location/ip/demo) or [view the current API details](https://gugudata.io/details/location-ip).

## API details

| Item | Value |
| --- | --- |
| API name | IP Address Geolocation Lookup |
| Category | Website Tools APIs |
| Method | `GET` |
| Endpoint | `https://api.gugudata.io/v1/location/ip` |
| Content type | `query parameters` |
| Demo endpoint | [https://api.gugudata.io/v1/location/ip/demo](https://api.gugudata.io/v1/location/ip/demo) |
| Detail page | [https://gugudata.io/details/location-ip](https://gugudata.io/details/location-ip) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

## When to use this API

- Resolve IP address geolocation for analytics and security workflows.
- Localize product experiences based on network location.
- Enrich logs with country, region, and city metadata.

## Request parameters

This endpoint accepts parameters through the query string. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `ip` | `string` | Yes | - | IP address to lookup (supports both IPv4 and IPv6, e.g., 8.8.8.8 or 2001:4878:b554:aaaa:aaaa:aaaa:aaaa:aaaa) |

## Example request

```bash
curl -G "https://api.gugudata.io/v1/location/ip" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "ip=8.8.8.8"
```

## Response fields

The response body contains the fields below for successful JSON responses. For binary endpoints, the success response is returned as binary content and JSON is used for error responses.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dataStatus.requestParameter` | `string` | Yes | Normalized request parameters echoed by the service. Sensitive credentials are omitted when available. |
| `dataStatus.statusCode` | `integer` | Yes | Application-level status code returned by the API response. |
| `dataStatus.status` | `string` | Yes | Application-level status enum returned by the API response. |
| `dataStatus.statusDescription` | `string` | Yes | Application-level status message returned by the API response. |
| `dataStatus.responseDateTime` | `string` | Yes | Response timestamp returned by the API response. |
| `dataStatus.dataTotalCount` | `integer` | Yes | Total number of records that match the request. |
| `data.countryCode` | `string` | No | ISO country code (e.g., US, CN, GB) |
| `data.state` | `string` | No | State or province name |
| `data.city` | `string` | No | City name |
| `data.latitude` | `number` | No | Geographic latitude coordinate |
| `data.longitude` | `number` | No | Geographic longitude coordinate |

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
    "countryCode": "sample value",
    "state": "sample value",
    "city": "sample value",
    "latitude": "sample value",
    "longitude": "sample value"
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

The official detail page is [https://gugudata.io/details/location-ip](https://gugudata.io/details/location-ip). It is the best place to review the latest public endpoint information before publishing or integrating.

### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

## Related GuGuData APIs

- [Webpage Readable Content Extraction](https://gugudata.io/details/readability)
- [Domain SSL Certificate Information Parsing](https://gugudata.io/details/sslcertinfo)
- [Domain DNS Information Query](https://gugudata.io/details/dnslookup)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
