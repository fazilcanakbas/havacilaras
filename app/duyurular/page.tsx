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
      aviation: { text: 'Havacılık', color: 'bg-blue-100 text-blue-800' },
      'real-estate': { text: 'Gayrimenkul', color: 'bg-green-100 text-green-800' },
      corporate: { text: 'Kurumsal', color: 'bg-purple-100 text-purple-800' }
    };
    
    return categoryConfig[category as keyof typeof categoryConfig] || { text: 'Genel', color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-navy-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-white mb-6 animate-fade-in-up">
            {t('nav.announcements')}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            En güncel haberler ve duyurularımızı takip edin.
          </p>
          <div className="w-24 h-1 bg-corporate-blue mx-auto"></div>
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
              Tümü
            </button>
            <button
              onClick={() => setFilter('aviation')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === 'aviation' 
                  ? 'bg-corporate-navy text-white' 
                  : 'bg-white text-corporate-navy hover:bg-corporate-navy hover:text-white'
              }`}
            >
              Havacılık
            </button>
            <button
              onClick={() => setFilter('real-estate')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === 'real-estate' 
                  ? 'bg-corporate-navy text-white' 
                  : 'bg-white text-corporate-navy hover:bg-corporate-navy hover:text-white'
              }`}
            >
              Gayrimenkul
            </button>
            <button
              onClick={() => setFilter('corporate')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === 'corporate' 
                  ? 'bg-corporate-navy text-white' 
                  : 'bg-white text-corporate-navy hover:bg-corporate-navy hover:text-white'
              }`}
            >
              Kurumsal
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
                
                <div className="p-6">
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
                  
                  <button className="text-corporate-blue hover:text-corporate-navy font-semibold transition-colors duration-300 group">
                    Devamını Oku
                    <span className="inline-block ml-1 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredAnnouncements.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Bu kategoride henüz duyuru bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-corporate-navy fade-in-section">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-white mb-6">
            Haberlerimizi Kaçırmayın
          </h2>
          <p className="text-xl text-white/90 mb-8">
            En güncel duyurularımızı e-posta ile almak için bültenimize abone olun.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-6 py-3 rounded-lg border-none focus:ring-2 focus:ring-corporate-blue outline-none"
            />
            <button
              type="submit"
              className="bg-corporate-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-corporate-light-blue transition-colors duration-300"
            >
              Abone Ol
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}