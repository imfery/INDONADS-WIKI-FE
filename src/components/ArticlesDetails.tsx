'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Footer from '@/components/Footers';
import Header from '@/components/Headers';
import { fetchArticlesById } from '@/app/utils/api';
import { ToastProvider } from '@/providers/ToastProvider';
import EditorComponent from '@/app/components/admin/editor/Editor';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Analytics } from '@vercel/analytics/react';

export default function ArticlesDetails() {
    const router = useRouter();
    const pathname = usePathname();
    const [article, setArticle] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const pathParts = pathname?.split('-');
        const id = pathParts?.[pathParts.length - 1];

        if (id) {
            const fetchArticle = async () => {
                try {
                    const fetchedArticle = await fetchArticlesById(id);
                    setArticle(fetchedArticle);
                } catch (error) {
                    console.error('Failed to fetch article details:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchArticle();
        }
    }, [pathname]);

    return (
        <ToastProvider>
            <main className='dark:bg-[#121212] dark:text-gray-200'>
                <Analytics />
                <Header />
                <section className='bg-white dark:bg-[#121212] mt-16 mb-64 flex justify-center items-center'>
                    <div className='container mx-auto px-4 flex flex-col justify-center items-center'>
                        <div className='w-full mb-4'>
                            <Button
                                onClick={() => {
                                    if (window.history.length > 1) {
                                        router.back();
                                    } else {
                                        router.push('/');
                                    }
                                }}
                                variant='secondary'
                            >
                                Back
                            </Button>
                        </div>
                        <div className='p-4 w-full'>
                            {loading ? (
                                <Skeleton className='h-10 w-full bg-gray-200 dark:bg-gray-700' />
                            ) : (
                                article?.content && (
                                    <EditorComponent
                                        initialData={JSON.parse(
                                            article.content
                                        )}
                                        readOnly={true}
                                    />
                                )
                            )}
                        </div>
                        {!loading && article && (
                            <div className='text-center mt-4'>
                                <p className='text-sm text-gray-500 dark:text-gray-400'>
                                    Author: {article.createdBy.split('@')[0]}
                                </p>
                                <p className='text-sm text-gray-500 dark:text-gray-400'>
                                    Created at: {article.createdAt}
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
