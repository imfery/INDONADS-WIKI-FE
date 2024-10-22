'use client';

import { useEffect, Fragment, useState } from 'react';
import Footer from '@/components/Footers';
import Header from '@/components/Headers';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { ToastProvider, useToast } from '@/providers/ToastProvider';
import { Separator } from '@/components/ui/separator';
import { fetchAllSpaces } from '@/app/utils/api';

interface SpaceItem {
    title: string;
    url: string;
}

interface Space {
    id: string;
    category: string;
    items: SpaceItem[];
}

export default function SpacesPage() {
    const [spaces, setSpaces] = useState<Space[]>([]);
    const [loading, setLoading] = useState(true);
    const { error } = useToast();

    useEffect(() => {
        const loadSpaces = async () => {
            try {
                const response = await fetchAllSpaces({
                    sortField: 'createdAt',
                    sortBy: 'asc',
                });

                if (response && response.data && Array.isArray(response.data)) {
                    setSpaces(response.data);
                } else {
                    error('No spaces data available');
                }
            } catch (err) {
                console.error('Error fetching spaces:', err);
                error('Failed to load spaces data');
            } finally {
                setLoading(false);
            }
        };

        loadSpaces();
    }, [error]);

    return (
        <ToastProvider>
            <main className='dark:bg-[#121212] dark:text-white'>
                <Header />
                <section className='bg-white dark:bg-[#121212] mt-16 mb-96'>
                    <div className='container mx-auto px-4'>
                        <div className='mb-8 text-left'>
                            <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                                Indonads' Twitter Spaces Catalog (Updated
                                Regularly)
                            </h1>
                        </div>

                        <Accordion type='multiple'>
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                spaces.map((space: Space) => (
                                    <AccordionItem
                                        key={space.id}
                                        value={space.category}
                                    >
                                        <AccordionTrigger className='dark:text-gray-300'>
                                            {space.category}
                                        </AccordionTrigger>
                                        <AccordionContent className='dark:text-gray-300'>
                                            <ul>
                                                {space.items.map(
                                                    (
                                                        item: SpaceItem,
                                                        index: number
                                                    ) => (
                                                        <Fragment key={index}>
                                                            <li className='py-2'>
                                                                <a
                                                                    href={
                                                                        item.url
                                                                    }
                                                                    target='_blank'
                                                                    rel='noopener noreferrer'
                                                                    className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                                                >
                                                                    {item.title}
                                                                </a>
                                                            </li>
                                                            {index <
                                                                space.items
                                                                    .length -
                                                                    1 && (
                                                                <Separator className='my-2 dark:border-gray-600' />
                                                            )}
                                                        </Fragment>
                                                    )
                                                )}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))
                            )}
                        </Accordion>
                    </div>
                </section>
                <Footer />
            </main>
        </ToastProvider>
    );
}
