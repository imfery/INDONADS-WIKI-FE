import Cookies from 'js-cookie';

import { EventsData } from '@/types';
import { ArticlesData } from '@/types';
import { AllEventsData, AllArticlesData } from '@/types';

export async function loginUser({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('accessToken', { path: '/admin' });

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Login failed');
    }

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

export async function registerUser({
    name,
    email,
    password,
}: {
    name: string;
    email: string;
    password: string;
}) {
    const accessToken = Cookies.get('accessToken');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/register`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
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

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/logout`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
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

export async function requestPasswordReset(email: string): Promise<void> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
        },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send password reset email');
    }
}

export async function resetPassword(token: string, password: string): Promise<void> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/reset-password?token=${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
        },
        body: JSON.stringify({ password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to reset password');
    }
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
            Authorization: `Bearer ${accessToken}`,
        };

        const response = await fetch(url, options);

        if (response.status === 401) {
            const data = await response.json();
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

export const validateToken = async () => {
    try {
        const response = await fetchWithAuth(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/validate`,
            {
                method: 'POST',
            }
        );
        return response;
    } catch (error) {
        console.error('Error validating token:', error);
        throw error;
    }
};

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
        `${process.env.NEXT_PUBLIC_API_URL}/v1/events?sortField=${sortField}&sortBy=${sortBy}&limit=${limit}&page=${page}`,
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
        limit: limit,
        totalPages: data.data.totalPages,
        currentPage: data.data.page,
        totalResults: data.data.totalResults,
    };
}

export async function fetchEventsSummary(): Promise<EventsData> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/events/summary`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        }
    );

    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }

    const data = await response.json();

    return {
        upcomingEvents: data.data.upcomingEvents,
        concludedEvents: data.data.concludedEvents,
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

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/events`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
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

    const token = Cookies.get('accessToken');

    if (!token) {
        throw new Error('No access token found');
    }

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/events/detail/${eventId}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error('Failed to fetch event details');
    }

    const result = await response.json();
    return result.data;
}

export async function updateEvent(eventId: string, data: object) {
    const token = Cookies.get('accessToken');
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/events/detail/${eventId}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        }
    );

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
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/events/detail/${eventId}`,
        {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error('Failed to delete event');
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

/**
 * Upload an image to the server
 * @param {File} file - The image file to upload
 * @returns {Promise<{ success: number, file: { url: string } }>} - The response from the server
 */
export async function uploadImage(
    file: File
): Promise<{ success: number; file: { url: string } }> {
    const token = Cookies.get('accessToken');

    if (!token) {
        throw new Error('No access token found');
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/upload`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload image');
    }

    return response.json();
}

/**
 * Create a articles item.
 * @param {Object} articlesData - The articles data including title, summary, category, and editor content blocks.
 * @returns {Promise<any>} The server response.
 */
export async function createArticles(articlesData: {
    title: string;
    summary: string;
    category: string;
    content: string;
}) {
    const token = Cookies.get('accessToken');

    if (!token) {
        throw new Error('No access token found');
    }

    const contentString = articlesData.content;

    const articlesDataWithContent = {
        ...articlesData,
        content: contentString,
    };

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/articles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(articlesDataWithContent),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create articles');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error creating articles:', error);
        throw error;
    }
}

export async function fetchAllArticles({
    sortBy = 'desc',
    limit = 10,
    page = 1,
    sortField = 'createdAt',
}: {
    sortBy?: string;
    limit?: number;
    page?: number;
    sortField?: string;
}): Promise<AllArticlesData> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/articles?sortField=${sortField}&sortBy=${sortBy}&limit=${limit}&page=${page}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        }
    );

    if (!response.ok) {
        throw new Error('Failed to fetch articles');
    }

    const data = await response.json();

    return {
        articles: data.data.articles,
        limit: limit,
        totalPages: data.data.totalPages,
        currentPage: data.data.page,
        totalResults: data.data.totalResults,
    };
}

export async function fetchArticlesById(id: string): Promise<ArticlesData> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/articles/${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch articles');
    }

    const result = await response.json();
    return result.data;
}

export async function deleteArticlesById(id: string): Promise<void> {
    const token = Cookies.get('accessToken');
    if (!token) throw new Error('No access token found');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/articles/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete articles');
    }
}

export async function updateArticles(
    id: string,
    data: Partial<ArticlesData>
): Promise<void> {
    const token = Cookies.get('accessToken');
    if (!token) throw new Error('No access token found');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/articles/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to update articles');
    }
}

/**
 * Fetch active articles with pagination and sorting.
 * @param {Object} params - The query parameters.
 * @param {string} params.sortField - Field to sort by (default is 'createdAt').
 * @param {string} params.sortBy - Sort order (either 'asc' or 'desc', default is 'desc').
 * @param {number} params.limit - Maximum number of results per page (default is 5).
 * @param {number} params.page - Current page number (default is 1).
 * @returns {Promise<AllArticlesData>} - The fetched articles data.
 */
export async function fetchActiveArticles({
    sortField = 'createdAt',
    sortBy = 'desc',
    limit = 5,
    page = 1,
}: {
    sortField?: string;
    sortBy?: string;
    limit?: number;
    page?: number;
}): Promise<AllArticlesData> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/articles/fetchActiveArticles?sortField=${sortField}&sortBy=${sortBy}&limit=${limit}&page=${page}`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch active articles');
        }

        const data = await response.json();

        return {
            articles: data.data.articles || [],
            limit: limit,
            totalPages: data.data.totalPages || 0,
            currentPage: data.data.currentPage || 1,
            totalResults: data.data.totalResults || 0,
        };
    } catch (error) {
        console.error('Error fetching articles:', error);
        return {
            articles: [],
            limit: limit,
            totalPages: 0,
            currentPage: 1,
            totalResults: 0,
        };
    }
}
