// pages/services/[slug].tsx
import { client } from "../../lib/microcms";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Service, ServiceResponse } from "../../types/service";
import Head from "next/head";
import Link from "next/link";

type Props = {
  service: Service;
};

const ServiceDetailPage: NextPage<Props> = ({ service }) => {
  return (
    <>
    <Head>
      <title>{service.title} | サービス紹介 | End-Tech-Lab</title>
      <meta name="description" content={`${service.title} の詳細ページ`} />
    </Head>
    <main className="py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl px-8 py-10">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">{service.title}</h1>
        <div className="border-b-2 border-blue-300 w-16 mb-8"></div>

        {service.image && (
          <img
            src={service.image.url}
            alt={service.title}
            className="w-full max-h-[400px] object-cover rounded shadow-md mb-6"
          />
        )}

        {service.price && (
          <p className="text-gray-600 text-sm mb-4">
            <span className="font-semibold">料金:</span> {service.price}
          </p>
        )}

        <div
          className="prose prose-neutral max-w-none leading-relaxed text-base mb-8"
          dangerouslySetInnerHTML={{ __html: service.description }}
        />

        <div className="mt-10">
          <Link href="/services">
            <a className="inline-block bg-blue-50 hover:bg-blue-100 text-blue-800 font-medium px-5 py-2 rounded transition-colors border border-blue-100 shadow-sm">
              ← 一覧に戻る
            </a>
          </Link>
        </div>
      </div>
    </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get<ServiceResponse>({ endpoint: "services" });

  const paths = data.contents.map((service) => ({
    params: { slug: service.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;

  const data = await client.get<ServiceResponse>({
    endpoint: "services",
    queries: { filters: `slug[equals]${slug}` },
  });

  return {
    props: {
      service: data.contents[0],
    },
  };
};

export default ServiceDetailPage;
