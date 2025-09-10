'use client';
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Calendar } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Construction / On-Sale project sets (example; adapt as needed)
interface SimpleProject { 
  name: string; 
  slug: string;
  imageLogo?: string; 
  imagePlain?: string; 
  location?: string; 
  delivery?: string; 
}
const underConstruction: SimpleProject[] = [
  {
    name: "L'AVENTURE",
    slug: "shellwe-maldives",
    imageLogo: 'https://aderansconstruction.com/wp-content/uploads/2025/02/laventure2.webp',
    imagePlain: 'https://aderansconstruction.com/wp-content/uploads/2025/02/laventure.webp',
    location: 'Alanya',
    delivery: '2026'
  },
  {
    name: 'ULTRAMARINE',
    slug: "ultramarine",
    imageLogo: 'https://aderansconstruction.com/wp-content/uploads/2025/02/ultramarine2.webp',
    imagePlain: 'https://aderansconstruction.com/wp-content/uploads/2025/02/ultramarine.webp',
    location: 'Alanya',
    delivery: '2026'
  }
];

const onSale: SimpleProject[] = [
  {
    name: 'AQUAMARINE',
    slug: "aquamarine",
    imageLogo: 'https://aderansconstruction.com/wp-content/uploads/2025/02/aquamarine2.webp',
    imagePlain: 'https://aderansconstruction.com/wp-content/uploads/2025/02/aquamarine.webp',
    location: 'Alanya',
    delivery: '2025'
  }
];

export default function RealEstateProjects() {
  const { t, language } = useLanguage();
  // Removed old status filter; using tabs now

  // (Removed animated pill logic per request)

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

  // Utility for card content (optional future)

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section (Corporate style banner) */}
      <section className="relative z-0">
        <div className="relative h-[260px] sm:h-[320px] md:h-[400px] w-full overflow-hidden">
          {/* background image */}
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: "url('/bg.jpg')" }}
            aria-hidden="true"
          />
          {/* dark overlay */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
          {/* centered content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-white mb-4 drop-shadow">
                  {t('projects.realestate')}
                </h1>
                <p className="text-white/90 text-base md:text-lg max-w-3xl mx-auto leading-relaxed drop-shadow">
                  {t('projects.subtitle')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="construction" className="w-full">
            <div className="flex justify-center mb-12">
              <div className="relative w-full max-w-2xl">
                {/* Background glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-corporate-blue/20 via-blue-500/20 to-corporate-navy/20 rounded-2xl blur-lg opacity-60"></div>
                
                                <TabsList className="relative flex flex-col sm:flex-row w-full gap-2">
                  <TabsTrigger 
                    value="construction" 
                    className="w-full h-12 flex items-center justify-center px-6 text-sm font-semibold tracking-wide transition-colors rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-corporate-blue data-[state=active]:to-corporate-navy data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-corporate-navy/80 border border-transparent data-[state=inactive]:border-corporate-navy/10 sm:flex-1"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-current opacity-60 group-data-[state=active]:opacity-100"></div>
                      {t('projects.construction')}
                    </span>
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="onsale" 
                    className="w-full h-12 flex items-center justify-center px-6 text-sm font-semibold tracking-wide transition-colors rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-corporate-blue data-[state=active]:to-corporate-navy data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-corporate-navy/80 border border-transparent data-[state=inactive]:border-corporate-navy/10 sm:flex-1"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-current opacity-60 group-data-[state=active]:opacity-100"></div>
                      {t('projects.onsale')}
                    </span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            <style jsx>{`
              .no-scrollbar::-webkit-scrollbar { display: none; }
              .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
              /* no custom indicator */
            `}</style>
            <TabsContent value="construction" className="mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {underConstruction.map((p) => (
                  <a key={p.name} 
                  
                  href={`/projects/gayrimenkulyatirim/${p.slug}`} 
                  className="group relative block overflow-hidden rounded-2xl shadow-lg bg-black aspect-[5/5] sm:aspect-[5/4]">
                    {p.imagePlain ? <img src={p.imagePlain} alt={`${p.name} arka plan`} className="absolute inset-0 h-full w-full object-cover" /> : <div className="absolute inset-0 bg-gradient-to-br from-corporate-blue/20 to-corporate-navy/30" />}
                    {p.imageLogo ? (
                      <img src={p.imageLogo} alt={p.name} className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="px-3 py-1.5 rounded-md bg-white/90 text-corporate-navy text-sm font-semibold">{p.name}</span>
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="onsale" className="mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {onSale.map((p) => (
                  <a key={p.name} 
                  href={`/projects/gayrimenkulyatirim/${p.slug}`} className="group relative block overflow-hidden rounded-2xl shadow-lg bg-black aspect-[5/5] sm:aspect-[5/4]">
                    {p.imagePlain ? <img src={p.imagePlain} alt={`${p.name} arka plan`} className="absolute inset-0 h-full w-full object-cover" /> : <div className="absolute inset-0 bg-gradient-to-br from-corporate-blue/20 to-corporate-navy/30" />}
                    {p.imageLogo ? (
                      <img src={p.imageLogo} alt={p.name} className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="px-3 py-1.5 rounded-md bg-white/90 text-corporate-navy text-sm font-semibold">{p.name}</span>
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

  {/* Removed old projects grid */}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-corporate-gray via-white to-corporate-gray/40 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_center,black,transparent)] bg-[repeating-linear-gradient(45deg,rgba(10,38,64,0.06)_0,rgba(10,38,64,0.06)_2px,transparent_2px,transparent_6px)]" />
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-corporate-navy mb-6 tracking-tight">
            {t('projects.cta.title')}
          </h2>
          <p className="text-lg md:text-xl text-corporate-text/90 leading-relaxed max-w-3xl mx-auto mb-10">
            {t('projects.cta.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="px-8 h-14 inline-flex items-center justify-center rounded-xl bg-corporate-navy text-white font-semibold tracking-wide hover:bg-corporate-blue transition shadow-lg ring-1 ring-black/10">
              {t('projects.cta.contact')}
            </a>
            <a href="/announcements" className="px-8 h-14 inline-flex items-center justify-center rounded-xl bg-white text-corporate-navy font-semibold tracking-wide border border-corporate-navy/20 hover:border-corporate-blue hover:text-corporate-blue transition shadow-sm">
              {t('projects.cta.announcements')}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}