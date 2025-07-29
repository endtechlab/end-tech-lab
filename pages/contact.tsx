// pages/contact.tsx
import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>お問い合わせ | End-Tech-Lab</title>
      </Head>
      <main className="h-screen max-w-6xl mx-auto flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold mb-4">お問い合わせ</h1>
        <div className="w-full max-w-2xl flex-1 min-h-0 bg-white rounded-xl shadow-lg overflow-auto" style={{height: '60vh'}}>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfVbYzMZrrphw5toUWff0xXXIawo-dVzWdPpeJF6RW2I1TPtg/viewform?embedded=true"
            width="100%"
            height="100%"
            style={{ border: "none", margin: 0, minHeight: '500px', height: '100%' }}
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
