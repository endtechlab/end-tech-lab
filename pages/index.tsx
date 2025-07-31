// pages/index.tsx
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { client } from "../lib/microcms";
import { News, NewsResponse } from "../types/news";
import { HERO, ANIMATION, CACHE, SLIDESHOW } from "../lib/constants";

export default function Home({ news }: { news: News[] }) {
  const images = [
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
  ];
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, SLIDESHOW.INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      <section className={`relative ${HERO.HEIGHT_MOBILE} ${HERO.HEIGHT_DESKTOP} flex items-center justify-center mb-8 overflow-hidden shadow-lg max-w-6xl mx-auto px-4`}>
        {/* スライドショー背景 */}
        {images.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt="ヒーロー画像"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity ${ANIMATION.DURATION_LONG} ${current === idx ? 'opacity-100' : 'opacity-0'}`}
            style={{ zIndex: 1 }}
          />
        ))}
        {/* オーバーレイ */}
        <div className={`absolute inset-0 ${HERO.OVERLAY_OPACITY} ${HERO.Z_INDEX_OVERLAY}`} />
        {/* テキスト */}
        <div className={`relative ${HERO.Z_INDEX_CONTENT} text-center text-white`}>
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">End-Tech-Lab</h1>
          <p className="text-lg drop-shadow">あなたの悩みに、終止符を。</p>
        </div>
      </section>

      {/* 最新情報セクション */}
      <section className="max-w-6xl mx-auto mb-8 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2 inline-block">最新情報・お知らせ</h2>
        <ul className="divide-y divide-gray-200 bg-white rounded-xl shadow">
          {news.length === 0 && (
            <li className="p-4 text-gray-500">現在お知らせはありません。</li>
          )}
          {news.map((item) => (
            <li key={item.id} className="p-4 flex flex-col md:flex-row md:items-center gap-2">
              <span className="text-sm text-gray-500 min-w-[7em] md:text-left md:w-36">
                {item.createdAt ? new Date(item.createdAt).toLocaleDateString("ja-JP") : ""}
              </span>
              <span className="font-medium text-gray-800 flex-1">{item.title}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3 px-2">
        <Link href="/services">
          <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl transition cursor-pointer text-center">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">事業内容</h2>
            <div className="border-b-2 border-blue-200 w-10 mx-auto mb-4"></div>
            <p className="text-sm text-gray-600">
              IT導入・ホームページ制作など、提供している事業内容の一覧。
            </p>
          </div>
        </Link>
        <Link href="/activities">
          <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl transition cursor-pointer text-center">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">活動報告</h2>
            <div className="border-b-2 border-blue-200 w-10 mx-auto mb-4"></div>
            <p className="text-sm text-gray-600">
              日々の取り組みや地域での活動などを記録しています。
            </p>
          </div>
        </Link>
        <Link href="/works">
          <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl transition cursor-pointer text-center">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">実績紹介</h2>
            <div className="border-b-2 border-blue-200 w-10 mx-auto mb-4"></div>
            <p className="text-sm text-gray-600">
              これまで手がけた制作実績や支援事例をご紹介します。
            </p>
          </div>
        </Link>
      </section>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get<NewsResponse>({ endpoint: "news", queries: { limit: 3, orders: "-createdAt" } });
  return {
    props: {
      news: data.contents || [],
    },
    revalidate: CACHE.REVALIDATE_TIME,
  };
};
