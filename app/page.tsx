'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Users, Globe2, CheckCircle2, Instagram as InstagramIcon, Linkedin, Phone, MessageCircle, Mail, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getContactInfo, getYoutubeVideoId } from '@/app/services/settings.service';
import data from '@/data/sampleData.json';

export default function Home() {
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

  // Not: Instagram gerçek embed yerine mock grid kullanılacak.

  // Ana sayfada gösterilecek projeler (KALDIRILDI - kullanıcı isteği ile görünmüyor)
  // const homeProjects = [...]

  // Duyurular (KALDIRILDI - kullanıcı isteği ile görünmüyor)
  // const featuredAnnouncements = [...]

  const formatDate = (ds: string) =>
    new Date(ds).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });

  // Instagram mock grid (3 postluk, görsel + link)
  const mockInstagram = [
    {
      href: 'https://www.instagram.com/',
      image:
        '/instagram1.jpg',
    },
    {
      href: 'https://www.instagram.com/',
      image: '/instagram2.jpg',
    },
    {
      href: 'https://www.instagram.com/',
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

  const homeProjects = [
    {
      name: "L'AVENTURE",
      imageLogo:
        'https://aderansconstruction.com/wp-content/uploads/2025/02/laventure2.webp',
      imagePlain:
        'https://aderansconstruction.com/wp-content/uploads/2025/02/laventure.webp',
      href: '/projects/real-estate',
    },
    {
      name: 'AQUAMARINE',
      imageLogo:
        'https://aderansconstruction.com/wp-content/uploads/2025/02/aquamarine2.webp',
      imagePlain:
        'https://aderansconstruction.com/wp-content/uploads/2025/02/aquamarine.webp',
      href: '/projects/real-estate',
    },
    {
      name: 'ULTRAMARINE',
      imageLogo:
        'https://aderansconstruction.com/wp-content/uploads/2025/02/ultramarine2.webp',
      imagePlain:
        'https://aderansconstruction.com/wp-content/uploads/2025/02/ultramarine.webp',
      href: '/projects/real-estate',
    },
    {
      name: 'MY HOUSE Elegant',
      imageLogo:
        'https://aderansconstruction.com/wp-content/uploads/2025/02/myhouseelegant2.webp',
      imagePlain:
        'https://aderansconstruction.com/wp-content/uploads/2025/02/myhouseelegant.webp',
      href: '/projects/real-estate',
    },
    {
      name: 'CITRUS Garden',
      imageLogo:
        'https://aderansconstruction.com/wp-content/uploads/2025/02/citrusgarden2.webp',
      imagePlain:
        'https://aderansconstruction.com/wp-content/uploads/2025/02/citrusgarden.webp',
      href: '/projects/real-estate',
    },
    {
      name: 'ELLY',
      imageLogo:
        'https://aderansconstruction.com/wp-content/uploads/2025/02/hillyelm2.webp',
      imagePlain:
        'https://aderansconstruction.com/wp-content/uploads/2025/02/hillyelm.webp',
      href: '/projects/real-estate',
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
              <p className="text-lg text-corporate-text leading-relaxed mb-5">
                Havacılar Yatırım; havacılık ve gayrimenkul alanlarında değer üreten, uçtan uca danışmanlık ve proje geliştirme hizmetleri sunar. Fizibiliteden finansmana, tasarımdan pazarlamaya kadar tüm süreçleri şeffaf ve ölçülebilir KPI'larla yönetir.
              </p>
              <p className="text-lg text-corporate-text leading-relaxed mb-6">
                Yatırımcılarımıza sürdürülebilir büyüme, düşük risk ve yüksek verim hedefiyle; kurumsal yönetim, teknolojik altyapı ve uluslararası iş ağımızla destek veriyoruz.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-corporate-blue mt-1" />
                  <span className="text-corporate-text">Sektörel uzmanlık ve güçlü tedarikçi ağı</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-corporate-blue mt-1" />
                  <span className="text-corporate-text">Şeffaf raporlama ve yatırımcı odaklı yönetim</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-corporate-blue mt-1" />
                  <span className="text-corporate-text">Uçtan uca proje geliştirme ve operasyon desteği</span>
                </li>
              </ul>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-corporate-navy">10+</div>
                  <div className="text-sm text-corporate-text">Yıl deneyim</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-corporate-navy">25+</div>
                  <div className="text-sm text-corporate-text">Tamamlanan proje</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-corporate-navy">7</div>
                  <div className="text-sm text-corporate-text">Ülke iş birliği</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-corporate-blue/20 bg-white/70 backdrop-blur-md shadow-xl p-6 overflow-hidden">
                <div className="relative h-72 w-full rounded-xl bg-gradient-to-br from-corporate-blue/5 to-corporate-navy/10">
                  {/* grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(8,33,56,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(8,33,56,0.06)_1px,transparent_1px)] bg-[size:24px_24px] rounded-xl" />

                  {/* animated svg */}
                  <svg viewBox="0 0 200 200" className="absolute inset-0 m-auto h-[85%] w-[85%]">
                    <g fill="none" stroke="#0A66C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M30 170 L30 80 L90 50 L160 80 L160 170 Z" className="draw" />
                      <path d="M60 150 L60 110 L90 95 L120 110 L120 150 Z" className="draw" />
                      <path d="M30 120 L160 120" className="draw" />
                      <path d="M90 50 L90 80" className="draw" />
                      <path d="M120 150 L160 150" className="draw" />
                      <path d="M30 150 L60 150" className="draw" />
                    </g>
                  </svg>

                  <style>{`
                    .draw {
                      stroke-dasharray: 600;
                      stroke-dashoffset: 600;
                      animation: dash 2.4s ease forwards;
                    }
                    @keyframes dash { to { stroke-dashoffset: 0; } }
                  `}</style>
                </div>
              </div>
              <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-gradient-to-r from-corporate-blue/10 to-corporate-navy/10 blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Projeler */}
      <section className="py-16 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-corporate-navy mb-10 text-center">
            Projeler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {homeProjects.map((p) => (
              <a
                key={p.name}
                href={p.href}
                className="group relative block overflow-hidden shadow-lg bg-black aspect-[5/5] md:aspect-[5/4]"
              >
                <img
                  src={p.imagePlain}
                  alt={`${p.name} background`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <img
                  src={p.imageLogo}
                  alt={p.name}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Öne Çıkan Duyurular */}
      <section className="py-16 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-corporate-navy">
              Öne Çıkan Duyurular
            </h2>
            <a href="/announcements" className="text-corporate-blue hover:underline font-medium">
              Tüm duyurular →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredAnnouncements.map((a: any) => (
              <a key={a.id} href={`/announcements`} className="group relative block overflow-hidden rounded-2xl shadow-lg bg-white">
                <img src={a.image} alt={a.title?.tr || 'duyuru'} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="p-5">
                  <div className="text-xs text-corporate-blue font-semibold mb-1">{formatDate(a.date)}</div>
                  <h3 className="text-lg font-bold text-corporate-text mb-2 line-clamp-2">{a.title?.tr}</h3>
                  <p className="text-sm text-corporate-text/80 line-clamp-3">{a.description?.tr}</p>
                </div>
              </a>
            ))}
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
              <p className="text-white/80 leading-relaxed">
                Güvenilir ve sürdürülebilir yatırım çözümleri ile sektörde öncü konumdayız.
              </p>
            </div>

            <div className="text-center card-hover card-glow bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-corporate-blue rounded-full mb-6 animate-glow">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold font-montserrat text-white mb-4">
                {t('home.highlights.professional')}
              </h3>
              <p className="text-white/80 leading-relaxed">
                Alanında uzman kadromuz ile kapsamlı danışmanlık hizmetleri sunuyoruz.
              </p>
            </div>

            <div className="text-center card-hover card-glow bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-corporate-blue rounded-full mb-6 animate-glow">
                <Globe2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold font-montserrat text-white mb-4">
                {t('home.highlights.international')}
              </h3>
              <p className="text-white/80 leading-relaxed">
                Uluslararası standartlarda projeler ve küresel iş ortaklıkları geliştiriyoruz.
              </p>
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
              Bizi Takip Edin
            </h2>
            <p className="text-lg text-corporate-text mt-2">Havacılar A.Ş. sosyal medya hesapları</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold shadow-lg hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                <InstagramIcon className="h-5 w-5" /> Instagram
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-corporate-navy border border-gray-200 font-semibold shadow-sm hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <Linkedin className="h-5 w-5 text-blue-600" /> LinkedIn
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
                      Görüntüle
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section - themed and placed above Footer */}
      <section className="py-20 fade-in-section bg-gradient-to-br from-corporate-navy to-corporate-blue/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Content */}
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat leading-tight mb-6">
                Hayalinizdeki Villayı Bulmanın Zamanı Geldi
              </h2>
              <p className="text-lg text-white/85 mb-8 leading-relaxed">
                Antalya'nın en prestijli lokasyonlarında yer alan lüks villalarımızı keşfedin. Uzman ekibimiz size en uygun seçenekleri sunmak için hazır.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-white text-corporate-navy hover:bg-gray-100 px-8 py-6 text-base font-semibold"
                  onClick={() => (window.location.href = `tel:${formatPhoneForCall(contactInfo.phone)}`)}
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Hemen Ara
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-corporate-navy px-8 py-6 text-base font-semibold bg-transparent"
                  onClick={() => window.open(`https://wa.me/${formatPhoneForWhatsApp(contactInfo.phone)}`, '_blank')}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-white/85">
                {contactInfo.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{contactInfo.phone}</span>
                  </div>
                )}
                {contactInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{contactInfo.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Video */}
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                title="Tanıtım Videosu"
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