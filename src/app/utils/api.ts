import { EventsData } from '@/types';
import { NewsData } from '@/types';
import { AllEventsData } from '@/types';

export async function loginUser({ email, password }: { email: string; password: string }) {
    const response = await fetch('http://localhost:5000/v1/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }
    return response;
}

export async function registerUser({ name, email, password }: { name: string; email: string; password: string }) {
    const response = await fetch('http://localhost:5000/v1/auth/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Register failed');
    }
    return response;
}

export async function logoutUser() {
    const response = await fetch('http://localhost:5000/v1/auth/logout', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include', // cookies are sent with the request
    });

    if (!response.ok) {
        throw new Error('Logout failed');
    }
    return response;
}

export async function fetchAllEvents({
    sortField = 'createdAt',
    sortBy = 'desc',
    limit = 10,
    page = 1,
}: {
    sortField?: string;
    sortBy?: string;
    limit?: number;
    page?: number;
}): Promise<AllEventsData> {
    const response = await fetch(
        `http://localhost:5000/v1/events?sortField=${sortField}&sortBy=${sortBy}&limit=${limit}&page=${page}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        }
    );

    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }

    const data = await response.json();

    return {
        events: data.data.events,
        totalPages: data.data.totalPages,
        currentPage: data.data.page,
        totalResults: data.data.totalResults, // Extracting totalResults correctly
    };
}

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