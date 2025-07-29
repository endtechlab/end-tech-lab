// pages/services/index.tsx
import { client } from "../../lib/microcms";
import type { GetStaticProps, NextPage } from "next";
import { Service, ServiceResponse } from "../../types/service";
import Link from "next/link";

type Props = {
  services: Service[];
};

const ServicesPage: NextPage<Props> = ({ services }) => {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">提供サービス一覧</h1>
        <div className="border-b-2 border-blue-300 w-16 mb-10"></div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition flex flex-col"
            >
              <Link href={`/services/${service.slug}`}>
                <h2 className="text-xl font-semibold text-blue-700 hover:underline cursor-pointer mb-2">
                  {service.title}
                </h2>
              </Link>
              {service.image && (
                <img
                  src={service.image.url}
                  alt={service.title}
                  className="w-full h-40 object-cover rounded shadow-md mb-4"
                />
              )}
              <p className="text-gray-600 text-sm mb-2">料金: {service.price}</p>
              <div
                className="text-sm text-gray-700 mb-4 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
              <Link href={`/services/${service.slug}`}>
                <a className="mt-auto inline-block text-blue-700 hover:underline font-medium">詳細を見る →</a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get<ServiceResponse>({ endpoint: "services" });

  return {
    props: {
      services: data.contents,
    },
  };
};

export default ServicesPage;
