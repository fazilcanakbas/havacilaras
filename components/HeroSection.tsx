'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Play, Pause } from 'lucide-react';

export default function HeroSection() {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    const video = document.getElementById('heroVideo') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        id="heroVideo"
        className="video-background"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/havacilar.mp4" type="video/mp4" />
      </video>

      {/* Fallback Background Image */}
      <div 
        className="video-background"
        style={{
          backgroundImage: 'linear-gradient(135deg, #0B2A57 0%, #3A7BD5 100%)',
          zIndex: -2,
        }}
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-hero-gradient z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-montserrat text-white mb-6 animate-fade-in-up">
          {t('hero.title')}
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in-up animation-delay-300 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>
        
        <Link 
          href="/projects/gayrimenkulyatirim" 
          className="btn-corporate inline-block animate-fade-in-up animation-delay-600"
        >
          {t('hero.cta')}
        </Link>
      </div>

      {/* Video Controls */}
      <button
        onClick={toggleVideo}
        className="absolute bottom-8 right-8 z-30 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}