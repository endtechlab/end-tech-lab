// pages/activities/[slug].tsx
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { client } from "../../lib/microcms";
import { Activity, ActivityResponse } from "../../types/activity";
import { LAYOUT, TITLE, CARD, BUTTON, ANIMATION } from "../../lib/constants";

type Props = {
  activity: Activity;
};

const ActivityDetail: NextPage<Props> = ({ activity }) => {
  return (
    <>
      <Head>
        <title>{activity.title} | End-Tech-Lab</title>
      </Head>
      <main className={`${LAYOUT.MAX_WIDTH} mx-auto ${LAYOUT.CONTAINER_PADDING} ${LAYOUT.MAIN_PADDING}`}>
        <div>
          <h1 className={`${TITLE.MAIN_SIZE} ${TITLE.FONT_WEIGHT} text-gray-800 ${TITLE.MARGIN_BOTTOM} ${TITLE.BORDER_BOTTOM} ${TITLE.BORDER_COLOR} ${TITLE.PADDING_BOTTOM} inline-block max-w-full ${TITLE.PADDING_X}`}>{activity.title}</h1>
        </div>
        <div className={`${LAYOUT.MAX_WIDTH} mx-auto bg-white ${CARD.SHADOW} ${CARD.ROUNDED} ${CARD.PADDING}`}>

        {activity.publishedAt && (
          <p className="text-gray-600 text-sm mb-4">
            <span className="font-semibold">公開日:</span> {new Date(activity.publishedAt).toLocaleDateString("ja-JP")}
          </p>
        )}

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: activity.content }}
        />

        <div className={CARD.MARGIN_TOP}>
          <Link href="/activities" className={`inline-block bg-blue-50 hover:bg-blue-100 text-blue-800 ${BUTTON.FONT_WEIGHT} ${BUTTON.PADDING} ${BUTTON.ROUNDED} ${ANIMATION.TRANSITION_COLORS} border border-blue-100 shadow-sm`}>
            ← 活動報告一覧に戻る
          </Link>
        </div>
        </div>
      </main>
    </>
  );
};

export default ActivityDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get<ActivityResponse>({ endpoint: "activities" });
  const paths = data.contents.map((activity) => ({
    params: { slug: activity.slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
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
