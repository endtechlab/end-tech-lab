import * as cheerio from "cheerio";

export function extractTextFromHtml(html: string): string {
  const $ = cheerio.load(html ?? "");
  return $.text().replace(/\s+/g, " ").trim();
}

/** 本文が空（空白・タグのみ）のときは false */
export function hasHtmlBody(html: string | undefined): boolean {
  return extractTextFromHtml(html ?? "").length > 0;
}

