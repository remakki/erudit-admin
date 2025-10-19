export interface Event {
  id: number;
  number: number;
  title: string;
  description: string;
  datetime_event: string;
  registration_start: string;
  registration_end: string;
  duration: number;
  location: string;
  format: 'classic' | 'family' | null;
  price: number;
  theme: string | null;
  max_teams: number;
  image_url: string | null;
}

export interface EventCreate {
  number: number;
  title: string;
  description: string;
  datetime_event: string;
  registration_start: string;
  registration_end: string;
  duration: number;
  location: string;
  format: 'classic' | 'family' | null;
  price: number;
  theme: string | null;
  max_teams: number;
  image_url: string | null;
}

export interface EventList {
  events: Event[];
}
