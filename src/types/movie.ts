export interface CastMember {
  name: string;
  character: string;
  profile_path: string;
}

export interface Review {
  author: string;
  content: string;
  rating: number;
  date: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genres: string[];
  runtime: string;
  rating: string;
  director: string;
  cast: CastMember[];
  trailer_url: string;
  tagline: string;
  reviews: Review[];
}

