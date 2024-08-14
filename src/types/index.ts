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

export interface LatestNews {
	tags: string[];
	title: string;
	summary: string;
	content: string;
	coverImageUrl: string;
	category: string;
	url: string;
}

export interface NewsData {
	latestNews: LatestNews[];
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
