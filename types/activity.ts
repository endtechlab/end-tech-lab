// types/activity.ts
export type Activity = {
    id: string;
    title: string;
    slug: string;
    content: string;
    publishedAt?: string;
  };
  
  export type ActivityResponse = {
    contents: Activity[];
  };
  