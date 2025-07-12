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
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">実績紹介</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {works.map((work) => (
          <div
            key={work.id}
            className="border rounded-xl shadow hover:shadow-lg transition p-6 bg-white"
          >
            <Link href={`/works/${work.slug}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline cursor-pointer">
                {work.title}
              </h2>
            </Link>

            {work.image && (
              <img
                src={work.image.url}
                alt={work.title}
                className="w-full h-48 object-cover mt-4 rounded"
              />
            )}

            <div
              className="text-sm text-gray-700 mt-4 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: work.description }}
            />

            {work.url && (
              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-sm text-blue-600 hover:underline"
              >
                サイトを見る →
              </a>
            )}
          </div>
        ))}
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
