---
title: Decode QR Code from Image API Integration Guide
description: >-
  Learn how to integrate the Decode QR Code from Image API with documented
  request parameters, response fields, error handling, and practical examples.
slug: decode-qr-code-from-image-api
date: '2026-04-17'
updated: '2026-08-07'
category: Codes & Barcodes
apiName: Decode QR Code from Image
apiMethod: POST
apiEndpoint: /v1/barcode/qrcode/decode
detailUrl: 'https://gugudata.io/details/qrcode-decode'
demoUrl: 'https://api.gugudata.io/v1/barcode/qrcode/decode/demo'
keywords:
  - Decode QR Code from Image API
  - GuGuData Decode QR Code from Image
  - qrcode-decode API
  - QR Code and Barcode APIs
  - developer API documentation
featured: false
---

# Decode QR Code from Image API Integration Guide

The Decode QR Code from Image API from GuGuData helps developers decode QR code content from an uploaded image and return the parsed value, format, and detection points.



> Start here: [Try the live demo](https://api.gugudata.io/v1/barcode/qrcode/decode/demo) or [view the current API details](https://gugudata.io/details/qrcode-decode).

## API details

| Item | Value |
| --- | --- |
| API name | Decode QR Code from Image |
| Category | QR Code and Barcode APIs |
| Method | `POST` |
| Endpoint | `https://api.gugudata.io/v1/barcode/qrcode/decode` |
| Content type | `multipart/form-data` |
| Demo endpoint | [https://api.gugudata.io/v1/barcode/qrcode/decode/demo](https://api.gugudata.io/v1/barcode/qrcode/decode/demo) |
| Detail page | [https://gugudata.io/details/qrcode-decode](https://gugudata.io/details/qrcode-decode) |

## When to use this API

- Decode QR values from mobile uploads, scanned images, or generated QR assets.
- Build ticketing, logistics, inventory, payment, or check-in workflows.
- Extract both parsed payloads and raw decoded text for downstream validation.

## Request parameters

This endpoint accepts parameters through the query string plus request body. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `file` | `file` | Yes | - | Image file that contains a QR code. |

## Example request

```bash
curl -X POST "https://api.gugudata.io/v1/barcode/qrcode/decode?appkey=YOUR_APPKEY" \
  -F "file=@./qrcode.png"
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
| `data` | `object` | Yes | Primary QR decoding result returned by the endpoint. |
| `data.format` | `string` | Yes | Detected code format. |
| `data.parsed` | `string` | Yes | Parsed QR code content. |
| `data.points` | `array` | No | Detected corner points of the QR code. |
| `data.raw` | `string` | No | Raw decoded string. |
| `data.type` | `string` | Yes | Detected payload type, such as `URI`, `WIFI`, `EMAIL`, or `TEXT`. |

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
  "data": {
    "format": "QR_CODE",
    "parsed": "https://example.com",
    "points": [],
    "raw": "https://example.com",
    "type": "URI"
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

- Validate file presence and supported image formats before sending the request.
- Keep server-side retries conservative for `429`, `500`, and `503` responses.
- Treat decoded content as untrusted input until your application validates the payload type and value.
- Log the HTTP status code and `dataStatus.statusDescription` together for easier debugging.
- Use the demo endpoint for a quick connectivity check, then switch to the authenticated endpoint for production data.

## FAQ

### Where is the official API detail page?

The official detail page is [https://gugudata.io/details/qrcode-decode](https://gugudata.io/details/qrcode-decode). It is the best place to review the latest public endpoint information before publishing or integrating.

### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

## Related GuGuData APIs

- [Universal QR Code Generator](https://gugudata.io/details/qrcode)
- [General Barcode Generation](https://gugudata.io/details/barcode)
- [Wi-Fi Wireless Network QR Code Generation](https://gugudata.io/details/wifiqrcode)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
