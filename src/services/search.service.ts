import { tmdbClient } from '@/lib/tmdb';
import { TMDBMultiItem, TMDBPageResponse } from '@/types/tmdb';

export class SearchService {
  static async multiSearch(query: string, page = 1): Promise<TMDBPageResponse<TMDBMultiItem>> {
    const { data } = await tmdbClient.get<TMDBPageResponse<TMDBMultiItem>>('/search/multi', {
      params: {
        query,
        page,
        include_adult: false,
      },
    });
    return data;
  }
}
