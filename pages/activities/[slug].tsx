// pages/activities/[slug].tsx
import { client } from "../../lib/microcms";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Activity, ActivityResponse } from "../../types/activity";
import Link from "next/link";

type Props = {
  activity: Activity;
};

const ActivityDetailPage: NextPage<Props> = ({ activity }) => {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        {activity.title}
      </h1>

      {activity.publishedAt && (
        <p className="text-sm text-gray-500 mb-6">
          {new Date(activity.publishedAt).toLocaleDateString("ja-JP")}
        </p>
      )}

      <div
        className="prose prose-base max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: activity.content }}
      />

      <div className="mt-10">
        <Link
          href="/activities"
          className="text-blue-600 hover:underline text-sm"
        >
          ← 活動報告一覧に戻る
        </Link>
      </div>
    </main>
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
