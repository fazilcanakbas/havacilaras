const mongoose = require('mongoose');

const LangTextSchema = new mongoose.Schema({
  tr: { type: String, default: '' },
  en: { type: String, default: '' },
}, { _id: false });

const ModelImageSchema = new mongoose.Schema({
  url: String,
}, { _id: false });

const ModelSchema = new mongoose.Schema({
  title: LangTextSchema,
  size: LangTextSchema,
  desc: LangTextSchema,
  price: { type: String, default: '' },
  images: [ModelImageSchema], // min 1, max 3 (we won't hard-enforce here)
}, { _id: false });

const ExperienceSchema = new mongoose.Schema({
  title: LangTextSchema,
  subtitle: LangTextSchema,
  image: { type: String, default: '' },
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  active: { type: Boolean, default: true },
  category: { type: String, enum: ['real-estate', 'aviation'], required: true },
  saleStatus: { type: String, enum: ['ongoing', 'completed'], required: true },
  title: LangTextSchema,
  description: LangTextSchema,

  // For hero headline split style
  highlightedText: LangTextSchema,
  slogan: LangTextSchema,

  // Hero/logo/covers
  heroImage: { type: String, default: '' },
  logoImage: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  coverImageWithLogo: { type: String, default: '' },

  // Overview
  overview: {
    description: LangTextSchema,
    badges: { type: [String], default: [] },
    badgesEn: { type: [String], default: [] },
    quickStats: { type: [{ label: String, value: String }], default: [] },
    quickStatsEn: { type: [{ label: String, value: String }], default: [] },
  },

  // Addressing requirements
  location: { type: String, default: '' },
  date: { type: String, default: '' },

  // Lists
  gallery: { type: [String], default: [] }, // 6 images
  experiences: { type: [ExperienceSchema], default: [] }, // 4 entries with image each
  models: { type: [ModelSchema], default: [] },
  advantages: { type: [String], default: [] },
  advantagesEn: { type: [String], default: [] },

  // Video
  video: {
    url: { type: String, default: '' },
  },

  // Financial info
  financial: {
    info: { type: String, default: '' },
    infoEn: { type: String, default: '' },
  },
}, { timestamps: true });

module.exports = mongoose.model('ProjectDoc', ProjectSchema);
