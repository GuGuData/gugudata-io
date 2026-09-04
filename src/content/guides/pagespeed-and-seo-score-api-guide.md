---
title: Real-Browser PageSpeed and SEO Audit API Guide
description: >-
  Run mobile or desktop laboratory audits for public webpages and receive page
  quality scores, loading metrics, audit findings, and prioritized opportunities.
slug: pagespeed-and-seo-score-api-guide
date: '2026-07-08'
updated: '2026-09-04'
category: SEO
apiName: Technical SEO Diagnostics API
apiMethod: GET
apiEndpoint: 'https://api.gugudata.io/v1/websitetools/pagespeed-score'
detailUrl: 'https://gugudata.io/details/pagespeed-score/'
demoUrl: 'https://gugudata.io/demo/pagespeed-score/'
cover_image: 'https://cdn.gugudata.io/api-covers/api-covers_pagespeed_score_v2.jpg'
canonical_url: 'https://gugudata.github.io/gugudata-io/guides/pagespeed-and-seo-score-api-guide/'
tags:
  - seo
  - web-performance
  - accessibility
  - automation
keywords:
  - PageSpeed API
  - browser audit API
  - technical SEO audit API
  - website performance API
  - accessibility audit API
featured: false
---

# Real-Browser PageSpeed and SEO Audit API Guide

