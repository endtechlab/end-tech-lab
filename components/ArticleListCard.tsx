import Image from "next/image";
import Link from "next/link";
import { formatDateJa } from "../lib/formatDate";

type Props = {
  href: string;
  title: string;
  publishedAt?: string;
  imageUrl?: string;
  excerpt: string;
  badge?: string;
};

export default function ArticleListCard({
  href,
  title,
  publishedAt,
  imageUrl,
  excerpt,
  badge,
}: Props) {
  return (
    <Link
      href={href}
      className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-80">
          <div className="relative aspect-video bg-gray-100">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center">
                <div className="text-xs text-gray-500 tracking-wide px-3 py-1 rounded-full bg-white/70 border border-gray-200">
                  No Image
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 p-4 md:p-5">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {badge && (
              <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">
                {badge}
              </span>
            )}
            {publishedAt && (
              <span className="text-xs text-gray-500">{formatDateJa(publishedAt)}</span>
            )}
          </div>

          <h2 className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2">
            {title}
          </h2>

          <p className="mt-2 text-sm text-gray-700 leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}

