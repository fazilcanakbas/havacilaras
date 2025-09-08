'use client';
import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Download, Eye, Check, Clock } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
  status: 'pending' | 'responded' | 'archived';
}

export default function ContactsManager() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'responded' | 'archived'>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    // Load contacts from localStorage (for demo)
    const savedContacts = localStorage.getItem('havacilar_contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    } else {
      // Sample data if no contacts exist
      const sampleContacts = [
        {
          id: 1,
          name: 'Ahmet Yılmaz',
          email: 'ahmet.yilmaz@email.com',
          phone: '+90 535 123 45 67',
          subject: 'real-estate',
          message: 'Gayrimenkul projeleriniz hakkında detaylı bilgi almak istiyorum. Özellikle İstanbul\'daki projeler...',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'pending'
        },
        {
          id: 2,
          name: 'Fatma Demir',
          email: 'fatma.demir@email.com',
          phone: '+90 532 987 65 43',
          subject: 'aviation',
          message: 'Havacılık yatırımları konusunda görüşmek istiyorum.',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'responded'
        },
        {
          id: 3,
          name: 'Mehmet Kaya',
          email: 'mehmet.kaya@email.com',
          subject: 'investment',
          message: 'Yatırım danışmanlığı hizmetleriniz hakkında bilgi rica ediyorum.',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'pending'
        }
      ];
      setContacts(sampleContacts);
      localStorage.setItem('havacilar_contacts', JSON.stringify(sampleContacts));
    }
  }, []);

  const filteredContacts = filter === 'all' 
    ? contacts 
    : contacts.filter(contact => contact.status === filter);

  const updateContactStatus = (id: number, status: Contact['status']) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === id ? { ...contact, status } : contact
    );
    setContacts(updatedContacts);
    localStorage.setItem('havacilar_contacts', JSON.stringify(updatedContacts));
  };

  const exportToCSV = () => {
    const headers = ['Ad Soyad', 'E-posta', 'Telefon', 'Konu', 'Mesaj', 'Tarih', 'Durum'];
    const csvContent = [
      headers.join(','),
      ...contacts.map(contact => [
        contact.name,
        contact.email,
        contact.phone || '',
        getSubjectText(contact.subject),
        `"${contact.message.replace(/"/g, '""')}"`,
        new Date(contact.date).toLocaleDateString('tr-TR'),
        getStatusText(contact.status)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `iletisim_formlari_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getSubjectText = (subject: string) => {
    const subjects = {
      'real-estate': 'Gayrimenkul Projeleri',
      'aviation': 'Havacılık Projeleri',
      'investment': 'Yatırım Danışmanlığı',
      'partnership': 'İş Ortaklığı',
      'other': 'Diğer'
    };
    return subjects[subject as keyof typeof subjects] || subject;
  };

  const getStatusText = (status: string) => {
    const statuses = {
      'pending': 'Bekliyor',
      'responded': 'Yanıtlandı',
      'archived': 'Arşivlendi'
    };
    return statuses[status as keyof typeof statuses] || status;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { text: 'Bekliyor', color: 'bg-yellow-100 text-yellow-800' },
      responded: { text: 'Yanıtlandı', color: 'bg-green-100 text-green-800' },
      archived: { text: 'Arşivlendi', color: 'bg-gray-100 text-gray-800' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Bugün';
    if (diffDays === 2) return 'Dün';
    if (diffDays <= 7) return `${diffDays - 1} gün önce`;
    
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-montserrat text-corporate-navy">
            İletişim Formları
          </h1>
          <p className="text-gray-600 mt-1">
            Gelen mesajları görüntüleyin ve yönetin
          </p>
        </div>
        <button
          onClick={exportToCSV}
          className="bg-corporate-navy text-white px-6 py-2 rounded-lg font-semibold hover:bg-corporate-blue transition-colors duration-300 flex items-center"
        >
          <Download className="h-5 w-5 mr-2" />
          CSV İndir
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam Mesaj</p>
              <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Bekleyen</p>
              <p className="text-2xl font-bold text-gray-900">
                {contacts.filter(c => c.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Yanıtlanan</p>
              <p className="text-2xl font-bold text-gray-900">
                {contacts.filter(c => c.status === 'responded').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-gray-100 p-3 rounded-lg">
              <Mail className="h-6 w-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Arşivlenen</p>
              <p className="text-2xl font-bold text-gray-900">
                {contacts.filter(c => c.status === 'archived').length}
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
              Tümü ({contacts.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'pending' 
                  ? 'bg-corporate-navy text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bekleyen ({contacts.filter(c => c.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilter('responded')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'responded' 
                  ? 'bg-corporate-navy text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Yanıtlanan ({contacts.filter(c => c.status === 'responded').length})
            </button>
            <button
              onClick={() => setFilter('archived')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'archived' 
                  ? 'bg-corporate-navy text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Arşivlenen ({contacts.filter(c => c.status === 'archived').length})
            </button>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">İletişim</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Konu</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Tarih</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Durum</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-700">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-gray-900">{contact.name}</div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <Mail className="h-3 w-3 mr-1" />
                        {contact.email}
                      </div>
                      {contact.phone && (
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {contact.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{getSubjectText(contact.subject)}</div>
                    <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">
                      {contact.message}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(contact.date)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(contact.status)?.color}`}>
                      {getStatusBadge(contact.status)?.text}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => setSelectedContact(contact)}
                        className="p-2 text-gray-500 hover:text-corporate-blue hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {contact.status === 'pending' && (
                        <button 
                          onClick={() => updateContactStatus(contact.id, 'responded')}
                          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Yanıtlandı olarak işaretle"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <Mail className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Bu kategoride mesaj bulunmamaktadır.</p>
        </div>
      )}

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold font-montserrat text-corporate-navy">
                  İletişim Detayları
                </h2>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{selectedContact.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    {selectedContact.email}
                  </div>
                  {selectedContact.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {selectedContact.phone}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(selectedContact.date)}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Konu</h4>
                <p className="text-gray-600">{getSubjectText(selectedContact.subject)}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Mesaj</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Durum</h4>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedContact.status)?.color}`}>
                    {getStatusBadge(selectedContact.status)?.text}
                  </span>
                  {selectedContact.status === 'pending' && (
                    <button
                      onClick={() => {
                        updateContactStatus(selectedContact.id, 'responded');
                        setSelectedContact({...selectedContact, status: 'responded'});
                      }}
                      className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      Yanıtlandı olarak işaretle
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}