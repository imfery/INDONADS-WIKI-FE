import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArticlesData } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { sanitizeTitle } from '@/lib/helper';

interface ActiveArticlesProps {
    articles: ArticlesData[];
}

const ActiveArticlesList: React.FC<ActiveArticlesProps> = ({
    articles = [],
}) => {
    return (
        <Card className='bg-white dark:bg-[#18181B] shadow-md rounded-lg mb-8'>
            <CardHeader className='border-b border-gray-200 dark:border-gray-700'>
                <CardTitle className='text-xl-2 font-semibold text-gray-900 dark:text-gray-200'>
                    Latest Articles
                </CardTitle>
            </CardHeader>
            <CardContent className='p-4'>
                <ul
                    role='list'
                    className='divide-y divide-gray-200 dark:divide-gray-700'
                >
                    {articles.length > 0 ? (
                        articles.map((article) => (
                            <li
                                key={article.id}
                                className='flex flex-col sm:flex-row justify-between gap-y-4 sm:gap-x-6 py-4'
                            >
                                <div className='flex-1 min-w-0'>
                                    <Badge className='mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1'>
                                        {article.category}
                                    </Badge>

                                    <p className='text-xl sm:text-md font-semibold leading-6 text-gray-900 dark:text-gray-200 mt-2'>
                                        <Link
                                            href={`/articles/${sanitizeTitle(
                                                article.title
                                            )}-${article.id}`}
                                        >
                                            {article.title}
                                        </Link>
                                    </p>

                                    {article.banner && (
                                        <div className='mt-4 relative w-9/12 h-0 pb-[33.33%] overflow-hidden rounded-md'>
                                            <Image
                                                src={article.banner}
                                                alt={`Banner for ${article.title}`}
                                                fill
                                                priority={true}
                                                style={{
                                                    objectFit: 'cover',
                                                }}
                                                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                                className='rounded-md'
                                            />
                                        </div>
                                    )}

                                    <p className='mt-2 text-xs sm:text-sm leading-5 text-gray-500 dark:text-gray-400 line-clamp-3'>
                                        {article.summary}
                                    </p>

                                    <p className='mt-2 text-xs sm:text-sm leading-5 text-gray-500 dark:text-gray-400'>
                                        Created at{' '}
                                        {new Date(
                                            article.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className='text-center text-gray-500 dark:text-gray-400'>
                            No active articles to display.
                        </p>
                    )}
                </ul>
            </CardContent>
        </Card>
    );
};

export default ActiveArticlesList;
