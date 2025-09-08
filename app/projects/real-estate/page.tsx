'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Calendar, TrendingUp } from 'lucide-react';

interface Project {
  id: number;
  title: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
  image: string;
  location: string;
  date: string;
  status: 'planned' | 'ongoing' | 'completed';
}

const realEstateProjects: Project[] = [
  {
    id: 1,
    title: {
      tr: 'Skyline Apartments',
      en: 'Skyline Apartments'
    },
    description: {
      tr: 'Modern yaşam alanları ve panoramik şehir manzarası sunan lüks konut projesi.',
      en: 'Luxury residential project offering modern living spaces and panoramic city views.'
    },
    image: 'https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg',
    location: 'İstanbul, Türkiye',
    date: '2024',
    status: 'ongoing'
  },
  {
    id: 2,
    title: {
      tr: 'Luxury Villas',
      en: 'Luxury Villas'
    },
    description: {
      tr: 'Deniz manzaralı özel tasarım villalar ile prestijli yaşam alanları.',
      en: 'Prestigious living spaces with custom-designed villas featuring sea views.'
    },
    image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
    location: 'Antalya, Türkiye',
    date: '2025',
    status: 'planned'
  },
  {
    id: 3,
    title: {
      tr: 'City Towers',
      en: 'City Towers'
    },
    description: {
      tr: 'Şehir merkezinde ticari ve konut alanlarını birleştiren karma kullanım projesi.',
      en: 'Mixed-use project combining commercial and residential spaces in the city center.'
    },
    image: 'https://images.pexels.com/photos/417045/pexels-photo-417045.jpeg',
    location: 'Ankara, Türkiye',
    date: '2023',
    status: 'completed'
  },
  {
    id: 4,
    title: {
      tr: 'Marina Residences',
      en: 'Marina Residences'
    },
    description: {
      tr: 'Marina kenarında konumlanmış üst segment konut ve ticaret merkezi.',
      en: 'Premium residential and commercial center located by the marina.'
    },
    image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg',
    location: 'İzmir, Türkiye',
    date: '2024',
    status: 'ongoing'
  },
  {
    id: 5,
    title: {
      tr: 'Green Valley',
      en: 'Green Valley'
    },
    description: {
      tr: 'Doğayla iç içe sürdürülebilir konut projesi ve yaşam merkezi.',
      en: 'Sustainable residential project and living center in harmony with nature.'
    },
    image: 'https://images.pexels.com/photos/87223/pexels-photo-87223.jpeg',
    location: 'Bursa, Türkiye',
    date: '2025',
    status: 'planned'
  },
  {
    id: 6,
    title: {
      tr: 'Business Plaza',
      en: 'Business Plaza'
    },
    description: {
      tr: 'Modern ofis alanları ve konferans merkezlerinden oluşan iş merkezi.',
      en: 'Business center consisting of modern office spaces and conference centers.'
    },
    image: 'https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg',
    location: 'İstanbul, Türkiye',
    date: '2023',
    status: 'completed'
  }
];

export default function RealEstateProjects() {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'planned' | 'ongoing' | 'completed'>('all');

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

  const filteredProjects = filter === 'all' 
    ? realEstateProjects 
    : realEstateProjects.filter(project => project.status === filter);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      planned: { text: 'Planlanan', color: 'bg-blue-100 text-blue-800' },
      ongoing: { text: 'Devam Eden', color: 'bg-yellow-100 text-yellow-800' },
      completed: { text: 'Tamamlanan', color: 'bg-green-100 text-green-800' }
    };
    
    return statusConfig[status as keyof typeof statusConfig];
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-navy-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-white mb-6 animate-fade-in-up">
            {t('projects.realestate')}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            {t('projects.subtitle')}
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
              onClick={() => setFilter('planned')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === 'planned' 
                  ? 'bg-corporate-navy text-white' 
                  : 'bg-white text-corporate-navy hover:bg-corporate-navy hover:text-white'
              }`}
            >
              Planlanan
            </button>
            <button
              onClick={() => setFilter('ongoing')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === 'ongoing' 
                  ? 'bg-corporate-navy text-white' 
                  : 'bg-white text-corporate-navy hover:bg-corporate-navy hover:text-white'
              }`}
            >
              Devam Eden
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === 'completed' 
                  ? 'bg-corporate-navy text-white' 
                  : 'bg-white text-corporate-navy hover:bg-corporate-navy hover:text-white'
              }`}
            >
              Tamamlanan
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-corporate-navy fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg card-hover card-glow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={project.image}
                    alt={project.title[language]}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(project.status)?.color}`}>
                      {getStatusBadge(project.status)?.text}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold font-montserrat text-corporate-navy mb-3">
                    {project.title[language]}
                  </h3>
                  
                  <p className="text-corporate-text mb-4 line-clamp-3">
                    {project.description[language]}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-corporate-blue" />
                      {project.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-corporate-blue" />
                      {project.date}
                    </div>
                  </div>
                  
                  <button className="mt-6 w-full bg-corporate-navy text-white py-2 rounded-lg hover:bg-corporate-blue transition-colors duration-300 font-semibold">
                    Detayları Görüntüle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-corporate-blue fade-in-section">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-white mb-6">
            Yatırım Fırsatları
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Gayrimenkul projelerimiz hakkında detaylı bilgi almak ve yatırım fırsatlarını değerlendirmek için bizimle iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-white text-corporate-blue px-8 py-3 rounded-lg font-semibold hover:bg-corporate-gray transition-colors duration-300">
              İletişime Geçin
            </a>
            <a href="/announcements" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-corporate-blue transition-colors duration-300">
              Duyuruları İncele
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}