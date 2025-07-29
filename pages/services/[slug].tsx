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
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{service.title}</h1>

      {service.image && (
        <img
          src={service.image.url}
          alt={service.title}
          className="w-full max-h-[400px] object-cover rounded mb-6"
        />
      )}

      {service.price && (
        <p className="text-gray-600 text-sm mb-4">
          <span className="font-semibold">料金:</span> {service.price}
        </p>
      )}

      <div
        className="prose prose-neutral max-w-none leading-relaxed text-base"
        dangerouslySetInnerHTML={{ __html: service.description }}
      />

      <div className="mt-10">
        <Link href="/services">
          <a className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded">
            ← 一覧に戻る
          </a>
        </Link>
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
