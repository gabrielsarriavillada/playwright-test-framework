export type ArticleData = {
    title: string,
    description?: string,
    body?: string,
    tags?: string[]
};

export function generateArticleData(): ArticleData {
    const uniqueId = Date.now();
    return {
        title: `Article Data ${uniqueId}`,
        description: `Test Description ${uniqueId}`,
        body: `Test body ${uniqueId}`,
        tags: [`${uniqueId}-0`, `${uniqueId}-1`, `${uniqueId}-5`],
    }
};
