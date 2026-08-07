---
title: Image OCR Extraction API Integration Guide
description: >-
  Learn how to integrate the Image OCR Extraction API with documented request
  parameters, response fields, error handling, and practical examples.
slug: image-ocr-extraction-api
date: '2026-04-10'
updated: '2026-08-07'
category: Documents & Images
apiName: Image OCR Extraction
apiMethod: POST
apiEndpoint: /v1/imagerecognition/ocr
detailUrl: 'https://gugudata.io/details/imagestreamocr'
demoUrl: 'https://api.gugudata.io/v1/imagerecognition/ocr/demo'
keywords:
  - Image OCR Extraction API
  - GuGuData Image OCR Extraction
  - imagestreamocr API
  - Document and Image APIs
  - developer API documentation
featured: false
---

# Image OCR Extraction API Integration Guide

The Image OCR Extraction API from GuGuData helps developers run OCR on an uploaded image stream and return the extracted text content.



> Start here: [Try the live demo](https://api.gugudata.io/v1/imagerecognition/ocr/demo) or [view the current API details](https://gugudata.io/details/imagestreamocr).

## API details

| Item | Value |
| --- | --- |
| API name | Image OCR Extraction |
| Category | Document and Image APIs |
| Method | `POST` |
| Endpoint | `https://api.gugudata.io/v1/imagerecognition/ocr` |
| Content type | `multipart/form-data` |
| Demo endpoint | [https://api.gugudata.io/v1/imagerecognition/ocr/demo](https://api.gugudata.io/v1/imagerecognition/ocr/demo) |
| Detail page | [https://gugudata.io/details/imagestreamocr](https://gugudata.io/details/imagestreamocr) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

## When to use this API

- Extract text from uploaded screenshots and scanned images.
- Build OCR ingestion for document workflows.
- Convert image text into searchable content.

## Request parameters

This endpoint accepts parameters through the query string plus request body. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `imagefile` | `file` | Yes | - | Image file uploaded as multipart form data. |

## Example request

```bash
curl -X POST "https://api.gugudata.io/v1/imagerecognition/ocr?appkey=YOUR_APPKEY" \
  -F "imagefile=@./sample.png"
```

## Response fields

The response body contains the fields below for successful JSON responses. For binary endpoints, the success response is returned as binary content and JSON is used for error responses.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `DataStatus.statusCode` | `integer` | Yes | Application-level status code returned by the API response. |
| `DataStatus.statusDescription` | `string` | Yes | Application-level status message returned by the API response. |
| `DataStatus.responseDateTime` | `string` | Yes | Response timestamp returned by the API response. |
| `DataStatus.dataTotalCount` | `integer` | Yes | Total number of records that match the request. |
| `Data.resultText` | `array<string>` | Yes | Array of recognized text, each line of recognized text corresponds to each element of the array |

## Response example

```json
{
  "dataStatus": {
    "statusCode": 200,
    "statusDescription": "successfully",
    "responseDateTime": "2026-04-10T00:00:00Z",
    "dataTotalCount": 1
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

The official detail page is [https://gugudata.io/details/imagestreamocr](https://gugudata.io/details/imagestreamocr). It is the best place to review the latest public endpoint information before publishing or integrating.

### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

## Related GuGuData APIs

- [HTML/URL to PDF](https://gugudata.io/details/html2pdf)
- [PDF Parsing and Formatted Output](https://gugudata.io/details/pdf2format)
- [PDF Splitting](https://gugudata.io/details/pdf-splitter)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
