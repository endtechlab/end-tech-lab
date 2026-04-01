// types/activity.ts
export type Activity = {
    id: string;
    title: string;
    slug: string;
    content: string;
    eyecatch?: {
      url: string;
      height: number;
      width: number;
    };
    category?: string;
    author?: string;
    publishedAt?: string;
  };
  
  export type ActivityResponse = {
    contents: Activity[];
  };
  