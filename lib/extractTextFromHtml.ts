import * as cheerio from "cheerio";

export function extractTextFromHtml(html: string): string {
  const $ = cheerio.load(html ?? "");
  return $.text().replace(/\s+/g, " ").trim();
}

