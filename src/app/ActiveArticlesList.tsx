import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArticlesData } from '@/types';

interface ActiveArticlesProps {
    articles: ArticlesData[];
}

const ActiveArticlesList: React.FC<ActiveArticlesProps> = ({
    articles = [],
}) => {
    return (
        <Card className='bg-white shadow-md rounded-lg mb-8'>
            <CardHeader className='border-b border-gray-200'>
                <CardTitle className='text-xl-2 font-semibold text-gray-900'>
                    Latest Articles
                </CardTitle>
            </CardHeader>
            <CardContent className='p-4'>
                <ul role='list' className='divide-y divide-gray-200'>
                    {articles.length > 0 ? (
                        articles.map((article) => (
                            <li
                                key={article.id}
                                className='flex flex-col sm:flex-row justify-between gap-y-4 sm:gap-x-6 py-4'
                            >
                                <div className='flex-1 min-w-0'>
                                    <Badge className='mt-1 text-xs sm:text-sm text-gray-500 bg-gray-100 rounded-full px-2 py-1 hover:bg-gray-100 hover:text-gray-500'>
                                        {article.category}
                                    </Badge>
                                    <p className='text-xl sm:text-md font-semibold leading-6 text-gray-900 mt-2'>
                                        {article.title}
                                    </p>
                                    <p className='mt-2 text-xs sm:text-sm leading-5 text-gray-500 line-clamp-3'>
                                        {article.summary}
                                    </p>

                                    <p className='mt-2 text-xs sm:text-sm leading-5 text-gray-500'>
                                        Created at{' '}
                                        {new Date(
                                            article.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className='text-center text-gray-500'>
                            No active articles to display.
                        </p>
                    )}
                </ul>
            </CardContent>
        </Card>
    );
};

export default ActiveArticlesList;
