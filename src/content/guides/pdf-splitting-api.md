---
title: PDF Splitting API Guide
description: Split PDFs by page count, package results as a ZIP, or keep generated files private.
slug: pdf-splitting-api
date: '2026-04-10'
updated: '2026-09-04'
category: Documents & Images
apiName: PDF Splitting
apiMethod: POST
apiEndpoint: /v1/imagerecognition/pdf-splitter
detailUrl: 'https://gugudata.io/details/pdf-splitter'
demoUrl: 'https://api.gugudata.io/v1/imagerecognition/pdf-splitter/demo'
keywords:
  - PDF splitting API
  - split PDF by pages
  - private PDF download
  - PDF ZIP API
featured: false
---

# PDF Splitting API Guide

Split a PDF into predictable page ranges for document review, downstream uploads, customer delivery, or automated archives. Results can be returned as individual PDFs, packaged into a ZIP, or stored privately for short-lived downloads.

> [Try the demo](https://api.gugudata.io/v1/imagerecognition/pdf-splitter/demo) or [view API details](https://gugudata.io/details/pdf-splitter).

## Endpoint

`POST https://api.gugudata.io/v1/imagerecognition/pdf-splitter`

Send the AppKey as the `appkey` query parameter. The request body uses `multipart/form-data` and accepts exactly one input source.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `file` | file | - | A PDF upload up to 20 MiB and 100 pages. |
| `file_url` | URL | - | A public HTTP or HTTPS PDF URL, up to 2048 characters. |
| `page_size` | integer | `100` | Pages per output file, from 1 to 100. |
| `is_zip` | boolean | `true` | Package all split files in one ZIP. |
| `storage` | string | `public` | Use `public` for download URLs or `private` for protected file references. |

## Upload a PDF

```bash
curl -X POST "https://api.gugudata.io/v1/imagerecognition/pdf-splitter?appkey=YOUR_APPKEY" \
  -F "file=@./report.pdf" \
  -F "page_size=10" \
  -F "is_zip=false"
```

## Split a PDF from a URL

URL input is convenient for Remote MCP and server-to-server workflows.

```bash
curl -X POST "https://api.gugudata.io/v1/imagerecognition/pdf-splitter?appkey=YOUR_APPKEY" \
  -F "file_url=https://storage.gugudata.io/pdf/demo.pdf" \
  -F "page_size=2" \
  -F "is_zip=true"
```

## Public output

Public mode preserves the original response fields. `pdf_files` contains HTTPS URLs for the generated PDFs or ZIP.

```json
{
  "dataStatus": {
    "statusCode": 200,
    "status": "SUCCESS",
    "statusDescription": "successfully",
    "responseDateTime": "2026-09-04T12:00:00Z",
    "dataTotalCount": 1
  },
  "data": {
    "uuid": "8c90a913-7012-447e-a088-041f9652e924",
    "num_files": 2,
    "pdf_files": [
      "https://storage.gugudata.io/pdf-splitter/8c90a913/part-001.pdf",
      "https://storage.gugudata.io/pdf-splitter/8c90a913/part-002.pdf"
    ]
  }
}
```

## Private output

Set `storage=private` when generated documents should not have public URLs. The response returns file references and an empty `pdf_files` array. Create an account download key in Dashboard Security, then exchange a `file_id` for a temporary URL.

```json
{
  "data": {
    "uuid": "8c90a913-7012-447e-a088-041f9652e924",
    "num_files": 2,
    "pdf_files": [],
    "storage": "private",
    "files": [
      {
        "file_id": "6718ae9a-acde-4ed9-8508-6bd80a923ead",
        "file_name": "split-pdf.zip",
        "content_type": "application/zip",
        "size_bytes": 18432,
        "index": 1
      }
    ]
  }
}
```

Use the returned `files[].file_id` in the signing path:

```bash
curl -X POST "https://api.gugudata.io/v1/private-files/FILE_ID:sign?appkey=YOUR_APPKEY" \
  -H "Content-Type: application/json" \
  -d '{"secret":"YOUR_PRIVATE_DOWNLOAD_KEY","expires_seconds":600}'
```

The signing response includes `file_id`, `url`, and `expires_at`. The URL expires after 10 minutes by default; accepted values range from 1 to 3600 seconds. Private output files are retained for seven days.

## Validation and errors

| HTTP status | Meaning |
| --- | --- |
| `400` | Input source, page size, storage mode, or request format is invalid. |
| `401` | AppKey is missing or unknown. |
| `403` | The account cannot access the API or private file. |
| `404` | The private file is unavailable to the current account. |
| `413` | The PDF exceeds the file-size or page-count limit. |
| `422` | The file is damaged, encrypted, or not a valid PDF. |
| `429` | Request limit exceeded. |
| `502` | A remote PDF could not be fetched. |
| `503` | PDF splitting or file storage is temporarily unavailable. |

Do not log PDF content, AppKeys, private download keys, or signed URLs. Save public results promptly and request private links only when a user is ready to download.

## Related APIs

- [HTML/URL to PDF](https://gugudata.io/details/html2pdf)
- [Image OCR Extraction](https://gugudata.io/details/imagestreamocr)
- [PDF Parsing and Formatted Output](https://gugudata.io/details/pdf2format)
