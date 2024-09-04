'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Footer from '@/app/Footers';
import Header from '@/app/Headers';
import { fetchArticlesById } from '@/app/utils/api';
import { ToastProvider } from '@/providers/ToastProvider';
import EditorComponent from '@/app/components/admin/editor/Editor';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button'; // Import the shadcn UI Button component

export default function ArticlesDetails() {
    const router = useRouter();
    const pathname = usePathname();
    const [article, setArticle] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
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
            <main>
                <Header />
                <section className='bg-white mt-16 mb-64 flex justify-center items-center'>
                    <div className='container mx-auto px-4 flex flex-col justify-center items-center'>
                        <div className='w-full mb-4'>
                            <Button
                                onClick={() => router.back()}
                                variant='secondary'
                            >
                                Back
                            </Button>
                        </div>
                        <div className='p-4 w-full '>
                            {loading ? (
                                <Skeleton className='h-10 w-full bg-gray-200' />
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
                                <p className='text-sm text-gray-500'>
                                    Author: {article.createdBy.split('@')[0]}
                                </p>
                                <p className='text-sm text-gray-500'>
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
