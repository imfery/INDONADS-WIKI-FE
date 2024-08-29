import Cookies from 'js-cookie';

import { EventsData } from '@/types';
import { NewsData } from '@/types';
import { AllEventsData } from '@/types';

export async function loginUser({ email, password }: { email: string; password: string }) {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('accessToken', { path: '/admin' });

    const response = await fetch('http://localhost:3000/api/v1/auth/login', {
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

    const data = await response.json();

    const { access, refresh } = data.tokens;

    Cookies.set('accessToken', access.token, {
        expires: new Date(access.expires),
        path: '/',
        secure: true,
        sameSite: 'Strict',
    });

    Cookies.set('refreshToken', refresh.token, {
        expires: new Date(refresh.expires),
        path: '/',
        secure: true,
        sameSite: 'Strict',
    });

    return data;
}


export async function registerUser({ name, email, password }: { name: string; email: string; password: string }) {
    const response = await fetch('http://localhost:3000/api/v1/auth/register', {
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
    const refreshToken = Cookies.get('refreshToken');

    if (!refreshToken) {
        throw new Error('No refresh token found');
    }

    const response = await fetch('http://localhost:3000/api/v1/auth/logout', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
        throw new Error('Logout failed');
    }

    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    return response;
}

export async function fetchWithAuth(
    url: string,
    options: RequestInit = {},
    onUnauthorized?: () => void
) {
    try {
        const accessToken = Cookies.get('accessToken');

        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${accessToken}`,
        };

        const response = await fetch(url, options);

        if (response.status === 401) {
            const data = await response.json();
            console.log('Unauthorized response:', data);
            if (data.message === 'Invalid or expired access token') {
                if (onUnauthorized) {
                    onUnauthorized();
                }
            }
        }

        return response;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
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
        `http://localhost:3000/api/v1/events?sortField=${sortField}&sortBy=${sortBy}&limit=${limit}&page=${page}`,
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
    const response = await fetch('http://localhost:3000/api/v1/events/summary', {
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
    const response = await fetch('http://localhost:3000/api/v1/news/latest', {
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

export async function createEvent(data: {
    title: string;
    description: string;
    date: string;
    location: string;
    category: string;
}) {
    const token = Cookies.get('accessToken');

    if (!token) {
        throw new Error('No access token found');
    }

    const response = await fetch('http://localhost:5000/v1/events', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400) {
            throw new Error(errorData.message || 'Bad request');
        }
        throw new Error('An unexpected error occurred');
    }

    return response.json();
}

export async function getEventById(eventId: string) {
    const response = await fetch(`http://localhost:5000/v1/events/detail/${eventId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch event details');
    }

    const result = await response.json();
    return result.data;
}

export async function updateEvent(eventId: string, data: any) {
    const token = Cookies.get('accessToken');
    const response = await fetch(`http://localhost:5000/v1/events/detail/${eventId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400) {
            throw new Error(errorData.message || 'Bad request');
        }
        throw new Error('An unexpected error occurred');
    }

    return response.json();
}

export async function deleteEventById(eventId: string) {
    const token = Cookies.get('accessToken');
    const response = await fetch(`http://localhost:5000/v1/events/detail/${eventId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete event');
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}
