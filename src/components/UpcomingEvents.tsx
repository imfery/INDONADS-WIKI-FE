import React from 'react';
import EventsList from './EventsList';
import { Event } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UpcomingEventsProps {
    events: Event[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => (
    <Card className='bg-white dark:bg-[#18181B] shadow-md rounded-lg mb-8'>
        <CardHeader className='border-b border-gray-200 dark:border-gray-600'>
            <CardTitle className='text-xl-2 font-semibold text-gray-900 dark:text-white'>
                Upcoming Events
            </CardTitle>
        </CardHeader>
        <CardContent className='p-4'>
            <EventsList event={events} />
        </CardContent>
    </Card>
);

export default UpcomingEvents;
