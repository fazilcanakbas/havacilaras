'use client';
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Calendar, Tag } from 'lucide-react';
import sampleData from '@/data/sampleData.json';

interface Announcement {
  id: number;
  title: { tr: string; en: string };
  description: { tr: string; en: string };
  date: string;
  image: string;
  category: string;
}

export default function AnnouncementsManager() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(sampleData.announcements);
  const [filter, setFilter] = useState<'all' | 'aviation' | 'real-estate' | 'corporate'>('all');
  const [showForm, setShowForm] = useState(false);

  const filteredAnnouncements = filter === 'all' 
    ? announcements 
    : announcements.filter(announcement => announcement.category === filter);

  const handleDelete = (id: number) => {
    if (confirm('Bu duyuruyu silmek istediğinizden emin misiniz?')) {
      setAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryBadge = (category: string) => {
    const categoryConfig = {
      aviation: { text: 'Havacılık', color: 'bg-blue-100 text-blue-800' },
      'real-estate': { text: 'Gayrimenkul', color: 'bg-green-100 text-green-800' },
      corporate: { text: 'Kurumsal', color: 'bg-purple-100 text-purple-800' }
    };
    
    return categoryConfig[category as keyof typeof categoryConfig] || { text: 'Genel', color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-montserrat text-corporate-navy">
            Duyuru Yönetimi
          </h1>
          <p className="text-gray-600 mt-1">
            Website duyurularını yönetin ve düzenleyin
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-corporate-navy text-white px-6 py-2 rounded-lg font-semibold hover:bg-corporate-blue transition-colors duration-300 flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Yeni Duyuru
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Tag className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam Duyuru</p>
              <p className="text-2xl font-bold text-gray-900">{announcements.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Tag className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Gayrimenkul</p>
              <p className="text-2xl font-bold text-gray-900">
                {announcements.filter(a => a.category === 'real-estate').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Tag className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Havacılık</p>
              <p className="text-2xl font-bold text-gray-900">
                {announcements.filter(a => a.category === 'aviation').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Tag className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Kurumsal</p>
              <p className="text-2xl font-bold text-gray-900">
                {announcements.filter(a => a.category === 'corporate').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Filtrele:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-corporate-navy text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setFilter('aviation')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'aviation' 
                  ? 'bg-corporate-navy text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Havacılık
            </button>
            <button
              onClick={() => setFilter('real-estate')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'real-estate' 
                  ? 'bg-corporate-navy text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Gayrimenkul
            </button>
            <button
              onClick={() => setFilter('corporate')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'corporate' 
                  ? 'bg-corporate-navy text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Kurumsal
            </button>
          </div>
        </div>
      </div>

      {/* Announcements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnnouncements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden card-hover">
            <div className="relative">
              <img 
                src={announcement.image} 
                alt={announcement.title.tr}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadge(announcement.category)?.color}`}>
                  {getCategoryBadge(announcement.category)?.text}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(announcement.date)}
              </div>
              
              <h3 className="text-lg font-semibold text-corporate-navy mb-2 line-clamp-2">
                {announcement.title.tr}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {announcement.description.tr}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-corporate-blue hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(announcement.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <Tag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">Bu kategoride duyuru bulunmamaktadır.</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-corporate-navy text-white px-6 py-2 rounded-lg font-semibold hover:bg-corporate-blue transition-colors duration-300"
          >
            İlk Duyuruyu Ekle
          </button>
        </div>
      )}
    </div>
  );
}