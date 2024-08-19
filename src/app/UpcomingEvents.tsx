import React from 'react';

import EventsList from './EventsList';

import { Event } from '@/types'; // Import the Event interface

interface UpcomingEventsProps {
  events: Event[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => (
  <EventsList event={events} title="Upcoming Events" />
);

export default UpcomingEvents;
