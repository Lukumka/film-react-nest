export interface Film {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
}

export interface Session {
  id: string;
  filmId: string;
  daytime: Date;
  hall: number;
  rows: number;
  seats: number;
  price: number;
}
