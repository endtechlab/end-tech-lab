// pages/index.tsx
import Link from "next/link";
import Image from "next/image";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { client } from "../lib/microcms";
import { News, NewsResponse } from "../types/news";
import { HERO, CACHE } from "../lib/constants";

export default function Home({ news }: { news: News[] }) {
  const router = useRouter();

  useEffect(() => {
    // 他のページからトップページに遷移した場合、ページトップにスクロール
    if (router.asPath === "/" && window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [router.asPath]);

  return (
    <>
      <Head>
        <title>End Tech Lab - エンドテックラボ | ホーム</title>
        <meta name="description" content="End Tech Lab（エンドテックラボ）の公式サイトです。IT導入・ホームページ制作など、最新のテクノロジーを活用したソリューションを提供しています。" />
      </Head>
      <div>
        <section className={`relative ${HERO.HEIGHT_MOBILE} ${HERO.HEIGHT_DESKTOP} flex items-center justify-center mb-8 overflow-hidden shadow-lg max-w-6xl mx-auto px-4`}>
          {/* ヒーロー画像 */}
          <Image
            src="/hero_image.png"
            alt="ヒーロー画像"
            fill
            className="object-cover object-right md:object-center"
            style={{ zIndex: 1 }}
            priority
          />
          {/* オーバーレイ */}
          <div className={`absolute inset-0 ${HERO.OVERLAY_OPACITY} ${HERO.Z_INDEX_OVERLAY}`} />
          {/* テキスト */}
          <div className={`relative ${HERO.Z_INDEX_CONTENT} text-center text-white`}>
            <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">End-Tech-Lab</h1>
            <p className="text-lg drop-shadow">あなたの悩みに、終止符を。</p>
          </div>
        </section>

        {/* 自己紹介セクション */}
        <section className="max-w-6xl mx-auto mb-8 px-1 md:px-4">
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-center md:justify-center gap-6 md:gap-8 md:px-8">
              {/* アイコン */}
              <div className="flex-shrink-0">
                <Image
                  src="/icon.png"
                  alt="プロフィールアイコン"
                  width={180}
                  height={180}
                  className="rounded-full object-cover border-2 border-gray-200"
                />
              </div>
              
              {/* 自己紹介 - 吹き出し */}
              <div className="flex-1 md:flex-none md:max-w-2xl text-center md:text-left relative">
                <div className="bg-gray-50 md:bg-white border-t border-r border-b border-gray-200 md:border-gray-200 rounded-lg md:rounded-xl p-3 md:p-6 md:shadow-md relative md:ml-4 overflow-visible">
                  {/* PC表示時の吹き出しのしっぽ（アイコンから伸びる） */}
                  <div className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[16px] border-t-transparent border-r-[16px] border-r-gray-200 border-b-[16px] border-b-transparent z-10"></div>
                  <div className="hidden md:block absolute -left-[15px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[14px] border-t-transparent border-r-[14px] border-r-white border-b-[14px] border-b-transparent z-20"></div>
                  {/* 接合部の線を隠すためのマスク */}
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[1px] w-[1px] h-[28px] bg-white z-30"></div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-5 border-b-2 border-blue-300 pb-2 inline-block">自己紹介</h2>
                  <div className="text-sm md:text-base text-gray-700 mb-6 md:mb-0 leading-relaxed md:leading-loose space-y-3 md:space-y-4">
                    <p>
                      はじめまして、<br className="md:hidden" />
                      <span className="whitespace-nowrap">End-Tech-Lab（エンドテックラボ）</span>の遠藤です。
                    </p>
                    <p>
                      これまで会社員として業務システム開発に携わり、要件整理から設計、実装、運用まで一通りの工程を経験してきました。
                    </p>
                    <p>
                      現在はフリーランスとして、「何を作るべきか」を一緒に考えるところから、開発・公開・運用改善までを一貫してサポートしています。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* ご相談いただける内容 */}
            <div className="mt-6 md:mt-8 md:border md:border-gray-200 md:rounded-lg p-0 md:p-5 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4 pb-2 border-b border-gray-200">ご相談いただける内容</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 md:gap-6">
                <div className="bg-gray-50 md:bg-gray-50 rounded-lg p-4 border-l-2 border-blue-300 border-b md:border-b-0">
                  <div className="text-sm md:text-base font-semibold text-gray-800 mb-2">要件整理・仕様策定</div>
                  <div className="text-sm md:text-sm text-gray-600 leading-relaxed">お客様の要望をヒアリングし、明確な仕様として整理いたします。</div>
                </div>
                <div className="bg-gray-50 md:bg-gray-50 rounded-lg p-4 border-l-2 border-green-400 border-b md:border-b-0">
                  <div className="text-sm md:text-base font-semibold text-gray-800 mb-2">Webシステム設計・開発</div>
                  <div className="text-sm md:text-sm text-gray-600 leading-relaxed">要件に基づいた設計から実装まで、一貫して対応いたします。</div>
                </div>
                <div className="bg-gray-50 md:bg-gray-50 rounded-lg p-4 border-l-2 border-purple-400">
                  <div className="text-sm md:text-base font-semibold text-gray-800 mb-2">運用・改善サポート</div>
                  <div className="text-sm md:text-sm text-gray-600 leading-relaxed">システムの運用支援から継続的な改善までサポートいたします。</div>
                </div>
              </div>
            </div>

            {/* 主に使用している技術 */}
            <div className="mt-6 md:mt-4 md:mt-6 md:border md:border-gray-200 md:rounded-lg p-0 md:p-5 md:p-6 border-t border-gray-200 md:border-t-0">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4 pb-2 border-b border-gray-200 pt-4 md:pt-0">主に使用している技術</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-3 border-l-2 border-blue-400">
                  <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-2">フロントエンド</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">Next.js</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">React</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">HTML</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">CSS</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">JavaScript</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">TypeScript</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">レスポンシブ対応</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border-l-2 border-green-400">
                  <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-2">バックエンド</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">PHP（Laravel）</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">Java</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">Supabase</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border-l-2 border-purple-400">
                  <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-2">データベース</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-xs font-medium">Oracle</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-xs font-medium">MySQL</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-xs font-medium">PostgreSQL</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-xs font-medium">DB設計・チューニング</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border-l-2 border-orange-400">
                  <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-2">インフラ・運用</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-md text-xs font-medium">Vercel</span>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-md text-xs font-medium">Cloudflare</span>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-md text-xs font-medium">Docker</span>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-md text-xs font-medium">GitHub</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border-l-2 border-indigo-400">
                  <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-2">設計・上流工程</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-md text-xs font-medium">要件整理・仕様策定</span>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-md text-xs font-medium">DB設計</span>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-md text-xs font-medium">API設計</span>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-md text-xs font-medium">画面設計</span>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-md text-xs font-medium">Figma（画面イメージ共有）</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border-l-2 border-pink-400">
                  <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-2">外部サービス・コンテンツ制作</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-md text-xs font-medium">microCMS</span>
                    <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-md text-xs font-medium">LINE公式アカウント構築</span>
                    <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-md text-xs font-medium">LINEスタンプ作成</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 最新情報セクション */}
        <section className="max-w-6xl mx-auto mb-8 px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2 inline-block">最新情報・お知らせ</h2>
          <ul className="divide-y divide-gray-100 bg-white rounded-xl shadow">
            {news.length === 0 && (
              <li className="p-4 text-gray-500">現在お知らせはありません。</li>
            )}
            {news.map((item) => (
              <li key={item.id} className="py-3 px-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-0">
                <span className="text-sm text-gray-500 min-w-[3.5em] md:text-left md:w-20 md:mr-3">
                  {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("ja-JP") : (item.createdAt ? new Date(item.createdAt).toLocaleDateString("ja-JP") : "")}
                </span>
                <span className="text-sm font-medium text-gray-800 flex-1" dangerouslySetInnerHTML={{ __html: item.title }} />
              </li>
            ))}
          </ul>
        </section>

        {/* お問い合わせへの導線セクション */}
        <section className="max-w-2xl mx-auto mb-4 px-4 mt-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 md:p-8 text-center">
            <h3 className="text-lg md:text-xl font-medium text-gray-800 mb-3">
              お困りのことはありませんか？
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-6">
              IT導入やホームページ制作など、お気軽にご相談ください。
            </p>
            <Link href="/contact">
              <div className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                お問い合わせはこちら
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
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
