'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, Tag } from 'lucide-react';
import sampleData from '@/data/sampleData.json';

interface Announcement {
  id: number;
  title: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
  date: string;
  image: string;
  category: string;
}

export default function Announcements() {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'aviation' | 'real-estate' | 'corporate'>('all');
  const [announcements] = useState<Announcement[]>(sampleData.announcements);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const filteredAnnouncements = filter === 'all' 
    ? announcements 
    : announcements.filter(announcement => announcement.category === filter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryBadge = (category: string) => {
    const categoryConfig = {
      aviation: { key: 'category.aviation', color: 'bg-blue-100 text-blue-800' },
      'real-estate': { key: 'category.realestate', color: 'bg-green-100 text-green-800' },
      corporate: { key: 'category.corporate', color: 'bg-purple-100 text-purple-800' }
    } as const;
    const conf = (categoryConfig as any)[category] || { key: 'category.general', color: 'bg-gray-100 text-gray-800' };
    return { text: t(conf.key), color: conf.color };
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section (like Corporate) */}
      <section className="relative z-0">
        <div className="relative h-[240px] sm:h-[300px] md:h-[380px] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: "url('/bg.jpg')" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-white mb-4 drop-shadow">
                  {t('nav.announcements')}
                </h1>
                <p className="text-white/90 text-base md:text-lg max-w-3xl mx-auto leading-relaxed drop-shadow">
                  {t('announcements.hero.subtitle')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-corporate-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === 'all' 
                  ? 'bg-corporate-navy text-white' 
                  : 'bg-white text-corporate-navy hover:bg-corporate-navy hover:text-white'
              }`}
            >
              {t('announcements.filter.all')}
            </button>
            <button
              onClick={() => setFilter('aviation')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === 'aviation' 
                  ? 'bg-corporate-navy text-white' 
                  : 'bg-white text-corporate-navy hover:bg-corporate-navy hover:text-white'
              }`}
            >
              {t('announcements.filter.aviation')}
            </button>
            <button
              onClick={() => setFilter('real-estate')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === 'real-estate' 
                  ? 'bg-corporate-navy text-white' 
                  : 'bg-white text-corporate-navy hover:bg-corporate-navy hover:text-white'
              }`}
            >
              {t('announcements.filter.realestate')}
            </button>
            <button
              onClick={() => setFilter('corporate')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === 'corporate' 
                  ? 'bg-corporate-navy text-white' 
                  : 'bg-white text-corporate-navy hover:bg-corporate-navy hover:text-white'
              }`}
            >
              {t('announcements.filter.corporate')}
            </button>
          </div>
        </div>
      </section>

      {/* Announcements Grid */}
      <section className="py-20 bg-white fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAnnouncements.map((announcement, index) => (
              <article
                key={announcement.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 card-hover card-glow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={announcement.image}
                    alt={announcement.title[language]}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadge(announcement.category)?.color}`}>
                      <Tag className="inline h-3 w-3 mr-1" />
                      {getCategoryBadge(announcement.category)?.text}
                    </span>
                  </div>
                </div>
                
                <a href={`/duyurular/${(announcement as any).slug || announcement.id}`} className="block p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(announcement.date)}
                  </div>
                  
                  <h3 className="text-xl font-bold font-montserrat text-corporate-navy mb-3 line-clamp-2">
                    {announcement.title[language]}
                  </h3>
                  
                  <p className="text-corporate-text mb-4 line-clamp-3">
                    {announcement.description[language]}
                  </p>
                  
                  <span className="text-corporate-blue hover:text-corporate-navy font-semibold transition-colors duration-300 group inline-flex items-center">
                    {t('announcements.readmore')}
                    <span className="inline-block ml-1 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </a>
              </article>
            ))}
          </div>

          {filteredAnnouncements.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{t('announcements.empty')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-corporate-navy fade-in-section">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-white mb-6">
            {t('announcements.newsletter.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {t('announcements.newsletter.desc')}
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder={t('announcements.newsletter.placeholder')}
              className="flex-1 px-6 py-3 rounded-lg border-none focus:ring-2 focus:ring-corporate-blue outline-none"
            />
            <button
              type="submit"
              className="bg-corporate-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-corporate-light-blue transition-colors duration-300"
            >
              {t('announcements.newsletter.subscribe')}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}