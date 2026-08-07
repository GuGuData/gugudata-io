---
title: PageSpeed and SEO Score API Integration Guide
description: >-
  Learn how to integrate the PageSpeed and SEO Score API with documented request
  parameters, response fields, error handling, and practical examples.
slug: pagespeed-and-seo-score-api-guide
date: '2026-07-08'
updated: '2026-08-07'
category: SEO
apiName: PageSpeed and SEO Score API
apiMethod: GET
apiEndpoint: 'https://api.gugudata.io/v1/websitetools/pagespeed-score'
detailUrl: 'https://gugudata.io/details/pagespeed-score'
demoUrl: 'https://gugudata.io/demo/pagespeed-score'
cover_image: 'https://cdn.gugudata.io/api-covers/api-covers_pagespeed_score_v2.jpg'
canonical_url: 'https://gugudata.io/details/pagespeed-score'
tags:
  - seo
  - webdev
  - api
  - automation
keywords:
  - PageSpeed API
  - SEO score API
  - technical SEO audit API
  - website quality API
  - performance audit API
featured: false
---

# PageSpeed and SEO Score API Integration Guide

Technical SEO teams need repeatable scoring, not one-off screenshots from manual tools. A page can rank poorly because of content gaps, but it can also lose opportunities because of slow response time, oversized assets, missing HTML signals, weak accessibility, or basic best-practice issues.

