// pages/activities/[slug].tsx
import { client } from "../../lib/microcms";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Activity, ActivityResponse } from "../../types/activity";
import Link from "next/link";
import Head from "next/head";

type Props = {
  activity: Activity;
};

const ActivityDetailPage: NextPage<Props> = ({ activity }) => {
  return (
    <>
      <Head>
        <title>{activity.title} | 活動報告 | End-Tech-Lab</title>
        <meta name="description" content={`${activity.title} の詳細ページ`} />
      </Head>
      <main className="py-12">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl px-8 py-10">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">{activity.title}</h1>
          <div className="border-b-2 border-blue-300 w-16 mb-8"></div>

          {activity.publishedAt && (
            <p className="text-gray-600 text-sm mb-4">
              <span className="font-semibold">公開日:</span> {new Date(activity.publishedAt).toLocaleDateString("ja-JP")}
            </p>
          )}

          <div
            className="prose prose-neutral max-w-none leading-relaxed text-base mb-8"
            dangerouslySetInnerHTML={{ __html: activity.content }}
          />

          <div className="mt-10">
            <Link href="/activities">
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
  const data = await client.get<ActivityResponse>({ endpoint: "activities" });

  const paths = data.contents.map((activity) => ({
    params: { slug: activity.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;

  const data = await client.get<ActivityResponse>({
    endpoint: "activities",
    queries: { filters: `slug[equals]${slug}` },
  });

  return {
    props: {
      activity: data.contents[0],
    },
  };
};

export default ActivityDetailPage;
