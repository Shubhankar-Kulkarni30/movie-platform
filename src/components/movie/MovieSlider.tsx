'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import MovieCard, { MovieCardItem } from '../cards/MovieCard';

interface MovieSliderProps {
  title: string;
  items?: MovieCardItem[];
  isLoading?: boolean;
  seeAllHref?: string;
  mediaType?: 'movie' | 'tv';
}

export default function MovieSlider({ title, items = [], isLoading = false, seeAllHref, mediaType }: MovieSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollLimits = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScrollLimits);
      checkScrollLimits();
      window.addEventListener('resize', checkScrollLimits);
    }
    return () => {
      if (slider) {
        slider.removeEventListener('scroll', checkScrollLimits);
      }
      window.removeEventListener('resize', checkScrollLimits);
    };
  }, [items, isLoading]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.7 : clientWidth * 0.7;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!isLoading && items.length === 0) return null;

  return (
    <div className="relative group/slider my-10 px-4 sm:px-6 lg:px-8">
      {/* Slider Title Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block font-sans"></span>
          {title}
        </h2>
        {seeAllHref && (
          <Link
            href={seeAllHref}
            className="text-xs sm:text-sm font-semibold text-red-500 hover:text-red-400 transition-colors uppercase tracking-wider flex items-center gap-1 cursor-pointer mr-2"
          >
            See All
          </Link>
        )}
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Left Arrow Button */}
        {canScrollLeft && !isLoading && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/70 border border-gray-800 text-white opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 hover:bg-red-600 hover:border-red-500 hover:scale-110 ml-2 shadow-lg cursor-pointer"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Right Arrow Button */}
        {canScrollRight && !isLoading && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/70 border border-gray-800 text-white opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 hover:bg-red-600 hover:border-red-500 hover:scale-110 mr-2 shadow-lg cursor-pointer"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Horizontal Scrolling Element */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto gap-5 no-scrollbar scroll-smooth snap-x snap-mandatory py-2"
        >
          {isLoading ? (
            // Pulser Loading Skeletons
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[42%] sm:w-[28%] md:w-[22%] lg:w-[17%] aspect-[2/3] rounded-xl bg-gray-900/40 border border-gray-900/60 animate-pulse flex flex-col justify-between p-4"
              >
                <div className="w-8 h-8 rounded-full bg-gray-850/60 self-end" />
                <div className="space-y-2">
                  <div className="w-3/4 h-3.5 bg-gray-850/60 rounded" />
                  <div className="w-1/2 h-3 bg-gray-850/60 rounded" />
                </div>
              </div>
            ))
          ) : (
            // Actual Cards
            items.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-[42%] sm:w-[28%] md:w-[22%] lg:w-[17%] snap-start"
              >
                <MovieCard item={item} mediaType={mediaType} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
