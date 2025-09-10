'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import blogData from '@/data/blogData.json';
import { Calendar } from 'lucide-react';

export default function BlogPage() {
  const { language, t } = useLanguage();
  const posts = blogData.posts;

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero like Corporate */}
      <section className="relative z-0">
        <div className="relative h-[240px] sm:h-[300px] md:h-[380px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: "url('/bg.jpg')" }} />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-white mb-4 drop-shadow">Blog</h1>
                <p className="text-white/90 text-base md:text-lg max-w-3xl mx-auto leading-relaxed drop-shadow">
                  {t('blog.hero.subtitle')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
                <a href={`/blog/${post.slug}`} className="block group">
                  <img src={post.image} alt={post.title[language as 'tr' | 'en']} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3"><Calendar className="h-4 w-4 mr-2" />{formatDate(post.date)}</div>
                    <h3 className="text-xl font-bold font-montserrat text-corporate-navy mb-3 line-clamp-2">{post.title[language as 'tr' | 'en']}</h3>
                    <p className="text-corporate-text mb-4 line-clamp-3">{post.excerpt[language as 'tr' | 'en']}</p>
                    <span className="text-corporate-blue group-hover:text-corporate-navy font-semibold">{t('blog.readmore')}</span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
