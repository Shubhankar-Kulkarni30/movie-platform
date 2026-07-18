'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSearch } from '@/hooks/useTmdb';
import MovieCard, { MovieCardItem } from '@/components/cards/MovieCard';
import { Search, ShieldAlert, Film, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [currentPage, setCurrentPage] = useState(1);

  // Synchronize state with URL query parameter during render to avoid cascading renders
  const [prevQueryParam, setPrevQueryParam] = useState(queryParam);
  if (queryParam !== prevQueryParam) {
    setPrevQueryParam(queryParam);
    setSearchQuery(queryParam);
    setCurrentPage(1); // Reset page on new search
  }

  // Fetch search results using react-query hook
  const { data, isLoading, isError, refetch } = useSearch(queryParam, currentPage, !!queryParam);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const results = data?.results || [];
  // Filter search results to only show movies and TV shows
  const filteredItems = results.filter(
    (item) => item.media_type === 'movie' || item.media_type === 'tv'
  ) as MovieCardItem[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow flex flex-col">
      {/* Search Input Box */}
      <div className="mb-10 max-w-2xl mx-auto w-full">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Search for movies, TV shows, actors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0c0c0f] border border-gray-800 text-white rounded-full py-4 pl-12 pr-6 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all text-base shadow-xl"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="flex-grow flex flex-col">
          <div className="h-6 w-48 bg-gray-900 rounded-md animate-pulse mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-gray-900 rounded-xl animate-pulse flex flex-col justify-end p-4">
                <div className="h-4 bg-gray-800 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-800 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="flex-grow flex flex-col items-center justify-center text-center py-20">
          <ShieldAlert className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-white mb-2">Search Failed</h2>
          <p className="text-gray-400 max-w-md mb-6">
            We encountered an issue looking up your search. Please check your network or try again.
          </p>
          <button
            onClick={() => refetch()}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-full transition-all cursor-pointer"
          >
            Retry Search
          </button>
        </div>
      )}

      {/* Success State */}
      {!isLoading && !isError && (
        <div className="flex-grow flex flex-col">
          {queryParam ? (
            <>
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block"></span>
                Results for &quot;{queryParam}&quot;
              </h1>

              {filteredItems.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
                    {filteredItems.map((item) => (
                      <MovieCard key={item.id} item={item} />
                    ))}
                  </div>

                  {/* Pagination controls */}
                  {data && data.total_pages > 1 && (
                    <div className="mt-auto flex items-center justify-center gap-4 py-6 border-t border-gray-900">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1 bg-[#0c0c0f] border border-gray-800 hover:border-gray-700 text-white font-medium px-4 py-2 rounded-full disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Prev
                      </button>
                      <span className="text-gray-400 text-sm font-medium">
                        Page {currentPage} of {data.total_pages}
                      </span>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === data.total_pages}
                        className="flex items-center gap-1 bg-[#0c0c0f] border border-gray-800 hover:border-gray-700 text-white font-medium px-4 py-2 rounded-full disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center py-20">
                  <Film className="w-16 h-16 text-gray-700 mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">No Results Found</h2>
                  <p className="text-gray-400 max-w-md">
                    We couldn&apos;t find any movies or TV shows matching &quot;{queryParam}&quot;. Try adjusting your keywords.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center py-20">
              <Search className="w-16 h-16 text-gray-700 mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold text-white mb-2">Start Searching</h2>
              <p className="text-gray-400 max-w-md">
                Find your favorite movies, TV shows, and more. Type a search query in the search bar above to begin.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#060608] text-white">
          <Loader2 className="w-10 h-10 animate-spin text-red-600" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
