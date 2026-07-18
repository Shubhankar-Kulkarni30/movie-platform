'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Heart, User, LogOut, Menu, X, Film } from 'lucide-react';
import { useWatchlist } from '@/context/WatchlistContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { watchlist } = useWatchlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  // Sync mock user state
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('movie_platform_user');
      setUser(storedUser);
    };
    checkUser();
    
    // Listen for custom login event or storage changes
    window.addEventListener('storage', checkUser);
    window.addEventListener('authChange', checkUser);
    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('authChange', checkUser);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('movie_platform_user');
    setUser(null);
    window.dispatchEvent(new Event('authChange'));
    router.push('/');
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-nav w-full transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-red-600 rounded-lg group-hover:bg-red-700 transition-colors">
                <Film className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-wider text-white">
                FLIX<span className="text-red-500">SPHERE</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-red-500 ${
                isActive('/') ? 'text-red-500' : 'text-gray-300'
              }`}
            >
              Home
            </Link>
            <Link
              href="/search"
              className={`text-sm font-medium transition-colors hover:text-red-500 ${
                isActive('/search') ? 'text-red-500' : 'text-gray-300'
              }`}
            >
              Browse
            </Link>
            <Link
              href="/watchlist"
              className={`text-sm font-medium transition-colors hover:text-red-500 flex items-center gap-1.5 ${
                isActive('/watchlist') ? 'text-red-500' : 'text-gray-300'
              }`}
            >
              Watchlist
              {watchlist.length > 0 && (
                <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {watchlist.length}
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Search and Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 xl:w-64 bg-gray-900/60 border border-gray-700/50 rounded-full py-1.5 pl-4 pr-10 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-white">
                <Search className="w-4 h-4" />
              </button>
            </form>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-purple-600 flex items-center justify-center font-bold text-white text-sm">
                    {user[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-300 max-w-[100px] truncate">{user}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-full transition-all hover:scale-105"
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/search" className="text-gray-400 hover:text-white">
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-t border-gray-800/80 px-4 pt-2 pb-6 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative mt-2">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900/80 border border-gray-700 rounded-lg py-2 pl-4 pr-10 text-sm text-gray-200"
            />
            <button type="submit" className="absolute right-3 top-3 text-gray-400">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="flex flex-col space-y-3">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-base font-medium py-2 border-b border-gray-800/30 ${
                isActive('/') ? 'text-red-500' : 'text-gray-300'
              }`}
            >
              Home
            </Link>
            <Link
              href="/search"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-base font-medium py-2 border-b border-gray-800/30 ${
                isActive('/search') ? 'text-red-500' : 'text-gray-300'
              }`}
            >
              Browse Movies
            </Link>
            <Link
              href="/watchlist"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-base font-medium py-2 border-b border-gray-800/30 flex items-center justify-between ${
                isActive('/watchlist') ? 'text-red-500' : 'text-gray-300'
              }`}
            >
              <span>Watchlist</span>
              {watchlist.length > 0 && (
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {watchlist.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-purple-600 flex items-center justify-center font-bold text-white text-sm">
                    {user[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-300">{user}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-red-500 font-medium text-sm py-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg block transition-colors mt-4"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
