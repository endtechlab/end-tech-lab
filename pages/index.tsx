// pages/index.tsx
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const images = [
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
  ];
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="py-16">
      <section className="relative h-[340px] md:h-[420px] flex items-center justify-center mb-8 overflow-hidden rounded-xl shadow-lg max-w-5xl mx-auto">
        {/* スライドショー背景 */}
        {images.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt="ヒーロー画像"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${current === idx ? 'opacity-100' : 'opacity-0'}`}
            style={{ zIndex: 1 }}
          />
        ))}
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        {/* テキスト */}
        <div className="relative z-20 text-center text-white">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">End-Tech-Lab</h1>
          <p className="text-lg drop-shadow">あなたの悩みに、終止符を。</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3 px-2">
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
