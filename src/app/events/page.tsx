'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchAllEvents } from '@/app/utils/api';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import Footer from '@/components/Footers';
import Header from '@/components/Headers';
import { ToastProvider } from '@/providers/ToastProvider';
import CustomPagination from '@/app/components/admin/Pagination';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogClose,
} from '@/components/ui/dialog';
import { CATEGORY_IMAGES, EVENTS_CATEGORIES } from '@/constant/enum';
import { generateGoogleCalendarLink } from '@/lib/helper';
import { AllEvents, AllEventsData } from '@/types';

const AllEventsPage: React.FC = () => {
    const [eventsData, setEventsData] = useState<AllEventsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [_, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEvent, setSelectedEvent] = useState<AllEvents | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await fetchAllEvents({
                    sortField: 'date',
                    sortBy: 'desc',
                    limit: 20,
                    page: currentPage,
                });
                setEventsData(response);
            } catch (error) {
                console.error('Error fetching events:', error);
                setError('Failed to fetch events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <ToastProvider>
            <main className='dark:bg-[#121212] dark:text-white'>
                <Header />
                <section className='bg-white dark:bg-[#121212] mt-16 mb-64'>
                    <div className='container mx-auto px-4'>
                        <div className='mb-8 text-left'>
                            <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                                Events
                            </h1>
                            <p className='line-clamp-3 mb-8 dark:text-gray-300'>
                                Indonads events and major Monad events listed
                                here!
                            </p>
                        </div>

                        <div className='p-4 w-auto mx-auto'>
                            <ul
                                role='list'
                                className='grid grid-cols-1 sm:grid-cols-2 gap-6'
                            >
                                {loading ? (
                                    <div className='col-span-4 text-center'>
                                        <p>Loading events...</p>
                                    </div>
                                ) : eventsData &&
                                  eventsData.events.length > 0 ? (
                                    eventsData.events.map((event) => (
                                        <li
                                            key={event.id}
                                            className='flex flex-col sm:flex-row justify-between gap-y-4 sm:gap-x-6 py-4'
                                        >
                                            <div className='flex items-end gap-x-4 sm:items-center'>
                                                <Image
                                                    alt=''
                                                    src={
                                                        CATEGORY_IMAGES[
                                                            event.category as EVENTS_CATEGORIES
                                                        ]
                                                    }
                                                    width={1080}
                                                    height={1080}
                                                    className='h-14 w-14 flex-none rounded-full bg-gray-50 dark:bg-gray-800'
                                                />
                                                <div className='flex-1 min-w-0'>
                                                    <p className='text-base sm:text-md font-semibold leading-6 text-gray-900 dark:text-white'>
                                                        {event.title}
                                                    </p>
                                                    <p className='mt-1 text-xs sm:text-sm leading-5 text-gray-500 dark:text-gray-400'>
                                                        {event.date}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col items-start lg:mr-24 mt-4 sm:mt-0'>
                                                {' '}
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant='outline'
                                                            className='mt-2 text-gray-900 dark:text-white border-gray-900 dark:border-white'
                                                            onClick={() =>
                                                                setSelectedEvent(
                                                                    event
                                                                )
                                                            }
                                                        >
                                                            Details
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className='max-w-2xl p-6 sm:p-8 dark:bg-[#18181B]'>
                                                        <Card>
                                                            <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row dark:border-gray-600'>
                                                                <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
                                                                    <CardTitle className='dark:text-white'>
                                                                        {
                                                                            selectedEvent?.title
                                                                        }
                                                                    </CardTitle>
                                                                    <CardDescription className='dark:text-gray-400'>
                                                                        {
                                                                            selectedEvent?.description
                                                                        }
                                                                    </CardDescription>
                                                                </div>
                                                            </CardHeader>
                                                            <CardContent className='px-6 py-4'>
                                                                <div className='grid grid-cols-2 gap-4'>
                                                                    <div className='flex flex-col'>
                                                                        <span className='text-xs font-semibold text-gray-500 dark:text-gray-400'>
                                                                            Date
                                                                        </span>
                                                                        <span className='text-lg font-bold text-gray-900 dark:text-white'>
                                                                            {selectedEvent?.date +
                                                                                ' GMT+7'}
                                                                        </span>
                                                                    </div>
                                                                    <div className='flex flex-col'>
                                                                        <span className='text-xs font-semibold text-gray-500 dark:text-gray-400'>
                                                                            Location
                                                                        </span>
                                                                        <span className='text-lg font-bold text-gray-900 dark:text-white'>
                                                                            {
                                                                                selectedEvent?.location
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                {selectedEvent && (
                                                                    <div className='mt-4'>
                                                                        <a
                                                                            href={generateGoogleCalendarLink(
                                                                                selectedEvent
                                                                            )}
                                                                            target='_blank'
                                                                            rel='noopener noreferrer'
                                                                        >
                                                                            <Button
                                                                                variant='outline'
                                                                                className='text-gray-900 dark:text-white border-gray-900 dark:border-white'
                                                                            >
                                                                                Add
                                                                                to
                                                                                Google
                                                                                Calendar
                                                                            </Button>
                                                                        </a>
                                                                    </div>
                                                                )}
                                                            </CardContent>
                                                        </Card>
                                                        <DialogClose />
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <div className='col-span-1 sm:col-span-2 lg:col-span-4 flex justify-center'>
                                        <Card className='p-10 text-center dark:bg-gray-800 dark:text-white'>
                                            <CardHeader>
                                                <CardTitle>
                                                    No events available
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p>Please check back later.</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )}
                            </ul>
                        </div>

                        {eventsData && eventsData.totalPages > 1 && (
                            <div className='mt-8'>
                                <CustomPagination
                                    currentPage={eventsData.currentPage}
                                    totalPages={eventsData.totalPages}
                                    totalResults={eventsData.totalResults}
                                    resultsPerPage={eventsData.limit}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        )}
                    </div>
                </section>
                <Footer />
            </main>
        </ToastProvider>
    );
};

export default AllEventsPage;
