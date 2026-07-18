'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WatchlistItem {
  id: number;
  type: 'movie' | 'tv';
}

interface WatchlistContextType {
  watchlist: WatchlistItem[];
  addToWatchlist: (id: number, type: 'movie' | 'tv') => void;
  removeFromWatchlist: (id: number, type: 'movie' | 'tv') => void;
  toggleWatchlist: (id: number, type: 'movie' | 'tv') => void;
  isInWatchlist: (id: number, type: 'movie' | 'tv') => boolean;
  clearWatchlist: () => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('movie_platform_watchlist_v2');
      if (stored) {
        setWatchlist(JSON.parse(stored));
      } else {
        // Fallback or migration if needed
        const legacy = localStorage.getItem('movie_platform_watchlist');
        if (legacy) {
          const parsedLegacy = JSON.parse(legacy);
          if (Array.isArray(parsedLegacy)) {
            // Assume legacy items are all movies
            const migrated: WatchlistItem[] = parsedLegacy.map(id => ({ id: Number(id), type: 'movie' }));
            setWatchlist(migrated);
            localStorage.setItem('movie_platform_watchlist_v2', JSON.stringify(migrated));
          }
        }
      }
    } catch (e) {
      console.error('Failed to load watchlist from localStorage', e);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever watchlist changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('movie_platform_watchlist_v2', JSON.stringify(watchlist));
    } catch (e) {
      console.error('Failed to save watchlist to localStorage', e);
    }
  }, [watchlist, isHydrated]);

  const addToWatchlist = (id: number, type: 'movie' | 'tv') => {
    setWatchlist((prev) =>
      prev.some((item) => item.id === id && item.type === type)
        ? prev
        : [...prev, { id, type }]
    );
  };

  const removeFromWatchlist = (id: number, type: 'movie' | 'tv') => {
    setWatchlist((prev) => prev.filter((item) => !(item.id === id && item.type === type)));
  };

  const toggleWatchlist = (id: number, type: 'movie' | 'tv') => {
    setWatchlist((prev) =>
      prev.some((item) => item.id === id && item.type === type)
        ? prev.filter((item) => !(item.id === id && item.type === type))
        : [...prev, { id, type }]
    );
  };

  const isInWatchlist = (id: number, type: 'movie' | 'tv') => {
    return watchlist.some((item) => item.id === id && item.type === type);
  };

  const clearWatchlist = () => {
    setWatchlist([]);
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        toggleWatchlist,
        isInWatchlist,
        clearWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}

