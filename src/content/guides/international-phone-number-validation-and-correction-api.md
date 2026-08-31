---
title: International Phone Number Validation and Correction API Integration Guide
description: >-
  Validate international phone numbers, normalize valid values to E.164, and
  retrieve calling and ISO region codes for CRM, signup, SMS, and voice data
  workflows.
slug: international-phone-number-validation-and-correction-api
date: '2026-04-10'
updated: '2026-08-31'
category: Website Tools
apiName: International Phone Number Validation and Correction
apiMethod: GET
apiEndpoint: /v1/websitetools/international-phone-format
detailUrl: 'https://gugudata.io/details/international-phone-format'
demoUrl: 'https://api.gugudata.io/v1/websitetools/international-phone-format/demo'
keywords:
  - International Phone Number Validation and Correction API
  - GuGuData International Phone Number Validation and Correction
  - international-phone-format API
  - Website Tools APIs
  - developer API documentation
featured: false
---

# International Phone Number Validation and Correction API Integration Guide

The International Phone Number Validation and Correction API validates numbers against international numbering plans and returns a consistent E.164 value when a number is valid. It is designed for teams cleaning phone data before it enters customer, messaging, and communications systems.

Validation confirms number format and numbering-plan validity. It does not prove that a number is currently reachable, assigned to a particular person, or active with a carrier.

> Start here: [Try the live demo](https://api.gugudata.io/v1/websitetools/international-phone-format/demo) or [view the current API details](https://gugudata.io/details/international-phone-format).

## API details

| Item | Value |
| --- | --- |
| API name | International Phone Number Validation and Correction |
| Category | Website Tools APIs |
| Method | `GET` |
| Endpoint | `https://api.gugudata.io/v1/websitetools/international-phone-format` |
| Content type | `query parameters` |
| Demo endpoint | [https://api.gugudata.io/v1/websitetools/international-phone-format/demo](https://api.gugudata.io/v1/websitetools/international-phone-format/demo) |
| Detail page | [https://gugudata.io/details/international-phone-format](https://gugudata.io/details/international-phone-format) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

## When to use this API

- Normalize international phone numbers before storage.
- Validate phone input in CRM, registration, and account-import flows.
- Prepare consistent recipient data for SMS and voice workflows.
- Detect malformed or impossible values before downstream processing.

## Request parameters

This endpoint accepts parameters through the query string. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | — | Application key used for request authentication. |
| `phone` | `string` | Yes | — | International number beginning with `+`, up to 64 characters. Spaces, hyphens, periods, and parentheses are accepted. |

Always URL-encode query values. In particular, encode the leading `+` as `%2B`; an unencoded plus sign can be interpreted as a space by query-string parsers.

## Example request

```bash
curl -G "https://api.gugudata.io/v1/websitetools/international-phone-format" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "phone=+1 (817) 569-8900"
```

## Response fields

The API returns a JSON response envelope. A syntactically accepted number that is not valid under its numbering plan still returns HTTP `200` with `data.isValid: false`.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dataStatus` | `object` | Yes | Response metadata returned by the API response. |
| `dataStatus.requestParameter` | `string` | Yes | Privacy-masked phone parameter. The AppKey and full number are not returned. |
| `dataStatus.statusCode` | `integer` | Yes | Application-level status code. Successful requests return `200`. |
| `dataStatus.status` | `string` | Yes | Application-level status enum. Successful requests return `SUCCESS`. |
| `dataStatus.statusDescription` | `string` | Yes | Application-level status message returned by the API response. |
| `dataStatus.responseDateTime` | `string` | Yes | Response timestamp returned by the API response. |
| `dataStatus.dataTotalCount` | `integer` | Yes | Number of result objects returned. |
| `data` | `object` | Yes | Phone validation result. |
| `data.isValid` | `boolean` | Yes | Whether the number is valid under the applicable numbering plan. |
| `data.correctedMobileNumber` | `string` | Yes | Valid number in E.164 format, or an empty string when invalid. |
| `data.countryCode` | `string` | Yes | International calling code including `+`, when determinable. |
| `data.countryCode2` | `string` | Yes | ISO 3166-1 alpha-2 region code, or an empty string. |
| `data.countryCode3` | `string` | Yes | ISO 3166-1 alpha-3 region code, or an empty string. |

## Response example

```json
{
  "dataStatus": {
    "requestParameter": "phone=+1******8900",
    "statusCode": 200,
    "status": "SUCCESS",
    "statusDescription": "successfully",
    "responseDateTime": "2026-08-31 09:30:00.000",
    "dataTotalCount": 1
  },
  "data": {
    "isValid": true,
    "correctedMobileNumber": "+18175698900",
    "countryCode": "+1",
    "countryCode2": "US",
    "countryCode3": "USA"
  }
}
```

For a well-formed but invalid number, `isValid` is `false` and `correctedMobileNumber` is an empty string. Region fields are returned only when they can be determined reliably; non-geographic numbers can therefore have empty ISO region codes.

## HTTP status codes

Use the HTTP status code for transport-level handling. If the response body contains `dataStatus.statusCode`, treat it as an application-level status field in the JSON payload.

| HTTP status | Meaning | Recommended handling |
| --- | --- | --- |
| `200` | Request processed successfully. | Parse the documented response body for the endpoint result. |
| `400` | Missing `+`, unsupported characters, an extension, an empty value, or input longer than 64 characters. | Correct the phone input and URL encoding before retrying. |
| `401` | Missing or unknown application key. | Send a valid appkey with the request. |
| `403` | The application key is recognized but access is not allowed. | Check subscription, trial state, and endpoint access. |
| `429` | Request rate or trial usage limit exceeded. | Reduce concurrency or retry after the limit window resets. |
| `500` | Internal service error. | Retry conservatively or contact support if the error persists. |

## Implementation notes

- Store `correctedMobileNumber` only when `isValid` is `true`.
- Keep the original user-entered value separately only when your privacy policy requires it.
- Treat HTTP `400` as a data-quality issue and do not retry it unchanged.
- Retry `429` and `500` responses conservatively, with backoff.
- Use the demo endpoint for a connectivity check, then use the authenticated endpoint for production data.

## FAQ

### Where is the official API detail page?

The official detail page is [https://gugudata.io/details/international-phone-format](https://gugudata.io/details/international-phone-format). It is the best place to review the latest public endpoint information before publishing or integrating.

### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

### Does a valid response prove the phone is reachable?

No. The result covers syntax and numbering-plan validity. It does not verify ownership, live connectivity, carrier status, or consent to receive messages.

### Why must I encode the plus sign?

In URL query strings, an unencoded `+` can be decoded as a space. Use a standard query builder or percent-encode it as `%2B` so the international calling prefix reaches the API unchanged.

## Related GuGuData APIs

- [IP Address Geolocation](https://gugudata.io/details/iplocation)
- [Domain DNS Information Query](https://gugudata.io/details/dnslookup)
- [URL Shortener](https://gugudata.io/details/shortlink)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
