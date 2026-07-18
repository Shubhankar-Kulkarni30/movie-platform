'use client';

import React, { useState, useEffect } from 'react';
import { Clapperboard } from 'lucide-react';

export default function CinematicIntro() {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the intro in this session
    const hasSeenIntro = sessionStorage.getItem('sk_movies_intro_seen');
    if (!hasSeenIntro) {
      // Defer setting isRendered to avoid calling setState synchronously within the effect
      const renderTimer = setTimeout(() => {
        setIsRendered(true);
      }, 0);
      
      // Delay visibility to trigger fade-in transition
      const enterTimer = setTimeout(() => {
        setIsVisible(true);
      }, 50);

      // Lock scrolling during intro
      document.body.style.overflow = 'hidden';

      // Duration of intro before starting fade-out (2.8 seconds total play)
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Unlock scrolling
        document.body.style.overflow = '';
        sessionStorage.setItem('sk_movies_intro_seen', 'true');
      }, 2800);

      // Completely remove component from DOM after fade-out completes (3.5 seconds total)
      const removeTimer = setTimeout(() => {
        setIsRendered(false);
      }, 3500);

      return () => {
        clearTimeout(renderTimer);
        clearTimeout(enterTimer);
        clearTimeout(timer);
        clearTimeout(removeTimer);
        document.body.style.overflow = '';
      };
    }
  }, []);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#040406] transition-all duration-700 ease-in-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
      }`}
    >
      {/* Background glowing gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,9,20,0.15)_0%,transparent_60%)] animate-logo-glow" />
      
      {/* Cinematic grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.8))]" />

      <div className="relative flex flex-col items-center justify-center space-y-6 text-center z-10 px-4">
        {/* Animated Clapperboard Logo */}
        <div className="relative group">
          {/* Logo glow background */}
          <div className="absolute -inset-6 bg-red-600 rounded-2xl blur-xl opacity-30 animate-logo-glow"></div>
          
          <div className="relative p-6 bg-red-600 rounded-2xl shadow-2xl text-white animate-logo-in">
            <Clapperboard className="w-16 h-16 animate-clap" />
          </div>
        </div>

        {/* Text Container with dynamic tracking and fade in */}
        <div className="space-y-3 select-none">
          <h1 className="text-4xl md:text-6xl font-black tracking-[0.2em] text-white uppercase animate-text-in">
            SK <span className="text-red-500 animate-glow-red">MOVIES</span>
          </h1>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto opacity-0 animate-subtitle-in" style={{ animationDelay: '0.6s' }} />
          <p className="text-gray-400 text-xs md:text-sm tracking-[0.4em] font-semibold uppercase opacity-0 animate-subtitle-in">
            Premium Cinematic Companion
          </p>
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={() => {
          setIsVisible(false);
          document.body.style.overflow = '';
          sessionStorage.setItem('sk_movies_intro_seen', 'true');
          setTimeout(() => setIsRendered(false), 700);
        }}
        className="absolute bottom-10 right-10 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 uppercase cursor-pointer"
      >
        Skip Intro
      </button>
    </div>
  );
}
