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

export interface LatestArticles {
    tags: string[];
    title: string;
    summary: string;
    content: string;
    coverImageUrl: string;
    category: string;
    url: string;
}

export interface LatestArticlesData {
    latestArticles: LatestArticles[];
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
    totalPages: number;
    currentPage: number;
    totalResults: number;
}
