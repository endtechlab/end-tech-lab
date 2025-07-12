// types/service.ts

export type Service = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price?: string;
  image?: {
    url: string;
    height: number;
    width: number;
  };
};

export type ServiceResponse = {
  contents: Service[];
};
