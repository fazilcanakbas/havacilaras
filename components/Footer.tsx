'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin as LinkedIn, Instagram, Clock, Youtube } from 'lucide-react';
import { getContactInfo, getSocialLinks, getWorkingHours, type WorkingHours } from '@/app/services/settings.service';

export default function Footer() {
  const { t } = useLanguage();

  const [contact, setContact] = useState<{ phone: string; email: string; address?: string }>({ phone: '', email: '', address: '' });
  const [social, setSocial] = useState<{ facebook: string; twitter: string; instagram: string; youtube: string; linkedin: string }>({ facebook: '', twitter: '', instagram: '', youtube: '', linkedin: '' });
  const [hours, setHours] = useState<WorkingHours>({
    weekday: { start: '09:00', end: '18:00' },
    saturday: { start: '10:00', end: '14:00' },
    sunday: { isOpen: false, start: '00:00', end: '00:00' },
  });

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';
    Promise.all([getContactInfo(token), getSocialLinks(token), getWorkingHours(token)])
      .then(([c, s, h]) => {
        setContact(c);
        setSocial(s);
        setHours(h);
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-corporate-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 items-start">
          {/* Company Info */}
          <div className="space-y-6 flex flex-col items-center text-center">
            <img src="/havacilarlogo.png" alt="Havacılar Logo" className="h-12 mb-2 filter brightness-0 invert" />
            <p className="text-gray-300 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex items-center justify-center space-x-4">
              <a href={social.facebook || '#'} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-corporate-blue transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              {/* <a href={social.twitter || '#'} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-corporate-blue transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a> */}
              <a href={social.linkedin || '#'} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-corporate-blue transition-colors" aria-label="LinkedIn">
                <LinkedIn className="h-5 w-5" />
              </a>
              <a href={social.instagram || '#'} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-corporate-blue transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={social.youtube || '#'} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-corporate-blue transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold mb-6 font-montserrat">{t('footer.quicklinks')}</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-300 hover:text-corporate-blue transition-colors">{t('nav.home')}</Link></li>
              <li><Link href="/kurumsal" className="text-gray-300 hover:text-corporate-blue transition-colors">{t('nav.corporate')}</Link></li>
              <li><Link href="/projects/gayrimenkulyatirim" className="text-gray-300 hover:text-corporate-blue transition-colors">{t('nav.projects.realestate')}</Link></li>
              <li><Link href="/projects/havacilikyatirim" className="text-gray-300 hover:text-corporate-blue transition-colors">{t('nav.projects.aviation')}</Link></li>
              <li><Link href="/duyurular" className="text-gray-300 hover:text-corporate-blue transition-colors">{t('nav.announcements')}</Link></li>
              <li><Link href="/iletisim" className="text-gray-300 hover:text-corporate-blue transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Working Hours moved before Contact */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold mb-6 font-montserrat">{t('footer.hours.title')}</h3>
            <div className="space-y-2 text-gray-300/90">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5 text-corporate-blue" />
                <span><span className="font-semibold">{t('footer.hours.weekday')}:</span> {hours.weekday.start} - {hours.weekday.end}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5 text-corporate-blue" />
                <span><span className="font-semibold">{t('footer.hours.saturday')}:</span> {hours.saturday.start} - {hours.saturday.end}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5 text-corporate-blue" />
                <span><span className="font-semibold">{t('footer.hours.sunday')}:</span> {hours.sunday.isOpen ? `${hours.sunday.start} - ${hours.sunday.end}` : t('footer.hours.closed')}</span>
              </div>
            </div>
          </div>

          {/* Contact moved after Working Hours */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold mb-6 font-montserrat">{t('contact.title')}</h3>
            <div className="space-y-3">
              {contact.phone && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-corporate-blue" />
                  <a
                    href={`tel:${(contact.phone || '').replace(/\s/g, '')}`}
                    className="text-gray-300 hover:text-corporate-blue transition-colors"
                    aria-label="Call us"
                  >
                    {contact.phone}
                  </a>
                </div>
              )}
              {contact.email && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-corporate-blue" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-gray-300 hover:text-corporate-blue transition-colors"
                    aria-label="Email us"
                  >
                    {contact.email}
                  </a>
                </div>
              )}
              {contact.address && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-corporate-blue" />
                  <span className="text-gray-300">{contact.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <a
            href="https://www.bloomomedya.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block group"
          >
            <p className="footer-copy text-gray-400 text-sm">
              {t('footer.copyright')}
            </p>
          </a>
          <style jsx>{`
            .footer-copy {
              transition: transform 0.6s ease, color 0.3s ease, background-position 1.6s ease;
            }
            .group:hover .footer-copy {
              color: transparent;
              background-image: linear-gradient(90deg, #2563eb, #06b6d4, #0b2440);
              -webkit-background-clip: text;
              background-clip: text;
              background-size: 200% 100%;
              animation: gradient-sweep 1.8s ease forwards, slide-subtle 0.6s ease forwards;
            }
            @keyframes gradient-sweep {
              0% { background-position: 0% 50%; }
              100% { background-position: 100% 50%; }
            }
            @keyframes slide-subtle {
              0% { transform: translateX(0); }
              100% { transform: translateX(6px); }
            }
          `}</style>
        </div>
      </div>
    </footer>
  );
}