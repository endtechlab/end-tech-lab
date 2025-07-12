// pages/services/[slug].tsx
import { client } from "../../lib/microcms";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Service, ServiceResponse } from "../../types/service";
import Link from "next/link";

type Props = {
  service: Service;
};

const ServiceDetailPage: NextPage<Props> = ({ service }) => {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{service.title}</h1>

      {service.image && (
        <img
          src={service.image.url}
          alt={service.title}
          className="w-full max-h-[400px] object-cover rounded mb-6"
        />
      )}

      <p className="text-gray-600 text-sm mb-4">料金: {service.price}</p>

      <div
        className="prose prose-base max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: service.description }}
      />

      <div className="mt-10">
        <Link
          href="/services"
          className="text-blue-600 hover:underline text-sm"
        >
          ← サービス一覧に戻る
        </Link>
      </div>
    </main>
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
