import { tmdbClient } from "@/lib/tmdb";
import {
  TMDBMovie,
  TMDBMovieDetails,
  TMDBPageResponse,
  TMDBVideo,
} from "@/types/tmdb";

export class MovieService {
  static async getTrending(page = 1): Promise<TMDBPageResponse<TMDBMovie>> {
    const { data } = await tmdbClient.get<TMDBPageResponse<TMDBMovie>>(
      "/trending/movie/day",
      {
        params: { page },
      },
    );
    return data;
  }

  static async getPopular(page = 1): Promise<TMDBPageResponse<TMDBMovie>> {
    const { data } = await tmdbClient.get<TMDBPageResponse<TMDBMovie>>(
      "/movie/popular",
      {
        params: {
          page,
          with_original_language: "hi",
        },
      },
    );
    return data;
  }

  static async getPopularHindi(page = 1): Promise<TMDBPageResponse<TMDBMovie>> {
    const { data } = await tmdbClient.get<TMDBPageResponse<TMDBMovie>>(
      "/discover/movie",
      {
        params: {
          page,
          with_original_language: "hi",
          sort_by: "popularity.desc",
        },
      },
    );
    return data;
  }

  static async getTopRated(page = 1): Promise<TMDBPageResponse<TMDBMovie>> {
    const { data } = await tmdbClient.get<TMDBPageResponse<TMDBMovie>>(
      "/movie/top_rated",
      {
        params: { page },
      },
    );
    return data;
  }

  static async getUpcoming(page = 1): Promise<TMDBPageResponse<TMDBMovie>> {
    const { data } = await tmdbClient.get<TMDBPageResponse<TMDBMovie>>(
      "/movie/upcoming",
      {
        params: { page },
      },
    );
    return data;
  }

  static async getNowPlaying(page = 1): Promise<TMDBPageResponse<TMDBMovie>> {
    const { data } = await tmdbClient.get<TMDBPageResponse<TMDBMovie>>(
      "/movie/now_playing",
      {
        params: { page },
      },
    );
    return data;
  }

  static async getDetails(id: number): Promise<TMDBMovieDetails> {
    const { data } = await tmdbClient.get<TMDBMovieDetails>(`/movie/${id}`, {
      params: {
        append_to_response:
          "videos,credits,recommendations,similar,reviews,release_dates",
      },
    });
    return data;
  }

  static async getRecommendations(
    id: number,
    page = 1,
  ): Promise<TMDBPageResponse<TMDBMovie>> {
    const { data } = await tmdbClient.get<TMDBPageResponse<TMDBMovie>>(
      `/movie/${id}/recommendations`,
      {
        params: { page },
      },
    );
    return data;
  }

  static async getCredits(id: number) {
    const { data } = await tmdbClient.get(`/movie/${id}/credits`);
    return data;
  }

  static async getVideos(id: number): Promise<TMDBPageResponse<TMDBVideo>> {
    const { data } = await tmdbClient.get<TMDBPageResponse<TMDBVideo>>(
      `/movie/${id}/videos`,
    );
    return data;
  }
}
