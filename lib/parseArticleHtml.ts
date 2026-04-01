import * as cheerio from "cheerio";

export type TocItem = {
  id: string;
  text: string;
};

function normalizeHeadingText(text: string): string {
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (!trimmed) return "section";
  // Japanese text is valid in id, but we still remove characters that often break anchors.
  return trimmed.replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, "").replace(/\s+/g, "-");
}

function uniqueId(base: string, used: Set<string>): string {
  let id = base;
  let i = 2;
  while (used.has(id)) {
    id = `${base}-${i}`;
    i += 1;
  }
  used.add(id);
  return id;
}

export function parseArticleHtml(rawHtml: string): { html: string; toc: TocItem[] } {
  const $ = cheerio.load(rawHtml ?? "");
  const used = new Set<string>();
  const toc: TocItem[] = [];

  $("h2").each((_, el) => {
    const heading = $(el);
    const text = heading.text().trim();
    if (!text) return;

    const existingId = heading.attr("id")?.trim();
    const base = normalizeHeadingText(existingId || text);
    const id = uniqueId(base, used);

    heading.attr("id", id);
    toc.push({ id, text });
  });

  return { html: $.root().html() ?? "", toc };
}

