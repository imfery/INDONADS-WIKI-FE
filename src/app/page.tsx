'use client';

import * as React from 'react';

import ConcludedEvents from '@/app/ConcludedEvents';
import Footer from '@/app/Footers';
import Header from '@/app/Headers';
import UpcomingEvents from '@/app/UpcomingEvents';
import { fetchEventsSummary } from '@/app/utils/api';
import { ToastProvider } from '@/providers/ToastProvider';
import { Separator } from '@/components/ui/separator';

import { EventsData } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
    const [events, setEvents] = React.useState<EventsData | null>(null);

    React.useEffect(() => {
        let isMounted = true; // flag to prevent state update if component unmounts
        async function loadEvents() {
            try {
                const data = await fetchEventsSummary();
                if (isMounted) {
                    setEvents(data);
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Failed to fetch events:', error);
            }
        }

        loadEvents();

        return () => {
            isMounted = false; // cleanup to avoid setting state after unmount
        };
    }, []);

    return (
        <ToastProvider>
            <main>
                <Header />
                <section className='bg-white mt-16 mb-64'>
                    <div className='container mx-auto px-4'>
                        <div className='mb-8 text-left'>
                            <h1 className='text-3xl font-bold text-gray-900'>
                                Welcome to MonadPedia
                            </h1>
                            <p className='mt-2 text-lg text-gray-600'>
                                Your go-to resource for all things related to
                                MonadPedia.
                            </p>
                        </div>
                        <div className='flex flex-col md:flex-row'>
                            <div className='md:w-4/6 bg-gray-200 p-4 mb-4 md:mb-0'>
                                <p>Lorem Ipsum</p>
                            </div>
                            <div className='md:w-2/6 p-4'>
                                {events ? (
                                    <>
                                        <UpcomingEvents
                                            events={events.upcomingEvents}
                                        />
                                        <Separator className='my-8 border-t border-gray-300' />
                                        <ConcludedEvents
                                            events={events.concludedEvents}
                                        />
                                    </>
                                ) : (
                                    <div className='space-y-4'>
                                        <Skeleton className='h-10 w-full bg-gray-200' />
                                        <Skeleton className='h-10 w-full bg-gray-200' />
                                    </div>
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
