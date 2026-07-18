'use client';

import React from 'react';
import Link from 'next/link';
import { Clapperboard } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#040406] border-t border-gray-900 text-gray-400 py-12 mt-auto">
      <div className="w-full x-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and About */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-red-600 rounded-lg group-hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30">
                <Clapperboard className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-wider text-white">
                SK <span className="text-red-500">MOVIES</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500">
              Discover millions of movies, track your watchlist, and review your favorite titles. Your ultimate cinema companion, built with passion.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-red-500 transition-colors">Browse Movies</Link>
              </li>
              <li>
                <Link href="/watchlist" className="hover:text-red-500 transition-colors">My Watchlist</Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-red-500 transition-colors">Sign In</Link>
              </li>
            </ul>
          </div>

          {/* Genre Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Popular Genres</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search?genre=Sci-Fi" className="hover:text-red-500 transition-colors">Science Fiction</Link>
              </li>
              <li>
                <Link href="/search?genre=Action" className="hover:text-red-500 transition-colors">Action & Thrills</Link>
              </li>
              <li>
                <Link href="/search?genre=Animation" className="hover:text-red-500 transition-colors">Animation</Link>
              </li>
              <li>
                <Link href="/search?genre=Drama" className="hover:text-red-500 transition-colors">Drama & Romance</Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Connect With Us</h3>
            <p className="text-sm text-gray-500">Stay up to date with fresh cinematic updates, news, and features.</p>
            <div className="flex space-x-4 pt-1">
              <a href="#" className="p-2 bg-gray-900 rounded-full text-gray-400 hover:text-white hover:bg-red-600 transition-all duration-200" title="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-gray-900 rounded-full text-gray-400 hover:text-white hover:bg-red-600 transition-all duration-200" title="Instagram">
                <svg className="w-4 h-4" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-gray-900 rounded-full text-gray-400 hover:text-white hover:bg-red-600 transition-all duration-200" title="Youtube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.046 0 12 0 12s0 3.954.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.954 24 12 24 12s0-3.954-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900 rounded-full text-gray-400 hover:text-white hover:bg-red-600 transition-all duration-200" title="Github">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-600">
          <p>© {currentYear} SK Movies. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
