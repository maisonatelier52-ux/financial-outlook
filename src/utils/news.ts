import fs from 'fs';
import path from 'path';

export interface Article {
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
}

/**
 * Fetches all articles from the index and enhances them with data from individual article files.
 * Sorts them by date (newest first).
 */
export function getSortedArticles(): Article[] {
    const indexPath = path.join(process.cwd(), 'public/data/all-articles-index.json');
    const articlesDir = path.join(process.cwd(), 'public/data/articles');

    if (!fs.existsSync(indexPath)) {
        console.error('Index file not found:', indexPath);
        return [];
    }

    const index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

    const enhancedArticles = index.map((item: any) => {
        const fullArticlePath = path.join(articlesDir, `${item.slug}.json`);
        let fullData: any = {};

        if (fs.existsSync(fullArticlePath)) {
            try {
                fullData = JSON.parse(fs.readFileSync(fullArticlePath, 'utf-8'));
            } catch (e) {
                console.error(`Error parsing article ${item.slug}:`, e);
            }
        }

        // Attempt to find an image: 
        // 1. Root image property
        // 2. heroImage property
        // 3. First item in content array of type 'image'
        // 4. Default placeholder
        const firstImageInContent = fullData.content?.find((c: any) => c.type === 'image')?.content;
        const finalImage = fullData.image || fullData.heroImage || firstImageInContent || '/images/default.webp';

        return {
            slug: item.slug,
            title: item.title,
            category: item.category,
            shortdescription: item.shortdescription,
            description: fullData.description || item.description || item.shortdescription,
            image: finalImage,
            author: item.author || fullData.author,
            authorImage: fullData.authorImage || '/images/Author1.webp',
            role: fullData.role || 'Contributor',
            date: item.date || fullData.date
        };
    });

    // Sort by date (newest first)
    return enhancedArticles.sort((a: Article, b: Article) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
    });
}

/**
 * Distributes the newest articles into the homepage data files.
 */
export function syncHomeData() {
    const allArticles = getSortedArticles();

    // Define structure:
    // home-large-grid: Top 3 (The absolute newest)
    // home-grid-articles: Next 4
    // home-main-articles: Next 6
    // home-latest-articles: Next 3

    const largeGrid = allArticles.slice(0, 3);
    const gridArticles = allArticles.slice(3, 7);
    const mainArticles = allArticles.slice(7, 13);
    const latestArticles = allArticles.slice(13, 16);

    const homeDataDir = path.join(process.cwd(), 'public/data/home');

    const targets = [
        { file: 'home-large-grid.json', data: largeGrid },
        { file: 'home-grid-articles.json', data: gridArticles },
        { file: 'home-main-articles.json', data: mainArticles },
        { file: 'home-latest-articles.json', data: latestArticles }
    ];

    targets.forEach(target => {
        const filePath = path.join(homeDataDir, target.file);
        fs.writeFileSync(filePath, JSON.stringify(target.data, null, 2), 'utf-8');
        console.log(`Updated ${target.file} with ${target.data.length} articles.`);
    });
}
