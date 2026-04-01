// pages/works/index.tsx
import { GetStaticProps } from "next";
import Head from "next/head";
import { client } from "../../lib/microcms";
import { Work, WorkResponse } from "../../types/work";
import { LAYOUT, TITLE } from "../../lib/constants";
import ArticleListCard from "../../components/ArticleListCard";
import { extractTextFromHtml } from "../../lib/extractTextFromHtml";

type Props = {
  works: Work[];
};

export default function Works({ works }: Props) {
  return (
    <>
      <Head>
        <title>実績紹介 | End Tech Lab - エンドテックラボ</title>
        <meta name="description" content="End Tech Lab（エンドテックラボ）の実績紹介ページです。これまで手がけた制作実績や支援事例をご紹介します。" />
      </Head>
      <main className={`${LAYOUT.MAX_WIDTH} mx-auto ${LAYOUT.CONTAINER_PADDING} ${LAYOUT.MAIN_PADDING}`}>
        <div>
          <h1 className={`${TITLE.MAIN_SIZE} ${TITLE.FONT_WEIGHT} text-gray-800 ${TITLE.MARGIN_BOTTOM} ${TITLE.BORDER_BOTTOM} ${TITLE.BORDER_COLOR} ${TITLE.PADDING_BOTTOM} inline-block max-w-full ${TITLE.PADDING_X}`}>実績紹介</h1>
          <div className={`flex flex-col gap-6 ${LAYOUT.MAX_WIDTH} mx-auto`}>
            {works.map((work) => (
              <ArticleListCard
                key={work.id}
                href={`/works/${work.slug}`}
                title={work.title}
                publishedAt={work.publishedAt}
                imageUrl={work.image?.url}
                excerpt={extractTextFromHtml(work.description)}
                badge="実績紹介"
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.get<WorkResponse>({ endpoint: "works" });
  return {
    props: {
      works: data.contents,
    },
  };
};
