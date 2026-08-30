---
title: General Barcode Generation API Integration Guide
description: >-
  Generate scan-ready one-dimensional barcode images across 40 retail,
  logistics, postal, publishing, and pharmaceutical formats.
slug: general-barcode-generation-api
date: '2026-04-10'
updated: '2026-08-30'
category: Codes & Barcodes
apiName: General Barcode Generation
apiMethod: POST
apiEndpoint: /v1/barcode
detailUrl: 'https://gugudata.io/details/barcode'
demoUrl: 'https://api.gugudata.io/v1/barcode/demo'
keywords:
  - General Barcode Generation API
  - GuGuData General Barcode Generation
  - barcode API
  - QR Code and Barcode APIs
  - developer API documentation
featured: false
---

# General Barcode Generation API Integration Guide

The GuGuData General Barcode Generation API creates scan-ready one-dimensional barcode images across 40 established symbologies. Supply the format, content, and output dimensions, then receive a reusable HTTPS PNG URL for labels, documents, inventory, and fulfillment workflows.



> Start here: [Try the live demo](https://api.gugudata.io/v1/barcode/demo) or [view the current API details](https://gugudata.io/details/barcode).

## API details

| Item | Value |
| --- | --- |
| API name | General Barcode Generation |
| Category | QR Code and Barcode APIs |
| Method | `POST` |
| Endpoint | `https://api.gugudata.io/v1/barcode` |
| Content type | `application/json` |
| Demo endpoint | [https://api.gugudata.io/v1/barcode/demo](https://api.gugudata.io/v1/barcode/demo) |
| Detail page | [https://gugudata.io/details/barcode](https://gugudata.io/details/barcode) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

## When to use this API

- Create retail and publishing identifiers such as UPC, EAN, and ISBN barcodes.
- Generate logistics, postal, inventory, pharmaceutical, and asset labels.
- Insert hosted barcode images into documents, packaging, and automated print workflows.

## Request parameters

This endpoint accepts parameters through the query string plus request body. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `type` | `string` | Yes | `CODE128` | One-dimensional barcode symbology. Supported values are listed below. |
| `content` | `string` | Yes | - | Content to encode, up to 512 characters. Format rules depend on the selected symbology. |
| `width` | `integer` | Yes | `290` | Output width in pixels, from 64 to 2048. The historical value `1` uses the default width. |
| `height` | `integer` | Yes | `120` | Output height in pixels, from 32 to 2048. The historical value `1` uses the default height. |

### Supported barcode types

The API supports the following 40 one-dimensional barcode types:

`UPCA`, `UPCE`, `UPCSupplemental2Digit`, `UPCSupplemental5Digit`, `EAN13`, `EAN8`, `Interleaved2Of5`, `Interleaved2Of5Mod10`, `Standard2Of5`, `Standard2Of5Mod10`, `Industrial2Of5`, `Industrial2Of5Mod10`, `Code39`, `Code39Extended`, `Code39Mod43`, `Codabar`, `PostNet`, `Bookland`, `ISBN`, `JAN13`, `MsiMod10`, `Msi2Mod10`, `MsiMod11`, `MsiMod11Mod10`, `ModifiedPlessey`, `Code11`, `Usd8`, `Code32`, `Ucc12`, `Ucc13`, `Logmars`, `Code128`, `Code128A`, `Code128B`, `Code128C`, `Itf14`, `Code93`, `Telepen`, `Fim`, and `Pharmacode`.

Choose a type that matches the content format required by the scanner or downstream workflow. For general alphanumeric content, `CODE128` is a practical default.

## Example request

```bash
curl -X POST "https://api.gugudata.io/v1/barcode?appkey=YOUR_APPKEY" \
  -H "Content-Type: application/json" \
  -d '
{
  "type": "CODE128",
  "content": "123456789012",
  "width": 290,
  "height": 120
}
'
```

## Response fields

The response body contains the fields below for successful requests.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | `string` | Yes | CDN URL of the generated PNG barcode image. |

## Response example

```json
{
  "dataStatus": {
    "requestParameter": "type=CODE128&content_length=12&width=290&height=120",
    "statusCode": 200,
    "status": "SUCCESS",
    "statusDescription": "successfully",
    "responseDateTime": "2026-04-10T00:00:00Z",
    "dataTotalCount": 1
  },
  "data": {
    "url": "https://storage.gugudata.io/barcode/example.png"
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
- Verify that the selected barcode type matches the content format expected by downstream scanners.
- Log the HTTP status code and `dataStatus.statusDescription` together for easier debugging.
- Use the demo endpoint for a quick connectivity check, then switch to the authenticated endpoint for production data.

## FAQ

### Where is the official API detail page?

The official detail page is [https://gugudata.io/details/barcode](https://gugudata.io/details/barcode). It is the best place to review the latest public endpoint information before publishing or integrating.

### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

## Related GuGuData APIs

- [HTML/URL to PDF](https://gugudata.io/details/html2pdf)
- [Webpage Readable Content Extraction](https://gugudata.io/details/readability)
- [Domain SSL Certificate Information Parsing](https://gugudata.io/details/sslcertinfo)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
