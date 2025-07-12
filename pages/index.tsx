// pages/index.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero */}
      <section className="text-center mb-20">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">End-Tech-Lab</h1>
        <p className="text-lg text-gray-600">
          小規模事業者のIT活用を、もっとシンプルに。
        </p>
      </section>

      {/* 導線3つ */}
      <section className="grid gap-8 md:grid-cols-3">
        <Link href="/services">
          <div className="p-6 border rounded-xl hover:shadow-md transition cursor-pointer text-center">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              サービス
            </h2>
            <p className="text-sm text-gray-600">
              IT導入・ホームページ制作など、提供しているサービス一覧。
            </p>
          </div>
        </Link>

        <Link href="/activities">
          <div className="p-6 border rounded-xl hover:shadow-md transition cursor-pointer text-center">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              活動報告
            </h2>
            <p className="text-sm text-gray-600">
              日々の取り組みや地域での活動などを記録しています。
            </p>
          </div>
        </Link>

        <Link href="/works">
          <div className="p-6 border rounded-xl hover:shadow-md transition cursor-pointer text-center">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              実績紹介
            </h2>
            <p className="text-sm text-gray-600">
              これまで手がけた制作実績や支援事例をご紹介します。
            </p>
          </div>
        </Link>
      </section>
    </main>
  );
}
