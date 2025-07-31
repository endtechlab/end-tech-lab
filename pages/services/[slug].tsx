// pages/services/[slug].tsx
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { client } from "../../lib/microcms";
import { Service, ServiceResponse } from "../../types/service";
import { LAYOUT, TITLE, CARD, BUTTON } from "../../lib/constants";
import { ANIMATION } from "../../lib/constants";

type Props = {
  service: Service;
};

const ServiceDetail: NextPage<Props> = ({ service }) => {
  return (
    <>
      <Head>
        <title>{service.title} | End-Tech-Lab</title>
      </Head>
      <main className={`${LAYOUT.MAX_WIDTH} mx-auto ${LAYOUT.CONTAINER_PADDING} ${LAYOUT.MAIN_PADDING}`}>
        <div>
          <h1 className={`${TITLE.MAIN_SIZE} ${TITLE.FONT_WEIGHT} text-gray-800 ${TITLE.MARGIN_BOTTOM} ${TITLE.BORDER_BOTTOM} ${TITLE.BORDER_COLOR} ${TITLE.PADDING_BOTTOM} inline-block max-w-full ${TITLE.PADDING_X}`}>{service.title}</h1>
        </div>
        <div className={`${LAYOUT.MAX_WIDTH} mx-auto bg-white ${CARD.SHADOW} ${CARD.ROUNDED} ${CARD.PADDING}`}>

        {service.image && (
          <img
            src={service.image.url}
            alt={service.title}
            className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
          />
        )}

        <p className="text-gray-600 text-sm mb-4">
          <span className="font-semibold">料金:</span> {service.price}
        </p>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: service.description }}
        />

        <div className={CARD.MARGIN_TOP}>
          <Link href="/services">
            <a className={`inline-block bg-blue-50 hover:bg-blue-100 text-blue-800 ${BUTTON.FONT_WEIGHT} ${BUTTON.PADDING} ${BUTTON.ROUNDED} ${ANIMATION.TRANSITION_COLORS} border border-blue-100 shadow-sm`}>
              ← サービス一覧に戻る
            </a>
          </Link>
        </div>
        </div>
      </main>
    </>
  );
};

export default ServiceDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get<ServiceResponse>({ endpoint: "services" });
  const paths = data.contents.map((service) => ({
    params: { slug: service.slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const data = await client.get<Service>({ endpoint: "services", queries: { filters: `slug[equals]${slug}` } });
  return {
    props: {
      service: data,
    },
  };
};
