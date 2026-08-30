---
title: Image OCR Extraction API Integration Guide
description: >-
  Extract English text from JPEG, PNG, WebP, TIFF, and BMP images with a
  structured JSON response containing recognized lines and joined plain text.
slug: image-ocr-extraction-api
date: '2026-04-10'
updated: '2026-08-30'
category: Documents & Images
apiName: Image OCR Extraction
apiMethod: POST
apiEndpoint: /v1/imagerecognition/ocr
detailUrl: 'https://gugudata.io/details/imagestreamocr'
demoUrl: 'https://api.gugudata.io/v1/imagerecognition/ocr/demo'
keywords:
  - Image OCR Extraction API
  - image text extraction API
  - English OCR JSON API
  - imagestreamocr API
featured: false
---

# Image OCR Extraction API Integration Guide

The Image OCR Extraction API recognizes English text in an uploaded image. It returns both non-empty text lines in reading order and the joined plain text, making the response suitable for document intake, search indexing, and automation.

> Start here: [try the live demo](https://api.gugudata.io/v1/imagerecognition/ocr/demo) or [view the API details](https://gugudata.io/details/imagestreamocr).

## API details

| Item | Value |
| --- | --- |
| Method | `POST` |
| Endpoint | `https://api.gugudata.io/v1/imagerecognition/ocr` |
| Content type | `multipart/form-data` |
| Supported images | JPEG, PNG, WebP, TIFF, BMP |
| Maximum file size | 10 MiB |
| Demo endpoint | [Run the OCR demo](https://api.gugudata.io/v1/imagerecognition/ocr/demo) |
| Demo source image | [Download the reproducible PNG fixture](https://cdn.gugudata.io/api-fixtures/image-ocr-demo.png) |
| OpenAPI | [OpenAPI 3.1 JSON](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

## Request parameters

Send the application key in the query string and the image as a multipart file. Keep the key in trusted server-side code.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `appkey` | Query | `string` | Yes | Application key used for authentication and access control. |
| `imagefile` | Multipart body | `file` | Yes | JPEG, PNG, WebP, TIFF, or BMP image no larger than 10 MiB. |

## Example request

```bash
curl -X POST "https://api.gugudata.io/v1/imagerecognition/ocr?appkey=YOUR_APPKEY" \
  -F "imagefile=@./sample.png"
```

You can download the [same image used by the demo](https://cdn.gugudata.io/api-fixtures/image-ocr-demo.png) and submit it as `sample.png`.

## Response fields

| Field | Type | Description |
| --- | --- | --- |
| `dataStatus.statusCode` | `integer` | Application-level status code. |
| `dataStatus.statusDescription` | `string` | Application-level status description. |
| `dataStatus.responseDateTime` | `string` | Response time in ISO 8601 format. |
| `dataStatus.dataTotalCount` | `integer` | Number of result objects in the response. |
| `data.resultText` | `array<string>` | Recognized non-empty lines in reading order. |
| `data.text` | `string` | Recognized content joined as plain text. |

An image with no recognized English text can still be processed successfully; in that case `resultText` is an empty array and `text` is an empty string.

## Response example

```json
{
  "dataStatus": {
    "statusCode": 200,
    "statusDescription": "SUCCESS",
    "responseDateTime": "2026-08-30T12:00:00Z",
    "dataTotalCount": 1
  },
  "data": {
    "resultText": [
      "GUGUDATA",
      "DATA PAY LESS"
    ],
    "text": "GUGUDATA\nDATA PAY LESS"
  }
}
```

## HTTP status codes

| HTTP status | Meaning | Recommended handling |
| --- | --- | --- |
| `200` | OCR completed, including a valid image with no recognized text. | Read `resultText` and `text`. |
| `400` | The image is missing or the upload is malformed. | Check the multipart field and request format. |
| `401` | The application key is missing or unknown. | Send a valid key as the `appkey` query parameter. |
| `403` | The key does not have access to this API. | Check the product authorization. |
| `413` | The image exceeds 10 MiB. | Resize or compress the source image. |
| `415` | The file is not a supported image type. | Convert it to JPEG, PNG, WebP, TIFF, or BMP. |
| `422` | The image cannot be decoded or exceeds processing dimensions. | Check the source image and reduce its dimensions. |
| `429` | The request or usage limit was reached. | Retry after the applicable limit window. |
| `502` | OCR processing did not complete in time. | Retry once with a smaller or clearer image. |
| `503` | OCR is temporarily unavailable. | Retry later with bounded backoff. |

## Integration guidance

- Resize very large scans before upload to reduce latency and bandwidth.
- Use clear, upright images with adequate contrast for better recognition quality.
- Treat an empty successful result differently from an HTTP error.
- Retry only temporary `502` or `503` responses, and keep retry counts bounded.
- Use the demo for response-shape checks and the authenticated endpoint for production OCR.

## FAQ

### Does the API currently recognize multiple languages?

The published OCR contract currently targets English text. Do not assume additional language support unless it is explicitly added to the API details and OpenAPI contract.

### Does the API return text positions or confidence scores?

No. The response contains recognized lines and joined plain text. It does not currently expose bounding boxes or confidence scores.

### Can I use the demo endpoint in production?

No. The demo returns a stable sample for integration checks. Use the authenticated endpoint for your own images.

## Related GuGuData APIs

- [Image Compression](https://gugudata.io/details/image-compress)
- [Image OCR to Word](https://gugudata.io/details/ocr2word)
- [PDF Parsing and Formatted Output](https://gugudata.io/details/pdf2format)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
