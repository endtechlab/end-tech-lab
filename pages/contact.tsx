// pages/contact.tsx
import Head from "next/head";
import { FORM } from "../lib/constants";

export default function Contact() {
  return (
    <>
      <Head>
        <title>お問い合わせ | End Tech Lab - エンドテックラボ</title>
        <meta name="description" content="End Tech Lab（エンドテックラボ）へのお問い合わせはこちらから。IT導入・ホームページ制作など、お気軽にご相談ください。" />
      </Head>
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-12 border-b-2 border-blue-300 pb-2 inline-block max-w-full px-2">お問い合わせ</h1>
        <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-auto" style={{height: FORM.HEIGHT}}>
          <iframe
            src="https://tally.so/r/nP77zx"
            width="100%"
            height="100%"
            style={{ border: "none", margin: 0, minHeight: FORM.MIN_HEIGHT, height: '100%' }}
            title="お問い合わせフォーム"
            allowFullScreen
            loading="lazy"
          >
            読み込んでいます…
          </iframe>
        </div>
      </main>
    </>
  );
}
