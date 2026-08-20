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
