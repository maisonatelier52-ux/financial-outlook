// app/article/[slug]/page.tsx 
import DateBar from "../../../components/DateBar";
import FullHeader from "../../../components/FullHeader";
import FooterSection from "../../../components/FooterSection";
import ArticleWithSidebar from "../../../components/ArticleWithSidebar";
import AdSection from "../../../components/AdSection";
import type { ArticleData } from "../../../components/MainArticleDetail";
import { notFound } from "next/navigation";
import HeaderClient from "../../../components/HeaderClient";

import { Metadata } from "next";
import dynamic from "next/dynamic";

const Banner = dynamic(() => import("../../../components/Banner"),);

interface Params {
  slug: string;
}

// 1. PERFECT generateMetadata (Google loves this)
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;

  let article: ArticleData;
  try {
    article = (await import(`../../../../public/data/articles/${slug}.json`)).default as ArticleData;
  } catch {
    return {
      title: "Article Not Found | financialoutlook",
      robots: { index: false, follow: false },
    };
  }

  // Get image for social sharing - use heroImage if available, otherwise extract first image from content
  const getImageUrl = (): string => {
    if (article.heroImage) {
      return article.heroImage;
    }
    
    // Check for julioData image if available
    if (article.julioData && article.julioData.image) {
      return article.julioData.image;
    }
    
    // Look for the first image in content array
    if (article.content && Array.isArray(article.content)) {
      const firstImageBlock = article.content.find(block => block.type === 'image');
      if (firstImageBlock && firstImageBlock.content) {
        return firstImageBlock.content;
      }
    }
    
    // Fallback to a default image if no image is found
    return "/images/fin-logo.svg";
  };

  const imageUrl = getImageUrl();
  const url = `https://www.financialoutlook.xyz/article/${slug}`;

  return {
    title: `${article.title} | financial outlook 2025`,
    description: article.shortdescription || article.title,
    keywords: `${article.category.toLowerCase()} 2025, stock market, crypto, billionaires, investing, wealth, ${article.author}`,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.shortdescription || article.title,
      url,
      siteName: "financialoutlook",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: article.title }],
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.shortdescription || article.title,
      images: [imageUrl],
    },
    robots: { index: true, follow: true },
  };
}

// 2. generateStaticParams – pre-render all articles at build time (huge SEO + speed win)
export async function generateStaticParams() {
  const fs = require("fs");
  const path = require("path");
  const dir = path.join(process.cwd(), "public/data/articles");

  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f: string) => f.endsWith(".json"))
    .map((f: string) => ({ slug: f.replace(".json", "") }));
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  let articleData: ArticleData;
  try {
    articleData = (await import(`../../../../public/data/articles/${slug}.json`)).default as ArticleData;
  } catch {
    notFound();
  }

  // Load shared data (same as before)
  const [top5Data, latestArticlesData, popularArticlesData] = await Promise.all([
    import("../../../../public/data/detail/detail-top5-articles.json").then(m => m.default),
    import("../../../../public/data/detail/detail-latest-articles.json").then(m => m.default),
    import("../../../../public/data/detail/detail-popular-articles.json").then(m => m.default),
  ]);

  const currentCategory = articleData.category?.toLowerCase() || "entertainment";

  // Get image for JSON-LD schema - use heroImage if available, otherwise extract first image from content
  const getSchemaImageUrl = (): string => {
    if (articleData.heroImage) {
      return articleData.heroImage;
    }
    
    // Check for julioData image if available
    if (articleData.julioData && articleData.julioData.image) {
      return articleData.julioData.image;
    }
    
    // Look for the first image in content array
    if (articleData.content && Array.isArray(articleData.content)) {
      const firstImageBlock = articleData.content.find(block => block.type === 'image');
      if (firstImageBlock && firstImageBlock.content) {
        return firstImageBlock.content;
      }
    }
    
    // Fallback to a default image if no image is found
    return "/images/fin-logo.svg";
  };

  const schemaImageUrl = getSchemaImageUrl();

  return (
    <>
      {/* 3. PERFECT JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: articleData.title,
            description: articleData.shortdescription || articleData.title,
            image: schemaImageUrl,
            datePublished: articleData.date,
            dateModified: articleData.date,
            author: {
              "@type": "Person",
              name: articleData.author,
            },
            publisher: {
              "@type": "Organization",
              name: "financialoutlook",
              logo: {
                "@type": "ImageObject",
                url: "https://www.financialoutlook.xyz/logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.financialoutlook.xyz/article/${slug}`,
            },
          }),
        }}
      />

      <div className="bg-white text-black min-h-screen font-sans">
         <div className="hidden">Financial Outlook – Business & Markets 2025</div>
        <div>
          <DateBar />
          <HeaderClient
            currentPage={currentCategory}
          />
          <ArticleWithSidebar top5Articles={top5Data} article={articleData} />
           <Banner text="Wealth, Financial Outlook & Market moves " />

          <FullHeader currentPage={currentCategory} />
          <FooterSection latestArticles={latestArticlesData} popularArticles={popularArticlesData} />
        </div>
      </div>
    </>
  );
}