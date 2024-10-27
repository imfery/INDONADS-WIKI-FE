'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { fetchAllMonadMadness } from '@/app/utils/api';
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
import { Globe } from 'lucide-react';

const MonadMadnessPage = () => {
    const [participants, setParticipants] = useState<any[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<string>('All');
    const locations = useMemo(() => {
        return [
            'All',
            ...Array.from(
                new Set(participants.map((p) => p.location || 'Unknown'))
            ),
        ];
    }, [participants]);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await fetchAllMonadMadness({
                    sortField: 'title',
                    sortBy: 'asc',
                });
                setParticipants(response.data.participants);
            } catch (error) {
                console.error('Error fetching participants:', error);
            }
        };
        fetchParticipants();
    }, []);

    const filteredParticipants = useMemo(
        () =>
            selectedLocation === 'All'
                ? participants
                : participants.filter(
                      (participant) => participant.location === selectedLocation
                  ),
        [selectedLocation, participants]
    );

    return (
        <ToastProvider>
            <main className='dark:bg-[#121212] dark:text-white'>
                <Header />
                <section className='bg-white dark:bg-[#121212] mt-16 mb-64'>
                    <div className='container mx-auto px-4'>
                        <div className='mb-8 text-left'>
                            <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                                Monad Madness
                                {selectedLocation !== 'All' && (
                                    <> @ {selectedLocation}</>
                                )}
                            </h1>
                            <p className='line-clamp-3 mb-8 dark:text-gray-300'>
                                Lists of participants!
                            </p>
                        </div>

                        <div className='mb-8 flex space-x-4 overflow-auto'>
                            {locations.map((location) => (
                                <button
                                    key={location}
                                    className={`px-4 py-2 border ${
                                        selectedLocation === location
                                            ? 'border-indigo-600 bg-indigo-600 text-white'
                                            : 'border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300'
                                    } rounded-lg hover:bg-indigo-500 hover:text-white transition`}
                                    onClick={() =>
                                        setSelectedLocation(location)
                                    }
                                >
                                    {location}
                                </button>
                            ))}
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                            {filteredParticipants.length > 0 ? (
                                filteredParticipants.map((participant) => (
                                    <Card
                                        key={participant.id}
                                        className='overflow-hidden dark:bg-[#18181B] dark:text-white'
                                    >
                                        <div className='relative w-full h-56'>
                                            <Image
                                                src={participant.image}
                                                alt={participant.title}
                                                fill
                                                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                                                className='w-full h-full object-cover'
                                                priority
                                            />
                                        </div>
                                        <CardHeader>
                                            <CardTitle>
                                                {participant.title}
                                            </CardTitle>
                                            <CardDescription>
                                                {participant.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className='flex items-center space-x-4'>
                                                <a
                                                    href={`https://x.com/${participant.twitter}`}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                >
                                                    <Image
                                                        src='https://static.vecteezy.com/system/resources/previews/042/148/611/non_2x/new-twitter-x-logo-twitter-icon-x-social-media-icon-free-png.png'
                                                        alt='X'
                                                        width={28}
                                                        height={28}
                                                        className='w-7 md:w-8'
                                                    />
                                                </a>
                                                <a
                                                    href={participant.website}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                >
                                                    <Globe className='w-5 h-5 text-gray-500 dark:text-gray-300' />
                                                </a>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <div className='col-span-1 sm:col-span-2 lg:col-span-4 flex justify-center'>
                                    <Card className='p-10 text-center dark:bg-gray-800 dark:text-white'>
                                        <CardHeader>
                                            <CardTitle>
                                                Fetching the data...
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>Please wait.</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
        </ToastProvider>
    );
};

export default MonadMadnessPage;
