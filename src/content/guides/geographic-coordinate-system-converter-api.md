---
title: Geographic Coordinate System Converter API Integration Guide
description: >-
  Learn how to integrate the Geographic Coordinate System Converter API with
  documented request parameters, response fields, error handling, and practical
  examples.
slug: geographic-coordinate-system-converter-api
date: '2026-04-10'
updated: '2026-08-24'
category: Website Tools
apiName: Geographic Coordinate System Converter
apiMethod: GET
apiEndpoint: /v1/location/coordinateconverter
detailUrl: 'https://gugudata.io/details/coordinateconverter'
demoUrl: 'https://api.gugudata.io/v1/location/coordinateconverter/demo'
keywords:
  - Geographic Coordinate System Converter API
  - GuGuData Geographic Coordinate System Converter
  - coordinateconverter API
  - Website Tools APIs
  - developer API documentation
featured: false
---

# Geographic Coordinate System Converter API Integration Guide

The Geographic Coordinate System Converter API from GuGuData converts longitude and latitude pairs between WGS84, GCJ02, and BD09 for map display, location normalization, and geospatial data workflows.



> Start here: [Try the live demo](https://api.gugudata.io/v1/location/coordinateconverter/demo) or [view the current API details](https://gugudata.io/details/coordinateconverter).

## API details

| Item | Value |
| --- | --- |
| API name | Geographic Coordinate System Converter |
| Category | Website Tools APIs |
| Method | `GET` |
| Endpoint | `https://api.gugudata.io/v1/location/coordinateconverter` |
| Content type | `query parameters` |
| Demo endpoint | [https://api.gugudata.io/v1/location/coordinateconverter/demo](https://api.gugudata.io/v1/location/coordinateconverter/demo) |
| Detail page | [https://gugudata.io/details/coordinateconverter](https://gugudata.io/details/coordinateconverter) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

## When to use this API

- Convert coordinates between common map coordinate systems.
- Normalize geospatial data from different map providers.
- Prepare location data before storage or display.

## Request parameters

This endpoint accepts parameters through the query string. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `from` | `string` | Yes | - | Source coordinate system: `WGS84`, `GCJ02`, or `BD09`. |
| `to` | `string` | Yes | - | Target coordinate system: `WGS84`, `GCJ02`, or `BD09`. |
| `value` | `string` | Yes | - | Coordinate pair in `[longitude,latitude]` format, for example `[120.54,32.74]`. |

Use the documented uppercase coordinate-system names in new integrations. The API normalizes surrounding whitespace and letter case for compatibility.

## Example request

```bash
curl -G "https://api.gugudata.io/v1/location/coordinateconverter" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "from=WGS84" \
  --data-urlencode "to=GCJ02" \
  --data-urlencode "value=[120.54,32.74]"
```

## Response fields

The response body contains the fields below for successful conversions.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dataStatus` | `object` | Yes | Response metadata. `dataStatus.statusCode` is a response body status field, not the HTTP status code. |
| `dataStatus.requestParameter` | `string` | Yes | Normalized request parameters echoed by the service. Sensitive credentials are omitted when available. |
| `dataStatus.statusCode` | `integer` | Yes | Response body status field. Successful demo responses currently return `100`. |
| `dataStatus.statusDescription` | `string` | Yes | Response body status message. Successful demo responses currently return a Chinese message. |
| `dataStatus.responseDateTime` | `string` | Yes | Response timestamp returned by the API response. |
| `dataStatus.dataTotalCount` | `integer` | Yes | Total number of records that match the request. |
| `data` | `object` | Yes | Primary response payload returned by the endpoint. |
| `data.coordinateFrom` | `string` | Yes | Normalized source coordinate system. |
| `data.coordinateTo` | `string` | Yes | Normalized target coordinate system. |
| `data.coordinateSourceValue` | `string` | Yes | Source coordinate pair supplied by the caller. |
| `data.coordinateDestinationValue` | `string` | Yes | Converted coordinate pair in longitude-latitude order with six decimal places. |

## Response example

```json
{
  "dataStatus": {
    "requestParameter": "from=WGS84&to=GCJ02&value=[120.54,32.74]",
    "statusCode": 100,
    "statusDescription": "请求成功。",
    "responseDateTime": "2026-08-24 20:38:05.155",
    "dataTotalCount": 1
  },
  "data": {
    "coordinateFrom": "WGS84",
    "coordinateTo": "GCJ02",
    "coordinateSourceValue": "[120.54,32.74]",
    "coordinateDestinationValue": "[120.544394,32.737947]"
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
| `503` | Service temporarily unavailable. | Retry later with bounded backoff. |

## Implementation notes

- Preserve longitude-latitude order when constructing the `value` parameter.
- Validate longitude within `-180` to `180` and latitude within `-90` to `90` before sending a request.
- Keep server-side retries conservative for `429`, `500`, and `503` responses.
- Log the HTTP status code and `dataStatus.statusDescription` together for easier debugging.
- Use the demo endpoint for a quick connectivity check, then switch to the authenticated endpoint for production traffic.

## FAQ

### Where is the official API detail page?

The official detail page is [https://gugudata.io/details/coordinateconverter](https://gugudata.io/details/coordinateconverter). It is the best place to review the latest public endpoint information before publishing or integrating.

### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

## Related GuGuData APIs

- [IP Address Geolocation](https://gugudata.io/details/location-ip)
- [QR Code Generation](https://gugudata.io/details/qrcode)
- [Wi-Fi QR Code Generation](https://gugudata.io/details/wifiqrcode)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
