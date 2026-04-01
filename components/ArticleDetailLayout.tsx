import Image from "next/image";
import Link from "next/link";
import { formatDateJa } from "../lib/formatDate";
import { TocItem } from "../lib/parseArticleHtml";
import { BUTTON, CARD, IMAGE, LAYOUT, TITLE, ANIMATION } from "../lib/constants";

type HeroImage = {
  url: string;
  width: number;
  height: number;
};

type Props = {
  title: string;
  heroImage?: HeroImage;
  publishedAt?: string;
  category?: string;
  author?: string;
  toc: TocItem[];
  html: string;
  backHref: string;
  backLabel: string;
  externalUrl?: string;
  externalLabel?: string;
};

export default function ArticleDetailLayout({
  title,
  heroImage,
  publishedAt,
  category,
  author,
  toc,
  html,
  backHref,
  backLabel,
  externalUrl,
  externalLabel = "サイトを見る →",
}: Props) {
  const hasMeta = Boolean(publishedAt || category || author);

  return (
    <main className={`${LAYOUT.MAX_WIDTH} mx-auto ${LAYOUT.CONTAINER_PADDING} ${LAYOUT.MAIN_PADDING}`}>
      <div>
        <h1
          className={`${TITLE.MAIN_SIZE} ${TITLE.FONT_WEIGHT} text-gray-800 ${TITLE.MARGIN_BOTTOM} ${TITLE.BORDER_BOTTOM} ${TITLE.BORDER_COLOR} ${TITLE.PADDING_BOTTOM} inline-block max-w-full ${TITLE.PADDING_X}`}
        >
          {title}
        </h1>
      </div>

      <div className={`${LAYOUT.MAX_WIDTH} mx-auto bg-white ${CARD.SHADOW} ${CARD.ROUNDED} ${CARD.PADDING}`}>
        {heroImage && (
          <div className="mb-6">
            <div className="mx-auto w-full max-w-[1200px]">
              <div className="relative w-full aspect-video overflow-hidden rounded-xl shadow-sm border border-gray-100">
                <Image
                  src={heroImage.url}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className={`${IMAGE.COVER}`}
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {hasMeta && (
          <div className="mb-6 flex flex-wrap gap-2 text-sm">
            {publishedAt && (
              <span className="inline-flex items-center rounded-full bg-gray-50 border border-gray-200 px-3 py-1 text-gray-700">
                <span className="font-semibold mr-1">公開日:</span>
                {formatDateJa(publishedAt)}
              </span>
            )}
            {category && (
              <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-blue-800">
                {category}
              </span>
            )}
            {author && (
              <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-emerald-800">
                {author}
              </span>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {toc.length > 0 && (
            <aside className="lg:col-span-4 lg:order-2">
              <div className="lg:sticky lg:top-24 rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                <div className="text-sm font-semibold text-gray-800 mb-3">目次</div>
                <nav className="flex flex-col gap-2 text-sm">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${encodeURIComponent(item.id)}`}
                      className="text-blue-700 hover:underline leading-snug"
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          <article className={`${toc.length > 0 ? "lg:col-span-8" : "lg:col-span-12"} lg:order-1`}>
            <div
              className="article-body prose max-w-none prose-gray prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {externalUrl && (
              <div className="mt-8">
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline text-sm"
                >
                  {externalLabel}
                </a>
              </div>
            )}

            <div className={CARD.MARGIN_TOP}>
              <Link
                href={backHref}
                className={`inline-block bg-blue-50 hover:bg-blue-100 text-blue-800 ${BUTTON.FONT_WEIGHT} ${BUTTON.PADDING} ${BUTTON.ROUNDED} ${ANIMATION.TRANSITION_COLORS} border border-blue-100 shadow-sm`}
              >
                {backLabel}
              </Link>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}

