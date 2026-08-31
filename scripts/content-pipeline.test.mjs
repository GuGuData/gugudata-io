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

const completedProductGuides = {
  "article-extractor-api.md": "2026-08-30",
  "general-barcode-generation-api.md": "2026-08-30",
  "chinese-classical-poetry-database-api.md": "2026-08-30",
  "isbn-book-metadata-lookup-api.md": "2026-08-30",
  "pdf-ai-summary-api.md": "2026-08-30",
  "geographic-coordinate-system-converter-api.md": "2026-08-30",
  "domain-dns-information-query-api.md": "2026-08-30",
  "get-any-site-title-and-favicon-api.md": "2026-08-30",
  "article-content-extraction-api-seo-guide.md": "2026-08-30",
  "extract-images-from-article-url-api-seo-guide.md": "2026-08-30",
  "hk-stock-symbols-directory-api.md": "2026-08-30",
  "html-url-to-pdf-api.md": "2026-08-30",
  "convert-html-to-word-api.md": "2026-08-30",
  "image-compression-api.md": "2026-08-30",
  "image-ocr-extraction-api.md": "2026-08-30",
  "international-phone-number-validation-and-correction-api.md": "2026-08-31"
};

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

  for (const [fileName, expectedDate] of Object.entries(completedProductGuides)) {
    const content = await fs.readFile(path.join(guidesRoot, fileName), "utf8");
    const frontmatter = content.match(/^---\n([\s\S]*?)\n---/)?.[1] || "";
    const description = frontmatter.match(/description:\s*>-\n([\s\S]*?)(?=\n\w)/)?.[1]
      .replace(/^\s+/gm, " ")
      .replace(/\s+/g, " ")
      .trim();

    assert.ok(description?.length >= 90, `${fileName} needs a complete description`);
    assert.match(frontmatter, new RegExp(`updated: ['"]${expectedDate}['"]`));
    for (const term of forbiddenTerms) {
      assert.ok(!content.includes(term), `${fileName} exposes or uses weak copy: ${term}`);
    }
  }
});
