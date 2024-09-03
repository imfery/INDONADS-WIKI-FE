import Image from 'next/image';
import React from 'react';

import image from '../../public/images/MonadPedia.png';

import { Event } from '@/types';
import { Badge } from '@/components/ui/badge';

interface EventsListProps {
    event: Event[];
}

const EventsList: React.FC<EventsListProps> = ({ event = [] }) => (
    <div className='p-4 max-w-screen-lg mx-auto'>
        <ul role='list' className='divide-y divide-gray-200'>
            {event.length > 0 ? (
                event.map((e, index) => (
                    <li
                        key={index}
                        className='flex flex-col sm:flex-row justify-between gap-y-4 sm:gap-x-6 py-4'
                    >
                        <div className='flex items-start gap-x-4 sm:items-center'>
                            <Image
                                alt=''
                                src={image} // change this to icon based on category
                                width={50}
                                height={50}
                                className='h-14 w-14 flex-none rounded-full bg-gray-50'
                            />
                            <div className='flex-1 min-w-0'>
                                <p className='text-base sm:text-md font-semibold leading-6 text-gray-900 line-clamp-4'>
                                    {e.title}
                                </p>
                                <p className='mt-1 text-xs sm:text-sm leading-5 text-gray-500 line-clamp-3'>
                                    {e.description}
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
                            <p className='text-xs sm:text-sm leading-5 text-gray-900 truncate'>
                                {e.date}
                            </p>
                            {e.location ? (
                                <Badge className='mt-1 text-xs sm:text-sm text-gray-500 line-clamp-3 text-right bg-gray-100 rounded-full px-2 py-1'>
                                    {e.location}
                                </Badge>
                            ) : (
                                <div className='mt-1 flex items-center gap-x-1.5'>
                                    <div className='flex-none rounded-full bg-emerald-500/20 p-1'>
                                        <div className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
                                    </div>
                                </div>
                            )}
                        </div>
                    </li>
                ))
            ) : (
                <p className='text-center text-gray-500'>
                    No events to display.
                </p>
            )}
        </ul>
    </div>
);

export default EventsList;
