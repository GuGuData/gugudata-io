import path from "node:path";
import { fileURLToPath } from "node:url";
import { syncGuides } from "./content-pipeline.mjs";

const args = process.argv.slice(2);
const sourceFlag = args.indexOf("--source");
const updatedFlag = args.indexOf("--updated");
const sourceRoot = sourceFlag >= 0 ? args[sourceFlag + 1] : undefined;
const updatedDate = updatedFlag >= 0 ? args[updatedFlag + 1] : new Date().toISOString().slice(0, 10);

if (!sourceRoot) {
  throw new Error("Pass the Markdown source directory with --source <absolute-path>.");
}

const outputRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/content/guides");
const result = await syncGuides({ sourceRoot, outputRoot, updatedDate });

console.log(
  `Synced and optimized ${result.guideCount} English guides from ${result.sourceCount} source files; collapsed ${result.duplicateCount} identical duplicates.`
);
