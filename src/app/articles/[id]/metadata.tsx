import { Metadata } from 'next';
import { fetchArticlesById } from '@/app/utils/api';

type Params = {
    params: {
        id: string;
    };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const fullId = params.id;
    const id = fullId.split('-').pop();
    const article = id
        ? await fetchArticlesById(id, { cache: 'no-store' })
        : null;

    console.log('article response -> ' + JSON.stringify(article));
    return {
        title: article?.title || 'Article Details | Monadpedia',
        description:
            article?.summary || 'Read the latest article on Monadpedia.',
        openGraph: {
            title: article?.title || 'Article Details',
            description:
                article?.summary ||
                'Check out the latest article on Monadpedia.',
            images: article?.banner
                ? [{ url: article.banner, width: 1200, height: 630 }]
                : [],
            url: `https://monadpedia.xyz/articles/${fullId}`,
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: article?.title || 'Article Details',
            description:
                article?.summary ||
                'Check out the latest article on Monadpedia.',
            images: article?.banner ? [article.banner] : [],
        },
    };
}
