---
title: HTML and URL to PDF API Integration Guide
description: >-
  Convert HTML content or public web pages into portrait or landscape PDF files
  and receive a downloadable HTTPS URL.
slug: html-url-to-pdf-api
date: '2026-04-10'
updated: '2026-08-30'
category: Documents & Images
apiName: HTML/URL to PDF
apiMethod: POST
apiEndpoint: /v1/imagerecognition/html2pdf
detailUrl: 'https://gugudata.io/details/html2pdf'
demoUrl: 'https://api.gugudata.io/v1/imagerecognition/html2pdf/demo'
keywords:
  - HTML to PDF API
  - URL to PDF API
  - webpage to PDF API
  - landscape PDF API
  - document automation API
featured: false
---

# HTML and URL to PDF API Integration Guide

The GuGuData HTML/URL to PDF API converts either an HTML document or a public web page into an A4 PDF. The response contains a public HTTPS URL for the generated file.

> Start with the [live demo](https://api.gugudata.io/v1/imagerecognition/html2pdf/demo), then review the [API detail page](https://gugudata.io/details/html2pdf) for current subscription information.

## API details

| Item | Value |
| --- | --- |
| Method | `POST` |
| Endpoint | `https://api.gugudata.io/v1/imagerecognition/html2pdf` |
| Content type | `application/json` |
| Authentication | `appkey` query parameter |
| Output | A public HTTPS PDF URL |
| Demo | [HTML/URL to PDF demo](https://api.gugudata.io/v1/imagerecognition/html2pdf/demo) |
| OpenAPI | [OpenAPI 3.1 JSON](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

## Common uses

- Generate invoices, receipts, statements, and reports from HTML templates.
- Archive public web pages as fixed-layout PDF records.
- Produce printable documents for review and approval workflows.
- Create portrait or landscape exports for customer-facing and internal document workflows.

## Request body

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| `type` | `string` | Yes | `html` or `url`, case-insensitive. |
| `content` | `string` | Yes | HTML up to 5 MiB, or a complete public HTTP/HTTPS URL up to 2048 characters. |
| `landscape` | `integer` | No | `0` for portrait, `1` for landscape. Default: `0`. |

The URL mode accepts public HTTP and HTTPS destinations on standard ports. It does not accept IP-address targets, credential-bearing URLs, private hostnames, or other URL schemes.

## HTML example

```bash
curl -X POST "https://api.gugudata.io/v1/imagerecognition/html2pdf?appkey=YOUR_APPKEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "html",
    "content": "<html><body><h1>Quarterly report</h1><p>Prepared for review.</p></body></html>",
    "landscape": 0
  }'
```

## URL example

```bash
curl -X POST "https://api.gugudata.io/v1/imagerecognition/html2pdf?appkey=YOUR_APPKEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "url",
    "content": "https://gugudata.github.io/gugudata-io/guides/html-url-to-pdf-api/",
    "landscape": 1
  }'
```

## Successful response

```json
{
  "dataStatus": {
    "requestParameter": "type=html&content_length=101&landscape=0",
    "statusCode": 200,
    "status": "SUCCESS",
    "statusDescription": "successfully",
    "responseDateTime": "2026-08-27 12:00:00+0000",
    "dataTotalCount": 1
  },
  "data": {
    "pdfPath": "https://storage.gugudata.io/pdf/86bb28cb-0e7d-4105-a080-6c5c2fe4c451.pdf"
  }
}
```

| Field | Type | Description |
| --- | --- | --- |
| `dataStatus.statusCode` | `integer` | Business status code. `200` indicates success. |
| `dataStatus.requestParameter` | `string` | A safe request summary that excludes HTML, URL query strings, fragments, and the AppKey. |
| `data.pdfPath` | `string` | Public HTTPS URL of the generated PDF. |

Download the file from `data.pdfPath` after the conversion succeeds. Generated URLs are unique, so store the returned value with your own document record when later access is required.

## Error handling

| HTTP status | Meaning | Recommended action |
| --- | --- | --- |
| `400` | Missing fields, invalid JSON, unsupported type, invalid URL, or invalid landscape value. | Correct the request before retrying. |
| `401` | AppKey is missing or unknown. | Send a valid AppKey in the query string. |
| `403` | The AppKey is not authorized for this product. | Check the subscription or authorization state. |
| `422` | The supplied HTML or URL could not be rendered. | Review the input and page availability. |
| `429` | Request or trial limit exceeded. | Reduce request frequency and retry later. |
| `502` | The rendering provider timed out or was temporarily unavailable. | Retry later with bounded backoff. |
| `503` | PDF rendering or storage is temporarily unavailable. | Retry later; contact support if it persists. |

Do not retry `400`, `401`, or `403` responses automatically. For `502` and `503`, use a small retry budget because each successful request produces a new PDF.

## Orientation and validation checklist

- Use `landscape: 1` for wide tables, schedules, and dashboards.
- Keep print-specific CSS in the submitted HTML when exact pagination matters.
- Confirm that external fonts and images used by your document are publicly reachable.
- Validate the returned file as `application/pdf` before passing it to another workflow.
- Use the demo endpoint for connectivity checks only; production calls require the authenticated endpoint.

## Related GuGuData APIs

- [PDF Parsing and Formatted Output](https://gugudata.io/details/pdf2format)
- [PDF Splitting](https://gugudata.io/details/pdf-splitter)
- [HTML to Word](https://gugudata.io/details/html2word)
- [Webpage Screenshot Capture](https://gugudata.io/details/url2snapshot)

Browse more developer APIs at [GuGuData](https://gugudata.io/).
