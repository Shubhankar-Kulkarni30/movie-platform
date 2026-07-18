import { tmdbClient } from '@/lib/tmdb';
import { TMDBTV, TMDBTVDetails, TMDBPageResponse, TMDBVideo } from '@/types/tmdb';

export class TVService {
  static async getTrending(page = 1): Promise<TMDBPageResponse<TMDBTV>> {
    const { data } = await tmdbClient.get<TMDBPageResponse<TMDBTV>>('/trending/tv/day', {
      params: { page },
    });
    return data;
  }

  static async getPopular(page = 1): Promise<TMDBPageResponse<TMDBTV>> {
    const { data } = await tmdbClient.get<TMDBPageResponse<TMDBTV>>('/tv/popular', {
      params: { page },
    });
    return data;
  }

  static async getDetails(id: number): Promise<TMDBTVDetails> {
    const { data } = await tmdbClient.get<TMDBTVDetails>(`/tv/${id}`, {
      params: {
        append_to_response: 'videos,credits,recommendations,similar,reviews',
      },
    });
    return data;
  }

  static async getVideos(id: number): Promise<TMDBPageResponse<TMDBVideo>> {
    const { data } = await tmdbClient.get<TMDBPageResponse<TMDBVideo>>(`/tv/${id}/videos`);
    return data;
  }
}
