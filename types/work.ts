export type Work = {
    id: string;
    title: string;
    slug: string;
    description: string; // ← フィールドIDが "description"
    image?: {
      url: string;
      height: number;
      width: number;
    };
    url?: string;
  };
  
  export type WorkResponse = {
    contents: Work[];
  };
  