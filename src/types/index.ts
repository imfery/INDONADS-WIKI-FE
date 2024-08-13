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