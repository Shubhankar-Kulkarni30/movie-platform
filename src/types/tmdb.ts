export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  media_type?: 'movie';
  genre_ids: number[];
}

export interface TMDBTV {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  media_type?: 'tv';
  genre_ids: number[];
}

export interface TMDBPerson {
  id: number;
  name: string;
  profile_path: string | null;
  popularity: number;
  media_type?: 'person';
  known_for_department: string;
  known_for: (TMDBMovie | TMDBTV)[];
}

export type TMDBMultiItem = (TMDBMovie & { media_type: 'movie' }) | (TMDBTV & { media_type: 'tv' }) | (TMDBPerson & { media_type: 'person' });

export interface TMDBPageResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface TMDBCrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface TMDBReview {
  id: string;
  author: string;
  content: string;
  created_at: string;
  author_details: {
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
}

export interface TMDBMovieDetails {
  id: number;
  title: string;
  tagline: string | null;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number | null;
  vote_average: number;
  genres: TMDBGenre[];
  status: string;
  release_dates?: {
    results: {
      iso_3166_1: string;
      release_dates: {
        certification: string;
      }[];
    }[];
  };
  credits?: {
    cast: TMDBCastMember[];
    crew: TMDBCrewMember[];
  };
  videos?: {
    results: TMDBVideo[];
  };
  recommendations?: TMDBPageResponse<TMDBMovie>;
  similar?: TMDBPageResponse<TMDBMovie>;
  reviews?: TMDBPageResponse<TMDBReview>;
}

export interface TMDBTVDetails {
  id: number;
  name: string;
  tagline: string | null;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  episode_run_time: number[];
  vote_average: number;
  genres: TMDBGenre[];
  status: string;
  number_of_seasons: number;
  number_of_episodes: number;
  credits?: {
    cast: TMDBCastMember[];
    crew: TMDBCrewMember[];
  };
  videos?: {
    results: TMDBVideo[];
  };
  recommendations?: TMDBPageResponse<TMDBTV>;
  similar?: TMDBPageResponse<TMDBTV>;
  reviews?: TMDBPageResponse<TMDBReview>;
}
