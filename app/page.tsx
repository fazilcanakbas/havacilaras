'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Users, Globe2, CheckCircle2, Instagram as InstagramIcon, Linkedin, Phone, MessageCircle, Mail, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { getContactInfo, getYoutubeVideoId } from '@/app/services/settings.service';
import data from '@/data/sampleData.json';

export default function Home() {
  const { t, language } = useLanguage();

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

  // Not: Instagram gerçek embed yerine mock grid kullanılacak.

  // Ana sayfada gösterilecek projeler (KALDIRILDI - kullanıcı isteği ile görünmüyor)
  // const homeProjects = [...]

  // Duyurular (KALDIRILDI - kullanıcı isteği ile görünmüyor)
  // const featuredAnnouncements = [...]

  const locale = language === 'tr' ? 'tr-TR' : 'en-US';
  const formatDate = (ds: string) =>
    new Date(ds).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });

  // Instagram mock grid (3 postluk, görsel + link)
  const mockInstagram = [
    {
      href: 'https://www.instagram.com/havacilaras',
      image:
        '/instagram1.jpg',
    },
    {
      href: 'https://www.instagram.com/havacilaras',
      image: '/instagram2.jpg',
    },
    {
      href: 'https://www.instagram.com/havacilaras',
      image: '/instagram3.jpg',
    },
  ];

  // Yan Kuruluşlarımız (subsidiaries)
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

  // Gayrimenkul Yatırım Projeleri
  const realEstateProjects = [
   
  {
    name: "L'AVENTURE",
    slug: "laventure-cyprus",
    imageLogo: '/laventure 1.jpg',
    imagePlain: '/laventure 2.jpg',
    location: 'Alanya',
    delivery: '2026'
  },
  {
    name: 'SHELLWE',
    slug: "shellwe-maldives",
    imageLogo: '/shellwe 1.jpg',
    imagePlain: '/shellwe2.jpg',
    location: 'Alanya',
    delivery: '2026'
  },
    
    {
    name: 'GLORIES DELUXE KEMER',
    slug: "glorious-deluxe-kemer",
    imageLogo: '/gloruius 1.jpg',
    imagePlain: '/gloruius 2.jpg',
    location: 'Alanya',
    delivery: '2025'
  }
    // {
    //   name: 'MY HOUSE Elegant',
    //   imageLogo:
    //     'https://aderansconstruction.com/wp-content/uploads/2025/02/myhouseelegant2.webp',
    //   imagePlain:
    //     'https://aderansconstruction.com/wp-content/uploads/2025/02/myhouseelegant.webp',
    //   href: '/projects/real-estate',
    // },
    // {
    //   name: 'CITRUS Garden',
    //   imageLogo:
    //     'https://aderansconstruction.com/wp-content/uploads/2025/02/citrusgarden2.webp',
    //   imagePlain:
    //     'https://aderansconstruction.com/wp-content/uploads/2025/02/citrusgarden.webp',
    //   href: '/projects/real-estate',
    // },
    // {
    //   name: 'ELLY',
    //   imageLogo:
    //     'https://aderansconstruction.com/wp-content/uploads/2025/02/hillyelm2.webp',
    //   imagePlain:
    //     'https://aderansconstruction.com/wp-content/uploads/2025/02/hillyelm.webp',
    //   href: '/projects/real-estate',
    // },
  ];

  // Havacılık Yatırım Projeleri (örnek veri, görseller opsiyonel)
  const aviationProjects = [
    {
  name: 'Flight Training Center',
  slug: 'flight-training-center',
    },
    {
  name: 'MRO Hangar Expansion',
  slug: 'mro-hangar-expansion',
    },
    {
  name: 'Airport Services JV',
  slug: 'airport-services-jv',
    },
  ];

  // Duyurular: tarihe göre sıralayıp ilk 3'ü öne çıkar
  const featuredAnnouncements = [...(data as any).announcements]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  // CTA dynamic data
  const [videoId, setVideoId] = useState('dQw4w9WgXcQ');
  const [contactInfo, setContactInfo] = useState<{ phone: string; email: string }>({ phone: '', email: '' });

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';
        const [videoData, contactData] = await Promise.all([
          getYoutubeVideoId(token).catch(() => ({ videoId: 'dQw4w9WgXcQ' })),
          getContactInfo(token).catch(() => ({ phone: '+90 242 745 08 09', email: 'info@havacilar.com.tr' })),
        ]);
        if (!mounted) return;
        if (videoData?.videoId) setVideoId(videoData.videoId);
        if (contactData) setContactInfo(contactData as any);
      } catch (error) {
        // Sessizce varsayılan değerlere düş
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  const formatPhoneForCall = (phone: string) => phone.replace(/\s/g, '');
  const formatPhoneForWhatsApp = (phone: string) => phone.replace(/\s/g, '').replace(/^\+/, '');

  return (
    <div className="min-h-screen">
      <Header />
      
      <HeroSection />

      <section className="py-20 bg-gradient-to-br from-corporate-gray to-white fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-corporate-navy mb-6">
                {t('home.intro.title')}
              </h2>
        <p className="text-lg text-corporate-text leading-relaxed mb-5">{t('home.intro.p1')}</p>
        <p className="text-lg text-corporate-text leading-relaxed mb-6">{t('home.intro.p2')}</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-corporate-blue mt-1" />
          <span className="text-corporate-text">{t('home.intro.b1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-corporate-blue mt-1" />
          <span className="text-corporate-text">{t('home.intro.b2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-corporate-blue mt-1" />
          <span className="text-corporate-text">{t('home.intro.b3')}</span>
                </li>
              </ul>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-corporate-navy">3+</div>
                  <div className="text-sm text-corporate-text">{t('home.stats.years')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-corporate-navy">3+</div>
                  <div className="text-sm text-corporate-text">{t('home.stats.projects')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-corporate-navy">4</div>
                  <div className="text-sm text-corporate-text">{t('home.stats.countries')}</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-corporate-blue/20 bg-white/70 backdrop-blur-md shadow-xl overflow-hidden">
                <img
                  src="/hero1.jpg"
                  alt="Havacılar Yatırım"
                  className="h-72 w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-gradient-to-r from-corporate-blue/10 to-corporate-navy/10 blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Projeler */}
      <section className="py-16 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-corporate-navy mb-8 text-center">
            {t('projects.title')}
          </h2>

          <Tabs defaultValue="real-estate" className="w-full">
            <div className="flex justify-center px-4 md:px-0">
              <TabsList
                className="bg-white border border-gray-200 rounded-full p-1 w-full max-w-lg md:w-auto md:max-w-none flex gap-1 overflow-hidden"
              >
                <TabsTrigger
                  value="real-estate"
                  className="rounded-full px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm font-semibold flex-1 md:flex-none text-center whitespace-normal leading-snug data-[state=active]:bg-corporate-blue data-[state=active]:text-white data-[state=active]:shadow-sm"
                >
                  {t('projects.realestate')}
                </TabsTrigger>
                <TabsTrigger
                  value="aviation"
                  className="rounded-full px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm font-semibold flex-1 md:flex-none text-center whitespace-normal leading-snug data-[state=active]:bg-corporate-blue data-[state=active]:text-white data-[state=active]:shadow-sm"
                >
                  {t('projects.aviation')}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="real-estate" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {realEstateProjects.map((p: any) => (
                  <a
          key={p.slug || p.name}
          href={`/projects/gayrimenkulyatirim/${p.slug}`}
                    className="group relative block overflow-hidden rounded-xl shadow-lg bg-black aspect-[5/5] md:aspect-[5/4]"
                  >
                    {p.imagePlain ? (
                      <img
                        src={p.imagePlain}
                        alt={`${p.name} arka plan`}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-corporate-blue/20 to-corporate-navy/30" />
                    )}
                    {p.imageLogo ? (
                      <img
                        src={p.imageLogo}
                        alt={p.name}
                        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="px-3 py-1.5 rounded-md bg-white/90 text-corporate-navy text-sm font-semibold">
                          {p.name}
                        </span>
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="aviation" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {aviationProjects.map((p: any) => (
                  <a
          key={p.slug || p.name}
          href={`/projects/havacilikyatirim/${p.slug}`}
                    className="group relative block overflow-hidden rounded-xl shadow-lg bg-black aspect-[5/5] md:aspect-[5/4]"
                  >
                    {p.imagePlain ? (
                      <img
                        src={p.imagePlain}
                        alt={`${p.name} arka plan`}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-corporate-blue/20 to-corporate-navy/30" />
                    )}
                    {p.imageLogo ? (
                      <img
                        src={p.imageLogo}
                        alt={p.name}
                        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="px-3 py-1.5 rounded-md bg-white/90 text-corporate-navy text-sm font-semibold">
                          {p.name}
                        </span>
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Öne Çıkan Duyurular */}
      <section className="py-16 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-corporate-navy">
              {t('home.announcements.title')}
            </h2>
            <a href="/duyurular" className="text-corporate-blue hover:underline font-medium">
              {t('home.announcements.all')} →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredAnnouncements.map((a: any) => {
              const title = a.title?.[language] || a.title?.tr || '';
              const desc = a.description?.[language] || a.description?.tr || '';
              return (
                <a key={a.id} href={`/duyurular/${a.slug || a.id}`} className="group relative block overflow-hidden rounded-2xl shadow-lg bg-white">
                  <img src={a.image} alt={title || 'announcement'} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="p-5">
                    <div className="text-xs text-corporate-blue font-semibold mb-1">{formatDate(a.date)}</div>
                    <h3 className="text-lg font-bold text-corporate-text mb-2 line-clamp-2">{title}</h3>
                    <p className="text-sm text-corporate-text/80 line-clamp-3">{desc}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-corporate-navy fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center card-hover card-glow bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-corporate-blue rounded-full mb-6 animate-glow">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold font-montserrat text-white mb-4">
                {t('home.highlights.trusted')}
              </h3>
              <p className="text-white/80 leading-relaxed">{t('home.highlights.trusted.desc')}</p>
            </div>

            <div className="text-center card-hover card-glow bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-corporate-blue rounded-full mb-6 animate-glow">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold font-montserrat text-white mb-4">
                {t('home.highlights.professional')}
              </h3>
              <p className="text-white/80 leading-relaxed">{t('home.highlights.professional.desc')}</p>
            </div>

            <div className="text-center card-hover card-glow bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-corporate-blue rounded-full mb-6 animate-glow">
                <Globe2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold font-montserrat text-white mb-4">
                {t('home.highlights.international')}
              </h3>
              <p className="text-white/80 leading-relaxed">{t('home.highlights.international.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      
      
      <section className="py-20 fade-in-section bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-corporate-text text-sm shadow-sm">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-corporate-blue/10 text-corporate-blue font-bold">H</span>
              Havacılar A.Ş.
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold font-montserrat text-corporate-navy">
              {t('home.follow.title')}
            </h2>
            <p className="text-lg text-corporate-text mt-2">{t('home.follow.subtitle')}</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <a
                href="https://www.instagram.com/havacilaras"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold shadow-lg hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                <InstagramIcon className="h-5 w-5" /> {t('home.follow.instagram')}
              </a>
              <a
                href="https://www.linkedin.com/company/havacilar/?originalSubdomain=tr"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-corporate-navy border border-gray-200 font-semibold shadow-sm hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <Linkedin className="h-5 w-5 text-blue-600" /> {t('home.follow.linkedin')}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {mockInstagram.map((post, idx) => (
              <a
                key={idx}
                href={post.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Instagram gönderisi ${idx + 1}`}
                className="group relative block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-0.5 hover:ring-1 hover:ring-corporate-blue/20"
              >
                <div className="relative aspect-[4/5] bg-white">
                  <img
                    src={post.image}
                    loading="lazy"
                    alt={`Instagram post ${idx + 1}`}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />

                  {/* gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

                  {/* top row */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/90 supports-[backdrop-filter]:bg-white/60 backdrop-blur border border-white/70 shadow-sm">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full text-white text-[10px] font-bold">
                        <img src='havacilaregitim.png'/>

                      </span>
                      <span className="text-xs font-medium text-corporate-navy">Havacılar A.Ş.</span>
                    </span>
                    <InstagramIcon className="h-5 w-5 text-white/95 drop-shadow" />
                  </div>

                  {/* bottom row */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div className="text-white drop-shadow-sm">
                      {/* <div className="text-sm font-semibold">@havacilar.yatirim</div>
                      <div className="text-[11px] opacity-85">#yatirim #proje</div> */}
                    </div>
                    <span className="text-xs font-semibold text-corporate-navy bg-white px-3 py-1.5 rounded-full shadow opacity-90">
                      {t('home.follow.view')}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>



  {/* CTA Section - themed and placed above Footer */
  /* Localized investment-focused copy */}
      <section className="py-20 fade-in-section bg-gradient-to-br from-corporate-navy to-corporate-blue/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Content */}
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat leading-tight mb-6">
        {t('cta.title')}
              </h2>
              <p className="text-lg text-white/85 mb-8 leading-relaxed">
        {t('cta.desc')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-white text-corporate-navy hover:bg-gray-100 px-8 py-6 text-base font-semibold"
                  onClick={() => (window.location.href = `tel:${formatPhoneForCall(contactInfo.phone)}`)}
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  {t('cta.primary')}
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-corporate-navy px-8 py-6 text-base font-semibold bg-transparent"
                  onClick={() => window.open(`https://wa.me/${formatPhoneForWhatsApp(contactInfo.phone)}`, '_blank')}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t('cta.secondary')}
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-white/85">
                {contactInfo.phone && (
                  <a
                    href={`tel:${formatPhoneForCall(contactInfo.phone)}`}
                    className="flex items-center gap-2 hover:text-white"
                    aria-label="Call"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{contactInfo.phone}</span>
                  </a>
                )}
                {contactInfo.email && (
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-2 hover:text-white"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{contactInfo.email}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Video */}
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                title={t('cta.videoTitle')}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/10 rounded-full pointer-events-none" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 fade-in-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-corporate-navy mb-8 text-center">
            {t('home.subsidiaries.title')}
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
              title={t('home.subsidiaries.website')}
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
              title={t('home.subsidiaries.instagram')}
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
              title={t('home.subsidiaries.youtube')}
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
              title={t('home.subsidiaries.linkedin')}
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