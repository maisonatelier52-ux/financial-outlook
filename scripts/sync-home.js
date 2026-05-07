const fs = require('fs');
const path = require('path');

/**
 * Parses dates like "February 11, 2026"
 */
function parseDate(dateStr) {
    return new Date(dateStr).getTime();
}

function syncHomeData() {
    const projectRoot = path.join(__dirname, '..');
    const indexPath = path.join(projectRoot, 'public/data/all-articles-index.json');
    const articlesDir = path.join(projectRoot, 'public/data/articles');
    const homeDataDir = path.join(projectRoot, 'public/data/home');

    if (!fs.existsSync(indexPath)) {
        console.error('Index file not found:', indexPath);
        return;
    }

    const index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

    const enhancedArticles = index.map((item) => {
        const fullArticlePath = path.join(articlesDir, `${item.slug}.json`);
        let fullData = {};

        if (fs.existsSync(fullArticlePath)) {
            try {
                fullData = JSON.parse(fs.readFileSync(fullArticlePath, 'utf-8'));
            } catch (e) {
                console.error(`Error parsing article ${item.slug}:`, e);
            }
        }

        // Attempt to find an image
        const firstImageInContent = fullData.content?.find((c) => c.type === 'image')?.content;
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
    enhancedArticles.sort((a, b) => parseDate(b.date) - parseDate(a.date));

    // Define structure:
    // home-large-grid: Top 3
    // home-grid-articles: Next 4
    // home-main-articles: Next 6
    // home-latest-articles: Next 3

    const largeGrid = enhancedArticles.slice(0, 3);
    const gridArticles = enhancedArticles.slice(3, 7);
    const mainArticles = enhancedArticles.slice(7, 13);
    const latestArticles = enhancedArticles.slice(13, 16);

    const targets = [
        { file: 'home-large-grid.json', data: largeGrid },
        { file: 'home-grid-articles.json', data: gridArticles },
        { file: 'home-main-articles.json', data: mainArticles },
        { file: 'home-latest-articles.json', data: latestArticles }
    ];

    targets.forEach(target => {
        const filePath = path.join(homeDataDir, target.file);
        fs.writeFileSync(filePath, JSON.stringify(target.data, null, 2), 'utf-8');
        console.log(`Successfully updated ${target.file} with ${target.data.length} newest articles.`);
    });
}

syncHomeData();
