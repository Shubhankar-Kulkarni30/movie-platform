"use client";

import React, { useState } from "react";
import { Play, Plus, Check, Star, Info, X } from "lucide-react";
import { useWatchlist } from "@/context/WatchlistContext";
import MovieSlider from "@/components/movie/MovieSlider";
import Link from "next/link";
import { TMDBVideo } from "@/types/tmdb";
import {
  useTrendingMovies,
  usePopularMovies,
  usePopularHindiMovies,
  useTopRatedMovies,
  useUpcomingMovies,
  useNowPlaying,
  useTrendingTV,
  usePopularTV,
  useMovieVideos,
} from "@/hooks/useTmdb";

export default function Home() {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const [showTrailer, setShowTrailer] = useState(false);

  // Fetch all live categories
  const { data: trendingMoviesData, isLoading: isTrendingLoading } =
    useTrendingMovies();
  const { data: popularMoviesData, isLoading: isPopularLoading } =
    usePopularMovies();
  const { data: popularHindiMoviesData, isLoading: isPopularHindiLoading } =
    usePopularHindiMovies();
  const { data: topRatedMoviesData, isLoading: isTopRatedLoading } =
    useTopRatedMovies();
  const { data: upcomingMoviesData, isLoading: isUpcomingLoading } =
    useUpcomingMovies();
  const { data: nowPlayingMoviesData, isLoading: isNowPlayingLoading } =
    useNowPlaying();
  const { data: trendingTVData, isLoading: isTrendingTVLoading } =
    useTrendingTV();
  const { data: popularTVData, isLoading: isPopularTVLoading } = usePopularTV();

  // Selected hero movie (first item in trending)
  const heroMovie = trendingMoviesData?.results?.[0];
  const heroId = heroMovie?.id || 0;

  // Fetch trailer videos for the hero movie
  const { data: videosData } = useMovieVideos(heroId);
  const trailerVideo = videosData?.results?.find(
    (v: TMDBVideo) =>
      v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"),
  );
  const isHeroSaved = heroMovie ? isInWatchlist(heroMovie.id, "movie") : false;

  // Handle loading skeletons for the entire top page fold
  if (isTrendingLoading || !heroMovie) {
    return (
      <div className="relative pb-16 bg-[#060608] min-h-screen text-white overflow-hidden">
        {/* Skeletal Hero Banner */}
        <div className="relative w-full h-[75vh] sm:h-[85vh] bg-[#0c0c0f] flex items-center animate-pulse">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
            <div className="w-40 h-6 bg-gray-900 rounded-full" />
            <div className="w-1/2 sm:w-2/3 h-12 bg-gray-900 rounded-lg" />
            <div className="w-1/3 h-6 bg-gray-900 rounded-full" />
            <div className="w-full max-w-xl h-24 bg-gray-900 rounded-xl" />
            <div className="flex gap-4">
              <div className="w-36 h-12 bg-gray-900 rounded-full" />
              <div className="w-36 h-12 bg-gray-900 rounded-full" />
            </div>
          </div>
        </div>
        {/* Skeletal sliders */}
        <div className="space-y-4">
          <MovieSlider title="Trending Movies" isLoading={true} />
          <MovieSlider title="Popular Movies" isLoading={true} />
        </div>
      </div>
    );
  }

  const backdropUrl = heroMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`
    : `https://image.tmdb.org/t/p/original${heroMovie.poster_path}`;

  return (
    <div className="relative pb-16 bg-[#060608] min-h-screen text-white overflow-x-hidden">
      {/* Cinematic Hero Section */}
      <div className="relative w-full h-[75vh] sm:h-[85vh] flex items-center overflow-hidden">
        {/* Backdrop Image */}
        <div className="absolute inset-0 select-none">
          <img
            src={backdropUrl}
            alt={heroMovie.title}
            className="w-full h-full object-cover object-center scale-100"
          />
          {/* Gradients to merge into background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060608] via-[#060608]/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-[#060608]/30 z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-red-600/90 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-red-500/30">
              Trending Blockbuster
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-none">
              {heroMovie.title}
            </h1>

            <div className="flex items-center gap-4 text-sm font-medium text-gray-300">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{heroMovie.vote_average.toFixed(1)} Rating</span>
              </div>
              <span>•</span>
              <span>
                {heroMovie.release_date
                  ? new Date(heroMovie.release_date).getFullYear()
                  : "N/A"}
              </span>
              <span>•</span>
              <span className="bg-gray-800 border border-gray-700/50 px-2 py-0.5 rounded text-xs text-gray-300 uppercase">
                Movie
              </span>
            </div>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl line-clamp-3 sm:line-clamp-4">
              {heroMovie.overview}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {trailerVideo && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="flex items-center gap-2 bg-white hover:bg-gray-200 text-black font-bold px-6 py-3 rounded-full transition-all hover:scale-105 shadow-xl cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-black text-black" />
                  Play Trailer
                </button>
              )}

              <button
                onClick={() => toggleWatchlist(heroMovie.id, "movie")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border font-bold transition-all hover:scale-105 cursor-pointer ${
                  isHeroSaved
                    ? "bg-red-600/20 border-red-500 text-red-400 hover:bg-red-600/30"
                    : "bg-black/60 border-gray-700 text-white hover:bg-black/80"
                }`}
              >
                {isHeroSaved ? (
                  <>
                    <Check className="w-5 h-5 text-red-400" />
                    In Watchlist
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    My Watchlist
                  </>
                )}
              </button>

              <Link
                href={`/movie/${heroMovie.id}`}
                className="flex items-center gap-2 bg-gray-900/80 hover:bg-gray-800/80 border border-gray-800/80 text-white font-bold px-6 py-3 rounded-full transition-all hover:scale-105 cursor-pointer"
              >
                <Info className="w-5 h-5" />
                More Info
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sliders Container (Negative margin top overlap) */}
      <div className="relative z-30 -mt-16 sm:-mt-24 space-y-4">
        {/* Gradients transition from hero background */}
        <div className="w-full h-24 bg-gradient-to-t from-[#060608] to-transparent pointer-events-none" />

        <MovieSlider
          title="Popular Hindi Movies"
          items={popularHindiMoviesData?.results}
          isLoading={isPopularHindiLoading}
          seeAllHref="/hindi"
        />
        <MovieSlider
          title="Trending Movies"
          items={trendingMoviesData?.results}
          isLoading={isTrendingLoading}
        />
        <MovieSlider
          title="Popular Movies"
          items={popularMoviesData?.results}
          isLoading={isPopularLoading}
        />
        <MovieSlider
          title="Top Rated Masterpieces"
          items={topRatedMoviesData?.results}
          isLoading={isTopRatedLoading}
        />
        <MovieSlider
          title="Now Playing in Theaters"
          items={nowPlayingMoviesData?.results}
          isLoading={isNowPlayingLoading}
        />
        <MovieSlider
          title="Upcoming Releases"
          items={upcomingMoviesData?.results}
          isLoading={isUpcomingLoading}
        />
        <MovieSlider
          title="Trending TV Shows"
          items={trendingTVData?.results}
          isLoading={isTrendingTVLoading}
        />
        <MovieSlider
          title="Popular TV Series"
          items={popularTVData?.results}
          isLoading={isPopularTVLoading}
        />
      </div>

      {/* Movie Trailer Modal */}
      {showTrailer && trailerVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
            {/* Header Close button */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setShowTrailer(false)}
                className="p-2 rounded-full bg-black/60 border border-gray-800 text-gray-400 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Container */}
            <div className="relative aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&rel=0&modestbranding=1`}
                title={`${heroMovie.title} Official Trailer`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
