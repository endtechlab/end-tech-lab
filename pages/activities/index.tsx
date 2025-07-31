// pages/activities/index.tsx
import { GetStaticProps } from "next";
import Link from "next/link";
import { client } from "../../lib/microcms";
import { Activity, ActivityResponse } from "../../types/activity";
import { LAYOUT, TITLE, CARD, ANIMATION } from "../../lib/constants";

type Props = {
  activities: Activity[];
};

export default function Activities({ activities }: Props) {
  return (
    <main className={`${LAYOUT.MAX_WIDTH} mx-auto ${LAYOUT.CONTAINER_PADDING} ${LAYOUT.MAIN_PADDING}`}>
      <div>
        <h1 className={`${TITLE.MAIN_SIZE} ${TITLE.FONT_WEIGHT} text-gray-800 ${TITLE.MARGIN_BOTTOM} ${TITLE.BORDER_BOTTOM} ${TITLE.BORDER_COLOR} ${TITLE.PADDING_BOTTOM} inline-block max-w-full ${TITLE.PADDING_X}`}>活動報告</h1>
        <div className={`flex flex-col gap-8 ${LAYOUT.MAX_WIDTH} mx-auto`}>
          {activities.map((activity) => (
            <div key={activity.id} className={`bg-white ${CARD.SHADOW} ${CARD.ROUNDED} ${CARD.PADDING_SMALL} ${CARD.HOVER_SHADOW} ${ANIMATION.TRANSITION} flex flex-col`}>
              <Link href={`/activities/${activity.slug}`}>
                <h2 className={`${TITLE.SUB_SIZE} font-semibold text-blue-700 hover:underline cursor-pointer ${CARD.MARGIN_BOTTOM_SMALL}`}>
                  {activity.title}
                </h2>
              </Link>
              {activity.publishedAt && (
                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-semibold">公開日:</span> {new Date(activity.publishedAt).toLocaleDateString("ja-JP")}
                </p>
              )}
              <div
                className={`text-sm text-gray-700 ${CARD.MARGIN_BOTTOM} line-clamp-3`}
                dangerouslySetInnerHTML={{ __html: activity.content }}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.get<ActivityResponse>({ endpoint: "activities" });
  return {
    props: {
      activities: data.contents,
    },
  };
};
