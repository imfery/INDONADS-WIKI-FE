export enum EVENTS_CATEGORIES {
  GAMES = 'Games',
  MUSIC = 'Music',
  TALKSHOW = 'Talkshow',
  QUIZ = 'Quiz',
  MEETUP = 'Meetup',
  DEFAULT = 'Default',
}

export enum ARTICLES_CATEGORIES {
  COMMUNITY = 'Community',
  EVENT = 'Event',
  GAMES = 'Games',
  BUILDER = 'Builder',
  COLLABORATION = 'Collaboration',
  ECOSYSTEM = 'Ecosystem',
  OTHERS = 'Others'
}

export const CATEGORY_IMAGES: Record<EVENTS_CATEGORIES, string> = {
  [EVENTS_CATEGORIES.GAMES]: '/eventcategories/Games.png',
  [EVENTS_CATEGORIES.MUSIC]: '/eventcategories/Music.png',
  [EVENTS_CATEGORIES.TALKSHOW]: '/eventcategories/Talkshow.png',
  [EVENTS_CATEGORIES.QUIZ]: '/eventcategories/Quiz.png',
  [EVENTS_CATEGORIES.MEETUP]: '/eventcategories/Meetup.png',
  [EVENTS_CATEGORIES.DEFAULT]: '/eventcategories/Default.png',
};
