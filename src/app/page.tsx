'use client';

import { useState, useEffect } from 'react';
import ConcludedEvents from '@/components/ConcludedEvents';
import Footer from '@/components/Footers';
import Header from '@/components/Headers';
import UpcomingEvents from '@/components/UpcomingEvents';
import { fetchEventsSummary, fetchActiveArticles } from '@/app/utils/api';
import { ToastProvider } from '@/providers/ToastProvider';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import ActiveArticlesList from '@/components/ActiveArticlesList';
import CustomPagination from '@/app/components/admin/Pagination';
import { EventsData, AllArticlesData } from '@/types';
import { Analytics } from '@vercel/analytics/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const [events, setEvents] = useState<EventsData | null>(null);
    const [articles, setArticles] = useState<AllArticlesData | null>(null);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [loadingArticles, setLoadingArticles] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();

    useEffect(() => {
        let isMounted = true;

        async function loadEvents() {
            try {
                const data = await fetchEventsSummary();
                if (isMounted) {
                    setEvents(data);
                }
            } catch (error) {
                console.error('Failed to fetch events:', error);
            } finally {
                setLoadingEvents(false);
            }
        }

        async function loadArticles(page = 1) {
            try {
                setLoadingArticles(true);
                const data = await fetchActiveArticles({ page });
                if (isMounted) {
                    setArticles(data);
                }
            } catch (error) {
                console.error('Failed to fetch articles:', error);
                setError('Failed to fetch articles');
            } finally {
                setLoadingArticles(false);
            }
        }

        loadEvents();
        loadArticles(currentPage);

        return () => {
            isMounted = false;
        };
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
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
                            <div className='md:w-4/6 p-4 mb-4 md:mb-0'>
                                {loadingArticles ? (
                                    <Skeleton className='h-10 w-full bg-gray-200 dark:bg-gray-700' />
                                ) : articles ? (
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
                                ) : (
                                    <p className='text-center text-red-500'>
                                        {error}
                                    </p>
                                )}
                            </div>
                            <div className='md:w-2/6 p-4'>
                                {loadingEvents ? (
                                    <div className='space-y-4'>
                                        <Skeleton className='h-10 w-full bg-gray-200 dark:bg-gray-700' />
                                        <Skeleton className='h-10 w-full bg-gray-200 dark:bg-gray-700' />
                                    </div>
                                ) : events ? (
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
                                ) : (
                                    <p className='text-center text-gray-500 dark:text-gray-400'>
                                        No events to display.
                                    </p>
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
