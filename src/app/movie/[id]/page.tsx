'use client';

import React, { use, useState } from 'react';
import { Play, Plus, Check, Star, Clock, Calendar, ShieldAlert, X, User } from 'lucide-react';
import { useWatchlist } from '@/context/WatchlistContext';
import MovieSlider from '@/components/movie/MovieSlider';
import Link from 'next/link';
import { useMovieDetails } from '@/hooks/useTmdb';

interface MovieDetailsProps {
  params: Promise<{ id: string }>;
}

// Utility to format TMDB runtime minutes to human readable string
function formatRuntime(minutes: number | null): string {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

export default function MovieDetailsPage({ params }: MovieDetailsProps) {
  const { id: rawId } = use(params);
  const movieId = parseInt(rawId, 10);

  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const [activeTab, setActiveTab] = useState<'overview' | 'cast' | 'reviews'>('overview');
  const [showTrailer, setShowTrailer] = useState(false);

  // Fetch full details from TMDB with append_to_response
  const { data: movie, isLoading, isError, refetch } = useMovieDetails(movieId);

  if (isLoading) {
    // Elegant pulsing skeleton page details
    return (
      <div className="relative pb-16 bg-[#060608] min-h-screen text-white animate-pulse">
        {/* Skeletal Backdrop Header */}
        <div className="relative w-full h-[45vh] sm:h-[60vh] bg-gray-950/80 flex items-end">
          <div className="relative z-10 w-full w-full x-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-end">
            <div className="hidden md:block w-48 lg:w-56 h-72 bg-gray-900 rounded-xl flex-shrink-0" />
            <div className="space-y-4 max-w-3xl w-full">
              <div className="w-24 h-5 bg-gray-900 rounded-full" />
              <div className="w-2/3 h-10 bg-gray-900 rounded-lg" />
              <div className="w-1/2 h-5 bg-gray-900 rounded-full" />
              <div className="flex gap-4">
                <div className="w-32 h-10 bg-gray-900 rounded-full" />
                <div className="w-32 h-10 bg-gray-900 rounded-full" />
              </div>
            </div>
          </div>
        </div>
        {/* Skeletal Tabs Content */}
        <div className="w-full x-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-10 bg-gray-950 border-b border-gray-900" />
            <div className="h-4 bg-gray-900 rounded w-full" />
            <div className="h-4 bg-gray-900 rounded w-5/6" />
            <div className="h-4 bg-gray-900 rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#060608]">
        <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Failed to Load Movie</h1>
        <p className="text-gray-400 max-w-md mb-6">
          We encountered an error requesting movie details from TMDB. Please check your internet connection or try again.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => refetch()}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-full transition-all cursor-pointer"
          >
            Retry Request
          </button>
          <Link href="/" className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-2.5 rounded-full border border-gray-800 transition-all">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  const isSaved = isInWatchlist(movie.id, 'movie');
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  // Parse director
  const director = movie.credits?.crew?.find((c) => c.job === 'Director')?.name || 'N/A';

  // Parse US content rating (G, PG, R etc)
  const certifications = movie.release_dates?.results?.find(
    (r) => r.iso_3166_1 === 'US'
  )?.release_dates;
  const ratingCert = certifications?.find((c) => c.certification)?.certification || 'PG-13';

  // Parse official trailer video link
  const trailerVideo = movie.videos?.results?.find(
    (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
  );
  const trailerUrl = trailerVideo ? `https://www.youtube.com/embed/${trailerVideo.key}` : null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : '';

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '';

  return (
    <div className="relative pb-16 bg-[#060608] min-h-screen text-white">
      {/* Backdrop Header */}
      <div className="relative w-full h-[45vh] sm:h-[60vh] flex items-end">
        {/* Backdrop Image */}
        <div className="absolute inset-0 select-none">
          {backdropUrl ? (
            <img
              src={backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full bg-[#0c0c0f]" />
          )}
          {/* Cover gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/40 to-transparent" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Cinematic Header overlay */}
        <div className="relative z-10 w-full w-full x-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-end">
            {/* Poster */}
            <div className="hidden md:block w-48 lg:w-56 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-950 aspect-[2/3]">
              {posterUrl ? (
                <img src={posterUrl} alt={movie.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold">No Poster</div>
              )}
            </div>

            {/* Info details */}
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap gap-2">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase bg-red-600/90 text-white px-2.5 py-0.5 rounded-full border border-red-500/20"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-sm sm:text-base italic text-gray-300 font-medium">
                  {movie.tagline}
                </p>
              )}

              {/* Meta stats */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-1 text-yellow-400 font-bold">
                  <Star className="w-4.5 h-4.5 fill-yellow-400 text-yellow-400" />
                  <span>{movie.vote_average.toFixed(1)} Rating</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{movie.release_date}</span>
                </div>
                <span>•</span>
                <span className="bg-gray-800 border border-gray-700/50 px-2 py-0.5 rounded text-[10px] font-bold text-gray-300">
                  {ratingCert}
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {trailerUrl && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="flex items-center gap-2 bg-white hover:bg-gray-200 text-black font-bold px-5 py-2.5 rounded-full text-sm transition-all hover:scale-105 shadow-lg cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-black text-black" />
                    Play Trailer
                  </button>
                )}

                <button
                  onClick={() => toggleWatchlist(movie.id, 'movie')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-bold transition-all hover:scale-105 cursor-pointer ${
                    isSaved
                      ? 'bg-red-600/20 border-red-500 text-red-400 hover:bg-red-600/30'
                      : 'bg-black/60 border-gray-700 text-white hover:bg-black/80'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <Check className="w-4 h-4 text-red-400" />
                      In Watchlist
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      My Watchlist
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="w-full x-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column (Main Tabs Content) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-800">
              {(['overview', 'cast', 'reviews'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-6 text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'border-red-600 text-white'
                      : 'border-transparent text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Panels */}
            <div className="min-h-[200px]">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Synopsis</h3>
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                      {movie.overview || 'No overview provided.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-900">
                    <div>
                      <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Director</span>
                      <p className="text-white text-sm font-medium mt-1">{director}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Run Time</span>
                      <p className="text-white text-sm font-medium mt-1">{formatRuntime(movie.runtime)}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Release Date</span>
                      <p className="text-white text-sm font-medium mt-1">{movie.release_date || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Maturity Rating</span>
                      <p className="text-white text-sm font-medium mt-1">{ratingCert}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'cast' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {movie.credits?.cast?.slice(0, 8).map((actor) => {
                    const avatarUrl = actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : null;

                    return (
                      <div
                        key={actor.id}
                        className="bg-[#0c0c0f] border border-gray-900 p-3 rounded-xl flex flex-col items-center text-center shadow-lg hover:border-gray-800 transition-colors"
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-3 border border-gray-800 bg-gray-900 flex items-center justify-center">
                          {avatarUrl ? (
                            <img
                              src={avatarUrl}
                              alt={actor.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-8 h-8 text-gray-600" />
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-white leading-tight truncate w-full">
                          {actor.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 truncate w-full">
                          as {actor.character}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {!movie.reviews?.results || movie.reviews.results.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No reviews posted yet. Be the first to share your thoughts!
                    </div>
                  ) : (
                    movie.reviews.results.slice(0, 5).map((review) => (
                      <div
                        key={review.id}
                        className="bg-[#0c0c0f] border border-gray-900 p-5 rounded-xl space-y-3 shadow-lg"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-bold text-white">{review.author}</h4>
                            <span className="text-xs text-gray-500">
                              {new Date(review.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          {review.author_details?.rating && (
                            <div className="flex items-center gap-1 bg-yellow-600/20 text-yellow-400 text-xs font-bold px-2 py-0.5 rounded">
                              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                              <span>{review.author_details.rating}/10</span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto no-scrollbar">
                          {review.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column (Side Poster/Metadata Details) */}
          <div className="space-y-6">
            <div className="bg-[#0c0c0f] border border-gray-900 p-6 rounded-2xl shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-gray-900 pb-3">Movie Information</h3>

              <div className="space-y-4">
                <div>
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Status</span>
                  <p className="text-emerald-500 text-sm font-semibold mt-1">{movie.status}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Original Language</span>
                  <p className="text-white text-sm font-medium mt-1 uppercase">English (EN)</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Director</span>
                  <p className="text-red-500 text-sm font-semibold mt-1">{director}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Average Score</span>
                  <div className="flex items-center gap-1 text-yellow-400 font-bold mt-1 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>
                      {movie.vote_average.toFixed(1)} / 10 ({movie.reviews?.total_results || 0} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar / Similar Slider */}
      {movie.similar?.results && movie.similar.results.length > 0 && (
        <div className="border-t border-gray-900 pt-8 mt-10">
          <MovieSlider title="Similar Movies You May Like" items={movie.similar.results} />
        </div>
      )}

      {/* Recommendations Slider */}
      {movie.recommendations?.results && movie.recommendations.results.length > 0 && (
        <div className="border-t border-gray-900 pt-4">
          <MovieSlider title="Recommended Recommendations" items={movie.recommendations.results} />
        </div>
      )}

      {/* Trailer Play Modal */}
      {showTrailer && trailerUrl && (
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
                src={`${trailerUrl}?autoplay=1&rel=0&modestbranding=1`}
                title={`${movie.title} Official Trailer`}
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
