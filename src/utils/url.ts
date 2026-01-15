export const getArticleUrl = (category: string, slug: string) => {
    const formattedCategory = category.toLowerCase().replace(/\s+/g, '');
    return `/${formattedCategory}/${slug}`;
};
