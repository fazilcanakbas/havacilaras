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
    'home.highlights.trusted': 'Güvenilir Yatırım',
    'home.highlights.professional': 'Profesyonel Danışmanlık',
    'home.highlights.international': 'Uluslararası Deneyim',
    
    // Corporate
    'corporate.title': 'Kurumsal',
    'corporate.about': 'Havacılar Yatırım, uzman ekibiyle havacılık ve gayrimenkul projelerinde stratejik çözümler sunar.',
    'corporate.mission': 'Misyon',
    'corporate.vision': 'Vizyon',
    'corporate.values': 'Değerler',
    
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
    'home.highlights.trusted': 'Trusted Investment',
    'home.highlights.professional': 'Professional Consulting',
    'home.highlights.international': 'International Experience',
    
    // Corporate
    'corporate.title': 'Corporate',
    'corporate.about': 'Havacılar Investment provides strategic solutions in aviation and real estate projects with its expert team.',
    'corporate.mission': 'Mission',
    'corporate.vision': 'Vision',
    'corporate.values': 'Values',
    
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