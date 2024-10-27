'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Footer from '@/components/Footers';
import Header from '@/components/Headers';
import { fetchArticlesById } from '@/app/utils/api';
import { ToastProvider } from '@/providers/ToastProvider';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Analytics } from '@vercel/analytics/react';

const EditorComponent = dynamic(
    () => import('@/app/components/admin/editor/Editor'),
    {
        ssr: false,
        loading: () => (
            <Skeleton className='h-10 w-full bg-gray-200 dark:bg-gray-700' />
        ),
    }
);

export default function ArticlesDetails() {
    const router = useRouter();
    const pathname = usePathname();
    const [article, setArticle] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchArticleById = useCallback(async (id: string) => {
        try {
            setLoading(true);
            const fetchedArticle = await fetchArticlesById(id);
            setArticle(fetchedArticle);
        } catch (error) {
            console.error('Failed to fetch article details:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const id = pathname?.split('-').pop();
        if (id) fetchArticleById(id);
    }, [pathname, fetchArticleById]);

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push('/');
        }
    };

    return (
        <ToastProvider>
            <main className='dark:bg-[#121212] dark:text-gray-200'>
                <Analytics />
                <Header />
                <section className='bg-white dark:bg-[#121212] mt-16 mb-64 flex justify-center items-center'>
                    <div className='container mx-auto px-4 flex flex-col justify-center items-center'>
                        <div className='w-full mb-4'>
                            <Button onClick={handleBack} variant='secondary'>
                                Back
                            </Button>
                        </div>
                        <div className='p-4 w-full'>
                            {loading ? (
                                <Skeleton className='h-10 w-full bg-gray-200 dark:bg-gray-700' />
                            ) : article?.content ? (
                                <EditorComponent
                                    initialData={JSON.parse(article.content)}
                                    readOnly={true}
                                />
                            ) : (
                                <p className='text-center text-gray-500 dark:text-gray-400'>
                                    No content available.
                                </p>
                            )}
                        </div>
                        {!loading && article && (
                            <div className='text-center mt-4'>
                                <p className='text-sm text-gray-500 dark:text-gray-400'>
                                    Author: {article.createdBy.split('@')[0]}
                                </p>
                                <p className='text-sm text-gray-500 dark:text-gray-400'>
                                    Created at:{' '}
                                    {new Date(
                                        article.createdAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        )}
                    </div>
                </section>
                <Footer />
            </main>
        </ToastProvider>
    );
}
