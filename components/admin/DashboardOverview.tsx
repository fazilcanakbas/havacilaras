'use client';
import React, { useEffect, useState } from 'react';
import { 
  Building2, 
  Megaphone, 
  MessageSquare, 
  TrendingUp,
  Users,
  Eye,
  Calendar
} from 'lucide-react';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalProjects: 12,
    totalAnnouncements: 6,
    pendingContacts: 3,
    monthlyViews: 2840
  });

  const recentActivity = [
    { id: 1, type: 'contact', message: 'Yeni iletişim formu: Ahmet Yılmaz', time: '2 saat önce' },
    { id: 2, type: 'project', message: 'Skyline Apartments projesi güncellendi', time: '4 saat önce' },
    { id: 3, type: 'announcement', message: 'Yeni duyuru yayınlandı', time: '1 gün önce' },
    { id: 4, type: 'contact', message: 'İletişim formu yanıtlandı', time: '2 gün önce' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-montserrat text-corporate-navy">
            Kontrol Paneli
          </h1>
          <p className="text-gray-600 mt-1">
            Sistemin genel durumu ve son aktiviteler
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Son güncelleme</div>
          <div className="text-sm font-semibold text-corporate-navy">
            {new Date().toLocaleDateString('tr-TR', { 
              day: 'numeric', 
              month: 'long', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam Proje</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Megaphone className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Duyuru</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalAnnouncements}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <MessageSquare className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Bekleyen İletişim</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingContacts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Eye className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Aylık Görüntüleme</p>
              <p className="text-2xl font-bold text-gray-900">{stats.monthlyViews}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold font-montserrat text-corporate-navy mb-4">
            Son Aktiviteler
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`p-2 rounded-full ${
                  activity.type === 'contact' ? 'bg-blue-100' :
                  activity.type === 'project' ? 'bg-green-100' :
                  'bg-yellow-100'
                }`}>
                  {activity.type === 'contact' ? (
                    <MessageSquare className={`h-4 w-4 ${
                      activity.type === 'contact' ? 'text-blue-600' : ''
                    }`} />
                  ) : activity.type === 'project' ? (
                    <Building2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <Megaphone className="h-4 w-4 text-yellow-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold font-montserrat text-corporate-navy mb-4">
            Hızlı İşlemler
          </h3>
          <div className="grid grid-cols-2 gap-4">
            
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-corporate-blue hover:bg-blue-50 transition-all duration-300 text-center group">
              <Building2 className="h-8 w-8 text-gray-400 group-hover:text-corporate-blue mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-corporate-blue">
                Yeni Proje
              </span>
            </button>

            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-corporate-blue hover:bg-blue-50 transition-all duration-300 text-center group">
              <Megaphone className="h-8 w-8 text-gray-400 group-hover:text-corporate-blue mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-corporate-blue">
                Yeni Duyuru
              </span>
            </button>

            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-corporate-blue hover:bg-blue-50 transition-all duration-300 text-center group">
              <MessageSquare className="h-8 w-8 text-gray-400 group-hover:text-corporate-blue mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-corporate-blue">
                İletişimleri Görüntüle
              </span>
            </button>

            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-corporate-blue hover:bg-blue-50 transition-all duration-300 text-center group">
              <Calendar className="h-8 w-8 text-gray-400 group-hover:text-corporate-blue mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-corporate-blue">
                İçerik Düzenle
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Website Analytics Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold font-montserrat text-corporate-navy mb-4">
          Website Analitikleri
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          
          <div>
            <div className="text-2xl font-bold text-corporate-navy">2,840</div>
            <div className="text-sm text-gray-600">Bu Ay Ziyaretçi</div>
            <div className="flex items-center justify-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">+12%</span>
            </div>
          </div>

          <div>
            <div className="text-2xl font-bold text-corporate-navy">1,240</div>
            <div className="text-sm text-gray-600">Proje Görüntüleme</div>
            <div className="flex items-center justify-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">+8%</span>
            </div>
          </div>

          <div>
            <div className="text-2xl font-bold text-corporate-navy">156</div>
            <div className="text-sm text-gray-600">İletişim Formu</div>
            <div className="flex items-center justify-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">+23%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}