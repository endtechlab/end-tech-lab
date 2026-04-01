// pages/activities/index.tsx
import { GetStaticProps } from "next";
import Head from "next/head";
import { client } from "../../lib/microcms";
import { Activity, ActivityResponse } from "../../types/activity";
import { LAYOUT, TITLE } from "../../lib/constants";
import ArticleListCard from "../../components/ArticleListCard";
import { extractTextFromHtml } from "../../lib/extractTextFromHtml";

type Props = {
  activities: Activity[];
};

export default function Activities({ activities }: Props) {
  return (
    <>
      <Head>
        <title>開発日誌 | End Tech Lab - エンドテックラボ</title>
        <meta name="description" content="End Tech Lab（エンドテックラボ）の開発日誌をご覧いただけます。開発の記録や技術的な取り組みを掲載しています。" />
      </Head>
      <main className={`${LAYOUT.MAX_WIDTH} mx-auto ${LAYOUT.CONTAINER_PADDING} ${LAYOUT.MAIN_PADDING}`}>
        <div>
          <h1 className={`${TITLE.MAIN_SIZE} ${TITLE.FONT_WEIGHT} text-gray-800 ${TITLE.MARGIN_BOTTOM} ${TITLE.BORDER_BOTTOM} ${TITLE.BORDER_COLOR} ${TITLE.PADDING_BOTTOM} inline-block max-w-full ${TITLE.PADDING_X}`}>開発日誌</h1>
          <div className={`flex flex-col gap-6 ${LAYOUT.MAX_WIDTH} mx-auto`}>
            {activities.map((activity) => (
              <ArticleListCard
                key={activity.id}
                href={`/activities/${activity.slug}`}
                title={activity.title}
                publishedAt={activity.publishedAt}
                imageUrl={activity.eyecatch?.url}
                excerpt={extractTextFromHtml(activity.content)}
                badge="開発日誌"
              />
            ))}
          </div>
        </div>
      </main>
    </>
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