The [GuGuData PageSpeed and SEO Score API](https://gugudata.io/details/pagespeed-score) scores a public webpage for performance, SEO, accessibility, and best-practice signals. It returns core metrics, category scores, audit results, and improvement opportunities so teams can build automated technical SEO checks into dashboards, monitoring systems, and content workflows.

This guide covers the API, request parameters, response shape, and practical SEO workflows.


> Start here: [Try the live demo](https://gugudata.io/demo/pagespeed-score) or [view the current API details](https://gugudata.io/details/pagespeed-score).

## Why a PageSpeed and SEO score API matters

Manual page checks are useful during debugging, but they do not scale across hundreds or thousands of URLs. SEO and web teams often need a repeatable API-driven workflow for:

- Monitoring important landing pages.
- Checking newly published content before promotion.
- Comparing mobile and desktop page quality.
- Creating technical SEO dashboards.
- Auditing page templates across many URLs.
- Triggering engineering tickets when scores drop.
- Pairing page quality with search visibility trends.

The API is especially useful when it is combined with search, traffic, and conversion data. A page with high impressions and poor technical quality is a better optimization target than a page with low demand and no traffic path.

## API overview

| Item | Value |
| --- | --- |
| API name | PageSpeed and SEO Score API |
| Method | `GET` |
| Endpoint | `https://api.gugudata.io/v1/websitetools/pagespeed-score` |
| Detail page | [https://gugudata.io/details/pagespeed-score](https://gugudata.io/details/pagespeed-score) |
| Demo page | [https://gugudata.io/demo/pagespeed-score](https://gugudata.io/demo/pagespeed-score) |
| Main use case | Score a webpage for performance, SEO, accessibility, and best practices |

## Request parameters

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Your GuGuData application key. |
| `url` | `string` | Yes | None | Public HTTP or HTTPS URL to score. |
| `strategy` | `string` | No | `desktop` | Scoring strategy. Use `desktop` or `mobile`. |
| `locale` | `string` | No | `en` | Language preference for the result. |
| `categories` | `string` | No | `performance,accessibility,best-practices,seo` | Comma-separated score categories. |
| `forceRefresh` | `boolean` | No | `false` | Reserved for clients that want to bypass cache when caching is enabled. |

Example request:

```bash
curl "https://api.gugudata.io/v1/websitetools/pagespeed-score?appkey=YOUR_APPKEY&url=https%3A%2F%2Fwww.gugudata.io%2Fdetails%2Fsearch-visibility%2F&strategy=desktop&locale=en&categories=performance,accessibility,best-practices,seo"
```

## Response fields

| Field | Type | Description |
| --- | --- | --- |
| `url` | `string` | Scored URL. |
| `strategy` | `string` | `desktop` or `mobile`. |
| `checkedAt` | `string` | Scoring timestamp. |
| `coreMetrics` | `object` | Status, response time, content size, compression, image count, and script count. |
| `scores` | `object` | Requested score categories from 0 to 100. |
| `audits` | `array<object>` | Audit checks and pass or fail values. |
| `opportunities` | `array<object>` | Recommended improvements for failed audits. |

Example response shape:

```json
{
  "dataStatus": {
    "statusCode": 200,
    "status": "SUCCESS",
    "statusDescription": "successfully",
    "dataTotalCount": 1
  },
  "data": {
    "url": "https://www.gugudata.io/details/search-visibility/",
    "strategy": "desktop",
    "checkedAt": "2026-07-08T00:00:00Z",
    "coreMetrics": {
      "status": 200,
      "responseTimeMs": 420,
      "contentSizeBytes": 128000,
      "isCompressed": true,
      "imageCount": 12,
      "scriptCount": 8
    },
    "scores": {
      "performance": 86,
      "accessibility": 92,
      "bestPractices": 88,
      "seo": 94
    },
    "audits": [
      {
        "id": "meta-description",
        "title": "Meta description",
        "passed": true
      }
    ],
    "opportunities": [
      {
        "id": "image-optimization",
        "title": "Optimize large images",
        "impact": "medium"
      }
    ]
  }
}
```

## SEO workflows you can build

### 1. Landing page quality monitoring

Build a list of important landing pages, call the API daily or weekly, and store the returned scores. A score trend is more useful than a single score because it shows whether a page template or deployment changed over time.

Store:

- URL
- Strategy
- Checked time
- Performance score
- SEO score
- Accessibility score
- Best-practices score
- Core metrics
- Failed audits
- Opportunities

Then create alerts when high-value URLs drop below your thresholds.

### 2. Search visibility plus page quality

Page quality matters most when there is real search opportunity. Pair PageSpeed and SEO Score API with [Search Visibility API](https://gugudata.io/details/search-visibility) to prioritize work.

A practical prioritization model:

| Signal | Meaning |
| --- | --- |
| High search impressions, low CTR | Improve title, description, and SERP fit. |
| High impressions, low page quality score | Review technical and user-experience issues. |
| Strong page quality, low visibility | Improve content targeting and internal links. |
| Low quality and low visibility | Deprioritize until search demand is proven. |

This prevents teams from spending a week optimizing a page that has no search demand.

### 3. Template-level technical SEO audits

Many sites have repeated templates: product pages, API documentation pages, category pages, blog posts, and pricing pages. Instead of checking every URL manually, sample representative URLs from each template.

For each template:

- Score one desktop URL.
- Score one mobile URL.
- Compare audit failures.
- Group opportunities by template.
- Send engineering work to the owning team.

This is usually more effective than opening separate tickets for individual pages.

### 4. Pre-publish checks

Before publishing a new SEO landing page, run the API on the staging or public preview URL if it is accessible. The response can catch missing title, missing meta description, oversized content, script bloat, or basic accessibility issues before the page enters the search index.

For production workflows, run the score again after publication and store it with the page release record.

## Desktop vs mobile strategy

Use `desktop` when your users primarily browse on larger screens or when you need a stable comparison for business tools and documentation pages.

Use `mobile` when:

- The page targets consumer search traffic.
- Mobile SERP traffic is important.
- Your templates behave differently on small screens.
- Layout, loading, or image behavior changes significantly by device.

Many SEO teams store both. The important part is to avoid mixing scores without recording the strategy.

## Implementation notes

- Always URL-encode the `url` query parameter.
- Store `strategy` with every result.
- Keep `forceRefresh` false unless your workflow explicitly needs a fresh run.
- Record failed audits and opportunities, not only top-level scores.
- Use thresholds by page type. A documentation page and a media-heavy article may need different score targets.
- Keep `appkey` on your backend.
- Avoid scoring very large URL lists without a queue and rate-limit policy.

## HTTP status handling

| HTTP status | Meaning | Recommended handling |
| --- | --- | --- |
| `200` | Page scored successfully. | Store scores, audits, and opportunities. |
| `400` | Missing, invalid, or unreachable URL. | Validate URL and retry only after correction. |
| `401` | Missing or unknown application key. | Check your `appkey`. |
| `403` | Access or payment issue. | Check subscription and endpoint access. |
| `429` | Rate limit reached. | Reduce concurrency or retry later. |
| `503` | Scoring service unavailable. | Retry later and keep the URL in the queue. |

## FAQ

### Is this only a performance API?

No. The API returns performance, SEO, accessibility, and best-practice signals. The exact categories can be controlled through the `categories` parameter.

### Should I check every page on my site every day?

Usually no. Start with high-value URLs and representative templates. Expand coverage after you know how the results will be used.

### Can this replace manual SEO audits?

It replaces repetitive checks, not expert judgment. Use it to identify changes, regressions, and opportunities at scale, then review important pages manually when needed.

### How should I connect this with business metrics?

Join the score result to URL-level search impressions, clicks, CTR, orders, demo runs, or lead events. That tells you which technical fixes are most likely to matter.

## Related GuGuData APIs

- [Search Visibility API](https://gugudata.io/details/search-visibility): monitor visibility signals and connect SEO demand with technical page quality.
- [Article Content Extraction API](https://gugudata.io/details/fetchcontent): extract readable content from article pages.
- [Extract Images from Article URL API](https://gugudata.io/details/fetchcontentimages): inspect article image candidates and alt text.
- [Domain DNS Information Query](https://gugudata.io/details/dnslookup): check domain DNS records.
- [Domain SSL Certificate Information Parsing](https://gugudata.io/details/sslcertinfo): verify certificate details for technical audits.
- [Webpage Screenshot Capture](https://gugudata.io/details/url2snapshot): capture visual evidence for audits and reports.

For more website and SEO APIs, visit [GuGuData](https://gugudata.io/).
