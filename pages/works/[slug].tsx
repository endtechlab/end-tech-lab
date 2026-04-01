// pages/works/[slug].tsx
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { client } from "../../lib/microcms";
import { Work, WorkResponse } from "../../types/work";
import ArticleDetailLayout from "../../components/ArticleDetailLayout";
import { parseArticleHtml, TocItem } from "../../lib/parseArticleHtml";

type Props = {
  work: Work;
  html: string;
  toc: TocItem[];
};

const WorkDetail: NextPage<Props> = ({ work, html, toc }) => {
  return (
    <>
      <Head>
        <title>{work.title} | End-Tech-Lab</title>
      </Head>
      <ArticleDetailLayout
        title={work.title}
        heroImage={work.image}
        publishedAt={work.publishedAt}
        category={work.category}
        author={work.author}
        toc={toc}
        html={html}
        externalUrl={work.url}
        backHref="/works"
        backLabel="← 実績一覧に戻る"
      />
    </>
  );
};

export default WorkDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get<WorkResponse>({ endpoint: "works" });
  const paths = data.contents.map((work) => ({
    params: { slug: work.slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug = context.params?.slug;
  const data = await client.get<WorkResponse>({
    endpoint: "works",
    queries: { filters: `slug[equals]${slug}` },
  });
  const work = data.contents[0];
  const parsed = parseArticleHtml(work?.description ?? "");
  return {
    props: {
      work,
      html: parsed.html,
      toc: parsed.toc,
    },
  };
};
