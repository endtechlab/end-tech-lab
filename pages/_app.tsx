// pages/_app.tsx
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SCROLL } from "../lib/constants";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // ルート変更時にタイトルが見える位置にスクロール
    const handleRouteChange = () => {
      // 実際のヘッダー要素の高さを取得してスクロール位置を調整
      const headerElement = document.querySelector('header');
      const headerHeight = headerElement ? headerElement.offsetHeight : SCROLL.DEFAULT_HEADER_HEIGHT;
      
      // タイトルにより近い位置にスクロール位置を設定
      const scrollPosition = headerHeight - SCROLL.OFFSET;
      window.scrollTo(0, scrollPosition);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>End Tech Lab - エンドテックラボ</title>
        <meta name="description" content="End Tech Lab（エンドテックラボ）は、最新のテクノロジーを活用したソリューションを提供する企業です。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* ファビコン設定 */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.svg" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* その他のメタ情報 */}
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
