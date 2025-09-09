'use client';
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Target, Eye, Award } from 'lucide-react';

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

      {/* About Section */}
      <section className="py-20 bg-corporate-gray fade-in-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold font-montserrat text-corporate-navy mb-8 text-center">
              Hakkımızda
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-corporate-text leading-relaxed mb-6">
                {t('corporate.about')} Sektörde uzun yıllara dayanan deneyimimiz ve güçlü iş ortaklıklarımız 
                ile müşterilerimize en kaliteli hizmeti sunmayı hedefliyoruz.
              </p>
              <p className="text-corporate-text leading-relaxed mb-6">
                Havacılık sektöründeki derin bilgi birikimimiz ve gayrimenkul yatırım deneyimimiz ile 
                risk analizinden proje yönetimine kadar geniş bir yelpazede hizmet veriyoruz.
              </p>
              <p className="text-corporate-text leading-relaxed">
                Müşteri memnuniyeti odaklı yaklaşımımız, şeffaf iletişim anlayışımız ve profesyonel 
                ekibimizle sektörde fark yaratmaya devam ediyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-corporate-navy fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Mission */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 card-hover">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-corporate-blue rounded-full mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-montserrat text-white mb-6">
                {t('corporate.mission')}
              </h3>
              <p className="text-white/80 leading-relaxed">
                Havacılık ve gayrimenkul sektöründe yenilikçi çözümler sunarak, müşterilerimizin 
                yatırım hedeflerine ulaşmalarını sağlamak ve sürdürülebilir değer yaratmak.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 card-hover">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-corporate-blue rounded-full mb-6">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-montserrat text-white mb-6">
                {t('corporate.vision')}
              </h3>
              <p className="text-white/80 leading-relaxed">
                Havacılık ve gayrimenkul yatırım danışmanlığında Türkiye'nin lider şirketi olarak, 
                uluslararası arenada tanınan güvenilir bir marka olmak.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 card-hover">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-corporate-blue rounded-full mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-montserrat text-white mb-6">
                {t('corporate.values')}
              </h3>
              <div className="text-white/80 leading-relaxed">
                <ul className="space-y-2">
                  <li>• Güvenilirlik ve Şeffaflık</li>
                  <li>• Müşteri Odaklı Yaklaşım</li>
                  <li>• Profesyonellik ve Kalite</li>
                  <li>• Yenilikçilik ve Sürdürülebilirlik</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-corporate-gray fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-corporate-navy mb-12">
            Uzman Kadromuz
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 card-hover">
              <div className="w-24 h-24 bg-corporate-navy rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">AH</span>
              </div>
              <h3 className="text-xl font-bold font-montserrat text-corporate-navy mb-2">
                Ahmet Havacılar
              </h3>
              <p className="text-corporate-blue font-semibold mb-3">Genel Müdür</p>
              <p className="text-corporate-text text-sm">
                20+ yıllık havacılık sektörü deneyimi ile şirketimizin vizyonunu yönlendiriyor.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 card-hover">
              <div className="w-24 h-24 bg-corporate-navy rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">MK</span>
              </div>
              <h3 className="text-xl font-bold font-montserrat text-corporate-navy mb-2">
                Mehmet Kılıç
              </h3>
              <p className="text-corporate-blue font-semibold mb-3">Yatırım Direktörü</p>
              <p className="text-corporate-text text-sm">
                Gayrimenkul ve finansal analizde uzman, stratejik yatırım kararlarını yönetiyor.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 card-hover">
              <div className="w-24 h-24 bg-corporate-navy rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">SA</span>
              </div>
              <h3 className="text-xl font-bold font-montserrat text-corporate-navy mb-2">
                Selin Arslan
              </h3>
              <p className="text-corporate-blue font-semibold mb-3">Proje Müdürü</p>
              <p className="text-corporate-text text-sm">
                Proje geliştirme ve uygulama süreçlerinde uzman, operasyonel mükemmelliği sağlıyor.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}