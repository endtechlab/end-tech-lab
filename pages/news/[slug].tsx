// pages/news/[slug].tsx
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { client } from "../../lib/microcms";
import { News, NewsResponse } from "../../types/news";
import ArticleDetailLayout from "../../components/ArticleDetailLayout";
import { parseArticleHtml, TocItem } from "../../lib/parseArticleHtml";
import { extractTextFromHtml, hasHtmlBody } from "../../lib/extractTextFromHtml";

type Props = {
  news: News;
  html: string;
  toc: TocItem[];
  displayTitle: string;
};

const NewsDetail: NextPage<Props> = ({ news, html, toc, displayTitle }) => {
  return (
    <>
      <Head>
        <title>{displayTitle} | End-Tech-Lab</title>
      </Head>
      <ArticleDetailLayout
        title={displayTitle}
        publishedAt={news.publishedAt ?? news.createdAt}
        toc={toc}
        html={html}
        backHref="/"
        backLabel="← トップに戻る"
      />
    </>
  );
};

export default NewsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get<NewsResponse>({
    endpoint: "news",
    queries: { limit: 100 },
  });
  const paths =
    data.contents
      ?.filter((n) => n.slug && hasHtmlBody(n.body))
      .map((n) => ({
        params: { slug: n.slug as string },
      })) ?? [];

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug = context.params?.slug;
  const data = await client.get<NewsResponse>({
    endpoint: "news",
    queries: { filters: `slug[equals]${slug}` },
  });

  const news = data.contents[0];
  if (!news || !hasHtmlBody(news.body)) {
    return { notFound: true };
  }

  const rawBody = news.body ?? "";
  const bodyHtml = rawBody.includes("<")
    ? rawBody
    : rawBody.replace(/\r?\n/g, "<br />");

  const parsed = parseArticleHtml(bodyHtml);
  const displayTitle = extractTextFromHtml(news.title) || "お知らせ";

  return {
    props: {
      news,
      html: parsed.html,
      toc: parsed.toc,
      displayTitle,
    },
  };
};

