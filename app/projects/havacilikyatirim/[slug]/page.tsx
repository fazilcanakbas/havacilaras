"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useParams } from 'next/navigation';
import { getProject } from '@/app/services/projects.service';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AviationProjectDetail() {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const [project, setProject] = useState<any | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const p = await getProject(String(slug));
        if (mounted) setProject(p);
      } catch {
        if (mounted) setNotFound(true);
      }
    })();
    return () => { mounted = false; };
  }, [slug]);

  if (notFound) return <div className="min-h-screen flex items-center justify-center">Proje bulunamadı</div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center">Yükleniyor…</div>;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="relative z-0">
        <div className="relative h-[220px] sm:h-[300px] md:h-[360px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url('${project.coverImage || '/bg.jpg'}')` }} aria-hidden="true" />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <h1 className="text-3xl md:text-5xl font-bold font-montserrat text-white drop-shadow">
                {project.title?.tr || project.title?.en || project.slug}
              </h1>
              <p className="text-white/90 mt-3 max-w-2xl">
                {language === 'en' ? (project.description?.en || '') : (project.description?.tr || '')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow border p-6">
            <h2 className="text-xl font-semibold mb-3">{t('project.overview')}</h2>
            <p className="text-gray-700">
              {language === 'en' ? (project.description?.en || '') : (project.description?.tr || '')}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow border p-6">
            <h3 className="text-lg font-semibold mb-3">{t('project.contact.title')}</h3>
            <a href="/contact" className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-corporate-navy text-white hover:bg-corporate-blue">
              {t('projects.cta.contact')}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
