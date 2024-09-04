export interface Event {
    title: string;
    description: string;
    date: string;
    location: string;
    image: string;
}

export interface EventsData {
    upcomingEvents: Event[];
    concludedEvents: Event[];
}

export interface AllEvents {
    id: number;
    title: string;
    description: string;
    date: string;
    createdAt: string;
    updatedAt: string;
}

export interface AllEventsData {
    events: AllEvents[];
    limit: number,
    totalPages: number;
    currentPage: number;
    totalResults: number;
}

export interface ArticlesData {
    id: string;
    title: string;
    summary: string;
    content: string;
    category: string;
    isActive: boolean;
    createdAt: string;
}

export interface AllArticlesData {
    articles: ArticlesData[];
    limit: number;
    totalPages: number;
    currentPage: number;
    totalResults: number;
}
