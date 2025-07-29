// pages/works/index.tsx
import { client } from "../../lib/microcms";
import type { GetStaticProps, NextPage } from "next";
import { Work, WorkResponse } from "../../types/work";
import Link from "next/link";

type Props = {
  works: Work[];
};

const WorksPage: NextPage<Props> = ({ works }) => {
  return (
    <main className="py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-12 border-b-2 border-blue-300 pb-2 inline-block max-w-full px-2">実績紹介</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {works.map((work) => (
            <div
              key={work.id}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition flex flex-col"
            >
              <Link href={`/works/${work.slug}`}>
                <h2 className="text-xl font-semibold text-blue-700 hover:underline cursor-pointer mb-2">
                  {work.title}
                </h2>
              </Link>
              {work.image && (
                <img
                  src={work.image.url}
                  alt={work.title}
                  className="w-full h-40 object-cover rounded shadow-md mb-4"
                />
              )}
              <div
                className="text-sm text-gray-700 mb-4 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: work.description }}
              />
              {work.url && (
                <a
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-700 hover:underline font-medium mb-2"
                >
                  サイトを見る →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get<WorkResponse>({ endpoint: "works" });

  return {
    props: {
      works: data.contents,
    },
  };
};

export default WorksPage;
