// pages/works/index.tsx
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { client } from "../../lib/microcms";
import { Work, WorkResponse } from "../../types/work";
import { LAYOUT, TITLE, CARD, IMAGE, BUTTON, ANIMATION } from "../../lib/constants";

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
          <div className={`flex flex-col gap-8 ${LAYOUT.MAX_WIDTH} mx-auto`}>
            {works.map((work) => (
              <div
                key={work.id}
                className={`bg-white ${CARD.SHADOW} ${CARD.ROUNDED} ${CARD.PADDING_SMALL} ${CARD.HOVER_SHADOW} ${ANIMATION.TRANSITION} flex flex-col`}
              >
                <Link href={`/works/${work.slug}`}>
                  <h2 className={`${TITLE.SUB_SIZE} font-semibold text-blue-700 hover:underline cursor-pointer ${CARD.MARGIN_BOTTOM_SMALL}`}>
                    {work.title}
                  </h2>
                </Link>
                {work.image && (
                  <div className="relative w-full h-40 mb-4">
                    <Image
                      src={work.image.url}
                      alt={work.title}
                      fill
                      className={`${IMAGE.COVER} ${IMAGE.ROUNDED} ${IMAGE.SHADOW}`}
                    />
                  </div>
                )}
                <div
                  className={`text-sm text-gray-700 ${CARD.MARGIN_BOTTOM} line-clamp-3`}
                  dangerouslySetInnerHTML={{ __html: work.description }}
                />
                {work.url && (
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block text-blue-700 hover:underline ${BUTTON.FONT_WEIGHT} ${BUTTON.MARGIN_BOTTOM}`}
                  >
                    サイトを見る →
                  </a>
                )}
              </div>
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
