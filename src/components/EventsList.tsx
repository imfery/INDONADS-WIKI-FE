import Image from 'next/image';
import React, { useState } from 'react';
import { Event } from '@/types';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogClose,
} from '@/components/ui/dialog';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { CATEGORY_IMAGES, EVENTS_CATEGORIES } from '@/constant/enum';
import { generateGoogleCalendarLink } from '@/lib/helper';

interface EventsListProps {
    event: Event[];
}

const EventsList: React.FC<EventsListProps> = ({ event = [] }) => {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    return (
        <div className='p-4 max-w-screen-lg mx-auto'>
            <ul
                role='list'
                className='divide-y divide-gray-200 dark:divide-gray-600'
            >
                {event.length > 0 ? (
                    event.map((e, index) => (
                        <li
                            key={index}
                            className='flex flex-col sm:flex-row justify-between gap-y-4 sm:gap-x-6 py-4'
                        >
                            <div className='flex items-start gap-x-4 sm:items-center'>
                                <Image
                                    alt=''
                                    src={
                                        CATEGORY_IMAGES[
                                            e.category as EVENTS_CATEGORIES
                                        ]
                                    }
                                    width={1080}
                                    height={1080}
                                    className='h-14 w-14 flex-none rounded-full bg-gray-50 dark:bg-gray-800'
                                />
                                <div className='flex-1 min-w-0'>
                                    <p className='text-base sm:text-md font-semibold leading-6 text-gray-900 dark:text-white'>
                                        {e.title}
                                    </p>
                                    <p className='mt-1 text-xs sm:text-sm leading-5 text-gray-500 dark:text-gray-400'>
                                        {e.date}
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant='outline'
                                            className='mt-2 text-gray-900 dark:text-white border-gray-900 dark:border-white'
                                            onClick={() => setSelectedEvent(e)}
                                        >
                                            Details
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className='max-w-2xl p-6 sm:p-8 dark:bg-[#18181B]'>
                                        <Card>
                                            <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row dark:border-gray-600'>
                                                <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
                                                    <CardTitle className='dark:text-white'>
                                                        {selectedEvent?.title}
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
                                                                Add to Google
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
                    <p className='text-center text-gray-500 dark:text-gray-400'>
                        No events to display.
                    </p>
                )}
            </ul>
        </div>
    );
};

export default EventsList;
