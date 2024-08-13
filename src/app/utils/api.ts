import { EventsData } from '@/types';
import { NewsData } from '@/types';

export async function fetchEventsSummary(): Promise<EventsData> {
    const response = await fetch('http://localhost:5000/v1/events/summary', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }

    const data = await response.json();

    // Ensure that the data structure matches the EventsData interface
    return {
        upcomingEvents: data.data.upcomingEvents,
        concludedEvents: data.data.concludedEvents,
    };
}

export async function fetchLatestNews(): Promise<NewsData> {
    const response = await fetch('http://localhost:5000/v1/news/latest', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch latest news');
    }

    const data = await response.json();

    return {
        latestNews: data.data.latestNews,
    };
}