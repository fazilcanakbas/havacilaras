'use client';
import React from 'react';
import { LogOut, Menu, Bell } from 'lucide-react';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  onLogout: () => void;
}

export default function AdminHeader({ onToggleSidebar, onLogout }: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        
        {/* Left Section */}
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold font-montserrat text-corporate-navy ml-2">
            Yönetim Paneli
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">Admin User</div>
              <div className="text-xs text-gray-500">Yönetici</div>
            </div>
            
            <div className="w-8 h-8 bg-corporate-navy rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
              title="Çıkış Yap"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}