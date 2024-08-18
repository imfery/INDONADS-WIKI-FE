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
      console.log('Fetching access token from cookies');
      const accessToken = Cookies.get('accessToken');
      console.log('Access token:', accessToken);
  
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
      };
  
      console.log('Sending request to:', url, 'with options:', options);
  
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