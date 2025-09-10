const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '..', 'data', 'projects.json');

function readAll() {
  try {
    const raw = fs.readFileSync(dataFile, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeAll(list) {
  fs.writeFileSync(dataFile, JSON.stringify(list, null, 2));
}

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

module.exports = {
  getAll() {
    return readAll();
  },
  getBySlug(slug) {
    return readAll().find(p => p.slug === slug);
  },
  create(data) {
    const list = readAll();
    const id = Date.now();
    const slug = data.slug && data.slug.trim() ? data.slug : slugify(data.title?.tr || data.title?.en || `project-${id}`);
    const exists = list.some(p => p.slug === slug);
    const finalSlug = exists ? `${slug}-${id}` : slug;

    const project = {
      id,
      slug: finalSlug,
      active: Boolean(data.active ?? true),
      category: data.category || 'real-estate', // 'real-estate' | 'aviation'
      saleStatus: data.saleStatus || 'ongoing', // 'ongoing' | 'completed'
      coverImage: data.coverImage || '',
      coverImageWithLogo: data.coverImageWithLogo || '',
      location: data.location || '',
      date: data.date || '',
      // Bilingual fields
      title: {
        tr: data.title?.tr || '',
        en: data.title?.en || ''
      },
      description: {
        tr: data.description?.tr || '',
        en: data.description?.en || ''
      },
      overview: data.overview || {},
      models: Array.isArray(data.models) ? data.models : [],
      experiences: Array.isArray(data.experiences) ? data.experiences : [],
      financial: data.financial || {},
      gallery: Array.isArray(data.gallery) ? data.gallery : [],
      video: data.video || {},
      advantages: Array.isArray(data.advantages) ? data.advantages : [],
    };

    list.push(project);
    writeAll(list);
    return project;
  },
  update(slug, data) {
    const list = readAll();
    const idx = list.findIndex(p => p.slug === slug);
    if (idx === -1) return null;
    const current = list[idx];
    const next = { ...current, ...data, title: { ...current.title, ...(data.title||{}) }, description: { ...current.description, ...(data.description||{}) } };
    list[idx] = next;
    writeAll(list);
    return next;
  },
  remove(slug) {
    const list = readAll();
    const idx = list.findIndex(p => p.slug === slug);
    if (idx === -1) return false;
    list.splice(idx, 1);
    writeAll(list);
    return true;
  }
};
