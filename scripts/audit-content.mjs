import fs from "node:fs/promises";
import matter from "gray-matter";

const guidesRoot = new URL("../src/content/guides/", import.meta.url);
const files = (await fs.readdir(guidesRoot)).filter((name) => name.endsWith(".md"));
const errors = [];
const slugs = new Set();

if (files.length !== 51) errors.push(`Expected 51 guides, found ${files.length}.`);

for (const file of files) {
  const raw = await fs.readFile(new URL(file, guidesRoot), "utf8");
  const { data, content } = matter(raw);
  if (!data.title || /API Documentation$/i.test(data.title)) errors.push(`${file}: title is not optimized.`);
  if (/\bAPI API\b/i.test(`${data.title} ${data.description}`)) errors.push(`${file}: duplicated API label remains.`);
  if (!data.description || data.description.length < 80) errors.push(`${file}: description is too short.`);
  if (!data.slug) errors.push(`${file}: missing slug.`);
  if (slugs.has(data.slug)) errors.push(`${file}: duplicate slug ${data.slug}.`);
  slugs.add(data.slug);
  if (!data.updated) errors.push(`${file}: missing updated date.`);
  if (/This article is written for developers who want a crawlable/i.test(content)) errors.push(`${file}: template introduction remains.`);
  if (/130\+/.test(raw)) errors.push(`${file}: stale API count remains.`);
  if (/\/Users\/|_server_info_|mongodb(?:\+srv)?:\/\/|127\.0\.0\.1|localhost/i.test(raw)) errors.push(`${file}: contains private or local implementation details.`);
  const unsafeKey = raw.match(/appkey=([A-Za-z0-9_-]{12,})/i)?.[1];
  if (unsafeKey && !["YOUR_APPKEY", "REDACTED"].includes(unsafeKey)) errors.push(`${file}: contains a non-placeholder appkey.`);
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Content audit passed for ${files.length} guides.`);
