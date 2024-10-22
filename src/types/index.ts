import { EVENTS_CATEGORIES } from "@/constant/enum";

export interface Event {
    title: string;
    description: string;
    date: string;
    location: string;
    category: EVENTS_CATEGORIES;
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
    location: string;
    category: EVENTS_CATEGORIES;
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

export interface MonadMadness {
    id: string;
    title: string;
    description: string;
    image: string;
    twitter: string;
    website: string;
    createdAt: string;
}

export interface AllMonadMadnessData {
    participants: MonadMadness[];
    limit: number;
    totalPages: number;
    currentPage: number;
    totalResults: number;
}

export interface SpaceItem {
    title: string;
    url: string;
}

export interface Space {
    id: string;
    category: string;
    items: SpaceItem[];
    createdAt: string;
    updatedAt: string;
}

export interface AllSpacesData {
    data: Space[];
}