The [Technical SEO Diagnostics API](https://gugudata.io/details/pagespeed-score/) loads a public webpage in a browser-based laboratory environment and returns requested performance, accessibility, best-practice, and SEO scores. It also provides loading measurements, individual audit results, and prioritized opportunities that teams can add to release checks, monitoring dashboards, and technical SEO workflows.

> [Try the live demo](https://gugudata.io/demo/pagespeed-score/) or [review the product details](https://gugudata.io/details/pagespeed-score/).

## API overview

| Item | Value |
| --- | --- |
| Method | `GET` |
| Endpoint | `https://api.gugudata.io/v1/websitetools/pagespeed-score` |
| Device profiles | `desktop`, `mobile` |
| Score categories | Performance, accessibility, best practices, SEO |
| Result cache | 15 minutes unless `forceRefresh=true` |

## Request parameters

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | None | GuGuData application key. |
| `url` | `string` | Yes | None | Complete public HTTP or HTTPS URL, up to 2,048 characters. |
| `strategy` | `string` | No | `desktop` | Browser profile: `desktop` or `mobile`. |
| `locale` | `string` | No | `en` | Locale used for audit labels. |
| `categories` | `string` | No | All four | Comma-separated subset of `performance`, `accessibility`, `best-practices`, and `seo`. |
| `forceRefresh` | `boolean` | No | `false` | Replace a recent cached result with a fresh audit. |

Always URL-encode the complete value of `url`:

```bash
curl -G "https://api.gugudata.io/v1/websitetools/pagespeed-score" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "url=https://gugudata.github.io/gugudata-io/guides/pagespeed-and-seo-score-api-guide/" \
  --data-urlencode "strategy=mobile" \
  --data-urlencode "locale=en" \
  --data-urlencode "categories=performance,accessibility,best-practices,seo"
```

## Response structure

The endpoint keeps the same top-level data fields for compatibility. `url` is the final audited URL after redirects. Scores are integers from 0 to 100, and only requested categories appear in `scores`.

```json
{
  "dataStatus": {
    "requestParameter": "url=https://gugudata.github.io/gugudata-io/guides/pagespeed-and-seo-score-api-guide/&strategy=mobile&locale=en&categories=performance,accessibility,best-practices,seo&forceRefresh=false",
    "statusCode": 200,
    "status": "SUCCESS",
    "statusDescription": "successfully",
    "responseDateTime": "2026-09-04 09:00:00.000",
    "dataTotalCount": 1
  },
  "data": {
    "url": "https://gugudata.github.io/gugudata-io/guides/pagespeed-and-seo-score-api-guide/",
    "strategy": "mobile",
    "locale": "en",
    "checkedAt": "2026-09-04T01:00:00.000Z",
    "coreMetrics": {
      "statusCode": 200,
      "fetchTimeMs": 180,
      "contentBytes": 48216,
      "contentType": "text/html",
      "compressed": true,
      "imageCount": 2,
      "missingImageAlt": 0,
      "scriptCount": 4,
      "url": "https://gugudata.github.io/gugudata-io/guides/pagespeed-and-seo-score-api-guide/",
      "firstContentfulPaintMs": 940,
      "largestContentfulPaintMs": 1210,
      "totalBlockingTimeMs": 15,
      "cumulativeLayoutShift": 0.01,
      "speedIndexMs": 1080,
      "interactiveMs": 1280
    },
    "scores": {
      "performance": 96,
      "accessibility": 100,
      "bestPractices": 96,
      "seo": 100
    },
    "audits": [
      {
        "id": "first-contentful-paint",
        "title": "First Contentful Paint",
        "passed": true,
        "value": "0.9 s"
      }
    ],
    "opportunities": []
  }
}
```

The numbers above illustrate field shapes only. Browser laboratory results can vary with page content, network conditions, and third-party resources, so automated checks should use ranges and trends instead of exact score equality.

## Loading measurements

| Field | Meaning |
| --- | --- |
| `firstContentfulPaintMs` | Time until the first page content is painted. |
| `largestContentfulPaintMs` | Time until the largest measured content element is painted. |
| `totalBlockingTimeMs` | Time that long main-thread tasks block interaction. |
| `cumulativeLayoutShift` | Laboratory layout stability measurement. |
| `speedIndexMs` | How quickly visible content appears during the load. |
| `interactiveMs` | Laboratory estimate for page interactivity. |

These are laboratory measurements, not real-user field data. They do not include a real-user Interaction to Next Paint measurement and do not guarantee search ranking changes.

## Practical workflows

### Release regression checks

Audit a stable set of representative URLs before and after a deployment. Store the URL, strategy, requested categories, checked time, scores, metrics, and failed audits. Compare like-for-like profiles and investigate meaningful changes instead of failing a build on a one-point score fluctuation.

### Mobile and desktop monitoring

Run separate mobile and desktop checks when templates or resource loading differ by device. Never combine the two strategies in one time series without preserving the `strategy` field.

### Prioritized technical SEO work

Join audit findings with search impressions, conversions, or page importance. High-value pages with repeated failed audits should usually be reviewed before low-traffic pages with the same issue.

### Fresh checks after deployment

Routine dashboards should reuse the default cache. Use `forceRefresh=true` after a deployment or an important page change when a new browser run is required immediately.

## HTTP status handling

| HTTP status | Meaning | Recommended action |
| --- | --- | --- |
| `200` | Browser audit completed. | Store the normalized result. |
| `400` | URL or request option is invalid. | Correct the request before retrying. |
| `401` | Application key is missing or unknown. | Check `appkey`. |
| `403` | The key cannot access this product. | Check authorization or subscription. |
| `422` | The target could not produce a usable audit. | Confirm that it serves an auditable HTML page. |
| `429` | API rate limit reached. | Reduce request concurrency. |
| `502` | The target failed during loading or auditing. | Check the target and retry later if the failure is temporary. |
| `503` | Audit capacity or service is temporarily unavailable. | Retry with bounded backoff. |

## Integration guidance

- Keep `appkey` on your server rather than in browser code.
- Queue large URL sets and respect rate limits.
- Persist the final returned `url`, because redirects may change the audited page.
- Treat nullable loading measurements as unavailable evidence, not as zero.
- Save audit IDs and opportunities so teams can see why a score changed.
- Use manual review for high-impact decisions; automated scores are diagnostic evidence rather than business outcomes.

## Related APIs

- [Keyword Rank Visibility API](https://gugudata.io/details/search-visibility/) connects page quality with search visibility.
- [Article Content Extraction API](https://gugudata.io/details/fetchcontent/) extracts readable page content.
- [DNS Lookup API](https://gugudata.io/details/dnslookup/) checks domain records.
- [SSL Certificate Information API](https://gugudata.io/details/sslcertinfo/) inspects certificate details.
- [Webpage Screenshot Capture API](https://gugudata.io/details/url2snapshot/) captures visual evidence for review.
