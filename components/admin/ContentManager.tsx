'use client';
import React, { useState } from 'react';
import { Save, FileText, Globe, Edit } from 'lucide-react';
import sampleData from '@/data/sampleData.json';

type Language = 'tr' | 'en';

type CorporateContent = {
  mission: string;
  vision: string;
  values: string;
};

type HomeContent = {
  // Add fields for home section as needed
  placeholder?: string;
};

type ContentType = {
  corporate: Record<Language, CorporateContent>;
  home: Record<Language, HomeContent>;
};

export default function ContentManager() {
  const [activeSection, setActiveSection] = useState<'corporate' | 'home'>('corporate');
  const [activeLanguage, setActiveLanguage] = useState<Language>('tr');
  const [content, setContent] = useState<ContentType>(sampleData.content as ContentType);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate save operation
    setTimeout(() => {
      localStorage.setItem('havacilar_content', JSON.stringify(content));
      setIsSaving(false);
      setIsEditing(false);
      alert('İçerik başarıyla kaydedildi!');
    }, 1500);
  };

  const handleContentChange = (field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [activeSection]: {
        ...prev[activeSection],
        [activeLanguage]: {
          ...prev[activeSection][activeLanguage],
          [field]: value
        }
      }
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-montserrat text-corporate-navy">
            İçerik Yönetimi
          </h1>
          <p className="text-gray-600 mt-1">
            Website içeriklerini düzenleyin ve güncelleyin
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-300 flex items-center"
          >
            <Edit className="h-5 w-5 mr-2" />
            {isEditing ? 'Düzenlemeyi İptal Et' : 'Düzenle'}
          </button>
          {isEditing && (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-corporate-navy text-white px-6 py-2 rounded-lg font-semibold hover:bg-corporate-blue transition-colors duration-300 flex items-center disabled:opacity-50"
            >
              {isSaving ? (
                <div className="spinner mr-2"></div>
              ) : (
                <Save className="h-5 w-5 mr-2" />
              )}
              {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap items-center gap-6">
          
          {/* Section Selector */}
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Bölüm:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveSection('corporate')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === 'corporate' 
                    ? 'bg-corporate-navy text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Kurumsal
              </button>
              <button
                onClick={() => setActiveSection('home')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === 'home' 
                    ? 'bg-corporate-navy text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Anasayfa
              </button>
            </div>
          </div>

          <div className="h-6 w-px bg-gray-300"></div>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Dil:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveLanguage('tr')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeLanguage === 'tr' 
                    ? 'bg-corporate-navy text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Türkçe
              </button>
              <button
                onClick={() => setActiveLanguage('en')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeLanguage === 'en' 
                    ? 'bg-corporate-navy text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Editor */}
      {activeSection === 'corporate' && (
        <div className="space-y-6">
          
          {/* Mission */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold font-montserrat text-corporate-navy mb-4">
              Misyon ({activeLanguage.toUpperCase()})
            </h3>
            {isEditing ? (
              <textarea
                value={content.corporate[activeLanguage].mission}
                onChange={(e) => handleContentChange('mission', e.target.value)}
                rows={4}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent outline-none"
                placeholder="Misyon metnini girin..."
              />
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  {content.corporate[activeLanguage].mission}
                </p>
              </div>
            )}
          </div>

          {/* Vision */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold font-montserrat text-corporate-navy mb-4">
              Vizyon ({activeLanguage.toUpperCase()})
            </h3>
            {isEditing ? (
              <textarea
                value={content.corporate[activeLanguage].vision}
                onChange={(e) => handleContentChange('vision', e.target.value)}
                rows={4}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent outline-none"
                placeholder="Vizyon metnini girin..."
              />
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  {content.corporate[activeLanguage].vision}
                </p>
              </div>
            )}
          </div>

          {/* Values */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold font-montserrat text-corporate-navy mb-4">
              Değerler ({activeLanguage.toUpperCase()})
            </h3>
            {isEditing ? (
              <textarea
                value={content.corporate[activeLanguage].values}
                onChange={(e) => handleContentChange('values', e.target.value)}
                rows={6}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent outline-none"
                placeholder="Değerlerinizi listeleyin (her satıra bir değer)..."
              />
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-700 leading-relaxed">
                  {content.corporate[activeLanguage].values.split(', ').map((value, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <span className="w-2 h-2 bg-corporate-blue rounded-full mr-3"></span>
                      {value}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeSection === 'home' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold font-montserrat text-corporate-navy mb-4">
            Anasayfa İçerikleri ({activeLanguage.toUpperCase()})
          </h3>
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              Anasayfa içerik yönetimi yakında eklenecek.
            </p>
          </div>
        </div>
      )}

      {/* SEO Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold font-montserrat text-corporate-navy mb-4">
          SEO Ayarları
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sayfa Başlığı ({activeLanguage.toUpperCase()})
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent outline-none"
              placeholder="SEO sayfa başlığı"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Meta Açıklama ({activeLanguage.toUpperCase()})
            </label>
            <textarea
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent outline-none resize-none"
              placeholder="SEO meta açıklama"
              disabled={!isEditing}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Anahtar Kelimeler ({activeLanguage.toUpperCase()})
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent outline-none"
              placeholder="anahtar, kelimeler, virgülle, ayırın"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              OG Başlık ({activeLanguage.toUpperCase()})
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent outline-none"
              placeholder="Sosyal medya paylaşım başlığı"
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>

      {/* Publishing Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <FileText className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
          <div>
            <h4 className="font-semibold text-blue-800 mb-1">Yayınlama Bilgisi</h4>
            <p className="text-sm text-blue-700">
              İçerik değişiklikleri kaydedildikten sonra anında website'de görünür hale gelir. 
              Değişiklikleri kaydetmeden önce kontrol etmeyi unutmayın.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}