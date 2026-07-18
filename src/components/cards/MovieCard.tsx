"use client";

import React, { useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Star, Plus, Check, Film, Play, Loader2, X } from "lucide-react";
import { useWatchlist } from "@/context/WatchlistContext";
import { TMDBGenre } from "@/types/tmdb";
import { MovieService } from "@/services/movie.service";
import { TVService } from "@/services/tv.service";

export interface MovieCardItem {
  id: number;
  media_type?: "movie" | "tv";
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  poster_path?: string | null;
  genres?: TMDBGenre[];
  genre_ids?: number[];
}

interface MovieCardProps {
  item: MovieCardItem;
  mediaType?: "movie" | "tv";
}

const GENRE_MAP: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};

export default function MovieCard({ item, mediaType }: MovieCardProps) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  if (!item) return null;

  // Infer media type
  const type: "movie" | "tv" =
    mediaType || item.media_type || (item.title ? "movie" : "tv");

  // Extract fields based on media type
  const id = item.id;
  const title = item.title || item.name || "Untitled";
  const releaseDate = item.release_date || item.first_air_date || "";
  const voteAverage = item.vote_average || 0;

  const isSaved = isInWatchlist(id, type);

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatchlist(id, type);
  };

  const handlePlayTrailer = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (trailerKey) {
      setShowTrailer(true);
      return;
    }

    setLoadingTrailer(true);
    try {
      const data =
        type === "movie"
          ? await MovieService.getVideos(id)
          : await TVService.getVideos(id);

      const trailer = data?.results?.find(
        (v) =>
          v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"),
      );

      if (trailer) {
        setTrailerKey(trailer.key);
        setShowTrailer(true);
      } else {
        alert("No trailer available for this title.");
      }
    } catch (err) {
      console.error("Failed to load trailer", err);
    } finally {
      setLoadingTrailer(false);
    }
  };

  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";

  const posterUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : null;

  // Resolve Genres (either detailed object list or genre ID lookup)
  const genres: string[] = item.genres
    ? item.genres.map((g) => g.name)
    : (item.genre_ids || [])
        .map((gid: number) => GENRE_MAP[gid])
        .filter(Boolean);

  return (
    <>
      <Link href={`/${type}/${id}`}>
        <motion.div
          className="group relative flex flex-col rounded-xl overflow-hidden bg-[#0c0c0f] border border-gray-900 card-glow aspect-[2/3] w-full cursor-pointer select-none"
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Background Image / Placeholder */}
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-950 via-[#101014] to-gray-950 flex flex-col items-center justify-center p-4 text-center border-b border-gray-900">
              <Film className="w-8 h-8 text-gray-700 mb-2" />
              <span className="text-xs font-bold text-gray-500 line-clamp-2 px-2">
                {title}
              </span>
            </div>
          )}

          {/* Watchlist Toggle Button */}
          <button
            onClick={handleWatchlistClick}
            className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md border transition-all duration-300 ${
              isSaved
                ? "bg-red-600 border-red-500 text-white"
                : "bg-black/60 border-gray-800 text-gray-300 hover:text-white hover:bg-black/80 hover:scale-110"
            }`}
            title={isSaved ? "Remove from Watchlist" : "Add to Watchlist"}
          >
            {isSaved ? (
              <Check className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>

          {/* Rating badge */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-black/65 backdrop-blur-md border border-gray-800 text-[11px] font-semibold text-yellow-400 px-2 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span>{voteAverage > 0 ? voteAverage.toFixed(1) : "NR"}</span>
          </div>

          {/* Backdrop Fade Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Content Info (Revealed on hover) */}
          <div className="absolute bottom-0 inset-x-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out bg-gradient-to-t from-black via-black/95 to-black/10 flex flex-col justify-end min-h-[55%]">
            <h3 className="text-sm font-bold text-white leading-tight mb-1 truncate">
              {title}
            </h3>

            <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2">
              <span>{releaseYear}</span>
              <span>•</span>
              <span className="bg-gray-850 px-1.5 py-0.5 rounded text-[9px] font-extrabold text-gray-300 tracking-wide uppercase">
                {type === "movie" ? "Movie" : "TV Show"}
              </span>
            </div>

            <div className="flex flex-wrap gap-1 mt-1">
              {genres.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="text-[9px] font-medium tracking-wide uppercase bg-gray-900 border border-gray-850/50 text-gray-400 px-1.5 py-0.5 rounded"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Watch Trailer Button inside Hover Container */}
            <button
              onClick={handlePlayTrailer}
              disabled={loadingTrailer}
              className="mt-3 flex items-center justify-center gap-1.5 w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800/50 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors cursor-pointer select-none"
            >
              {loadingTrailer ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-white text-white" />
                  Watch Trailer
                </>
              )}
            </button>
          </div>
        </motion.div>
      </Link>

      {/* Trailer Modal Portal */}
      {showTrailer &&
        trailerKey &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
            <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl animate-scale-up">
              {/* Header Close button */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowTrailer(false);
                  }}
                  className="p-2 rounded-full bg-black/60 border border-gray-800 text-gray-400 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Container */}
              <div className="relative aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
                  title={`${title} Official Trailer`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
