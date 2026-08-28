---
title: Convert HTML or Webpages to Word with an API
description: >-
  Convert raw HTML or a webpage URL into an editable DOCX file for reports,
  archives, publishing, and business workflows.
slug: convert-html-to-word-api
date: '2026-04-17'
updated: '2026-08-28'
category: Documents & Images
apiName: Convert HTML to Word
apiMethod: POST
apiEndpoint: /v1/imagerecognition/html2word
detailUrl: 'https://gugudata.io/details/html2word'
demoUrl: 'https://api.gugudata.io/v1/imagerecognition/html2word/demo'
keywords:
  - Convert HTML to Word API
  - GuGuData Convert HTML to Word
  - html2word API
  - Document and Image APIs
  - developer API documentation
featured: true
---

# Convert HTML or Webpages to Word with an API

Convert raw HTML or a publicly accessible webpage URL into an editable Word document. Use this API when a CMS, reporting tool, archive, or document workflow needs reliable DOCX output without running a conversion service.



> Start here: [Try the live demo](https://api.gugudata.io/v1/imagerecognition/html2word/demo) or [view the current API details](https://gugudata.io/details/html2word).

## API details

| Item | Value |
| --- | --- |
| API name | Convert HTML to Word |
| Category | Document and Image APIs |
| Method | `POST` |
| Endpoint | `https://api.gugudata.io/v1/imagerecognition/html2word` |
| Content type | `application/json` or `multipart/form-data` |
| Demo endpoint | [https://api.gugudata.io/v1/imagerecognition/html2word/demo](https://api.gugudata.io/v1/imagerecognition/html2word/demo) |
| Detail page | [https://gugudata.io/details/html2word](https://gugudata.io/details/html2word) |

## When to use this API

- Convert raw HTML strings into editable Word documents.
- Export webpage content to `.docx` files for reports, archives, and publishing workflows.
- Add document export to CMS, internal tools, and business documentation systems.

## Request parameters

Send `appkey` in the query string and the conversion parameters in a JSON or multipart request body. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key supplied as a query parameter. |
| `content` | `string` | Yes | - | HTML markup up to 5 MiB for `html`, or a complete public HTTP/HTTPS URL up to 2,048 characters for `url`. |
| `type` | `string` | Yes | - | Input mode: `html` or `url`. |
| `filename` | `string` | No | Generated name | Output filename up to 128 characters. The `.docx` extension is added when omitted. |

## Example request

```bash title="JSON request"
curl -X POST "https://api.gugudata.io/v1/imagerecognition/html2word?appkey=YOUR_APPKEY" \
  -H "Content-Type: application/json" \
  --data '{
    "type": "html",
    "content": "<h1>Quarterly Report</h1><p>Summary content.</p>",
    "filename": "quarterly-report.docx"
  }'
```

The existing multipart format remains available for compatible integrations:

```bash title="Multipart request"
curl -X POST "https://api.gugudata.io/v1/imagerecognition/html2word?appkey=YOUR_APPKEY" \
  -F "type=html" \
  -F "content=<h1>Quarterly Report</h1><p>Summary content.</p>" \
  -F "filename=quarterly-report.docx"
```

## Response fields

The API returns JSON containing a public HTTPS URL for the generated DOCX file.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dataStatus` | `object` | Yes | Response metadata returned by the API response. |
| `dataStatus.requestParameter` | `string` | Yes | Normalized request parameters echoed by the service. Sensitive credentials are omitted when available. |
| `dataStatus.statusCode` | `integer` | Yes | Application-level status code returned by the API response. |
| `dataStatus.statusDescription` | `string` | Yes | Application-level status message returned by the API response. |
| `dataStatus.responseDateTime` | `string` | Yes | Response timestamp returned by the API response. |
| `dataStatus.dataTotalCount` | `integer` | Yes | Total number of records that match the request. |
| `data` | `object` | Yes | Primary response payload returned by the endpoint. |
| `data.wordPath` | `string` | Yes | Download URL of the generated Word document. |

## Response example

```json
{
  "dataStatus": {
    "statusCode": 200,
    "statusDescription": "successfully",
    "responseDateTime": "2026-08-28 00:00:00+0000",
    "dataTotalCount": 1,
    "requestParameter": "type=html&content_length=59"
  },
  "data": {
    "wordPath": "https://storage.gugudata.io/html2word/6ae8b0dd-66bb-4bfc-b685-06746b76145d-quarterly-report.docx"
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
| `422` | The submitted page or HTML could not be converted. | Check that the source contains usable document content. |
| `429` | Request rate or trial usage limit exceeded. | Reduce concurrency or retry after the limit window resets. |
| `500` | Internal service error. | Retry later or contact support if the error persists. |
| `502` | The source page could not be fetched. | Check the source URL and retry after the target site is available. |
| `503` | The conversion capability is temporarily unavailable. | Retry later with bounded backoff. |

## Implementation notes

- Choose `type=html` for raw HTML and `type=url` when the service should fetch a webpage URL.
- Headings, paragraphs, lists, tables, links, and supported images can be included in the generated document.
- Validate HTML size and source URL access before sending the request, then download the returned DOCX promptly.
- Keep server-side retries conservative for `429`, `502`, and `503` responses.
- Log the HTTP status code and `dataStatus.statusDescription` together for easier debugging.
- Use the demo endpoint for a quick connectivity check, then switch to the authenticated endpoint for production data.

## FAQ

### Where is the official API detail page?

The official detail page is [https://gugudata.io/details/html2word](https://gugudata.io/details/html2word). It is the best place to review the latest public endpoint information before publishing or integrating.

### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

## Related GuGuData APIs

- [HTML/URL to PDF](https://gugudata.io/details/html2pdf)
- [Convert Word to HTML](https://gugudata.io/details/word2html)
- [Convert PPT to Images](https://gugudata.io/details/ppt2images)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
