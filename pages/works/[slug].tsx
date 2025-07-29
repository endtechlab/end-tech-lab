// pages/works/[slug].tsx
import { client } from "../../lib/microcms";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Work, WorkResponse } from "../../types/work";
import Link from "next/link";
import Head from "next/head";

type Props = {
  work: Work;
};

const WorkDetailPage: NextPage<Props> = ({ work }) => {
  return (
    <>
      <Head>
        <title>{work.title} | 実績紹介 | End-Tech-Lab</title>
        <meta name="description" content={`${work.title} の詳細ページ`} />
      </Head>
      <main className="py-12">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl px-8 py-10">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-blue-300 pb-2 inline-block">{work.title}</h1>

          {work.image && (
            <img
              src={work.image.url}
              alt={work.title}
              className="w-full max-h-[400px] object-cover rounded shadow-md mb-6"
            />
          )}

          <div
            className="prose prose-neutral max-w-none leading-relaxed text-base mb-8"
            dangerouslySetInnerHTML={{ __html: work.description }}
          />

          {work.url && (
            <div className="mt-6">
              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                公開サイトを見る →
              </a>
            </div>
          )}

          <div className="mt-10">
            <Link href="/works">
              <a className="inline-block bg-blue-50 hover:bg-blue-100 text-blue-800 font-medium px-5 py-2 rounded transition-colors border border-blue-100 shadow-sm">
                ← 一覧に戻る
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get<WorkResponse>({ endpoint: "works" });

  const paths = data.contents.map((work) => ({
    params: { slug: work.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;

  const data = await client.get<WorkResponse>({
    endpoint: "works",
    queries: { filters: `slug[equals]${slug}` },
  });

  return {
    props: {
      work: data.contents[0],
    },
  };
};

export default WorkDetailPage;
