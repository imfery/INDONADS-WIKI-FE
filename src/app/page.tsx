'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import { fetchEventsSummary, fetchActiveArticles } from '@/app/utils/api';
import ConcludedEvents from '@/components/ConcludedEvents';
import Footer from '@/components/Footers';
import Header from '@/components/Headers';
import UpcomingEvents from '@/components/UpcomingEvents';
import ActiveArticlesList from '@/components/ActiveArticlesList';
import { Skeleton } from '@/components/ui/skeleton';
import { ToastProvider } from '@/providers/ToastProvider';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

const CustomPagination = dynamic(
    () => import('@/app/components/admin/Pagination'),
    {
        ssr: false,
        loading: () => (
            <Skeleton className='h-10 w-full bg-gray-200 dark:bg-gray-700' />
        ),
    }
);

const Analytics = dynamic(
    () =>
        import('@vercel/analytics/react').then(
            (mod) => mod.Analytics as React.FC
        ),
    {
        ssr: false,
    }
);

export default function HomePage() {
    const articlesRef = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();

    const { data: events } = useSWR('/api/events-summary', fetchEventsSummary, {
        revalidateOnFocus: false,
        dedupingInterval: 60000,
    });

    const { data: articles } = useSWR(
        `/api/active-articles?page=${currentPage}`,
        () => fetchActiveArticles({ page: currentPage }),
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000,
        }
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        articlesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSeeAllEvents = () => {
        router.push('/events');
    };

    return (
        <ToastProvider>
            <main className='dark:bg-[#121212] dark:text-white'>
                <Analytics />
                <Header />
                <section className='bg-white dark:bg-[#121212] mt-16 mb-64'>
                    <div className='container mx-auto px-4'>
                        <div className='mb-8 text-left'>
                            <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                                Welcome to Monadpedia
                            </h1>
                            <p className='mt-2 text-lg text-gray-600 dark:text-gray-400'>
                                Your go-to resource for all things related to
                                Monadpedia.
                            </p>
                        </div>
                        <div className='flex flex-col md:flex-row'>
                            <div
                                className='md:w-4/6 p-4 mb-4 md:mb-0'
                                ref={articlesRef}
                            >
                                {!articles ? (
                                    <Skeleton className='h-10 w-full bg-gray-200 dark:bg-gray-700' />
                                ) : (
                                    <>
                                        <ActiveArticlesList
                                            articles={articles.articles}
                                        />
                                        <CustomPagination
                                            currentPage={currentPage}
                                            totalPages={articles.totalPages}
                                            totalResults={articles.totalResults}
                                            resultsPerPage={articles.limit}
                                            onPageChange={handlePageChange}
                                        />
                                    </>
                                )}
                            </div>
                            <div className='md:w-2/6 p-4'>
                                {!events ? (
                                    <div className='space-y-4'>
                                        <Skeleton className='h-10 w-full bg-gray-200 dark:bg-gray-700' />
                                        <Skeleton className='h-10 w-full bg-gray-200 dark:bg-gray-700' />
                                    </div>
                                ) : (
                                    <>
                                        <UpcomingEvents
                                            events={events.upcomingEvents}
                                        />
                                        <Separator className='my-8 border-t border-gray-300 dark:border-gray-600' />
                                        <ConcludedEvents
                                            events={events.concludedEvents}
                                        />
                                        <Button
                                            className='w-full mb-4 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
                                            onClick={handleSeeAllEvents}
                                        >
                                            See All Events
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
        </ToastProvider>
    );
}
