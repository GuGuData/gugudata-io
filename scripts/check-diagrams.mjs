import fs from "node:fs/promises";

const files = process.argv.slice(2);
if (files.length === 0) throw new Error("Pass one or more SVG or HTML diagram files.");

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]])
  );
}

function overlaps(a, b) {
  return a.x < b.x + b.width
    && a.x + a.width > b.x
    && a.y < b.y + b.height
    && a.y + a.height > b.y;
}

for (const file of files) {
  const source = await fs.readFile(file, "utf8");
  const svgTag = source.match(/<svg\b[^>]*>/)?.[0];
  if (!svgTag) throw new Error(`${file}: missing SVG root.`);
  const svg = attributes(svgTag);
  const viewBox = svg.viewBox?.split(/\s+/).map(Number);
  if (!viewBox || viewBox.length !== 4 || viewBox.some(Number.isNaN)) {
    throw new Error(`${file}: invalid viewBox.`);
  }

  const nodes = [...source.matchAll(/<rect\b[^>]*class="node"[^>]*>/g)].map((match) => {
    const attrs = attributes(match[0]);
    return Object.fromEntries(["x", "y", "width", "height"].map((key) => [key, Number(attrs[key])]));
  });
  for (const node of nodes) {
    if (Object.values(node).some(Number.isNaN)) throw new Error(`${file}: node geometry is incomplete.`);
    if (node.x < viewBox[0] || node.y < viewBox[1]
      || node.x + node.width > viewBox[0] + viewBox[2]
      || node.y + node.height > viewBox[1] + viewBox[3]) {
      throw new Error(`${file}: node extends beyond the viewBox.`);
    }
  }
  for (let left = 0; left < nodes.length; left += 1) {
    for (let right = left + 1; right < nodes.length; right += 1) {
      if (overlaps(nodes[left], nodes[right])) {
        throw new Error(`${file}: node ${left + 1} overlaps node ${right + 1}.`);
      }
    }
  }

  const connectors = [...source.matchAll(/<path\b[^>]*class="connector"[^>]*>/g)];
  if (connectors.length === 0) throw new Error(`${file}: no connectors found.`);
  for (const connector of connectors) {
    const commands = attributes(connector[0]).d ?? "";
    if (/[Ll]/.test(commands)) throw new Error(`${file}: diagonal line command found in connector.`);
    if (/[^0-9,.\sMHVQZ-]/i.test(commands.replace(/[MHVQZ]/gi, ""))) {
      throw new Error(`${file}: unsupported connector command.`);
    }
  }

  console.log(`Geometry check passed for ${file}: ${nodes.length} nodes, ${connectors.length} connectors.`);
}
