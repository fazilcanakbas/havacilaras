'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Calendar, Plane } from 'lucide-react';

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

const aviationProjects: Project[] = [
  {
    id: 1,
    title: {
      tr: 'Hangar Facilities',
      en: 'Hangar Facilities'
    },
    description: {
      tr: 'Modern havacılık hangar tesisleri ve bakım merkezi projesi.',
      en: 'Modern aviation hangar facilities and maintenance center project.'
    },
    image: 'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg',
    location: 'İstanbul, Türkiye',
    date: '2024',
    status: 'ongoing'
  },
  {
    id: 2,
    title: {
      tr: 'Training Campus',
      en: 'Training Campus'
    },
    description: {
      tr: 'Havacılık eğitimi ve simülatör merkezi kompleksi.',
      en: 'Aviation training and simulator center complex.'
    },
    image: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg',
    location: 'Ankara, Türkiye',
    date: '2025',
    status: 'planned'
  },
  {
    id: 3,
    title: {
      tr: 'Flight Academy',
      en: 'Flight Academy'
    },
    description: {
      tr: 'Profesyonel pilot eğitimi ve havacılık akademisi projesi.',
      en: 'Professional pilot training and aviation academy project.'
    },
    image: 'https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg',
    location: 'İzmir, Türkiye',
    date: '2023',
    status: 'completed'
  },
  {
    id: 4,
    title: {
      tr: 'Cargo Terminal',
      en: 'Cargo Terminal'
    },
    description: {
      tr: 'Hava kargo terminali ve lojistik merkezi geliştirme projesi.',
      en: 'Air cargo terminal and logistics center development project.'
    },
    image: 'https://images.pexels.com/photos/163792/model-planes-airplanes-aircraft-play-163792.jpeg',
    location: 'Antalya, Türkiye',
    date: '2024',
    status: 'ongoing'
  },
  {
    id: 5,
    title: {
      tr: 'Private Jet Terminal',
      en: 'Private Jet Terminal'
    },
    description: {
      tr: 'Özel jet terminali ve VIP hizmet merkezi projesi.',
      en: 'Private jet terminal and VIP service center project.'
    },
    image: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg',
    location: 'Bodrum, Türkiye',
    date: '2025',
    status: 'planned'
  },
  {
    id: 6,
    title: {
      tr: 'Aviation Museum',
      en: 'Aviation Museum'
    },
    description: {
      tr: 'Havacılık müzesi ve interaktif deneyim merkezi.',
      en: 'Aviation museum and interactive experience center.'
    },
    image: 'https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg',
    location: 'Eskişehir, Türkiye',
    date: '2023',
    status: 'completed'
  }
];

export default function AviationProjects() {
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
    ? aviationProjects 
    : aviationProjects.filter(project => project.status === filter);

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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <Plane className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-white mb-6 animate-fade-in-up">
            {t('projects.aviation')}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Havacılık sektöründeki yenilikçi projelerimiz ile geleceğin havacılık altyapısını inşa ediyoruz.
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
                  <div className="absolute top-4 left-4">
                    <div className="bg-corporate-navy/80 backdrop-blur-sm p-2 rounded-full">
                      <Plane className="h-4 w-4 text-white" />
                    </div>
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

      {/* Stats Section */}
      <section className="py-20 bg-corporate-blue fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold font-montserrat mb-2">25+</div>
              <div className="text-white/80">Havacılık Projesi</div>
            </div>
            <div>
              <div className="text-4xl font-bold font-montserrat mb-2">15</div>
              <div className="text-white/80">Şehir</div>
            </div>
            <div>
              <div className="text-4xl font-bold font-montserrat mb-2">50M+</div>
              <div className="text-white/80">Toplam Yatırım</div>
            </div>
            <div>
              <div className="text-4xl font-bold font-montserrat mb-2">98%</div>
              <div className="text-white/80">Başarı Oranı</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-corporate-gray fade-in-section">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-corporate-navy mb-6">
            Havacılık Yatırımları
          </h2>
          <p className="text-xl text-corporate-text mb-8">
            Havacılık sektöründeki projelerimiz hakkında detaylı bilgi almak ve yatırım fırsatlarını değerlendirmek için uzman ekibimizle görüşün.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-corporate-navy text-white px-8 py-3 rounded-lg font-semibold hover:bg-corporate-blue transition-colors duration-300">
              Uzman Görüşü Alın
            </a>
            <a href="/announcements" className="border-2 border-corporate-navy text-corporate-navy px-8 py-3 rounded-lg font-semibold hover:bg-corporate-navy hover:text-white transition-colors duration-300">
              Güncel Duyurular
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}