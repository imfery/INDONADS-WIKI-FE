'use client';

import * as React from 'react';

import ConcludedEvents from '@/app/ConcludedEvents';
import Footer from '@/app/Footers';
import Header from '@/app/Headers';
import UpcomingEvents from '@/app/UpcomingEvents';
import { fetchEventsSummary } from '@/app/utils/api';
import { ToastProvider } from '@/providers/ToastProvider';

import { EventsData } from '@/types';

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
                                About MonadPedia
                            </h1>
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
        </ToastProvider>
    );
}
