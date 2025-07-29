// pages/index.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="py-16">
      <section className="text-center mb-20">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">End-Tech-Lab</h1>
        <p className="text-lg text-gray-600">
          あなたの悩みに、終止符を。
        </p>
      </section>

      <section className="max-w-5xl mx-auto grid gap-10 md:grid-cols-3 px-2">
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
