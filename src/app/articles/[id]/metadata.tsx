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

    return {
        metadataBase: new URL(`https://monadpedia.xyz/articles/${fullId}`),
        title: article?.title || 'Article Details | Monadpedia',
        description:
            article?.summary || 'Read the latest article on Monadpedia.',
        robots: { index: true, follow: true },
        openGraph: {
            title: article?.title || 'Article Details',
            description:
                article?.summary ||
                'Check out the latest article on Monadpedia.',
            images: article?.banner
                ? [{ url: article.banner, width: 1200, height: 630 }]
                : [],
            url: `https://monadpedia.xyz/articles/${fullId}`,
            siteName: 'Monadpedia',
            type: 'website',
            locale: 'en_US',
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
