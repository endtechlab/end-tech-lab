// pages/activities/[slug].tsx
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { client } from "../../lib/microcms";
import { Activity, ActivityResponse } from "../../types/activity";
import ArticleDetailLayout from "../../components/ArticleDetailLayout";
import { parseArticleHtml, TocItem } from "../../lib/parseArticleHtml";

type Props = {
  activity: Activity;
  html: string;
  toc: TocItem[];
};

const ActivityDetail: NextPage<Props> = ({ activity, html, toc }) => {
  return (
    <>
      <Head>
        <title>{activity.title} | End-Tech-Lab</title>
      </Head>
      <ArticleDetailLayout
        title={activity.title}
        heroImage={activity.eyecatch}
        publishedAt={activity.publishedAt}
        category={activity.category}
        author={activity.author}
        toc={toc}
        html={html}
        backHref="/activities"
        backLabel="← 開発日誌一覧に戻る"
      />
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
  const activity = data.contents[0];
  const parsed = parseArticleHtml(activity?.content ?? "");
  return {
    props: {
      activity,
      html: parsed.html,
      toc: parsed.toc,
    },
  };
};
