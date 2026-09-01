---
title: Markdown to PDF Converter API Integration Guide
description: >-
  Convert Markdown into downloadable PDFs with headings, lists, tables,
  quotations, links, code blocks, and Unicode text.
slug: markdown-to-pdf-converter-api
date: '2026-04-10'
updated: '2026-09-01'
category: Documents & Images
apiName: Markdown to PDF Converter
apiMethod: POST
apiEndpoint: /v1/imagerecognition/markdown2pdf
detailUrl: 'https://gugudata.io/details/markdown2pdf'
demoUrl: 'https://api.gugudata.io/v1/imagerecognition/markdown2pdf/demo'
keywords:
  - Markdown to PDF API
  - Markdown PDF converter
  - documentation export API
  - report generation API
featured: false
---

# Markdown to PDF Converter API Integration Guide

The GuGuData Markdown to PDF Converter API turns Markdown into a downloadable PDF. It is suited to documentation, project updates, technical reports, handouts, and archive workflows that need consistent output without running a document renderer.

> Start with the [live demo](https://api.gugudata.io/v1/imagerecognition/markdown2pdf/demo), inspect the [public Markdown fixture](https://gugudata.io/assets/demo/markdown2pdf-demo.md), or review the [API details](https://gugudata.io/details/markdown2pdf).

## API details

| Item | Value |
| --- | --- |
| Method | `POST` |
| Endpoint | `https://api.gugudata.io/v1/imagerecognition/markdown2pdf` |
| Content type | `application/json` |
| Demo | [Run the live demo](https://api.gugudata.io/v1/imagerecognition/markdown2pdf/demo) |
| OpenAPI | [OpenAPI 3.1 JSON](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

## Supported Markdown

The converter preserves commonly used document structures:

- Headings and paragraphs
- Ordered and unordered lists
- Tables and quotations
- Links
- Fenced and inline code
- Unicode text, including English and Chinese

The `content` value must contain 1–100,000 Unicode characters and its UTF-8 representation must not exceed 512 KiB. Embedded scripts, interactive objects, and content that would load local or remote resources are not part of the supported document format.

## Request parameters

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `appkey` | Query | `string` | Yes | Application key used for authentication. Keep it in a trusted server-side environment. |
| `content` | JSON body | `string` | Yes | Markdown source within the documented character and byte limits. |

## Example request

```bash
curl -X POST "https://api.gugudata.io/v1/imagerecognition/markdown2pdf?appkey=YOUR_APPKEY" \
  -H "Content-Type: application/json" \
  --data-binary @- <<'JSON'
{
  "content": "# Quarterly update\n\n- Revenue increased\n- Support response time improved\n\n| Metric | Result |\n| --- | --- |\n| Availability | 99.95% |"
}
JSON
```

## Successful response

The API returns a JSON envelope containing a public HTTPS URL for the generated PDF.

```json
{
  "dataStatus": {
    "requestParameter": "content_length=133,content_bytes=133",
    "statusCode": 200,
    "statusDescription": "successfully",
    "responseDateTime": "2026-09-01T10:30:00+08:00",
    "dataTotalCount": 1
  },
  "data": {
    "pdfPath": "https://storage.gugudata.io/markdown2pdf/86bb28cb-0e7d-4105-a080-6c5c2fe4c451.pdf"
  }
}
```

Download or copy the file to storage you control if your workflow requires a specific retention period. Treat the returned URL as an output location, not as a permanent archive commitment.

## HTTP status codes

| HTTP status | Meaning | Recommended handling |
| --- | --- | --- |
| `200` | PDF generated successfully. | Read `data.pdfPath`, then download or store the file as needed. |
| `400` | Missing, empty, or oversized Markdown input. | Correct the request before retrying. |
| `401` | Application key is missing or unknown. | Send a valid key in the query string. |
| `403` | The key does not have access to this product. | Check the subscription or authorization. |
| `422` | The submitted content could not produce a valid PDF. | Simplify or correct the Markdown before retrying. |
| `429` | Request rate or usage limit exceeded. | Reduce concurrency and retry after the applicable window. |
| `503` | Conversion or file delivery is temporarily unavailable. | Retry conservatively with backoff. |

## Integration guidance

- Validate both the Unicode character count and UTF-8 byte size before submission.
- Use idempotency in your own job queue if a workflow may retry after an uncertain network result.
- Confirm the returned file starts with the PDF signature and has an `application/pdf` content type when downloading it.
- Store completed PDFs in your own archive when business or compliance rules require long-term retention.
- Use the demo and its public fixture for evaluation; use the authenticated endpoint for production documents.

## Related GuGuData APIs

- [HTML and URL to PDF API](https://gugudata.io/details/html2pdf)
- [HTML and URL to Word API](https://gugudata.io/details/html2word)
- [PDF Parsing and Formatted Output API](https://gugudata.io/details/pdf2format)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
