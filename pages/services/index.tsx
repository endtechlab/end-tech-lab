// pages/services/index.tsx
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../lib/microcms";
import { Service, ServiceResponse } from "../../types/service";
import { LAYOUT, TITLE, CARD, IMAGE, ANIMATION } from "../../lib/constants";

type Props = {
  services: Service[];
};

export default function Services({ services }: Props) {
  return (
    <main className={`${LAYOUT.MAX_WIDTH} mx-auto ${LAYOUT.CONTAINER_PADDING} ${LAYOUT.MAIN_PADDING}`}>
      <div>
        <h1 className={`${TITLE.MAIN_SIZE} ${TITLE.FONT_WEIGHT} text-gray-800 ${TITLE.MARGIN_BOTTOM} ${TITLE.BORDER_BOTTOM} ${TITLE.BORDER_COLOR} ${TITLE.PADDING_BOTTOM} inline-block max-w-full ${TITLE.PADDING_X}`}>提供サービス一覧</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className={`bg-white ${CARD.SHADOW} ${CARD.ROUNDED} ${CARD.PADDING_SMALL} ${CARD.HOVER_SHADOW} ${ANIMATION.TRANSITION} flex flex-col`}
            >
              <Link href={`/services/${service.slug}`}>
                <h2 className={`${TITLE.SUB_SIZE} font-semibold text-blue-700 hover:underline cursor-pointer ${CARD.MARGIN_BOTTOM_SMALL}`}>
                  {service.title}
                </h2>
              </Link>
              {service.image && (
                <div className="relative w-full h-40 mb-4">
                  <Image
                    src={service.image.url}
                    alt={service.title}
                    fill
                    className={`${IMAGE.COVER} ${IMAGE.ROUNDED} ${IMAGE.SHADOW}`}
                  />
                </div>
              )}
              <p className="text-gray-600 text-sm mb-2">料金: {service.price}</p>
              <div
                className={`text-sm text-gray-700 ${CARD.MARGIN_BOTTOM} line-clamp-3`}
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.get<ServiceResponse>({ endpoint: "services" });
  return {
    props: {
      services: data.contents,
    },
  };
};
