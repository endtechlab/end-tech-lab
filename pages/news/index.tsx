// pages/news/index.tsx
import { GetStaticProps } from "next";
import Head from "next/head";
import type { MicroCMSListResponse } from "microcms-js-sdk";
import { client } from "../../lib/microcms";
import { News } from "../../types/news";
import { CACHE, LAYOUT, TITLE } from "../../lib/constants";
import { NewsListRow } from "../../components/NewsListRow";

type Props = {
  news: News[];
};

export default function NewsIndex({ news }: Props) {
  return (
    <>
      <Head>
        <title>お知らせ一覧 | End Tech Lab - エンドテックラボ</title>
        <meta
          name="description"
          content="End Tech Lab（エンドテックラボ）のお知らせ一覧です。最新の情報をご確認いただけます。"
        />
      </Head>
      <main className={`${LAYOUT.MAX_WIDTH} mx-auto ${LAYOUT.CONTAINER_PADDING} ${LAYOUT.MAIN_PADDING}`}>
        <h1
          className={`${TITLE.MAIN_SIZE} ${TITLE.FONT_WEIGHT} text-gray-800 ${TITLE.MARGIN_BOTTOM} ${TITLE.BORDER_BOTTOM} ${TITLE.BORDER_COLOR} ${TITLE.PADDING_BOTTOM} inline-block max-w-full ${TITLE.PADDING_X}`}
        >
          お知らせ一覧
        </h1>
        <ul className="divide-y divide-gray-100 bg-white rounded-xl shadow">
          {news.length === 0 && <li className="p-4 text-gray-500">現在お知らせはありません。</li>}
          {news.map((item) => (
            <NewsListRow key={item.id} item={item} />
          ))}
        </ul>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.get<MicroCMSListResponse<News>>({
    endpoint: "news",
    queries: { limit: 100, orders: "-createdAt" },
  });
  return {
    props: {
      news: data.contents ?? [],
    },
    revalidate: CACHE.REVALIDATE_TIME,
  };
};
