import { useQuery } from '@tanstack/react-query';
import { MovieService } from '@/services/movie.service';
import { TVService } from '@/services/tv.service';
import { SearchService } from '@/services/search.service';

// --- Movie Hooks ---

export function useTrendingMovies(page = 1) {
  return useQuery({
    queryKey: ['movies', 'trending', page],
    queryFn: () => MovieService.getTrending(page),
  });
}

export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => MovieService.getPopular(page),
  });
}

export function useTopRatedMovies(page = 1) {
  return useQuery({
    queryKey: ['movies', 'topRated', page],
    queryFn: () => MovieService.getTopRated(page),
  });
}

export function useUpcomingMovies(page = 1) {
  return useQuery({
    queryKey: ['movies', 'upcoming', page],
    queryFn: () => MovieService.getUpcoming(page),
  });
}

export function useNowPlaying(page = 1) {
  return useQuery({
    queryKey: ['movies', 'nowPlaying', page],
    queryFn: () => MovieService.getNowPlaying(page),
  });
}

export function useMovieDetails(id: number, enabled = true) {
  return useQuery({
    queryKey: ['movies', 'details', id],
    queryFn: () => MovieService.getDetails(id),
    enabled: enabled && !!id && !isNaN(id),
  });
}

export function useRecommendations(id: number, page = 1) {
  return useQuery({
    queryKey: ['movies', 'recommendations', id, page],
    queryFn: () => MovieService.getRecommendations(id, page),
    enabled: !!id && !isNaN(id),
  });
}

export function useMovieCredits(id: number) {
  return useQuery({
    queryKey: ['movies', 'credits', id],
    queryFn: () => MovieService.getCredits(id),
    enabled: !!id && !isNaN(id),
  });
}

export function useMovieVideos(id: number) {
  return useQuery({
    queryKey: ['movies', 'videos', id],
    queryFn: () => MovieService.getVideos(id),
    enabled: !!id && !isNaN(id),
  });
}

// --- TV Hooks ---

export function usePopularTV(page = 1) {
  return useQuery({
    queryKey: ['tv', 'popular', page],
    queryFn: () => TVService.getPopular(page),
  });
}

export function useTrendingTV(page = 1) {
  return useQuery({
    queryKey: ['tv', 'trending', page],
    queryFn: () => TVService.getTrending(page),
  });
}

export function useTVDetails(id: number, enabled = true) {
  return useQuery({
    queryKey: ['tv', 'details', id],
    queryFn: () => TVService.getDetails(id),
    enabled: enabled && !!id && !isNaN(id),
  });
}

// --- Search Hooks ---

export function useSearch(query: string, page = 1, enabled = true) {
  return useQuery({
    queryKey: ['search', query, page],
    queryFn: () => SearchService.multiSearch(query, page),
    enabled: enabled && query.trim().length > 0,
  });
}
