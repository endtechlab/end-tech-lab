// pages/works/[slug].tsx
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { client } from "../../lib/microcms";
import { Work, WorkResponse } from "../../types/work";
import { LAYOUT, TITLE, CARD, BUTTON, ANIMATION, IMAGE } from "../../lib/constants";

type Props = {
  work: Work;
};

const WorkDetail: NextPage<Props> = ({ work }) => {
  return (
    <>
      <Head>
        <title>{work.title} | End-Tech-Lab</title>
      </Head>
      <main className={`${LAYOUT.MAX_WIDTH} mx-auto ${LAYOUT.CONTAINER_PADDING} ${LAYOUT.MAIN_PADDING}`}>
        <div>
          <h1 className={`${TITLE.MAIN_SIZE} ${TITLE.FONT_WEIGHT} text-gray-800 ${TITLE.MARGIN_BOTTOM} ${TITLE.BORDER_BOTTOM} ${TITLE.BORDER_COLOR} ${TITLE.PADDING_BOTTOM} inline-block max-w-full ${TITLE.PADDING_X}`}>{work.title}</h1>
        </div>
        <div className={`${LAYOUT.MAX_WIDTH} mx-auto bg-white ${CARD.SHADOW} ${CARD.ROUNDED} ${CARD.PADDING}`}>

        {work.image && (
          <img
            src={work.image.url}
            alt={work.title}
            className={`w-full ${IMAGE.HEIGHT} ${IMAGE.COVER} ${IMAGE.ROUNDED} ${IMAGE.SHADOW} ${CARD.MARGIN_BOTTOM}`}
          />
        )}

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: work.description }}
        />

        {work.url && (
          <div className="mt-6">
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              サイトを見る →
            </a>
          </div>
        )}

        <div className={CARD.MARGIN_TOP}>
          <Link href="/works">
            <a className={`inline-block bg-blue-50 hover:bg-blue-100 text-blue-800 ${BUTTON.FONT_WEIGHT} ${BUTTON.PADDING} ${BUTTON.ROUNDED} ${ANIMATION.TRANSITION_COLORS} border border-blue-100 shadow-sm`}>
              ← 実績一覧に戻る
            </a>
          </Link>
        </div>
        </div>
      </main>
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
  return {
    props: {
      work: data.contents[0],
    },
  };
};
