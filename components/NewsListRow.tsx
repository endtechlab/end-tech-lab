import Link from "next/link";
import { News } from "../types/news";
import { formatDateJa } from "../lib/formatDate";
import { extractTextFromHtml, hasHtmlBody } from "../lib/extractTextFromHtml";

type Props = {
  item: News;
};

export function NewsListRow({ item }: Props) {
  return (
    <li className="py-3 px-4 flex flex-col md:flex-row md:items-start gap-2 md:gap-3">
      <span className="text-sm text-gray-500 min-w-[3.5em] md:text-left md:w-20 shrink-0">
        {formatDateJa(item.publishedAt ?? item.createdAt)}
      </span>
      <div className="flex-1 min-w-0">
        {item.slug && hasHtmlBody(item.body) ? (
          <Link
            href={`/news/${item.slug}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline block"
          >
            {extractTextFromHtml(item.title)}
          </Link>
        ) : (
          <span className="text-sm font-medium text-gray-800 flex-1 min-w-0" dangerouslySetInnerHTML={{ __html: item.title }} />
        )}
      </div>
    </li>
  );
}
