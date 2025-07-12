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
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">
        提供サービス一覧
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="border rounded-xl shadow hover:shadow-lg transition p-6 bg-white"
          >
            <Link href={`/services/${service.slug}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline cursor-pointer">
                {service.title}
              </h2>
            </Link>

            {service.image && (
              <img
                src={service.image.url}
                alt={service.title}
                className="w-full h-48 object-cover mt-4 rounded"
              />
            )}

            <p className="text-sm text-gray-600 mt-2">料金: {service.price}</p>

            <div
              className="text-sm text-gray-700 mt-4 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: service.description }}
            />
          </div>
        ))}
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
