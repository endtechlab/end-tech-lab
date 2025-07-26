// pages/contact.tsx
import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>お問い合わせ | End-Tech-Lab</title>
      </Head>
      <main className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">お問い合わせ</h1>
        <div className="aspect-w-4 aspect-h-5">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfVbYzMZrrphw5toUWff0xXXIawo-dVzWdPpeJF6RW2I1TPtg/viewform?embedded=true"
            width="100%"
            height="800"
            style={{ border: "none", margin: 0 }}
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
