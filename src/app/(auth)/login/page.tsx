'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Film, User, Lock, Mail, ChevronRight, AlertCircle, Clapperboard } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter a username.');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    setIsLoading(true);

    // Simulate net request latency
    setTimeout(() => {
      try {
        localStorage.setItem('movie_platform_user', username.trim());
        // Dispatch custom event to notify Navbar of auth state change
        window.dispatchEvent(new Event('authChange'));
        router.push('/');
      } catch (err) {
        setError('Failed to sign in. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  const handleQuickLogin = (role: string) => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('movie_platform_user', role);
      window.dispatchEvent(new Event('authChange'));
      router.push('/');
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#060608]">
      {/* Background Graphic Effects */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-red-600/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-purple-600/10 blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md glass p-8 rounded-2xl shadow-2xl space-y-6 relative border border-gray-800">
        {/* App Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-red-600 rounded-2xl shadow-xl shadow-red-600/20 text-white mb-2">
            <Clapperboard className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            Welcome to SK Movies
          </h2>
          <p className="text-xs text-gray-500">
            Sign in to start creating your perfect watchlist.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 bg-red-950/40 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs leading-normal">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Username</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g., cinephile_99"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-950/80 border border-gray-850/80 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                required
              />
              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-950/80 border border-gray-850/80 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                required
              />
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-sm shadow-lg shadow-red-600/20"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                Sign In
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Separator line */}
        <div className="flex items-center gap-3 my-4">
          <div className="h-[1px] bg-gray-900 flex-grow"></div>
          <span className="text-[10px] text-gray-650 uppercase font-bold tracking-widest">Or Quick Sign In</span>
          <div className="h-[1px] bg-gray-900 flex-grow"></div>
        </div>

        {/* Quick Demo Logins */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleQuickLogin('MovieFan')}
            type="button"
            className="bg-gray-950 border border-gray-850 hover:bg-gray-900 text-xs text-gray-300 font-semibold py-2.5 px-4 rounded-xl transition-all cursor-pointer text-center"
          >
            Sign in as Fan
          </button>
          <button
            onClick={() => handleQuickLogin('CritiquePro')}
            type="button"
            className="bg-gray-950 border border-gray-850 hover:bg-gray-900 text-xs text-gray-300 font-semibold py-2.5 px-4 rounded-xl transition-all cursor-pointer text-center"
          >
            Sign in as Critic
          </button>
        </div>

        {/* Note */}
        <p className="text-[10px] text-center text-gray-600 leading-normal">
          This is a simulated authentication experience. Any username and password combinations of 4+ characters are accepted.
        </p>
      </div>
    </div>
  );
}
