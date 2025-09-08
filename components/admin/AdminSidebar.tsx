'use client';
import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Megaphone, 
  MessageSquare, 
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface AdminSidebarProps {
  activeView: string;
  setActiveView: (view: any) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Kontrol Paneli', icon: LayoutDashboard },
  { id: 'projects', label: 'Projeler', icon: Building2 },
  { id: 'announcements', label: 'Duyurular', icon: Megaphone },
  { id: 'contacts', label: 'İletişim', icon: MessageSquare },
  { id: 'content', label: 'İçerik', icon: FileText },
];

export default function AdminSidebar({ activeView, setActiveView, isOpen, setIsOpen }: AdminSidebarProps) {
  return (
    <div className={`fixed left-0 top-0 h-full bg-corporate-navy text-white transition-all duration-300 z-40 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          {isOpen && (
            <h1 className="text-lg font-bold font-montserrat">
              Yönetim Paneli
            </h1>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-corporate-blue text-white' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                  title={!isOpen ? item.label : ''}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {isOpen && (
                    <span className="ml-3 font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {isOpen && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-xs text-white/60 text-center">
            © 2025 Havacılar Yatırım
          </div>
        </div>
      )}
    </div>
  );
}