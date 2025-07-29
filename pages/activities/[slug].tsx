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
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{activity.title}</h1>

        {activity.publishedAt && (
          <p className="text-gray-600 text-sm mb-4">
            <span className="font-semibold">公開日:</span> {new Date(activity.publishedAt).toLocaleDateString("ja-JP")}
          </p>
        )}

        {/* imageプロパティは存在しないため削除 */}

        <div
          className="prose prose-neutral max-w-none leading-relaxed text-base"
          dangerouslySetInnerHTML={{ __html: activity.content }}
        />

        <div className="mt-10">
          <Link href="/activities">
            <a className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded">
              ← 一覧に戻る
            </a>
          </Link>
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
