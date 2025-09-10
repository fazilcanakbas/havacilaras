"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAuth } from '@/contexts/AuthContext';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

type LangText = { tr: string; en: string };

export default function NewProjectPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { logout } = useAuth();
  const token = useMemo(() => (typeof window !== 'undefined' ? (localStorage.getItem('admin_token') || 'demo-admin-token') : ''), []);

  const [tab, setTab] = useState<'tr' | 'en'>('tr');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<'real-estate' | 'aviation'>('real-estate');
  const [saleStatus, setSaleStatus] = useState<'ongoing' | 'completed'>('ongoing');
  const [active, setActive] = useState(true);
  const [title, setTitle] = useState<LangText>({ tr: '', en: '' });
  const [description, setDescription] = useState<LangText>({ tr: '', en: '' });
  const [highlightedText, setHighlightedText] = useState<LangText>({ tr: '', en: '' });
  const [slogan, setSlogan] = useState<LangText>({ tr: '', en: '' });
  const [overviewDesc, setOverviewDesc] = useState<LangText>({ tr: '', en: '' });
  const [badges, setBadges] = useState<string[]>(['', '', '', '']);
  const [badgesEn, setBadgesEn] = useState<string[]>(['', '', '', '']);
  const [quickStats, setQuickStats] = useState<Array<{ label: string; value: string }>>([
    { label: 'Toplam Ünite', value: '' },
    { label: 'Teslim', value: '' },
    { label: 'Başlangıç Fiyat', value: '' },
    { label: 'Amortisman', value: '' },
  ]);
  const [quickStatsEn, setQuickStatsEn] = useState<Array<{ label: string; value: string }>>([
    { label: 'Total Units', value: '' },
    { label: 'Delivery', value: '' },
    { label: 'Starting Price', value: '' },
    { label: 'Payback Period', value: '' },
  ]);
  const [financialInfo, setFinancialInfo] = useState('');
  const [financialInfoEn, setFinancialInfoEn] = useState('');
  const [advantages, setAdvantages] = useState<string[]>(['', '', '', '']);
  const [advantagesEn, setAdvantagesEn] = useState<string[]>(['', '', '', '']);
  const [youtube, setYoutube] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  // Files
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageWithLogo, setCoverImageWithLogo] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]); // up to 6
  const [experiences, setExperiences] = useState<Array<{ title: LangText; subtitle: LangText; image?: File | null }>>([
    { title: { tr: '', en: '' }, subtitle: { tr: '', en: '' }, image: null },
    { title: { tr: '', en: '' }, subtitle: { tr: '', en: '' }, image: null },
    { title: { tr: '', en: '' }, subtitle: { tr: '', en: '' }, image: null },
    { title: { tr: '', en: '' }, subtitle: { tr: '', en: '' }, image: null },
  ]);

  const [models, setModels] = useState<Array<{
    title: LangText; size: LangText; desc: LangText; price: string; images: File[];
  }>>([]);

  const addModel = () => setModels((m) => [...m, { title: { tr: '', en: '' }, size: { tr: '', en: '' }, desc: { tr: '', en: '' }, price: '', images: [] }]);
  // Auto-generate slug from TR title and mirror EN fields from TR when English tab is locked
  useEffect(() => {
    if (!slug && title.tr) {
      const s = title.tr
        .toLowerCase()
        .replace(/[^a-z0-9ğüşöçı\s-]/gi, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      setSlug(s);
    }
  }, [title.tr]);

  useEffect(() => {
    // Mirror EN fields automatically from TR; English tab will be read-only
    setTitle((prev) => ({ ...prev, en: prev.tr }));
    setDescription((prev) => ({ ...prev, en: prev.tr }));
    setHighlightedText((prev) => ({ ...prev, en: prev.tr }));
    setSlogan((prev) => ({ ...prev, en: prev.tr }));
    setOverviewDesc((prev) => ({ ...prev, en: prev.tr }));
    setQuickStatsEn([
      { label: 'Total Units', value: quickStats[0]?.value || '' },
      { label: 'Delivery', value: quickStats[1]?.value || '' },
      { label: 'Starting Price', value: quickStats[2]?.value || '' },
      { label: 'Payback Period', value: quickStats[3]?.value || '' },
    ]);
    setBadgesEn([...badges]);
    setFinancialInfoEn(financialInfo);
    setAdvantagesEn([...advantages]);
  }, [title.tr, description.tr, highlightedText.tr, slogan.tr, overviewDesc.tr, quickStats, badges, financialInfo, advantages]);
  const updateModel = (i: number, part: Partial<{ title: LangText; size: LangText; desc: LangText; price: string; images: File[] }>) => {
    setModels((arr) => arr.map((it, idx) => (idx === i ? { ...it, ...part } : it)));
  };
  const removeModel = (i: number) => setModels((arr) => arr.filter((_, idx) => idx !== i));
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('projects');

  // Helpers to mirror EN for experiences/models and disable EN editing
  const updateExperienceTr = (idx: number, field: 'title'|'subtitle', value: string) => {
    setExperiences((arr) => arr.map((it, i) => i===idx ? { ...it, [field]: { tr: value, en: value } } : it));
  };
  const updateModelTr = (i: number, part: Partial<{ title: LangText; size: LangText; desc: LangText }>) => {
    setModels((arr) => arr.map((it, idx) => {
      if (idx !== i) return it;
      const next = { ...it };
      if (part.title?.tr !== undefined) next.title = { tr: part.title.tr, en: part.title.tr } as LangText;
      if (part.size?.tr !== undefined) next.size = { tr: part.size.tr, en: part.size.tr } as LangText;
      if (part.desc?.tr !== undefined) next.desc = { tr: part.desc.tr, en: part.desc.tr } as LangText;
      return next;
    }));
  };

  async function handleSubmit() {
    if (!slug) return toast({ title: 'Slug gerekli', variant: 'destructive' });
    if (!logoImage) return toast({ title: 'Proje logosu gerekli', variant: 'destructive' });
    if (!coverImage) return toast({ title: 'Kapak (düz) gerekli', variant: 'destructive' });
    if (!coverImageWithLogo) return toast({ title: 'Kapak (logolu) gerekli', variant: 'destructive' });
    if (gallery.length !== 6) return toast({ title: 'Galeri için 6 görsel seçin', variant: 'destructive' });
    if (experiences.length !== 4 || experiences.some(e => !e.title.tr || !e.subtitle.tr || !e.image)) {
      return toast({ title: '4 deneyim başlık, açıklama ve görselle doldurulmalı', variant: 'destructive' });
    }
    if (models.some(m => m.images.length === 0 || m.images.length > 3)) {
      return toast({ title: 'Her model için 1-3 görsel seçin', variant: 'destructive' });
    }
    try {
      // 1) Create project document
      const basePayload = {
        slug, category, saleStatus, active,
        title, description,
        highlightedText, slogan,
  overview: { 
          description: overviewDesc,
          badges,
          badgesEn,
          quickStats,
          quickStatsEn,
        },
        financial: { info: financialInfo, infoEn: financialInfoEn },
        video: { url: youtube },
  advantages,
  advantagesEn,
        location, date,
      };
      const res = await fetch(`${API_BASE}/api/projects`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(basePayload),
      });
      if (!res.ok) throw new Error('Create failed');

      // 2) Upload media (multi)
      const form = new FormData();
      if (heroImage) form.append('heroImage', heroImage);
      if (logoImage) form.append('logoImage', logoImage);
      if (coverImage) form.append('coverImage', coverImage);
      if (coverImageWithLogo) form.append('coverImageWithLogo', coverImageWithLogo);
      gallery.forEach((f) => form.append('gallery', f));
  // models/experience images will be uploaded individually to keep mapping

  const uploadRes = await fetch(`${API_BASE}/api/projects/${slug}/upload-many`, {
        method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form,
      });
      const uploadJson = uploadRes.ok ? await uploadRes.json() : {};

      // 3) Update project with media URLs
      const patch: any = {};
      if (uploadJson.heroImage?.[0]) patch.heroImage = uploadJson.heroImage[0];
      if (uploadJson.logoImage?.[0]) patch.logoImage = uploadJson.logoImage[0];
      if (uploadJson.coverImage?.[0]) patch.coverImage = uploadJson.coverImage[0];
      if (uploadJson.coverImageWithLogo?.[0]) patch.coverImageWithLogo = uploadJson.coverImageWithLogo[0];
  if (uploadJson.gallery) patch.gallery = uploadJson.gallery;
      // experiences and models will need structured mapping; for now, just update arrays with images only when provided
      // Upload experience images individually and map structured experiences
      const expWithUrls = [] as Array<{ title: LangText; subtitle: LangText; image: string }>;
      for (const exp of experiences) {
        let url = '';
        if (exp.image) {
          const f = new FormData();
          f.append('file', exp.image);
          const r = await fetch(`${API_BASE}/api/projects/${slug}/upload`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: f });
          if (r.ok) { const j = await r.json(); url = j.url; }
        }
        expWithUrls.push({ title: exp.title, subtitle: exp.subtitle, image: url });
      }

      // Upload model images individually and build structured models
      const modelsStructured = [] as Array<{ title: LangText; size: LangText; desc: LangText; price: string; images: Array<{ url: string }> }>;
      for (const m of models) {
        const urls: string[] = [];
        for (const file of m.images) {
          const ff = new FormData(); ff.append('file', file);
          const rr = await fetch(`${API_BASE}/api/projects/${slug}/upload`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: ff });
          if (rr.ok) { const j = await rr.json(); urls.push(j.url); }
        }
        modelsStructured.push({ title: m.title, size: m.size, desc: m.desc, price: m.price, images: urls.map((u) => ({ url: u })) });
      }

      if (expWithUrls.length) patch.experiences = expWithUrls;
      if (modelsStructured.length) patch.models = modelsStructured;

      if (Object.keys(patch).length) {
        await fetch(`${API_BASE}/api/projects/${slug}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(patch)
        });
      }

  toast({ title: 'Proje oluşturuldu' });
      router.push('/admin');
    } catch (e: any) {
      toast({ title: e.message || 'Hata', variant: 'destructive' });
    }
  }

  return (
    <div className="min-h-screen bg-corporate-gray flex">
      <AdminSidebar 
        activeView={activeView}
        setActiveView={(v) => { setActiveView(v); router.push('/admin'); }}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <AdminHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} onLogout={logout} />
        <main className="p-6">
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Yeni Proje</h1>
        <div className="flex items-center gap-3">
          <span>Aktif</span>
          <Switch checked={active} onCheckedChange={setActive} />
        </div>
      </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white rounded-xl shadow border p-4">
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="unique-project-slug" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Kategori</label>
          <select className="w-full h-10 border rounded-md px-3" value={category} onChange={(e) => setCategory(e.target.value as any)}>
            <option value="real-estate">Gayrimenkul</option>
            <option value="aviation">Havacılık</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Satış Durumu</label>
          <select className="w-full h-10 border rounded-md px-3" value={saleStatus} onChange={(e) => setSaleStatus(e.target.value as any)}>
            <option value="ongoing">Satışı Devam Eden</option>
            <option value="completed">Satışı Tamamlanan</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-xl shadow border p-4">
        <div>
          <label className="block text-sm font-medium mb-1">Lokasyon</label>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tarih</label>
          <Input value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>

      {/* Language Tabs (English tab mirrors TR and is read-only for text fields) */}
      <div className="bg-white rounded-xl shadow border">
        <div className="flex border-b">
          <button className={`px-4 py-2 ${tab==='tr' ? 'border-b-2 border-corporate-navy font-semibold' : ''}`} onClick={() => setTab('tr')}>Türkçe</button>
          <button className={`px-4 py-2 ${tab==='en' ? 'border-b-2 border-corporate-navy font-semibold' : ''}`} onClick={() => setTab('en')}>English</button>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Başlık ({tab.toUpperCase()})</label>
            <Input value={title[tab]} onChange={(e) => setTitle({ ...title, [tab]: e.target.value })} disabled={tab==='en'} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Açıklama ({tab.toUpperCase()})</label>
            <Input value={description[tab]} onChange={(e) => setDescription({ ...description, [tab]: e.target.value })} disabled={tab==='en'} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Renkli Başlık (Highlighted) ({tab.toUpperCase()})</label>
            <Input value={highlightedText[tab]} onChange={(e) => setHighlightedText({ ...highlightedText, [tab]: e.target.value })} disabled={tab==='en'} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slogan ({tab.toUpperCase()})</label>
            <Input value={slogan[tab]} onChange={(e) => setSlogan({ ...slogan, [tab]: e.target.value })} disabled={tab==='en'} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Genel Tanım ({tab.toUpperCase()})</label>
            <Input value={overviewDesc[tab]} onChange={(e) => setOverviewDesc({ ...overviewDesc, [tab]: e.target.value })} disabled={tab==='en'} />
          </div>
          {/* Overview badges */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Proje Avantajları (4 madde - TR)</label>
              {badges.map((b, i) => (
                <Input key={i} className="mt-2" value={b} onChange={(e) => setBadges((arr) => arr.map((it, idx) => idx===i ? e.target.value : it))} />
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Advantages (4 items - EN, otomatik)</label>
              {badgesEn.map((b, i) => (
                <Input key={i} className="mt-2" value={b} disabled />
              ))}
            </div>
          </div>
          {/* Quick Stats */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Hızlı İstatistikler (TR)</label>
              {quickStats.map((q, i) => (
                <div key={i} className="grid grid-cols-2 gap-2 mt-2">
                  <Input value={q.label} onChange={(e) => setQuickStats((arr) => arr.map((it, idx) => idx===i ? { ...it, label: e.target.value } : it))} />
                  <Input placeholder="Değer" value={q.value} onChange={(e) => setQuickStats((arr) => arr.map((it, idx) => idx===i ? { ...it, value: e.target.value } : it))} />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Quick Stats (EN, otomatik)</label>
              {quickStatsEn.map((q, i) => (
                <div key={i} className="grid grid-cols-2 gap-2 mt-2">
                  <Input value={q.label} disabled />
                  <Input value={q.value} disabled />
                </div>
              ))}
            </div>
          </div>
          {/* Financial */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Finansal Açıklama (TR)</label>
              <Input value={financialInfo} onChange={(e) => setFinancialInfo(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Financial Info (EN, otomatik)</label>
              <Input value={financialInfoEn} disabled />
            </div>
          </div>
          {/* Advantages separate (optional duplication with overview.badges if needed visually) */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Avantajlar (4 madde - TR)</label>
              {advantages.map((b, i) => (
                <Input key={i} className="mt-2" value={b} onChange={(e) => setAdvantages((arr) => arr.map((it, idx) => idx===i ? e.target.value : it))} />
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Advantages (4 items - EN, otomatik)</label>
              {advantagesEn.map((b, i) => (
                <Input key={i} className="mt-2" value={b} disabled />
              ))}
            </div>
          </div>
          {/* Video */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">YouTube Video Linki</label>
            <Input value={youtube} onChange={(e) => setYoutube(e.target.value)} placeholder="https://www.youtube.com/embed/..." />
          </div>
        </div>
      </div>

      {/* Media Uploads with previews */}
      <div className="bg-white rounded-xl shadow border p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Hero Arka Plan (1)</label>
          <Input type="file" accept="image/*" onChange={(e) => setHeroImage(e.target.files?.[0] || null)} />
          {heroImage && <img src={URL.createObjectURL(heroImage)} alt="hero" className="mt-2 h-28 w-full object-cover rounded" />}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Proje Logosu (1)</label>
          <Input type="file" accept="image/*" onChange={(e) => setLogoImage(e.target.files?.[0] || null)} />
          {logoImage && <img src={URL.createObjectURL(logoImage)} alt="logo" className="mt-2 h-28 object-contain rounded bg-gray-50" />}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Kapak Fotoğrafı (Düz)</label>
          <Input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files?.[0] || null)} />
          {coverImage && <img src={URL.createObjectURL(coverImage)} alt="cover" className="mt-2 h-28 w-full object-cover rounded" />}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Kapak Fotoğrafı (Logolu)</label>
          <Input type="file" accept="image/*" onChange={(e) => setCoverImageWithLogo(e.target.files?.[0] || null)} />
          {coverImageWithLogo && <img src={URL.createObjectURL(coverImageWithLogo)} alt="coverLogo" className="mt-2 h-28 w-full object-cover rounded" />}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Galeri (6 görüntüye kadar)</label>
          <Input type="file" accept="image/*" multiple onChange={(e) => setGallery(Array.from(e.target.files || []))} />
          {gallery.length>0 && (
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
              {gallery.map((g, i) => (
                <img key={i} src={URL.createObjectURL(g)} className="h-28 w-full object-cover rounded" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Experiences */}
      <div className="bg-white rounded-xl shadow border p-4 space-y-4">
        <h2 className="text-lg font-semibold">Deneyimler (4 adet)</h2>
        {experiences.map((ex, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3 border rounded-md p-4">
            <div>
              <label className="block text-sm font-medium mb-1">Başlık (TR)</label>
              <Input value={ex.title.tr} onChange={(e) => updateExperienceTr(idx, 'title', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title (EN)</label>
              <Input value={ex.title.en} disabled />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Alt Başlık (TR)</label>
              <Input value={ex.subtitle.tr} onChange={(e) => updateExperienceTr(idx, 'subtitle', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subtitle (EN)</label>
              <Input value={ex.subtitle.en} disabled />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Görsel</label>
              <Input type="file" accept="image/*" onChange={(e) => setExperiences((arr) => arr.map((it, i) => i===idx ? { ...it, image: e.target.files?.[0] || null } : it))} />
              {ex.image && <img src={URL.createObjectURL(ex.image)} className="mt-2 h-28 w-full object-cover rounded" />}
            </div>
          </div>
        ))}
      </div>

      {/* Models */}
      <div className="bg-white rounded-xl shadow border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Konut Modelleri</h2>
          <Button variant="outline" onClick={addModel}>Model Ekle</Button>
        </div>
        {models.map((m, i) => (
          <div key={i} className="border rounded-md p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Başlık (TR)</label>
              <Input value={m.title.tr} onChange={(e) => updateModelTr(i, { title: { tr: e.target.value, en: e.target.value } })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title (EN)</label>
              <Input value={m.title.en} disabled />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Boyut (TR)</label>
              <Input value={m.size.tr} onChange={(e) => updateModelTr(i, { size: { tr: e.target.value, en: e.target.value } })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Size (EN)</label>
              <Input value={m.size.en} disabled />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Açıklama (TR)</label>
              <Input value={m.desc.tr} onChange={(e) => updateModelTr(i, { desc: { tr: e.target.value, en: e.target.value } })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description (EN)</label>
              <Input value={m.desc.en} disabled />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fiyat</label>
              <Input value={m.price} onChange={(e) => updateModel(i, { price: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Model Görselleri (1-3)</label>
              <Input type="file" multiple accept="image/*" onChange={(e) => updateModel(i, { images: Array.from(e.target.files || []) })} />
              {m.images.length>0 && (
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {m.images.map((img, idx) => (
                    <img key={idx} src={URL.createObjectURL(img)} className="h-24 w-full object-cover rounded" />
                  ))}
                </div>
              )}
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button variant="ghost" onClick={() => removeModel(i)}>Kaldır</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={() => router.push('/admin')}>İptal</Button>
        <Button onClick={handleSubmit}>Kaydet</Button>
      </div>
    </div>
        </main>
      </div>
    </div>
  );
}
