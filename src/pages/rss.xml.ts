import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
  const guides = (await getCollection("guides")).sort(
    (a, b) => b.data.updated.getTime() - a.data.updated.getTime()
  );
  const baseUrl = new URL("/gugudata-io/", site);
  const items = guides
    .map((guide) => {
      const url = new URL(`guides/${guide.data.slug}/`, baseUrl);
      return `<item><title><![CDATA[${guide.data.title}]]></title><link>${url}</link><guid>${url}</guid><pubDate>${guide.data.updated.toUTCString()}</pubDate><description><![CDATA[${guide.data.description}]]></description></item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>GuGuData.io Guides</title><link>${baseUrl}</link><description>Practical API integration guides for developers.</description><language>en</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
