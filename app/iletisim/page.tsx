'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin, Send, Clock, CheckCircle } from 'lucide-react';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      // Save to localStorage for demo purposes
      const contacts = JSON.parse(localStorage.getItem('havacilar_contacts') || '[]');
      const newContact = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString(),
        status: 'pending'
      };
      
      contacts.push(newContact);
      localStorage.setItem('havacilar_contacts', JSON.stringify(contacts));

      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section (like Corporate) */}
      <section className="relative z-0">
        <div className="relative h-[240px] sm:h-[300px] md:h-[380px] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: "url('/bg.jpg')" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-white mb-4 drop-shadow">
                  {t('contact.title')}
                </h1>
                <p className="text-white/90 text-base md:text-lg max-w-3xl mx-auto leading-relaxed drop-shadow">
                  Projelerimiz hakkında detaylı bilgi almak ve görüşmek için bizimle iletişime geçin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold font-montserrat text-corporate-navy mb-6">
                {t('contact.form.title')}
              </h2>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-600 mb-2">
                    {t('contact.form.success.title')}
                  </h3>
                  <p className="text-gray-600">
                    {t('contact.form.success.desc')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('contact.form.name')} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent outline-none transition-all duration-300"
                        placeholder={t('contact.form.name.placeholder')}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('contact.form.email')} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent outline-none transition-all duration-300"
                        placeholder={t('contact.form.email.placeholder')}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('contact.form.phone')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent outline-none transition-all duration-300"
                        placeholder={t('contact.form.phone.placeholder')}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('contact.form.subject')} *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent outline-none transition-all duration-300"
                      >
                        <option value="">{t('contact.form.subject.placeholder')}</option>
                        <option value="real-estate">{t('contact.subject.realestate')}</option>
                        <option value="aviation">{t('contact.subject.aviation')}</option>
                        <option value="investment">{t('contact.subject.investment')}</option>
                        <option value="partnership">{t('contact.subject.partnership')}</option>
                        <option value="other">{t('contact.subject.other')}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('contact.form.message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent outline-none transition-all duration-300 resize-vertical"
                      placeholder={t('contact.form.message.placeholder')}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-corporate-navy text-white py-3 px-6 rounded-lg font-semibold hover:bg-corporate-blue transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="spinner mr-2"></div>
                    ) : (
                      <Send className="h-5 w-5 mr-2" />
                    )}
                    {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-corporate-navy rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-bold font-montserrat mb-6">
                  {t('contact.info.title')}
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-corporate-blue p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('contact.phone')}</h3>
                      <a href={`tel:${'+90 242 000 00 00'.replace(/\s/g, '')}`} className="text-white/80 hover:text-white underline underline-offset-2">+90 242 000 00 00</a>
                      <br />
                      <a href={`tel:${'+90 535 000 00 00'.replace(/\s/g, '')}`} className="text-white/80 hover:text-white underline underline-offset-2">+90 535 000 00 00</a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-corporate-blue p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('contact.email')}</h3>
                      <a href="mailto:info@havacilar.com" className="text-white/80 hover:text-white underline underline-offset-2">info@havacilar.com</a>
                      <br />
                      <a href="mailto:yatirim@havacilar.com" className="text-white/80 hover:text-white underline underline-offset-2">yatirim@havacilar.com</a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-corporate-blue p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('contact.address')}</h3>
                      <p className="text-white/80">
                        Konyaaltı Mahallesi<br />
                        Atatürk Caddesi No: 123<br />
                        07070 Konyaaltı / Antalya
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-corporate-blue p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Çalışma Saatleri</h3>
                      <p className="text-white/80">
                        Pazartesi - Cuma: 09:00 - 18:00<br />
                        Cumartesi: 09:00 - 13:00<br />
                        Pazar: Kapalı
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold font-montserrat text-corporate-navy mb-6">
                  {t('contact.quicklinks.title')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a href="/projects/gayrimenkulyatirim" className="flex items-center text-corporate-blue hover:text-corporate-navy transition-colors">
                    <span className="w-2 h-2 bg-corporate-blue rounded-full mr-3"></span>
                    Gayrimenkul Projeleri
                  </a>
                  <a href="/projects/havacilikyatirim" className="flex items-center text-corporate-blue hover:text-corporate-navy transition-colors">
                    <span className="w-2 h-2 bg-corporate-blue rounded-full mr-3"></span>
                    Havacılık Projeleri
                  </a>
                  <a href="/duyurular" className="flex items-center text-corporate-blue hover:text-corporate-navy transition-colors">
                    <span className="w-2 h-2 bg-corporate-blue rounded-full mr-3"></span>
                    Güncel Duyurular
                  </a>
                  <a href="/kurumsal" className="flex items-center text-corporate-blue hover:text-corporate-navy transition-colors">
                    <span className="w-2 h-2 bg-corporate-blue rounded-full mr-3"></span>
                    Kurumsal Bilgiler
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-corporate-gray fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-montserrat text-corporate-navy text-center mb-12">
            Ofis Lokasyonumuz
          </h2>
          
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.2370983929394!2d30.6997378!3d36.8857721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39074d1a1b1f1%3A0xbd3618a7e3f7e4c5!2sKonyaalt%C4%B1%2C%20Antalya!5e0!3m2!1str!2str!4v1642681234567!5m2!1str!2str"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Havacılar Yatırım Ofis Lokasyonu"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}