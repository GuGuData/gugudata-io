---
title: DNS Lookup API Integration Guide
description: >-
  Query complete A, AAAA, MX, TXT, NS, CNAME, SRV, and SOA records with a
  structured DNS lookup API for diagnostics, monitoring, and security review.
slug: domain-dns-information-query-api
date: '2026-04-10'
updated: '2026-08-25'
category: Website Tools
apiName: DNS Lookup and Troubleshooting API
apiMethod: GET
apiEndpoint: /v1/websitetools/dns-lookup
detailUrl: 'https://gugudata.io/details/dnslookup'
demoUrl: 'https://api.gugudata.io/v1/websitetools/dns-lookup/demo'
keywords:
  - Domain DNS Information Query API
  - GuGuData Domain DNS Information Query
  - dnslookup API
  - Website Tools APIs
  - developer API documentation
featured: false
---

# DNS Lookup API Integration Guide

The GuGuData DNS Lookup API returns complete, structured DNS records for a domain or HTTP(S) URL. Use it to investigate mail routing, ownership checks, service discovery, authoritative nameservers, and domain configuration changes without parsing command-line output.

> Start here: [Try the live demo](https://api.gugudata.io/v1/websitetools/dns-lookup/demo) or [view the current API details](https://gugudata.io/details/dnslookup).

## API details

| Item | Value |
| --- | --- |
| API name | DNS Lookup and Troubleshooting API |
| Category | Website Tools APIs |
| Method | `GET` |
| Endpoint | `https://api.gugudata.io/v1/websitetools/dns-lookup` |
| Content type | `query parameters` |
| Demo endpoint | [https://api.gugudata.io/v1/websitetools/dns-lookup/demo](https://api.gugudata.io/v1/websitetools/dns-lookup/demo) |
| Detail page | [https://gugudata.io/details/dnslookup](https://gugudata.io/details/dnslookup) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

## When to use this API

- Review A and AAAA routing before a website launch or migration.
- Validate MX, TXT, and SOA values during email and domain ownership troubleshooting.
- Compare NS and CNAME changes in monitoring and incident workflows.
- Inspect SRV records used for service discovery.

## Request parameters

This endpoint accepts parameters through the query string. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `domain` | `string` | Yes | - | Domain name or HTTP(S) URL to inspect. Paths, case, trailing dots, and internationalized domain names are normalized. IP addresses and other URL schemes are rejected. |

## Example request

```bash
curl -G "https://api.gugudata.io/v1/websitetools/dns-lookup" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "domain=https://gugudata.io/docs"
```

## Response fields

Successful responses group records by type. Missing record groups are omitted. A valid domain that does not exist returns HTTP `200`, business status `200`, and `data: {}`.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dataStatus.requestParameter` | `string` | Yes | Normalized request parameters echoed by the service. Sensitive credentials are omitted when available. |
| `dataStatus.statusCode` | `integer` | Yes | Application-level status code returned by the API response. |
| `dataStatus.status` | `string` | Yes | Application-level status enum returned by the API response. |
| `dataStatus.statusDescription` | `string` | Yes | Application-level status message returned by the API response. |
| `dataStatus.responseDateTime` | `string` | Yes | Response timestamp returned by the API response. |
| `dataStatus.dataTotalCount` | `integer` | Yes | Total number of records that match the request. |
| `data.{recordType}` | `array` | No | Records grouped under `A`, `AAAA`, `MX`, `TXT`, `NS`, `CNAME`, `SRV`, or `SOA`. Groups without records are omitted. |
| `data.{recordType}[].domain` | `string` | Yes | Absolute owner name of the record. |
| `data.{recordType}[].ttl` | `string` | Yes | Record time to live in seconds, returned as a string. |
| `data.{recordType}[].class` | `string` | Yes | DNS record class, normally `IN`. |
| `data.{recordType}[].type` | `string` | Yes | DNS record type for this array item. |
| `data.{recordType}[].value` | `string` | Yes | Complete record value. MX, SRV, and SOA retain all fields; multi-part TXT values are joined in order. |

## Response example

```json
{
  "dataStatus": {
    "statusCode": 200,
    "statusDescription": "successfully",
    "responseDateTime": "2026-08-25 00:00:00+0000",
    "dataTotalCount": 1,
    "status": "SUCCESS",
    "requestParameter": "domain=gugudata.io"
  },
  "data": {
    "MX": [
      {
        "domain": "gugudata.io.",
        "ttl": "300",
        "class": "IN",
        "type": "MX",
        "value": "11 route3.mx.cloudflare.net."
      }
    ],
    "TXT": [
      {
        "domain": "gugudata.io.",
        "ttl": "300",
        "class": "IN",
        "type": "TXT",
        "value": "v=spf1 include:_spf.mx.cloudflare.net ~all"
      }
    ],
    "SOA": [
      {
        "domain": "gugudata.io.",
        "ttl": "1800",
        "class": "IN",
        "type": "SOA",
        "value": "iris.ns.cloudflare.com. dns.cloudflare.com. 2412527907 10000 2400 604800 1800"
      }
    ]
  }
}
```

For a valid nonexistent domain, the response remains successful and contains an empty object:

```json
{
  "dataStatus": {
    "statusCode": 200,
    "status": "SUCCESS",
    "statusDescription": "successfully",
    "responseDateTime": "2026-08-25 00:00:00+0000",
    "dataTotalCount": 1,
    "requestParameter": "domain=postman-ci.invalid"
  },
  "data": {}
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
| `500` | DNS lookup service unavailable or internal service error. | Retry once after a short delay, then contact support if the error persists. |

## Implementation notes

- Validate required parameters before sending the request so malformed domains return quickly.
- Treat HTTP `200` with `data: {}` as a valid nonexistent domain, not as a service failure.
- Compare full record values rather than only the first token of MX, SRV, TXT, or SOA data.
- Cache results for no longer than the record TTL when your workflow permits caching.
- Use the demo endpoint for a connectivity check, then use the authenticated endpoint for production data.

## FAQ

### Where is the official API detail page?

The official detail page is [https://gugudata.io/details/dnslookup](https://gugudata.io/details/dnslookup). It is the best place to review the latest public endpoint information before publishing or integrating.

### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

## Related GuGuData APIs

- [Webpage Readable Content Extraction](https://gugudata.io/details/readability)
- [Domain SSL Certificate Information Parsing](https://gugudata.io/details/sslcertinfo)
- [Get Any Site Title and Favicon](https://gugudata.io/details/favicon)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
