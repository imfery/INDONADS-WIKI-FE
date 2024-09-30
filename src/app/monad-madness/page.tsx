'use client';

import React, { useEffect, useState } from 'react';
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

    return (
        <ToastProvider>
            <main>
                <Header />
                <section className='bg-white mt-16 mb-64'>
                    <div className='container mx-auto px-4'>
                        <div className='mb-8 text-left'>
                            <h1 className='text-3xl font-bold text-gray-900'>
                                Monad Madness @Manhattan, NYC
                            </h1>
                            <p className='line-clamp-3 mb-8'>
                                Lists of participants!
                            </p>
                        </div>

                        {/* Cards Grid */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                            {participants.length > 0 ? (
                                participants.map((participant) => (
                                    <Card
                                        key={participant.id}
                                        className='overflow-hidden'
                                    >
                                        <div className='relative w-full h-56'>
                                            <Image
                                                src={participant.image}
                                                alt={participant.title}
                                                layout='fill'
                                                objectFit='cover'
                                                className='w-full h-full'
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
                                            {/* Social Links */}
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
                                                    <Globe className='w-5 h-5 text-gray-500' />
                                                </a>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <div className='col-span-1 sm:col-span-2 lg:col-span-4 flex justify-center'>
                                    <Card className='p-10 text-center'>
                                        <CardHeader>
                                            <CardTitle>To Be Added</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>
                                                Participants will be added soon.
                                            </p>
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
