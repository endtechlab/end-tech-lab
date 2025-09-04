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
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">お問い合わせ</h1>
          <p className="text-gray-600 text-lg">
            お気軽にご相談ください。専門スタッフが丁寧にサポートいたします。
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">お問い合わせフォーム</h2>
            <p className="text-sm text-gray-600 mt-1">以下のフォームにご記入ください</p>
          </div>
          
          <div className="relative overflow-auto" style={{height: FORM.HEIGHT}}>
            <iframe
              src="https://tally.so/embed/w2ppKM?hideTitle=1&transparentBackground=1&dynamicHeight=1"
              width="100%"
              height="100%"
              style={{ border: "none", margin: 0, minHeight: FORM.MIN_HEIGHT, height: '100%' }}
              title="お問い合わせフォーム"
              allowFullScreen
              loading="lazy"
              className="rounded-b-2xl"
            >
              読み込んでいます…
            </iframe>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">その他のお問い合わせ方法</h3>
            <p className="text-gray-600 text-sm">
              フォームでの送信が難しい場合は、LINE公式アカウントからもお気軽にお問い合わせください。
            </p>
            <div className="mt-4">
              <a 
                href="https://line.me/R/ti/p/@054hlpdc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .63.285.63.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
                LINE公式でお問い合わせ
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
