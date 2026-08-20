import fs from "node:fs/promises";
import path from "node:path";

const distRoot = path.resolve(process.argv[2] ?? "dist");
const siteOrigin = "https://gugudata.github.io";
const siteBase = "/gugudata-io/";

async function collectFiles(directory) {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(absolute));
    else files.push(absolute);
  }
  return files;
}

function outputPathForUrl(url) {
  if (url.origin !== siteOrigin || !url.pathname.startsWith(siteBase)) return null;
  const relative = decodeURIComponent(url.pathname.slice(siteBase.length));
  if (!relative) return path.join(distRoot, "index.html");
  if (relative.endsWith("/")) return path.join(distRoot, relative, "index.html");
  return path.join(distRoot, relative);
}

const files = await collectFiles(distRoot);
const documents = files.filter((file) =>
  /\.(?:html|xml)$/i.test(file) && path.basename(file) !== "404.html"
);
const missing = [];

for (const file of documents) {
  const source = await fs.readFile(file, "utf8");
  const relative = path.relative(distRoot, file).split(path.sep).join("/");
  const pageUrl = new URL(relative.endsWith("index.html")
    ? `${siteBase}${relative.slice(0, -"index.html".length)}`
    : `${siteBase}${relative}`, siteOrigin);
  for (const match of source.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    const reference = match[1];
    if (!reference || reference.startsWith("#") || /^(?:data|mailto|tel|javascript):/i.test(reference)) continue;
    let target;
    try {
      target = outputPathForUrl(new URL(reference, pageUrl));
    } catch {
      missing.push(`${relative}: invalid URL ${reference}`);
      continue;
    }
    if (!target) continue;
    try {
      await fs.access(target);
    } catch {
      missing.push(`${relative}: missing ${reference}`);
    }
  }
}

const guideRoot = path.join(distRoot, "guides");
const guideSlugs = (await fs.readdir(guideRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const slug of guideSlugs) {
  const aliasPath = path.join(distRoot, slug, "index.html");
  let alias;
  try {
    alias = await fs.readFile(aliasPath, "utf8");
  } catch {
    missing.push(`${slug}: missing root compatibility page`);
    continue;
  }
  const destination = `${siteBase}guides/${slug}/`;
  if (!alias.includes(`url=${destination}`) || !alias.includes(`href="${destination}"`)) {
    missing.push(`${slug}: compatibility page does not target ${destination}`);
  }
  if (!alias.includes(`href="${siteOrigin}${destination}"`)) {
    missing.push(`${slug}: compatibility page has an invalid canonical`);
  }
}

const sitemapFiles = files.filter((file) => /sitemap-\d+\.xml$/i.test(file));
const sitemap = (await Promise.all(sitemapFiles.map((file) => fs.readFile(file, "utf8")))).join("\n");
for (const match of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) {
  const pathname = new URL(match[1]).pathname;
  if (pathname !== siteBase && !pathname.startsWith(`${siteBase}guides/`)) {
    missing.push(`sitemap contains non-canonical compatibility URL ${match[1]}`);
  }
}

if (missing.length > 0) {
  console.error(missing.join("\n"));
  process.exit(1);
}

console.log(`Internal link check passed for ${documents.length} documents and ${guideSlugs.length} compatibility routes.`);
