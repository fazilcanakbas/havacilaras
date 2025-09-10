'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Header />
      <section className="py-24 text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-montserrat text-corporate-navy mb-3">Duyuru Bulunamadı</h1>
        <p className="text-corporate-text mb-6">Aradığınız duyuru kaldırılmış ya da bağlantı hatalı olabilir.</p>
        <a href="/duyurular" className="text-white bg-corporate-navy px-6 py-3 rounded-lg font-semibold">Duyurulara Dön</a>
      </section>
      <Footer />
    </div>
  );
}
