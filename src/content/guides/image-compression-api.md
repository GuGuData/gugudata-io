---
title: 'Image Compression API for Uploads, URLs, and Resizing'
description: >-
  Compress and optionally resize uploaded images or remote image URLs while
  preserving aspect ratio and controlling output quality.
slug: image-compression-api
date: '2026-04-10'
updated: '2026-08-07'
category: Documents & Images
apiName: Image Compression
apiMethod: POST
apiEndpoint: /v1/image/image-compress
detailUrl: 'https://gugudata.io/details/image-compress'
demoUrl: 'https://api.gugudata.io/v1/image/image-compress/demo'
keywords:
  - Image Compression API
  - GuGuData Image Compression
  - image-compress API
  - Document and Image APIs
  - developer API documentation
featured: true
---

# Image Compression API for Uploads, URLs, and Resizing

Compress an uploaded image or a remote image URL, optionally resize it, and return the optimized binary stream. The API supports quality controls, maximum dimensions, aspect-ratio preservation, and common image formats.



> Start here: [Try the live demo](https://api.gugudata.io/v1/image/image-compress/demo) or [view the current API details](https://gugudata.io/details/image-compress).

## API details

| Item | Value |
| --- | --- |
| API name | Image Compression |
| Category | Document and Image APIs |
| Method | `POST` |
| Endpoint | `https://api.gugudata.io/v1/image/image-compress` |
| Content type | `multipart/form-data` |
| Demo endpoint | [https://api.gugudata.io/v1/image/image-compress/demo](https://api.gugudata.io/v1/image/image-compress/demo) |
| Detail page | [https://gugudata.io/details/image-compress](https://gugudata.io/details/image-compress) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

## When to use this API

- Compress uploaded images before storage or delivery.
- Normalize image dimensions for content platforms.
- Reduce image payload size in automated media pipelines.

## Request parameters

This endpoint accepts parameters through the query string plus request body. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `file` | `file` | No | - | Image file uploaded as multipart form data. Supply either `file` or `image_url`, but not both. |
| `image_url` | `string` | No | - | Remote image URL to compress. Supply either `image_url` or `file`, but not both. |
| `targetWidth` | `integer` | No | - | Exact output width in pixels. |
| `targetHeight` | `integer` | No | - | Exact output height in pixels. |
| `maxWidth` | `integer` | No | - | Maximum output width in pixels while preserving aspect ratio. |
| `maxHeight` | `integer` | No | - | Maximum output height in pixels while preserving aspect ratio. |
| `quality` | `integer` | No | `85` | Compression quality or output quality level accepted by the endpoint. |
| `format` | `string` | No | - | Requested output format when the endpoint supports explicit format conversion. |

## Example request

```bash
curl -X POST "https://api.gugudata.io/v1/image/image-compress?appkey=YOUR_APPKEY" \
  -F "file=@./sample.png" \
  -F "targetWidth=800" \
  -F "targetHeight=600" \
  -F "maxWidth=1200" \
  -F "maxHeight=1200" \
  -F "quality=85" \
  -F "format=png"
```

## Response fields

The response body contains the fields below for successful JSON responses. For binary endpoints, the success response is returned as binary content and JSON is used for error responses.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `image` | `binary` | Yes | Compressed image binary stream returned on success. On failure, the endpoint returns a JSON error payload instead of binary content. |

## Response example

Successful responses return binary content. JSON error responses use the same dataStatus metadata shape documented below.

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

The official detail page is [https://gugudata.io/details/image-compress](https://gugudata.io/details/image-compress). It is the best place to review the latest public endpoint information before publishing or integrating.

### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

## Related GuGuData APIs

- [HTML/URL to PDF](https://gugudata.io/details/html2pdf)
- [Image OCR Extraction](https://gugudata.io/details/imagestreamocr)
- [PDF Parsing and Formatted Output](https://gugudata.io/details/pdf2format)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
