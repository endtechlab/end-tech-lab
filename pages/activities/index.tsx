// pages/activities/index.tsx
import { client } from "../../lib/microcms";
import type { GetStaticProps, NextPage } from "next";
import { Activity, ActivityResponse } from "../../types/activity";
import Link from "next/link";

type Props = {
  activities: Activity[];
};

const ActivitiesPage: NextPage<Props> = ({ activities }) => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">活動報告</h1>

      <ul className="space-y-10">
        {activities.map((activity) => (
          <li key={activity.id} className="border-b pb-6">
            <Link href={`/activities/${activity.slug}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline cursor-pointer">
                {activity.title}
              </h2>
            </Link>

            {activity.publishedAt && (
              <p className="text-sm text-gray-500 mt-1">
                {new Date(activity.publishedAt).toLocaleDateString("ja-JP")}
              </p>
            )}

            <div
              className="text-sm text-gray-700 mt-3 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: activity.content }}
            />
          </li>
        ))}
      </ul>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get<ActivityResponse>({
    endpoint: "activities",
  });

  return {
    props: {
      activities: data.contents,
    },
  };
};

export default ActivitiesPage;
