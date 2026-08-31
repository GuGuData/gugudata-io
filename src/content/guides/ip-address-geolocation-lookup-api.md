---
title: IP Geolocation API Integration Guide
description: >-
  Look up approximate country, region, city, latitude, and longitude for public
  IPv4 and IPv6 addresses in analytics, log enrichment, and traffic workflows.
slug: ip-address-geolocation-lookup-api
date: '2026-04-10'
updated: '2026-08-31'
category: Website Tools
apiName: IP Geolocation and Log Enrichment API
apiMethod: GET
apiEndpoint: /v1/location/ip
detailUrl: 'https://gugudata.io/details/location-ip'
demoUrl: 'https://api.gugudata.io/v1/location/ip/demo'
keywords:
  - IP geolocation API
  - IPv4 geolocation lookup
  - IPv6 geolocation lookup
  - IP log enrichment
  - network traffic analytics
featured: false
---

# IP Geolocation API Integration Guide

The GuGuData IP Geolocation API enriches a public IPv4 or IPv6 address with approximate country, region, city, latitude, and longitude fields. The response is suitable for application logs, traffic dashboards, operational review, product analytics, and location-aware reporting.

IP geolocation describes the network location associated with an address. It does not identify a person or provide a device's precise physical position. Location coverage and granularity vary by address.

> Start with the [live demo](https://api.gugudata.io/v1/location/ip/demo) or review the [API details and pricing](https://gugudata.io/details/location-ip).

## API overview

| Item | Value |
| --- | --- |
| Method | `GET` |
| Endpoint | `https://api.gugudata.io/v1/location/ip` |
| Demo | `https://api.gugudata.io/v1/location/ip/demo` |
| Supported input | Public IPv4 and IPv6 addresses |
| Main output | Country, region, city, latitude, and longitude |

## Common use cases

- Add approximate location fields to access, authentication, support, and operational logs.
- Segment traffic reports by country, region, or city when those fields are available.
- Add geographic context to traffic review and anomaly triage.
- Populate maps and dashboards with approximate network coordinates.
- Normalize IPv4 and IPv6 enrichment through one response contract.

Use geolocation as one contextual signal. Do not use it alone for identity verification, precise device tracking, or access decisions with significant user impact.

## Request parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `appkey` | `string` | Yes | GuGuData application key sent as a query parameter. Keep it on your server. |
| `ip` | `string` | Yes | Public IPv4 or IPv6 address. Hostnames and non-public address ranges are not accepted. |

### IPv4 request

```bash
curl -G "https://api.gugudata.io/v1/location/ip" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "ip=8.8.8.8"
```

### IPv6 request

```bash
curl -G "https://api.gugudata.io/v1/location/ip" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "ip=2001:4860:4860::8888"
```

Private, loopback, link-local, reserved, multicast, unspecified, and hostname inputs return `400` without a location lookup.

## Successful response

```json
{
  "dataStatus": {
    "requestParameter": "ip=8.8.*.*",
    "statusCode": 200,
    "status": "SUCCESS",
    "statusDescription": "successfully",
    "responseDateTime": "2026-08-31 13:22:04+0000",
    "dataTotalCount": 1
  },
  "data": {
    "countryCode": "US",
    "state": "California",
    "city": "Mountain View",
    "latitude": 37.386,
    "longitude": -122.0838
  }
}
```

The authenticated response masks part of the address in `requestParameter`. The Demo uses the public fixture `8.8.8.8` and shows that complete fixture value so the sample is reproducible.

## Response fields

| Field | Type | Description |
| --- | --- | --- |
| `data.countryCode` | `string \| null` | ISO 3166-1 alpha-2 country code when available. |
| `data.state` | `string \| null` | English first-level administrative area name when available. |
| `data.city` | `string \| null` | English city name when available. |
| `data.latitude` | `number \| null` | Approximate latitude when available. |
| `data.longitude` | `number \| null` | Approximate longitude when available. |

## Valid address without coverage

A syntactically valid public address may not have a location record in the current dataset. This is a successful lookup, not an input error. In that case, all five fields in `data` are `null` and `dataStatus.statusCode` remains `200`.

Applications should treat every location field as nullable and keep the original workflow usable when city-level coverage is unavailable.

## HTTP status handling

| HTTP status | Meaning | Recommended handling |
| --- | --- | --- |
| `200` | The public address was evaluated. Location fields may be null. | Parse nullable fields and continue the workflow. |
| `400` | The value is missing, malformed, a hostname, or not a public address. | Validate the input before retrying. |
| `401` | The application key is missing or unknown. | Check the server-side `appkey`. |
| `403` | The key does not have access to the product. | Check the subscription and authorization. |
| `429` | The request rate is over the allowed limit. | Reduce concurrency and retry later. |
| `500` | An unexpected API error occurred. | Retry conservatively and contact support if persistent. |
| `503` | IP location data is temporarily unavailable. | Retry later without changing the address. |

## Integration guidance

- Validate that the value is an IP address rather than a hostname before calling the API.
- Keep `appkey` in a trusted server environment, not browser-side code.
- Cache stable lookup results when your data-retention policy allows it.
- Preserve null values instead of substituting invented city or coordinate data.
- Store the lookup time when location freshness matters to your reporting workflow.
- Combine IP location with other application signals rather than treating it as proof of identity.

## Data attribution and accuracy

Location data is based on the monthly DB-IP City Lite dataset and is approximate. See [IP geolocation data by DB-IP](https://db-ip.com/) for dataset information. Country results are generally broader than city and coordinate results, and mobile or routed networks may resolve far from the end user.

## Related GuGuData APIs

- [DNS Lookup API](https://gugudata.io/details/dnslookup) for structured domain records.
- [Website Metadata and Favicon API](https://gugudata.io/details/favicon) for link-preview metadata.
- [Geographic Coordinate System Converter](https://gugudata.io/details/coordinateconverter) for WGS84, GCJ-02, and BD-09 conversion.

Browse the complete API catalog at [GuGuData](https://gugudata.io/).
