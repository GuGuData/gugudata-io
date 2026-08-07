import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const args = process.argv.slice(2);
const sourceFlag = args.indexOf("--source");
const updatedFlag = args.indexOf("--updated");
const sourceRoot = sourceFlag >= 0 ? args[sourceFlag + 1] : undefined;
const updatedDate = updatedFlag >= 0 ? args[updatedFlag + 1] : new Date().toISOString().slice(0, 10);

if (!sourceRoot) {
  throw new Error("Pass the Markdown source directory with --source <absolute-path>.");
}

const outputRoot = new URL("../src/content/guides/", import.meta.url);

const categoryMap = new Map([
  ["Developer API Guides", "Collections"],
  ["Document and Image APIs", "Documents & Images"],
  ["Metadata APIs", "Data"],
  ["QR Code and Barcode APIs", "Codes & Barcodes"],
  ["SEO", "SEO"],
  ["Text Processing APIs", "Text"],
  ["Website Tools APIs", "Website Tools"]
]);

const priorityCopy = new Map([
  [
    "convert-webpage-to-markdown-api",
    {
      title: "Webpage to Markdown API for RAG and Content Pipelines",
      description: "Convert public web pages into clean Markdown for knowledge bases, documentation migration, RAG ingestion, and text analysis.",
      intro: "Turn public web pages into clean Markdown for RAG ingestion, documentation migration, knowledge bases, and text analysis. The API preserves links and readable structure so you can avoid maintaining custom extraction code."
    }
  ],
  [
    "convert-html-to-word-api",
    {
      title: "Convert HTML or Webpages to Word with an API",
      description: "Convert raw HTML or a webpage URL into an editable DOCX file for reports, archives, publishing, and business workflows.",
      intro: "Convert raw HTML or a publicly accessible webpage URL into an editable Word document. Use this API when a CMS, reporting tool, archive, or document workflow needs reliable DOCX output without running a conversion service."
    }
  ],
  [
    "global-qs-world-university-rankings-api",
    {
      title: "QS World University Rankings API Integration Guide",
      description: "Query QS university ranking records and documented indicators for education research, comparison tools, and institution profiles.",
      intro: "Query university ranking records by name with pagination and documented ranking indicators. This guide focuses on practical integration for education research, comparison products, and institution profile enrichment."
    }
  ],
  [
    "global-university-data-api",
    {
      title: "Global University Data API for Search and Enrichment",
      description: "Search structured global university profiles by name, country, region, or city for directories, research, and enrichment workflows.",
      intro: "Search structured university profiles with geographic filters, sorting, and pagination. The API is designed for directories, education research, institution enrichment, and other products that need consistent university metadata."
    }
  ],
  [
    "image-compression-api",
    {
      title: "Image Compression API for Uploads, URLs, and Resizing",
      description: "Compress and optionally resize uploaded images or remote image URLs while preserving aspect ratio and controlling output quality.",
      intro: "Compress an uploaded image or a remote image URL, optionally resize it, and return the optimized binary stream. The API supports quality controls, maximum dimensions, aspect-ratio preservation, and common image formats."
    }
  ]
]);

function normalizeTitle(data) {
  const priority = priorityCopy.get(data.slug);
  if (priority) return priority.title;
  if (data.apiName) return `${normalizeApiName(data.apiName)} API Integration Guide`;
  return String(data.title).replace(/\s+Documentation$/i, " Guide");
}

function normalizeApiName(apiName) {
  return String(apiName).replace(/\s+API$/i, "").trim();
}

function normalizeDescription(data) {
  const priority = priorityCopy.get(data.slug);
  if (priority) return priority.description;
  if (data.apiName) {
    return `Learn how to integrate the ${normalizeApiName(data.apiName)} API with documented request parameters, response fields, error handling, and practical examples.`;
  }
  return String(data.description);
}

function optimizeBody(body, data, title) {
  const priority = priorityCopy.get(data.slug);
  let nextBody = body.replace(/^# .+$/m, `# ${title}`);
  nextBody = nextBody.replace(
    /\nThis article is written for developers[^\n]*\n/,
    "\n"
  );

  if (priority) {
    nextBody = nextBody.replace(
      /(\n?# .+\n\n)[^\n]+/,
      `$1${priority.intro}`
    );
  }

  const ctaParts = [];
  if (data.demoUrl) ctaParts.push(`[Try the live demo](${data.demoUrl})`);
  if (data.detailUrl) ctaParts.push(`[view the current API details](${data.detailUrl})`);
  if (ctaParts.length > 0 && !nextBody.includes("> Start here:")) {
    const firstHeadingEnd = nextBody.indexOf("\n## ");
    if (firstHeadingEnd > 0) {
      nextBody = `${nextBody.slice(0, firstHeadingEnd)}\n\n> Start here: ${ctaParts.join(" or ")}.\n${nextBody.slice(firstHeadingEnd)}`;
    }
  }

  return nextBody.trimEnd() + "\n";
}

await fs.mkdir(outputRoot, { recursive: true });
for (const existing of await fs.readdir(outputRoot)) {
  if (existing.endsWith(".md")) await fs.unlink(new URL(existing, outputRoot));
}

const sourceFiles = (await fs.readdir(sourceRoot))
  .filter((name) => name.endsWith(".md"))
  .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));

for (const fileName of sourceFiles) {
  const raw = await fs.readFile(path.join(sourceRoot, fileName), "utf8");
  const parsed = matter(raw);
  const title = normalizeTitle(parsed.data);
  const data = {
    ...parsed.data,
    title,
    description: normalizeDescription(parsed.data),
    updated: updatedDate,
    category: categoryMap.get(parsed.data.category) ?? parsed.data.category,
    featured: priorityCopy.has(parsed.data.slug)
  };
  const body = optimizeBody(parsed.content, parsed.data, title);
  const output = matter.stringify(body, data);
  await fs.writeFile(new URL(`${parsed.data.slug}.md`, outputRoot), output, "utf8");
}

console.log(`Synced and optimized ${sourceFiles.length} English guides.`);
