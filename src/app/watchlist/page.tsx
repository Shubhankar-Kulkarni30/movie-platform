'use client';

import React from 'react';
import { useWatchlist } from '@/context/WatchlistContext';
import { useQueries } from '@tanstack/react-query';
import { MovieService } from '@/services/movie.service';
import { TVService } from '@/services/tv.service';
import MovieCard, { MovieCardItem } from '@/components/cards/MovieCard';
import { Heart, Film, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();

  // Fetch details for all items in the watchlist in parallel using useQueries
  const results = useQueries({
    queries: watchlist.map((item) => ({
      queryKey: [item.type, 'details', item.id],
      queryFn: () =>
        item.type === 'movie'
          ? MovieService.getDetails(item.id)
          : TVService.getDetails(item.id),
      staleTime: 5 * 60 * 1000, // 5 minutes cache
    })),
  });

  const isLoading = results.some((res) => res.isLoading);
  const isAnyError = results.some((res) => res.isError);

  // Map query data to MovieCardItem structures
  const watchlistItems = results
    .map((res, index) => {
      if (!res.data || res.isError) return null;
      const original = watchlist[index];
      return {
        ...res.data,
        media_type: original.type,
      } as MovieCardItem;
    })
    .filter((item): item is MovieCardItem => item !== null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow flex flex-col">
      {/* Header section */}
      <div className="flex items-center justify-between border-b border-gray-900 pb-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
          <Heart className="w-8 h-8 text-red-600 fill-red-600/20" />
          My Watchlist
          {watchlist.length > 0 && (
            <span className="ml-2 text-xs sm:text-sm bg-red-600 text-white font-bold px-3 py-1 rounded-full border border-red-500/20">
              {watchlist.length} {watchlist.length === 1 ? 'Item' : 'Items'}
            </span>
          )}
        </h1>
        {watchlist.length > 0 && (
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-all group font-semibold"
          >
            Explore more
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex-grow flex flex-col">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: Math.max(watchlist.length, 5) }).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-gray-900 rounded-xl animate-pulse flex flex-col justify-end p-4">
                <div className="h-4 bg-gray-800 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-800 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty Watchlist State */}
      {!isLoading && watchlist.length === 0 && (
        <div className="flex-grow flex flex-col items-center justify-center text-center py-20 bg-[#0c0c0f]/50 border border-gray-900/60 rounded-3xl px-4">
          <div className="w-20 h-20 rounded-full bg-red-600/10 flex items-center justify-center mb-6 border border-red-500/10">
            <Film className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Your Watchlist is Empty</h2>
          <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
            Keep track of all the movies and TV shows you want to watch. Tap the &quot;My Watchlist&quot; button on any movie card to add it here.
          </p>
          <Link
            href="/"
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-xl flex items-center gap-2 cursor-pointer"
          >
            Browse Blockbusters
          </Link>
        </div>
      )}

      {/* Loaded Grid */}
      {!isLoading && watchlist.length > 0 && (
        <div className="flex-grow">
          {watchlistItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {watchlistItems.map((item) => (
                <MovieCard key={`${item.media_type}-${item.id}`} item={item} />
              ))}
            </div>
          ) : (
            isAnyError && (
              <div className="flex-grow flex flex-col items-center justify-center text-center py-20">
                <h2 className="text-xl font-bold text-white mb-2">Error loading some items</h2>
                <p className="text-gray-400 max-w-md">
                  We encountered an error loading your watchlist items from TMDB. Please refresh or try again.
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
