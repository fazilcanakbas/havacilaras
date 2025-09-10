// Front-end service to call the backend API
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export type LangText = { tr: string; en: string };

export type ProjectPayload = {
  slug?: string;
  active?: boolean;
  category: 'real-estate' | 'aviation';
  saleStatus: 'ongoing' | 'completed';
  coverImage?: string;
  coverImageWithLogo?: string;
  location?: string;
  date?: string;
  title: LangText;
  description: LangText;
  overview?: any;
  models?: any[];
  experiences?: any[];
  financial?: any;
  gallery?: string[];
  video?: any;
  advantages?: any[];
};

export async function listProjects() {
  const res = await fetch(`${API_BASE}/api/projects`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function getProject(slug: string) {
  const res = await fetch(`${API_BASE}/api/projects/${slug}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Project not found');
  return res.json();
}

export async function createProject(payload: ProjectPayload, token: string) {
  const res = await fetch(`${API_BASE}/api/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Create failed');
  return res.json();
}

export async function updateProject(slug: string, payload: Partial<ProjectPayload>, token: string) {
  const res = await fetch(`${API_BASE}/api/projects/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Update failed');
  return res.json();
}

export async function deleteProject(slug: string, token: string) {
  const res = await fetch(`${API_BASE}/api/projects/${slug}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Delete failed');
  return res.json();
}

export async function uploadImage(file: File, token: string) {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_BASE}/api/projects/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}
