'use client';
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import DashboardOverview from './DashboardOverview';
import ProjectsManager from './ProjectsManager';
import AnnouncementsManager from './AnnouncementsManager';
import ContactsManager from './ContactsManager';
import ContentManager from './ContentManager';

type ActiveView = 'dashboard' | 'projects' | 'announcements' | 'contacts' | 'content';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'projects':
        return <ProjectsManager />;
      case 'announcements':
        return <AnnouncementsManager />;
      case 'contacts':
        return <ContactsManager />;
      case 'content':
        return <ContentManager />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-corporate-gray flex">
      <AdminSidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <AdminHeader 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onLogout={logout}
        />
        
        <main className="p-6">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}