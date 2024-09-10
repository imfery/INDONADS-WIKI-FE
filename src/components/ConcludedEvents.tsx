import React from 'react';
import EventsList from '../components/EventsList';
import { Event } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ConcludedEventsProps {
    events: Event[];
}

const ConcludedEvents: React.FC<ConcludedEventsProps> = ({ events = [] }) => (
    <Card className='bg-white shadow-md rounded-lg mb-8'>
        <CardHeader className='border-b border-gray-200'>
            <CardTitle className='text-xl-2 font-semibold text-gray-900'>
                Concluded Events
            </CardTitle>
        </CardHeader>
        <CardContent className='p-4'>
            <EventsList event={events} />
        </CardContent>
    </Card>
);

export default ConcludedEvents;
