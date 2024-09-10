import { format } from 'date-fns';
import { Event } from '@/types';

export function getFromLocalStorage(key: string): string | null {
    if (typeof window !== 'undefined') {
        return window.localStorage.getItem(key);
    }
    return null;
}

export function getFromSessionStorage(key: string): string | null {
    if (typeof sessionStorage !== 'undefined') {
        return sessionStorage.getItem(key);
    }
    return null;
}


export function generateGoogleCalendarLink(event: Event): string {
    const startDate = new Date(event.date);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    const formattedStartDate = format(startDate, "yyyyMMdd'T'HHmmss");
    const formattedEndDate = format(endDate, "yyyyMMdd'T'HHmmss");

    const url = new URL('https://calendar.google.com/calendar/r/eventedit');
    url.searchParams.set('text', event.title);
    url.searchParams.set('dates', `${formattedStartDate}/${formattedEndDate}`);
    url.searchParams.set('details', event.description);
    url.searchParams.set('location', event.location);

    return url.toString();
};
