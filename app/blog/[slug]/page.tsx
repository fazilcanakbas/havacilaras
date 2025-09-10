'use client';
import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import blogData from '@/data/blogData.json';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, ArrowLeft } from 'lucide-react';

export default function BlogDetail() {
  const params = useParams();
  const { language, t } = useLanguage();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug as string);

  const post = blogData.posts.find((p) => p.slug === slug);
  if (!post) return notFound();

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative z-0">
        <div className="relative h-[220px] sm:h-[280px] md:h-[340px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: "url('/bg.jpg')" }} />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold font-montserrat text-white mb-3 drop-shadow">{post.title[language as 'tr' | 'en']}</h1>
                <div className="flex items-center justify-center gap-3 text-white/90">
                  <span className="flex items-center text-sm"><Calendar className="h-4 w-4 mr-2" />{formatDate(post.date)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="/blog" className="inline-flex items-center text-corporate-blue hover:text-corporate-navy font-semibold mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> {t('blog.back')}
          </a>
          <article className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <img src={post.image} alt={post.title[language as 'tr' | 'en']} className="w-full h-80 object-cover" />
            <div className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-corporate-navy mb-4">{post.title[language as 'tr' | 'en']}</h2>
              <p className="text-corporate-text text-lg mb-6">{post.excerpt[language as 'tr' | 'en']}</p>
              <div className="prose max-w-none">
                {post.content[language as 'tr' | 'en'].map((p, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-4">{p}</p>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
