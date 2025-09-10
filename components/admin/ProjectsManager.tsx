'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Edit, Trash2, Eye, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { listProjects, createProject, uploadImage, type ProjectPayload } from '@/app/services/projects.service';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface Project {
  id: number;
  slug: string;
  title: { tr: string; en: string };
  description: { tr: string; en: string };
  category: 'real-estate' | 'aviation';
  saleStatus: 'ongoing' | 'completed';
  coverImage?: string;
  coverImageWithLogo?: string;
  active: boolean;
  location?: string;
  date?: string;
}

export default function ProjectsManager() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const [filter, setFilter] = useState<'all' | 'real-estate' | 'aviation'>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const token = useMemo(() => (typeof window !== 'undefined' ? (localStorage.getItem('admin_token') || 'demo-admin-token') : ''), []);

  const [form, setForm] = useState<ProjectPayload>({
    active: true,
    category: 'real-estate',
    saleStatus: 'ongoing',
    title: { tr: '', en: '' },
    description: { tr: '', en: '' },
    coverImage: '',
    coverImageWithLogo: '',
    location: '',
    date: '',
  });

  useEffect(() => {
    setLoading(true);
    listProjects()
      .then((data) => setProjects(data))
      .catch(() => toast({ title: 'Projeler alınamadı', variant: 'destructive' }))
      .finally(() => setLoading(false));
  }, [toast]);

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  const handleDelete = (id: number) => {
    if (confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const resetForm = () => {
    setForm({
      active: true,
      category: 'real-estate',
      saleStatus: 'ongoing',
      title: { tr: '', en: '' },
      description: { tr: '', en: '' },
      coverImage: '',
      coverImageWithLogo: '',
      location: '',
      date: '',
    });
    setEditingProject(null);
  };

  const onCreate = async () => {
    try {
      setLoading(true);
      const created = await createProject(form, token);
      setProjects((prev) => [created as any as Project, ...prev]);
      setShowForm(false);
      resetForm();
      toast({ title: 'Proje oluşturuldu' });
    } catch (e) {
      toast({ title: 'Proje oluşturulamadı', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'coverImage' | 'coverImageWithLogo') => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await uploadImage(file, token);
      const url = res.url.startsWith('http') ? res.url : `${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000'}${res.url}`;
      setForm((f) => ({ ...f, [field]: url }));
      toast({ title: 'Görsel yüklendi' });
    } catch {
      toast({ title: 'Yükleme hatası', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-montserrat text-corporate-navy">
            Proje Yönetimi
          </h1>
          <p className="text-gray-600 mt-1">
            Gayrimenkul ve havacılık projelerini yönetin
          </p>
        </div>
        <button
          onClick={() => router.push('/admin/projects/new')}
          className="bg-corporate-navy text-white px-6 py-2 rounded-lg font-semibold hover:bg-corporate-blue transition-colors duration-300 flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Yeni Proje
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-500" />
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-corporate-navy text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tümü ({projects.length})
            </button>
            <button
              onClick={() => setFilter('real-estate')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'real-estate' 
                  ? 'bg-corporate-navy text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Gayrimenkul ({projects.filter(p => p.category === 'real-estate').length})
            </button>
            <button
              onClick={() => setFilter('aviation')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'aviation' 
                  ? 'bg-corporate-navy text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Havacılık ({projects.filter(p => p.category === 'aviation').length})
            </button>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Proje</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Kategori</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Satış</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Konum</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Tarih</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-700">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {(project.coverImage || project.coverImageWithLogo) && (
                        <img
                          src={(project.coverImageWithLogo || project.coverImage) as string}
                          alt={project.title.tr}
                          className="w-12 h-12 rounded-lg object-cover mr-4"
                        />
                      )}
                      <div>
                        <div className="font-semibold text-gray-900">{project.title.tr}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {project.description.tr}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.category === 'real-estate'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {project.category === 'real-estate' ? 'Gayrimenkul' : 'Havacılık'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.saleStatus === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.saleStatus === 'completed' ? 'Satışı Tamamlanan' : 'Satışı Devam Eden'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{project.location}</td>
                  <td className="px-6 py-4 text-gray-600">{project.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-gray-500 hover:text-corporate-blue hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => {
                          setEditingProject(project);
                          setShowForm(true);
                        }}
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Bu kategoride proje bulunmamaktadır.</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 bg-corporate-navy text-white px-6 py-2 rounded-lg font-semibold hover:bg-corporate-blue transition-colors duration-300"
          >
            İlk Projeyi Ekle
          </button>
        </div>
      )}

  {/* Creation modal removed; use dedicated page instead */}
    </div>
  );
}