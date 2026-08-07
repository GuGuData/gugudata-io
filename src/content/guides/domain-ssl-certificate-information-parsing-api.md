---
title: Domain SSL Certificate Information Parsing API Integration Guide
description: >-
  Learn how to integrate the Domain SSL Certificate Information Parsing API with
  documented request parameters, response fields, error handling, and practical
  examples.
slug: domain-ssl-certificate-information-parsing-api
date: '2026-04-10'
updated: '2026-08-07'
category: Website Tools
apiName: Domain SSL Certificate Information Parsing
apiMethod: GET
apiEndpoint: /v1/websitetools/sslcertinfo
detailUrl: 'https://gugudata.io/details/sslcertinfo'
demoUrl: 'https://api.gugudata.io/v1/websitetools/sslcertinfo/demo'
keywords:
  - Domain SSL Certificate Information Parsing API
  - GuGuData Domain SSL Certificate Information Parsing
  - sslcertinfo API
  - Website Tools APIs
  - developer API documentation
featured: false
---

# Domain SSL Certificate Information Parsing API Integration Guide

The Domain SSL Certificate Information Parsing API from GuGuData helps developers inspect the SSL certificate chain for a target HTTPS domain and return the parsed certificate details.



> Start here: [Try the live demo](https://api.gugudata.io/v1/websitetools/sslcertinfo/demo) or [view the current API details](https://gugudata.io/details/sslcertinfo).

## API details

| Item | Value |
| --- | --- |
| API name | Domain SSL Certificate Information Parsing |
| Category | Website Tools APIs |
| Method | `GET` |
| Endpoint | `https://api.gugudata.io/v1/websitetools/sslcertinfo` |
| Content type | `query parameters` |
| Demo endpoint | [https://api.gugudata.io/v1/websitetools/sslcertinfo/demo](https://api.gugudata.io/v1/websitetools/sslcertinfo/demo) |
| Detail page | [https://gugudata.io/details/sslcertinfo](https://gugudata.io/details/sslcertinfo) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

## When to use this API

- Inspect HTTPS certificate metadata for a domain.
- Monitor certificate expiry and issuer information.
- Add TLS checks to domain health dashboards.

## Request parameters

This endpoint accepts parameters through the query string. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `domain` | `string` | Yes | - | Domain name or HTTPS origin to inspect. |

## Example request

```bash
curl -G "https://api.gugudata.io/v1/websitetools/sslcertinfo" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "domain=example.com"
```

## Response fields

The response body contains the fields below for successful JSON responses. For binary endpoints, the success response is returned as binary content and JSON is used for error responses.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dataStatus.requestParameter` | `string` | Yes | Normalized request parameters echoed by the service. Sensitive credentials are omitted when available. |
| `dataStatus.statusCode` | `integer` | Yes | Application-level status code returned by the API response. |
| `dataStatus.status` | `string` | Yes | Application-level status enum returned by the API response. |
| `dataStatus.statusDescription` | `string` | Yes | Application-level status message returned by the API response. |
| `dataStatus.responseDateTime` | `string` | Yes | Response timestamp returned by the API response. |
| `dataStatus.dataTotalCount` | `integer` | Yes | Total number of records that match the request. |
| `data.subjectDN` | `string` | Yes | Subject Distinguished Name |
| `data.issuerDN` | `string` | Yes | Issuer Distinguished Name |
| `data.serialNumber` | `string` | Yes | Serial number |
| `data.validFrom` | `string` | Yes | Valid from date |
| `data.validTo` | `string` | Yes | Valid to date |
| `data.signatureAlgorithm` | `string` | Yes | Signature algorithm |
| `data.publicKey` | `string` | Yes | Public key information |
| `data.keyUsage` | `string` | No | Key usage |
| `data.extendedKeyUsage` | `string` | No | Extended key usage |
| `data.basicConstraints` | `string` | No | Basic constraints |
| `data.subjectAlternativeNames` | `string` | No | Subject Alternative Names |
| `data.issuerAlternativeNames` | `string` | No | Issuer Alternative Names |
| `data.version` | `string` | Yes | Certificate version |
| `data.signature` | `string` | Yes | Certificate signature |
| `data.publicKeyAlgorithm` | `string` | Yes | Public key algorithm |
| `data.extensions` | `string` | Yes | Certificate extensions information |

## Response example

```json
{
  "dataStatus": {
    "statusCode": 200,
    "statusDescription": "successfully",
    "responseDateTime": "2026-04-10T00:00:00Z",
    "dataTotalCount": 1,
    "status": "SUCCESS",
    "requestParameter": ""
  },
  "data": {
    "subjectDN": "sample value",
    "issuerDN": "sample value",
    "serialNumber": "sample value",
    "validFrom": "sample value",
    "validTo": "sample value"
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

The official detail page is [https://gugudata.io/details/sslcertinfo](https://gugudata.io/details/sslcertinfo). It is the best place to review the latest public endpoint information before publishing or integrating.

### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

## Related GuGuData APIs

- [Webpage Readable Content Extraction](https://gugudata.io/details/readability)
- [Domain DNS Information Query](https://gugudata.io/details/dnslookup)
- [Get Any Site Title and Favicon](https://gugudata.io/details/favicon)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
