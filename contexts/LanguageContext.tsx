'use client';
import React, { createContext, useContext, useState } from 'react';

type Language = 'tr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  tr: {
    // Header
    'nav.home': 'Anasayfa',
    'nav.corporate': 'Kurumsal',
    'nav.projects': 'Projeler',
    'nav.projects.realestate': 'Gayrimenkul Yatırım Projeleri',
    'nav.projects.aviation': 'Havacılık Yatırım Projeleri',
    'nav.announcements': 'Duyurular',
    'nav.contact': 'İletişim',
    
    // Hero
    'hero.title': 'Geleceğe Yatırım, Havacılıkla Başlar',
    'hero.subtitle': 'Gayrimenkul ve havacılıkta stratejik danışmanlık.',
    'hero.cta': 'Projelerimizi Keşfedin',
    
    // Home
    'home.intro.title': 'Havacılar Yatırım Hakkında',
    'home.intro.text': 'Uzman ekibimizle havacılık ve gayrimenkul projelerinde stratejik çözümler sunuyoruz.',
  'home.intro.p1': 'Havacılar Yatırım; havacılık ve gayrimenkul alanlarında değer üreten, uçtan uca danışmanlık ve proje geliştirme hizmetleri sunar. Fizibiliteden finansmana, tasarımdan pazarlamaya kadar tüm süreçleri şeffaf ve ölçülebilir KPI\'larla yönetir.',
  'home.intro.p2': 'Yatırımcılarımıza sürdürülebilir büyüme, düşük risk ve yüksek verim hedefiyle; kurumsal yönetim, teknolojik altyapı ve uluslararası iş ağımızla destek veriyoruz.',
  'home.intro.b1': 'Sektörel uzmanlık ve güçlü tedarikçi ağı',
  'home.intro.b2': 'Şeffaf raporlama ve yatırımcı odaklı yönetim',
  'home.intro.b3': 'Uçtan uca proje geliştirme ve operasyon desteği',
  'home.stats.years': 'Yıl deneyim',
  'home.stats.projects': 'Tamamlanan proje',
  'home.stats.countries': 'Ülke iş birliği',
  'home.announcements.title': 'Öne Çıkan Duyurular',
  'home.announcements.all': 'Tüm duyurular',
    'home.highlights.trusted': 'Güvenilir Yatırım',
  'home.highlights.trusted.desc': 'Güvenilir ve sürdürülebilir yatırım çözümleri ile sektörde öncü konumdayız.',
    'home.highlights.professional': 'Profesyonel Danışmanlık',
  'home.highlights.professional.desc': 'Alanında uzman kadromuz ile kapsamlı danışmanlık hizmetleri sunuyoruz.',
    'home.highlights.international': 'Uluslararası Deneyim',
  'home.highlights.international.desc': 'Uluslararası standartlarda projeler ve küresel iş ortaklıkları geliştiriyoruz.',

  // CTA
  'cta.title': 'Yatırımlarınızı Güçlendirin',
  'cta.desc': 'Gayrimenkul ve havacılık alanlarında sürdürülebilir, şeffaf ve ölçülebilir yatırım çözümleri sunuyoruz. Uzman ekibimizle riskleri azaltın, verimi artırın.',
  'cta.primary': 'Danışmanla Görüş',
  'cta.secondary': 'WhatsApp',
  'cta.videoTitle': 'Yatırım Tanıtım Videosu',
    
    // Corporate
    'corporate.title': 'Kurumsal',
    'corporate.about': 'Havacılar Yatırım, uzman ekibiyle havacılık ve gayrimenkul projelerinde stratejik çözümler sunar.',
    'corporate.mission': 'Misyon',
    'corporate.vision': 'Vizyon',
    'corporate.values': 'Değerler',
  'corporate.tagline': 'Havacılık ve gayrimenkul alanlarında sürdürülebilir ve şeffaf yatırım çözümleri',
    
    // Projects
    'projects.title': 'Projelerimiz',
    'projects.subtitle': 'Yatırım fırsatlarını keşfedin',
    'projects.realestate': 'Gayrimenkul Yatırım Projeleri',
    'projects.aviation': 'Havacılık Yatırım Projeleri',
    
    // Contact
    'contact.title': 'İletişim',
    'contact.form.name': 'Ad Soyad',
    'contact.form.email': 'E-posta',
    'contact.form.message': 'Mesaj',
    'contact.form.submit': 'Gönder',
    'contact.phone': 'Telefon',
    'contact.email': 'E-posta',
    'contact.address': 'Adres',
    
    // Admin
    'admin.title': 'Yönetim Paneli',
    'admin.login': 'Giriş Yap',
    'admin.dashboard': 'Kontrol Paneli',
    'admin.projects': 'Projeler',
    'admin.announcements': 'Duyurular',
    'admin.contacts': 'İletişim Formları',
    'admin.content': 'İçerik Yönetimi',
    
    // Footer
    'footer.quicklinks': 'Hızlı Bağlantılar',
    'footer.description': 'Havacılık ve gayrimenkul sektöründe uzman kadromuzla stratejik çözümler sunarak, güvenilir yatırım fırsatları yaratıyoruz.',
    'footer.hours.title': 'Çalışma Saatleri',
    'footer.hours.weekday': 'Hafta içi',
    'footer.hours.saturday': 'Cumartesi',
    'footer.hours.sunday': 'Pazar',
    'footer.hours.closed': 'Kapalı',
    'footer.copyright': '© 2025 Havacılar Yatırım. Tüm hakları saklıdır.',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.corporate': 'Corporate',
    'nav.projects': 'Projects',
    'nav.projects.realestate': 'Real Estate Investment Projects',
    'nav.projects.aviation': 'Aviation Investment Projects',
    'nav.announcements': 'Announcements',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Investment in the Future Starts with Aviation',
    'hero.subtitle': 'Strategic consulting in real estate and aviation.',
    'hero.cta': 'Discover Our Projects',
    
    // Home
    'home.intro.title': 'About Havacılar Investment',
    'home.intro.text': 'We provide strategic solutions in aviation and real estate projects with our expert team.',
  'home.intro.p1': 'Havacılar Investment offers end-to-end consulting and project development in aviation and real estate. From feasibility to financing, from design to marketing, we manage all processes with transparent and measurable KPIs.',
  'home.intro.p2': 'We support our investors with corporate governance, technological infrastructure, and an international business network to achieve sustainable growth, lower risk, and high efficiency.',
  'home.intro.b1': 'Sector expertise and strong supplier network',
  'home.intro.b2': 'Transparent reporting and investor-focused management',
  'home.intro.b3': 'End-to-end project development and operational support',
  'home.stats.years': 'Years of experience',
  'home.stats.projects': 'Completed projects',
  'home.stats.countries': 'Countries partnered',
  'home.announcements.title': 'Featured Announcements',
  'home.announcements.all': 'All announcements',
    'home.highlights.trusted': 'Trusted Investment',
  'home.highlights.trusted.desc': 'We are a leader in the sector with reliable and sustainable investment solutions.',
    'home.highlights.professional': 'Professional Consulting',
  'home.highlights.professional.desc': 'We offer comprehensive consulting services with our expert team.',
    'home.highlights.international': 'International Experience',
  'home.highlights.international.desc': 'We develop projects to international standards and global partnerships.',

  // CTA
  'cta.title': 'Empower Your Investments',
  'cta.desc': 'We provide sustainable, transparent, and measurable investment solutions in real estate and aviation. Reduce risks and maximize efficiency with our expert team.',
  'cta.primary': 'Talk to an Advisor',
  'cta.secondary': 'WhatsApp',
  'cta.videoTitle': 'Investment Intro Video',
    
    // Corporate
    'corporate.title': 'Corporate',
    'corporate.about': 'Havacılar Investment provides strategic solutions in aviation and real estate projects with its expert team.',
    'corporate.mission': 'Mission',
    'corporate.vision': 'Vision',
    'corporate.values': 'Values',
  'corporate.tagline': 'Sustainable and transparent investment solutions in aviation and real estate',
    
    // Projects
    'projects.title': 'Our Projects',
    'projects.subtitle': 'Discover investment opportunities',
    'projects.realestate': 'Real Estate Investment Projects',
    'projects.aviation': 'Aviation Investment Projects',
    
    // Contact
    'contact.title': 'Contact',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.address': 'Address',
    
    // Admin
    'admin.title': 'Admin Panel',
    'admin.login': 'Login',
    'admin.dashboard': 'Dashboard',
    'admin.projects': 'Projects',
    'admin.announcements': 'Announcements',
    'admin.contacts': 'Contact Forms',
    'admin.content': 'Content Management',
    
    // Footer
    'footer.quicklinks': 'Quick Links',
    'footer.description': 'We deliver strategic solutions in aviation and real estate with our expert team, creating reliable investment opportunities.',
    'footer.hours.title': 'Working Hours',
    'footer.hours.weekday': 'Weekdays',
    'footer.hours.saturday': 'Saturday',
    'footer.hours.sunday': 'Sunday',
    'footer.hours.closed': 'Closed',
    'footer.copyright': '© 2025 Havacılar Investment. All rights reserved.',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('tr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[Language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}