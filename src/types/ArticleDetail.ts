// types/ArticleDetail.ts  ← New file
export interface ArticleContentBlock {
  type: "heading" | "paragraph" | "image";
  content: string;
}

export interface ArticleData {
  title: string;
  category: string;
  shortdescription?: string;
  heroImage?: string;
  image?: string;
  author: string;
  authorImage: string;
  date: string;
  readingTime: string;
  content: ArticleContentBlock[];
  julioData?: {
    slug: string;
    title: string;
    category: string;
    shortdescription: string;
    description: string;
    image: string;
    author: string;
    authorImage: string;
    role: string;
    date: string;
    julio?: boolean;
  };
}