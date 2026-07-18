'use client';

import React, { useState } from 'react';
import { usePopularHindiMovies } from '@/hooks/useTmdb';
import MovieCard, { MovieCardItem } from '@/components/cards/MovieCard';
import { ShieldAlert, Film, ChevronLeft, ChevronRight, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function HindiMoviesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch popular Hindi movies using our custom hook
  const { data, isLoading, isError, refetch } = usePopularHindiMovies(currentPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const results = data?.results || [];
  const totalPages = data?.total_pages || 1;
  const totalResults = data?.total_results || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow flex flex-col min-h-[80vh]">
      {/* Premium Page Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-900 pb-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
            <span className="w-1.5 h-8 bg-red-600 rounded-full inline-block"></span>
            Popular Hindi Movies
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Explore the finest cinematic creations from Bollywood and regional Hindi cinema.
          </p>
        </div>

        {totalResults > 0 && (
          <div className="bg-red-600/10 border border-red-500/20 px-4 py-2 rounded-xl self-start md:self-center">
            <span className="text-red-400 text-sm font-semibold">
              {totalResults.toLocaleString()} Titles Available
            </span>
          </div>
        )}
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="flex-grow flex flex-col">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-gray-950/40 border border-gray-900/60 rounded-xl animate-pulse flex flex-col justify-end p-4">
                <div className="h-4 bg-gray-900 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-900 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="flex-grow flex flex-col items-center justify-center text-center py-20">
          <ShieldAlert className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-white mb-2">Failed to Load Hindi Movies</h2>
          <p className="text-gray-400 max-w-md mb-6">
            We encountered an issue retrieving the film catalog. Please check your connection or API configuration.
          </p>
          <button
            onClick={() => refetch()}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-full transition-all cursor-pointer shadow-lg shadow-red-600/25 hover:scale-105"
          >
            Retry Fetching
          </button>
        </div>
      )}

      {/* Success State */}
      {!isLoading && !isError && (
        <div className="flex-grow flex flex-col">
          {results.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
                {results.map((item) => (
                  <MovieCard key={item.id} item={item as MovieCardItem} />
                ))}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="mt-auto flex items-center justify-center gap-4 py-6 border-t border-gray-900">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 bg-[#0c0c0f] border border-gray-800 hover:border-gray-700 text-white font-medium px-4 py-2 rounded-full disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer hover:scale-105"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Prev
                  </button>
                  <span className="text-gray-400 text-sm font-semibold select-none">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 bg-[#0c0c0f] border border-gray-800 hover:border-gray-700 text-white font-medium px-4 py-2 rounded-full disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer hover:scale-105"
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
              <h2 className="text-2xl font-bold text-white mb-2">No Movies Found</h2>
              <p className="text-gray-400 max-w-md">
                We couldn&apos;t retrieve any titles for this category. Please try again later.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
