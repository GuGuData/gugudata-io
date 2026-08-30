---
title: 'Image Compression API for Uploads, URLs, and Resizing'
description: >-
  Compress and optionally resize uploaded images or remote image URLs while
  preserving aspect ratio and controlling output quality.
slug: image-compression-api
date: '2026-04-10'
updated: '2026-08-30'
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

Compress a JPEG, PNG, or WebP upload or public image URL, optionally reduce its dimensions, and receive the optimized image bytes directly. Resizing always preserves the source aspect ratio and never enlarges a smaller image.



> Start here: [Try the live demo](https://api.gugudata.io/v1/image/image-compress/demo) or [view the current API details](https://gugudata.io/details/image-compress).

## API details

| Item | Value |
| --- | --- |
| API name | Image Compression |
| Category | Document and Image APIs |
| Method | `POST` |
| Endpoint | `https://api.gugudata.io/v1/image/image-compress` |
| Content type | `multipart/form-data` or `application/x-www-form-urlencoded` |
| Demo endpoint | [https://api.gugudata.io/v1/image/image-compress/demo](https://api.gugudata.io/v1/image/image-compress/demo) |
| Detail page | [https://gugudata.io/details/image-compress](https://gugudata.io/details/image-compress) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |
| Demo source image | [Download the reproducible JPEG fixture](https://cdn.gugudata.io/api-fixtures/image-compress-source.jpg) |

## When to use this API

- Compress uploaded images before storage or delivery.
- Normalize image dimensions for content platforms.
- Reduce image payload size in automated media pipelines.

## Request parameters

This endpoint accepts parameters through the query string plus request body. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply it as a query parameter. |
| `file` | `file` | No | - | JPEG, PNG, or WebP upload up to 10 MiB. Supply either `file` or `image_url`, but not both. |
| `image_url` | `string` | No | - | Complete public HTTP or HTTPS image URL up to 2,048 characters. Supply either `image_url` or `file`, but not both. |
| `targetWidth` | `integer` | No | - | Width bound from 1 to 8,192 pixels. Aspect ratio is preserved. |
| `targetHeight` | `integer` | No | - | Height bound from 1 to 8,192 pixels. Aspect ratio is preserved. |
| `maxWidth` | `integer` | No | - | Maximum output width in pixels while preserving aspect ratio. |
| `maxHeight` | `integer` | No | - | Maximum output height in pixels while preserving aspect ratio. |
| `quality` | `integer` | No | `85` | JPEG or WebP quality from 1 to 95. PNG remains lossless. |
| `format` | `string` | No | Source format | Output format: `jpeg`, `jpg`, `png`, or `webp`. |

## Example request

```bash
curl -X POST "https://api.gugudata.io/v1/image/image-compress?appkey=YOUR_APPKEY" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "image_url=https://cdn.gugudata.io/api-fixtures/image-compress-source.jpg" \
  --data-urlencode "maxWidth=1200" \
  --data-urlencode "quality=70" \
  --data-urlencode "format=jpeg" \
  --output compressed-image.jpg
```

For an upload, send the same options as multipart fields and replace `image_url` with `file=@./sample.png`.

## Response fields

The response body contains the fields below for successful JSON responses. For binary endpoints, the success response is returned as binary content and JSON is used for error responses.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `image` | `binary` | Yes | Compressed JPEG, PNG, or WebP bytes returned on success. The `Content-Type` and `Content-Disposition` headers identify the output format and download filename. |

## Response example

Successful responses return binary image content and are not wrapped in JSON. Error responses use the standard `dataStatus` JSON envelope.

## HTTP status codes

Use the HTTP status code for transport-level handling. If the response body contains `dataStatus.statusCode`, treat it as an application-level status field in the JSON payload.

| HTTP status | Meaning | Recommended handling |
| --- | --- | --- |
| `200` | Request processed successfully. | Parse the documented response body for the endpoint result. |
| `400` | Invalid request parameters or request format. | Check required fields, data types, and request body format. |
| `401` | Missing or unknown application key. | Send a valid appkey with the request. |
| `403` | The application key is recognized but access is not allowed. | Check subscription, trial state, and endpoint access. |
| `429` | Request rate or trial usage limit exceeded. | Reduce concurrency or retry after the limit window resets. |
| `422` | The image is valid but cannot be converted under the requested options. | Use a supported non-animated JPEG, PNG, or WebP image and reduce its dimensions if necessary. |
| `500` | Internal service error. | Retry later or contact support if the error persists. |
| `502` | A remote image could not be retrieved. | Confirm that the public image URL is reachable and returns a supported image. |
| `503` | Image compression is temporarily unavailable. | Retry later when the service is available again. |

## Implementation notes

- Send exactly one image source: `file` or `image_url`.
- Treat `targetWidth`, `targetHeight`, `maxWidth`, and `maxHeight` as bounds rather than exact dimensions.
- Verify the response `Content-Type` before selecting a file extension.
- Use the demo endpoint for a quick connectivity check, then use the authenticated endpoint for production images.

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
