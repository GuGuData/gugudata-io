---
title: Image OCR to Word API Integration Guide
description: >-
  Convert English text in JPEG, PNG, WebP, TIFF, or BMP images into editable
  Word documents for review, document intake, and archive workflows.
slug: image-ocr-to-word-api-guide
date: '2026-07-08'
updated: '2026-09-01'
category: Document Processing
apiName: Image OCR to Word API
apiMethod: POST
apiEndpoint: 'https://api.gugudata.io/v1/imagerecognition/ocr2word'
detailUrl: 'https://gugudata.io/details/ocr2word'
demoUrl: 'https://gugudata.io/demo/ocr2word'
cover_image: 'https://cdn.gugudata.io/api-covers/api-covers_ocr2word.png'
canonical_url: 'https://gugudata.io/details/ocr2word'
tags:
  - ocr
  - document-processing
  - api
  - automation
keywords:
  - image OCR to Word API
  - image to Word OCR API
  - screenshot to Word API
  - editable OCR document API
  - document automation API
featured: false
---

# Image OCR to Word API Integration Guide

The [GuGuData Image OCR to Word API](https://gugudata.io/details/ocr2word) recognizes English text in an uploaded image and generates an editable `.docx` document. It helps teams turn screenshots, photographed notes, receipts, forms, and scanned pages into drafts that can be reviewed, corrected, commented on, and shared.

Use the [live demo](https://gugudata.io/demo/ocr2word) to inspect a generated document before integrating the paid endpoint. The demo uses this reproducible [public image fixture](https://cdn.gugudata.io/api-fixtures/image-ocr-demo.png).

## API overview

| Item | Value |
| --- | --- |
| Method | `POST` |
| Endpoint | `https://api.gugudata.io/v1/imagerecognition/ocr2word` |
| Content type | `multipart/form-data` |
| Supported images | JPEG, PNG, WebP, TIFF, BMP |
| Maximum upload | 10 MiB |
| Maximum dimensions | 8,192 pixels per side and 40 million pixels total |
| OCR language | English |
| Output | Downloadable Word `.docx` URL |

## Request parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `appkey` | `string` | Yes | Application key passed in the query string. |
| `imagefile` | `file` | Yes | Supported image uploaded as multipart form data. |
| `filename` | `string` | No | Safe output name up to 128 characters. The `.docx` extension is added when omitted and whitespace becomes hyphens. |

```bash
curl -X POST "https://api.gugudata.io/v1/imagerecognition/ocr2word?appkey=YOUR_APPKEY" \
  -F "imagefile=@./receipt.png" \
  -F "filename=receipt-notes.docx"
```

Keep the AppKey in a trusted backend environment. Do not expose it in browser or mobile application source code.

## Success response

The API keeps the existing response contract and returns one HTTPS document URL:

```json
{
  "dataStatus": {
    "requestParameter": "image_bytes=84644&content_type=image/png&output_filename=receipt-notes.docx",
    "statusCode": 200,
    "status": "SUCCESS",
    "statusDescription": "successfully",
    "responseDateTime": "2026-09-01 08:00:00+0000",
    "dataTotalCount": 1
  },
  "data": {
    "wordPath": "https://storage.gugudata.io/ocr2word/55a4346b-receipt-notes.docx"
  }
}
```

| Field | Type | Description |
| --- | --- | --- |
| `dataStatus.requestParameter` | `string` | Redacted upload size, media type, and normalized output filename. |
| `dataStatus.statusCode` | `integer` | Application-level result code. |
| `dataStatus.dataTotalCount` | `integer` | `1` when a document is generated. |
| `data.wordPath` | `string` | Public HTTPS URL of the generated Word document. |

Download or copy the generated document into storage controlled by your application when long-term retention is required.

## Recommended workflows

- Convert photographed notes into editable meeting or research drafts.
- Send receipt, form, and label text to a human review queue.
- Create editable archive records from scanned image files.
- Give operations teams a familiar Word document instead of raw OCR JSON.
- Process incoming images from a backend queue while preserving the original image for visual verification.

OCR output can contain recognition errors, especially when images are blurred, rotated, low contrast, or use decorative fonts. Review business-critical text before publishing or using it for automated decisions.

## Error handling

| HTTP status | Meaning | Recommended handling |
| --- | --- | --- |
| `400` | Missing image or invalid output filename. | Check multipart field names and filename characters. |
| `401` | Missing or unknown AppKey. | Send a valid server-side AppKey. |
| `403` | The AppKey is not authorized for this product. | Check subscription and authorization status. |
| `413` | Image exceeds 10 MiB. | Resize or compress the source image. |
| `415` | File is not JPEG, PNG, WebP, TIFF, or BMP. | Convert the source to a supported image format. |
| `422` | Image is invalid, too large in dimensions, or contains no readable text. | Inspect image quality and pixel dimensions. |
| `429` | Request rate limit reached. | Reduce concurrency and retry after the limit window. |
| `502` | OCR processing did not finish or returned an invalid document result. | Retry later and avoid creating duplicate review jobs. |
| `503` | Conversion capability is temporarily unavailable. | Keep the source image and retry later. |

## Image OCR API or Image OCR to Word API?

Use the [Image OCR API](https://gugudata.io/details/ocr) when an application needs recognized text as JSON. Use Image OCR to Word when people need an editable document for review, correction, comments, or handoff.

Related document APIs:

- [PDF OCR to Text API](https://gugudata.io/details/pdf2text)
- [PDF OCR to Word API](https://gugudata.io/details/pdf2word)
- [HTML to Word API](https://gugudata.io/details/html2word)
- [Word to HTML API](https://gugudata.io/details/word2html)
