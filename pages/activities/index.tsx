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
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-12 border-b-2 border-blue-300 pb-2 inline-block max-w-full px-2">活動報告</h1>
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition flex flex-col">
              <Link href={`/activities/${activity.slug}`}>
                <h2 className="text-xl font-semibold text-blue-700 hover:underline cursor-pointer mb-2">
                  {activity.title}
                </h2>
              </Link>
              {activity.publishedAt && (
                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-semibold">公開日:</span> {new Date(activity.publishedAt).toLocaleDateString("ja-JP")}
                </p>
              )}
              <div
                className="text-sm text-gray-700 mb-4 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: activity.content }}
              />
            </div>
          ))}
        </div>
      </div>
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
