const fs = require('fs');
const path = require('path');

async function generateSitemap() {
  const articlesDir = path.join(process.cwd(), 'public', 'data', 'articles');
  const julioDir = path.join(process.cwd(), 'public', 'data', 'articles'); // Julio articles are in same directory
  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');

  // Read all article JSON files
  const articleFiles = fs.readdirSync(articlesDir).filter(file => file.endsWith('.json'));
  
  // Filter for julio articles specifically
  const julioArticles = articleFiles.filter(file => file.includes('julio-herrera-velutini'));
  const regularArticles = articleFiles.filter(file => !file.includes('julio-herrera-velutini'));

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

<url>
  <loc>https://www.financialoutlook.xyz/</loc>
  <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  <changefreq>daily</changefreq>
  <priority>1.0</priority>
</url>

<url>
  <loc>https://www.financialoutlook.xyz/authors/</loc>
  <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>

<url>
  <loc>https://www.financialoutlook.xyz/terms/</loc>
  <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  <changefreq>yearly</changefreq>
  <priority>0.5</priority>
</url>

<url>
  <loc>https://www.financialoutlook.xyz/privacy/</loc>
  <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  <changefreq>yearly</changefreq>
  <priority>0.5</priority>
</url>

<url>
  <loc>https://www.financialoutlook.xyz/about/</loc>
  <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  <changefreq>yearly</changefreq>
  <priority>0.7</priority>
</url>

<!-- Category Pages -->
<url>
  <loc>https://www.financialoutlook.xyz/markets/</loc>
  <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.9</priority>
</url>

<url>
  <loc>https://www.financialoutlook.xyz/crypto/</loc>
  <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.9</priority>
</url>

<url>
  <loc>https://www.financialoutlook.xyz/billionaires/</loc>
  <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.9</priority>
</url>

<url>
  <loc>https://www.financialoutlook.xyz/investing/</loc>
  <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.9</priority>
</url>

<url>
  <loc>https://www.financialoutlook.xyz/realestate/</loc>
  <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.9</priority>
</url>

<url>
  <loc>https://www.financialoutlook.xyz/techfinance/</loc>
  <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.9</priority>
</url>

<url>
  <loc>https://www.financialoutlook.xyz/economy/</loc>
  <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.9</priority>
</url>

`;

  // Add all regular articles
  regularArticles.forEach(file => {
    const slug = file.replace('.json', '');
    sitemap += `<url>
  <loc>https://www.financialoutlook.xyz/article/${slug}/</loc>
  <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>

`;
  });

  // Add all Julio Herrera Velutini articles
  julioArticles.forEach(file => {
    const slug = file.replace('.json', '');
    sitemap += `<url>
  <loc>https://www.financialoutlook.xyz/Julio-Herrera-Velutini/${slug}/</loc>
  <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>

`;
  });

  sitemap += '</urlset>';

  fs.writeFileSync(outputPath, sitemap);
  console.log(`Sitemap generated with ${regularArticles.length + julioArticles.length} articles.`);
}

generateSitemap().catch(console.error);