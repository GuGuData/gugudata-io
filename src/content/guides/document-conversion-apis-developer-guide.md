---
title: Document Conversion APIs for Developer Workflows
description: >-
  A developer guide to GuGuData document conversion APIs for HTML, Markdown,
  PDF, Word, and PowerPoint automation workflows.
slug: document-conversion-apis-developer-guide
date: '2026-04-29'
updated: '2026-08-07'
category: Collections
keywords:
  - document conversion API
  - HTML to PDF API
  - PPT to PDF API
  - Word to HTML API
  - GuGuData document APIs
featured: false
---

# Document Conversion APIs for Developer Workflows

Document conversion is often a hidden part of product infrastructure. Reporting tools export PDF files, publishing systems transform HTML into shareable documents, and business platforms need to normalize user-uploaded files before downstream processing.

GuGuData provides a set of document conversion APIs that can be used from backend services, internal tools, automation pipelines, and data workflows. This guide explains how the APIs fit together and when to use each endpoint.

## API lineup

| Workflow | Method | Endpoint | Detail page |
| --- | --- | --- | --- |
| HTML to PDF | `POST` | `/v1/imagerecognition/html2pdf` | [HTML/URL to PDF](https://gugudata.io/details/html2pdf) |
| Markdown to PDF | `POST` | `/v1/imagerecognition/markdown2pdf` | [Markdown to PDF](https://gugudata.io/details/markdown2pdf) |
| PDF parsing and formatted output | `POST` | `/v1/imagerecognition/pdf2format` | [PDF Parsing and Formatted Output](https://gugudata.io/details/pdf2format) |
| PDF split | `POST` | `/v1/imagerecognition/pdf-splitter` | [PDF Splitter](https://gugudata.io/details/pdfsplitter) |
| PDF summary | `POST` | `/v1/imagerecognition/pdf-summary` | [PDF Summary](https://gugudata.io/details/pdfsummary) |
| PDF to HTML | `POST` | `/v1/imagerecognition/pdf2html` | [PDF to HTML](https://gugudata.io/details/pdf2html) |
| Word to HTML | `POST` | `/v1/imagerecognition/word-to-html` | [Convert Word to HTML](https://gugudata.io/details/word2html) |
| HTML to Word | `POST` | `/v1/imagerecognition/html2word` | [Convert HTML to Word](https://gugudata.io/details/html2word) |
| PPT to images | `POST` | `/v1/imagerecognition/ppt-to-images` | [Convert PPT to Images](https://gugudata.io/details/ppt2images) |
| PPT to PDF | `POST` | `/v1/imagerecognition/ppt-to-pdf` | [Convert PPT to PDF](https://gugudata.io/details/ppt2pdf) |

The public OpenAPI JSON is available at [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json).

## When to use these APIs

- Generate PDF versions of invoices, reports, articles, or internal documents.
- Convert uploaded Word, PDF, or PowerPoint files into web-friendly outputs.
- Create preview images from presentations for search, review, or thumbnail workflows.
- Normalize document content before indexing, summarization, storage, or review.
- Replace manual office-document export steps in operational workflows.

## Choosing the right endpoint

Use HTML to PDF when your source content is already rendered as HTML or when your system controls the page layout. Use Markdown to PDF when the source content comes from developer documentation, notes, or publishing pipelines.

Use PDF parsing, PDF summary, or PDF to HTML when the input is already a PDF and you need structured output, readable content, or a web-friendly representation.

Use Word to HTML when users upload Word documents and your application needs to display or process the content in a browser. Use HTML to Word when your source of truth is web content but the user needs a downloadable Word document.

Use PPT to images for visual previews and slide thumbnails. Use PPT to PDF when the output should preserve the presentation as a single shareable document.

## Integration pattern

Most document endpoints are best called from a trusted backend service. Keep `appkey` out of browser code and store it only in server-side configuration.

```bash
curl -X POST "https://api.gugudata.io/v1/imagerecognition/ppt-to-pdf?appkey=YOUR_APPKEY" \
  -F "file=@./presentation.pptx"
```

For JSON-based endpoints, send a JSON request body:

```bash
curl -X POST "https://api.gugudata.io/v1/imagerecognition/markdown2pdf?appkey=YOUR_APPKEY" \
  -H "Content-Type: application/json" \
  -d '
{
  "content": "# Quarterly Report\n\nThis report is generated automatically."
}
'
```

## Response handling

Successful responses use the standard GuGuData response shape when JSON is returned:

```json
{
  "dataStatus": {
    "statusCode": 200,
    "status": "SUCCESS",
    "statusDescription": "successfully",
    "responseDateTime": "2026-04-29T00:00:00Z",
    "dataTotalCount": 1,
    "requestParameter": ""
  },
  "data": {
    "pdfPath": "https://storage.gugudata.io/pdf/example.pdf"
  }
}
```

For file conversion workflows, store the returned URL only according to your own retention and access-control requirements.

## HTTP status codes

| HTTP status | Meaning | Recommended handling |
| --- | --- | --- |
| `200` | Request processed successfully. | Parse the documented response body for the endpoint result. |
| `400` | Invalid request parameters or request format. | Check required fields, file type, file size, and request body format. |
| `401` | Missing or unknown application key. | Send a valid `appkey` with the request. |
| `403` | The application key is recognized but access is not allowed. | Check subscription, trial state, and endpoint access. |
| `429` | Request rate or trial usage limit exceeded. | Reduce concurrency or retry after the limit window resets. |
| `500` | Internal service error. | Retry later or contact support if the error persists. |
| `503` | Upstream service unavailable. | Retry later when the dependency is available again. |

## Implementation notes

- Validate file extension and content type before uploading files.
- Avoid sending large files from client-side code directly with a public key.
- Use demo endpoints for connectivity checks, then switch to authenticated production endpoints.
- Add conservative retries for `429`, `500`, and `503` responses.
- Keep conversion jobs idempotent in your own system so a retry does not create duplicate business records.

## FAQ

### Should document conversion run in frontend code?

No. Use a backend service so the `appkey` stays private and file upload behavior can be validated, logged, and rate limited.

### Which endpoint should I use for preview images?

Use [Convert PPT to Images](https://gugudata.io/details/ppt2images) for slide previews and [PDF to HTML](https://gugudata.io/details/pdf2html) when you need a browser-friendly document representation.

### Can I combine multiple APIs in one workflow?

Yes. A common pattern is to convert uploaded files first, then pass the resulting text or URL into downstream extraction, summarization, or indexing steps.

For more developer APIs, visit [GuGuData](https://gugudata.io/).
