const path = require('path');
const fs = require('fs');
const Project = require('../models/project.model');
const ProjectDoc = require('../models/project.mongoose');

exports.list = async (req, res) => {
  try {
    const items = await ProjectDoc.find().sort({ createdAt: -1 }).lean();
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: 'DB error' });
  }
};

exports.get = async (req, res) => {
  const item = await ProjectDoc.findOne({ slug: req.params.slug }).lean();
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

exports.create = async (req, res) => {
  try {
    const data = req.body || {};
    if (!data.slug || !data.category || !data.saleStatus) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const exists = await ProjectDoc.findOne({ slug: data.slug });
    if (exists) return res.status(409).json({ message: 'Slug already exists' });
    const created = await ProjectDoc.create(data);
    // ensure upload folder
    const uploadsDir = path.join(__dirname, '..', 'uploads', 'projects', created.slug);
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: e.message || 'Bad request' });
  }
};

exports.update = async (req, res) => {
  const updated = await ProjectDoc.findOneAndUpdate({ slug: req.params.slug }, req.body || {}, { new: true });
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
};

exports.remove = async (req, res) => {
  const deleted = await ProjectDoc.findOneAndDelete({ slug: req.params.slug });
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  res.json({ ok: true });
};

exports.upload = (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  // If slug provided, file is saved under uploads/projects/[slug]
  const slug = (req.params?.slug || req.body?.slug || '').toString().trim();
  const rel = slug ? `/uploads/projects/${slug}/${req.file.filename}` : `/uploads/${req.file.filename}`;
  res.status(201).json({ url: rel });
};

// multi-upload handler for specific fields
exports.uploadMany = (req, res) => {
  // files available on req.files keyed by fieldname
  const out = {};
  const slug = (req.params?.slug || req.body?.slug || '').toString().trim();
  const prefix = slug ? `/uploads/projects/${slug}/` : `/uploads/`;
  Object.keys(req.files || {}).forEach((field) => {
    out[field] = (req.files[field] || []).map(f => prefix + f.filename);
  });
  res.status(201).json(out);
};
