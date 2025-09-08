'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-corporate-navy shadow-xl backdrop-blur-sm' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src='/havacilarlogo.png'
              alt="Havacılar Logo"
              className={`h-10 md:h-12 transition-all duration-300 ${
                isScrolled ? 'h-8 md:h-10' : ''
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="nav-link relative text-white hover:text-corporate-blue transition-colors duration-300 font-medium">
              {t('nav.home')}
            </Link>
            
            <Link href="/corporate" className="nav-link relative text-white hover:text-corporate-blue transition-colors duration-300 font-medium">
              {t('nav.corporate')}
            </Link>
            
            {/* Projects Dropdown */}
            <div className="relative group">
              <button 
                className="nav-link relative text-white hover:text-corporate-blue transition-colors duration-300 font-medium flex items-center"
                onMouseEnter={() => setIsProjectsOpen(true)}
                onMouseLeave={() => setIsProjectsOpen(false)}
              >
                {t('nav.projects')}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              <div 
                className={`absolute left-0 mt-2 w-64 bg-corporate-navy rounded-lg shadow-xl py-2 transition-all duration-200 ${
                  isProjectsOpen ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform -translate-y-2'
                }`}
                onMouseEnter={() => setIsProjectsOpen(true)}
                onMouseLeave={() => setIsProjectsOpen(false)}
              >
                <Link href="/projects/real-estate" className="block px-4 py-2 text-white hover:bg-corporate-blue transition-colors">
                  {t('nav.projects.realestate')}
                </Link>
                <Link href="/projects/aviation" className="block px-4 py-2 text-white hover:bg-corporate-blue transition-colors">
                  {t('nav.projects.aviation')}
                </Link>
              </div>
            </div>
            
            <Link href="/announcements" className="nav-link relative text-white hover:text-corporate-blue transition-colors duration-300 font-medium">
              {t('nav.announcements')}
            </Link>
            
            <Link href="/contact" className="nav-link relative text-white hover:text-corporate-blue transition-colors duration-300 font-medium">
              {t('nav.contact')}
            </Link>

            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                className="flex items-center text-white hover:text-corporate-blue transition-colors duration-300"
              >
                <Globe className="h-4 w-4 mr-1" />
                {language.toUpperCase()}
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-corporate-navy rounded-lg mt-2 py-4">
            <Link href="/" className="block px-4 py-2 text-white hover:bg-corporate-blue transition-colors">
              {t('nav.home')}
            </Link>
            <Link href="/corporate" className="block px-4 py-2 text-white hover:bg-corporate-blue transition-colors">
              {t('nav.corporate')}
            </Link>
            <Link href="/projects/real-estate" className="block px-4 py-2 text-white hover:bg-corporate-blue transition-colors">
              {t('nav.projects.realestate')}
            </Link>
            <Link href="/projects/aviation" className="block px-4 py-2 text-white hover:bg-corporate-blue transition-colors">
              {t('nav.projects.aviation')}
            </Link>
            <Link href="/announcements" className="block px-4 py-2 text-white hover:bg-corporate-blue transition-colors">
              {t('nav.announcements')}
            </Link>
            <Link href="/contact" className="block px-4 py-2 text-white hover:bg-corporate-blue transition-colors">
              {t('nav.contact')}
            </Link>
            <button 
              onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              className="block w-full text-left px-4 py-2 text-white hover:bg-corporate-blue transition-colors"
            >
              <Globe className="inline h-4 w-4 mr-2" />
              {language === 'tr' ? 'English' : 'Türkçe'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}