---
title: HTML/URL to PDF API Integration Guide
description: >-
  Learn how to integrate the HTML/URL to PDF API with documented request
  parameters, response fields, error handling, and practical examples.
slug: html-url-to-pdf-api
date: '2026-04-10'
updated: '2026-08-07'
category: Documents & Images
apiName: HTML/URL to PDF
apiMethod: POST
apiEndpoint: /v1/imagerecognition/html2pdf
detailUrl: 'https://gugudata.io/details/html2pdf'
demoUrl: 'https://api.gugudata.io/v1/imagerecognition/html2pdf/demo'
keywords:
  - HTML/URL to PDF API
  - GuGuData HTML/URL to PDF
  - html2pdf API
  - Document and Image APIs
  - developer API documentation
featured: false
---

# HTML/URL to PDF API Integration Guide

The HTML/URL to PDF API from GuGuData helps developers render HTML or a target URL as PDF and return generated PDF metadata.



> Start here: [Try the live demo](https://api.gugudata.io/v1/imagerecognition/html2pdf/demo) or [view the current API details](https://gugudata.io/details/html2pdf).

## API details

| Item | Value |
| --- | --- |
| API name | HTML/URL to PDF |
| Category | Document and Image APIs |
| Method | `POST` |
| Endpoint | `https://api.gugudata.io/v1/imagerecognition/html2pdf` |
| Content type | `application/json` |
| Demo endpoint | [https://api.gugudata.io/v1/imagerecognition/html2pdf/demo](https://api.gugudata.io/v1/imagerecognition/html2pdf/demo) |
| Detail page | [https://gugudata.io/details/html2pdf](https://gugudata.io/details/html2pdf) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

## When to use this API

- Generate invoices, receipts, and reports from HTML templates.
- Archive public web pages as PDF files for compliance workflows.
- Create printable documents from CMS content without maintaining a browser stack.

## Request parameters

This endpoint accepts parameters through the query string plus request body. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `type` | `string` | Yes | - | Endpoint-specific type selector. Refer to the endpoint description for supported values. |
| `content` | `string` | Yes | - | Primary text content processed by the endpoint. |
| `landscape` | `integer` | No | `0` | Whether the generated PDF should use landscape orientation. |

## Example request

```bash
curl -X POST "https://api.gugudata.io/v1/imagerecognition/html2pdf?appkey=YOUR_APPKEY" \
  -H "Content-Type: application/json" \
  -d '
{
  "type": "URL",
  "content": "https://example.com/article",
  "landscape": 0
}
'
```

## Response fields

The response body contains the fields below for successful JSON responses. For binary endpoints, the success response is returned as binary content and JSON is used for error responses.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `DataStatus.StatusCode` | `integer` | Yes | Application-level status code returned by the API response. |
| `DataStatus.StatusDescription` | `string` | Yes | Application-level status message returned by the API response. |
| `DataStatus.ResponseDateTime` | `string` | Yes | Response timestamp returned by the API response. |
| `DataStatus.DataTotalCount` | `integer` | Yes | Total number of records that match the request. |
| `Data` | `string` | Yes | Primary response payload returned by the endpoint. |

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

The official detail page is [https://gugudata.io/details/html2pdf](https://gugudata.io/details/html2pdf). It is the best place to review the latest public endpoint information before publishing or integrating.

### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

## Related GuGuData APIs

- [Image OCR Extraction](https://gugudata.io/details/imagestreamocr)
- [PDF Parsing and Formatted Output](https://gugudata.io/details/pdf2format)
- [PDF Splitting](https://gugudata.io/details/pdf-splitter)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
