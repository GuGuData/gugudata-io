import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { prepareSourceGuides, syncGuides } from "./content-pipeline.mjs";

const validSource = `---
title: Example Guide
description: This description is deliberately long enough for the source validation fixture.
slug: example-guide
date: "2026-08-20"
category: SEO
---

# Example Guide

Example body.
`;

const completedProductGuides = [
  "article-extractor-api.md",
  "general-barcode-generation-api.md",
  "chinese-classical-poetry-database-api.md",
  "isbn-book-metadata-lookup-api.md",
  "pdf-ai-summary-api.md",
  "geographic-coordinate-system-converter-api.md",
  "domain-dns-information-query-api.md",
  "get-any-site-title-and-favicon-api.md",
  "article-content-extraction-api-seo-guide.md",
  "extract-images-from-article-url-api-seo-guide.md",
  "hk-stock-symbols-directory-api.md",
  "html-url-to-pdf-api.md",
  "convert-html-to-word-api.md",
  "image-compression-api.md",
  "image-ocr-extraction-api.md"
];

test("identical Finder copies collapse to one guide", () => {
  const guides = prepareSourceGuides(
    [
      { fileName: "01-example.md", raw: validSource },
      { fileName: "01-example 2.md", raw: validSource }
    ],
    "2026-08-20"
  );

  assert.equal(guides.length, 1);
  assert.deepEqual(guides[0].duplicates, ["01-example 2.md"]);
});

test("conflicting Finder copies fail before output", () => {
  const conflicting = validSource.replace("Example body.", "Different body.");
  assert.throws(
    () => prepareSourceGuides(
      [
        { fileName: "01-example.md", raw: validSource },
        { fileName: "01-example 2.md", raw: conflicting }
      ],
      "2026-08-20"
    ),
    /Conflicting source files/
  );
});

test("invalid source leaves existing output untouched", async () => {
  const fixtureRoot = await fs.mkdtemp(path.join(os.tmpdir(), "gugudata-content-"));
  const sourceRoot = path.join(fixtureRoot, "source");
  const outputRoot = path.join(fixtureRoot, "output");
  await fs.mkdir(sourceRoot);
  await fs.mkdir(outputRoot);
  await fs.writeFile(path.join(sourceRoot, "invalid.md"), "# Missing frontmatter\n", "utf8");
  await fs.writeFile(path.join(outputRoot, "existing.md"), "keep me\n", "utf8");

  await assert.rejects(
    syncGuides({ sourceRoot, outputRoot, updatedDate: "2026-08-20" }),
    /missing required field/
  );
  assert.equal(await fs.readFile(path.join(outputRoot, "existing.md"), "utf8"), "keep me\n");
});

test("completed product guides use specific business-facing descriptions", async () => {
  const guidesRoot = path.resolve("src/content/guides");
  const forbiddenTerms = [
    "Learn how to integrate",
    "Apple ATS",
    "load balancing",
    "multi-node CDN",
    "TLS v1.0",
    "internal token",
    "browser runtime",
    "conversion service"
  ];

  for (const fileName of completedProductGuides) {
    const content = await fs.readFile(path.join(guidesRoot, fileName), "utf8");
    const frontmatter = content.match(/^---\n([\s\S]*?)\n---/)?.[1] || "";
    const description = frontmatter.match(/description:\s*>-\n([\s\S]*?)(?=\n\w)/)?.[1]
      .replace(/^\s+/gm, " ")
      .replace(/\s+/g, " ")
      .trim();

    assert.ok(description?.length >= 90, `${fileName} needs a complete description`);
    assert.match(frontmatter, /updated: ['"]2026-08-30['"]/);
    for (const term of forbiddenTerms) {
      assert.ok(!content.includes(term), `${fileName} exposes or uses weak copy: ${term}`);
    }
  }
});
