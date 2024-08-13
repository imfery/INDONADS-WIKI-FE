// components/ConcludedEvents.tsx
import React from 'react';
import EventsList from './EventsList';
import { Event } from '@/types'; // Import the Event interface

interface ConcludedEventsProps {
  events: Event[]; // Should be an array, not undefined
}

const ConcludedEvents: React.FC<ConcludedEventsProps> = ({ events = [] }) => (
  <EventsList event={events} title="Concluded Events" />
);

export default ConcludedEvents;
