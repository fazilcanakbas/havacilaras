'use client';
import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Target, Eye, Award, Phone, Users, Linkedin, Youtube, InstagramIcon, Globe2 } from 'lucide-react';

export default function Corporate() {
  const { t } = useLanguage();

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
    type Subsidiary = {
    name: string;
    logo?: string;
    website?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };

  const subsidiaries: Subsidiary[] = [
    {
      name: 'Havacılar Eğitim A.Ş.',
      logo: '/havacilaregitim.png',
      website: '#',
      instagram: '#',
      youtube: '#',
      linkedin: '#',
    },
    {
      name: 'Havacılar Teknik A.Ş.',
      logo: '/havacilaregitim.png',
      website: '#',
      instagram: '#',
      youtube: '#',
      linkedin: '#',
    },
  ];


  const aboutRef = useRef<HTMLElement | null>(null);
  const [aboutVisible, setAboutVisible] = useState(false);

  useEffect(() => {
    if (!aboutRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
            setAboutVisible(true);
          }
        });
      },
      { threshold: [0, 0.25, 0.4], rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, []);

  // Reveal Mission / Vision / Values / Expertise cards on scroll
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('.mv-anim')) as HTMLElement[];
    if (!cards.length) return;
    // Pre-assign staggered transition delays
    cards.forEach((c, i) => {
      c.style.transitionDelay = `${i * 120}ms`;
    });
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('mv-show');
            cardObserver.unobserve(entry.target); // reveal once
          }
        });
      },
      { threshold: 0.25, rootMargin: '0px 0px -5% 0px' }
    );
    cards.forEach((c) => cardObserver.observe(c));
    return () => cardObserver.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      
  {/* Hero Section (Banner under the header with black overlay) */}
  <section className="relative z-0">
        <div
          className="relative h-[280px] sm:h-[340px] md:h-[420px] w-full overflow-hidden"
        >
          {/* background image */}
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: "url('/bg.jpg')" }}
            aria-hidden="true"
          />
          {/* solid black overlay */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />

          {/* centered text */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-white mb-4 drop-shadow">
                  {t('corporate.title')}
                </h1>
                <p className="text-white/90 text-base md:text-lg max-w-3xl mx-auto leading-relaxed drop-shadow">
                  {t('corporate.tagline')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section (Logo left – Text right with slide animations) */}
      <section
        id="about"
        ref={aboutRef}
        className={`py-24 bg-white ${aboutVisible ? 'about-animate' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 items-center gap-16">
            {/* Logo / Visual */}
            <div className="from-left flex justify-center">
              <img
                src="/havacilaregitim.png"
                alt="Havacılar Logo"
                className="w-full max-w-[420px] object-contain drop-shadow-sm"
              />
            </div>
            {/* Text Content */}
            <div className="from-right">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-corporate-navy mb-8">
                {t('corporate.aboutTitle')}
              </h2>
              <div className="space-y-6 text-corporate-text leading-relaxed text-lg">
                <p>
                  {t('corporate.about.p1')}
                </p>
                <p>
                  {t('corporate.about.p2')}
                </p>
                <p>
                  {t('corporate.about.p3')}
                </p>
              </div>
              {/* Contact / CTA Row */}
              {/* <div className="mt-10 flex flex-col sm:flex-row items-center gap-6">
                <div className="flex items-center gap-4 bg-corporate-navy text-white rounded-full pr-6 pl-3 py-3 shadow-lg ring-1 ring-black/10">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black/40">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] uppercase tracking-wider opacity-75 font-medium">
                      {t('corporate.support')}
                    </div>
                    <div className="font-semibold text-sm tracking-wide">+90 533 854 09 59</div>
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-8 h-14 rounded-xl bg-corporate-navy text-white font-semibold tracking-wide hover:bg-corporate-blue transition shadow-lg ring-1 ring-black/10"
                >
                  360° {t('corporate.virtualTour')}
                </a>
              </div> */}
            </div>
          </div>
        </div>
        <style jsx>{`
          .from-left, .from-right {opacity:0; transition: opacity 1.4s cubic-bezier(.16,.8,.26,1), transform 1.4s cubic-bezier(.16,.8,.26,1);} 
          .from-left {transform:translateX(-90px);} 
          .from-right {transform:translateX(90px);} 
          .about-animate .from-left {opacity:1; transform:translateX(0); transition-delay:.05s;} 
          .about-animate .from-right {opacity:1; transform:translateX(0); transition-delay:.25s;} 
        `}</style>
      </section>

      {/* Mission, Vision, Values, Expertise */}
      {/* subtle separator */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-corporate-navy/10 to-transparent" />
  <section className="pt-20 md:pt-24 pb-20 md:pb-24 bg-white relative" id="strategy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:gap-14">
            {/* Row 1: Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-10 md:gap-12">
              {/* Mission */}
              <div className="mv-anim bg-corporate-navy relative overflow-hidden rounded-2xl p-10 md:p-12 shadow-xl ring-1 ring-corporate-navy/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-corporate-navy/30">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-corporate-blue to-corporate-blue/70 rounded-xl mb-8 shadow-lg">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold font-montserrat text-white mb-6">
                  {t('corporate.mission')}
                </h3>
                <div className="space-y-4 text-white/90 leading-relaxed text-base md:text-lg">
                  <p>{t('corporate.mission.p1')}</p>
                  <p>{t('corporate.mission.p2')}</p>
                </div>
              </div>
              {/* Vision */}
              <div className="mv-anim bg-corporate-navy relative overflow-hidden rounded-2xl p-10 md:p-12 shadow-xl ring-1 ring-corporate-navy/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-corporate-navy/30">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-corporate-blue to-corporate-blue/70 rounded-xl mb-8 shadow-lg">
                  <Eye className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold font-montserrat text-white mb-6">
                  {t('corporate.vision')}
                </h3>
                <div className="space-y-4 text-white/90 leading-relaxed text-base md:text-lg">
                  <p>{t('corporate.vision.p1')}</p>
                  <p>{t('corporate.vision.p2')}</p>
                </div>
              </div>
            </div>
            {/* Row 2: Values & Expertise */}
            <div className="grid md:grid-cols-2 gap-10 md:gap-12">
              {/* Values */}
              <div className="mv-anim bg-corporate-navy relative overflow-hidden rounded-2xl p-10 md:p-12 shadow-xl ring-1 ring-corporate-navy/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-corporate-navy/30">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-corporate-blue to-corporate-blue/70 rounded-xl mb-8 shadow-lg">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold font-montserrat text-white mb-6">
                  {t('corporate.values')}
                </h3>
                <div className="text-white/90 leading-relaxed text-base md:text-lg space-y-4">
                  <p>{t('corporate.values.p1')}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {t('corporate.values.list').split(',').map(item => (
                      <span key={item} className="px-3 py-1 rounded-full bg-white/10 text-white/85 text-xs md:text-sm tracking-wide">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Expertise */}
              <div className="mv-anim bg-corporate-navy relative overflow-hidden rounded-2xl p-10 md:p-12 shadow-xl ring-1 ring-corporate-navy/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-corporate-navy/30">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-corporate-blue to-corporate-blue/70 rounded-xl mb-8 shadow-lg">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold font-montserrat text-white mb-6">{t('corporate.expertise.title')}</h3>
                <div className="space-y-4 text-white/90 leading-relaxed text-base md:text-lg">
                  <p>{t('corporate.expertise.p1')}</p>
                  <p>{t('corporate.expertise.p2')}</p>
                  <p>{t('corporate.expertise.p3')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .mv-anim {opacity:0; transform:translateY(50px); transition:opacity 1s ease, transform 1s cubic-bezier(.16,.8,.26,1); will-change:transform,opacity;} 
          .mv-anim.mv-show {opacity:1; transform:translateY(0);} 
        `}</style>
      </section>
         <section className="pt-4 md:pt-6 pb-14 fade-in-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-corporate-navy mb-8 text-center">
            Yan Kuruluşlarımız
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {subsidiaries.map((s: Subsidiary, i: number) => {
              const initials = s.name
                .split(/\s+/)
                .map((w: string) => w[0])
                .slice(0, 2)
                .join('')
                .toUpperCase();
              return (
                <div
                  key={i}
                  className="group relative w-full max-w-[240px] rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
                  aria-label={s.name}
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="relative h-20 w-20 rounded-xl bg-gradient-to-br from-corporate-blue/10 to-corporate-navy/10 ring-1 ring-corporate-blue/20 flex items-center justify-center overflow-hidden">
                      {s.logo ? (
                        <img src={s.logo} alt={`${s.name} logo`} className="h-full w-full object-contain p-2" />
                      ) : (
                        <span className="text-corporate-navy font-bold text-xl">{initials}</span>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-corporate-navy">{s.name}</div>
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-3">
                      {s.website && (
                        <a
                          href={s.website}
                          target="_blank"
                          rel="noreferrer"
                          title="Web sitesi"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-corporate-navy hover:bg-gray-50 hover:border-corporate-blue/40 shadow-sm transition"
                        >
                          <Globe2 className="h-4.5 w-4.5" />
                        </a>
                      )}
                      {s.instagram && (
                        <a
                          href={s.instagram}
                          target="_blank"
                          rel="noreferrer"
                          title="Instagram"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-corporate-navy hover:bg-gray-50 hover:border-corporate-blue/40 shadow-sm transition"
                        >
                          <InstagramIcon className="h-4.5 w-4.5" />
                        </a>
                      )}
                      {s.youtube && (
                        <a
                          href={s.youtube}
                          target="_blank"
                          rel="noreferrer"
                          title="YouTube"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-corporate-navy hover:bg-gray-50 hover:border-corporate-blue/40 shadow-sm transition"
                        >
                          <Youtube className="h-4.5 w-4.5" />
                        </a>
                      )}
                      {s.linkedin && (
                        <a
                          href={s.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          title="LinkedIn"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-corporate-navy hover:bg-gray-50 hover:border-corporate-blue/40 shadow-sm transition"
                        >
                          <Linkedin className="h-4.5 w-4.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}