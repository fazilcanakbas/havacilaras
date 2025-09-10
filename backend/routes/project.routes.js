const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/project.controller');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// Public
router.get('/', ctrl.list);
router.get('/:slug', ctrl.get);

// Protected
router.post('/', auth, ctrl.create);
router.put('/:slug', auth, ctrl.update);
router.delete('/:slug', auth, ctrl.remove);
// Single upload (legacy)
router.post('/upload', auth, upload.single('file'), ctrl.upload);

// Upload scoped to a project slug (saves under uploads/projects/:slug)
router.post('/:slug/upload', auth, upload.single('file'), ctrl.upload);

// Multi-field upload for creating/editing a project media set
// Expected fields: heroImage(1), logoImage(1), coverImage(1), coverImageWithLogo(1),
// gallery(6), experiences[0-3].image(1 each), models[*].images(up to 3 per model)
// For simplicity, we accept dynamic counts and return URLs grouped by field name.
const multiFields = [
	{ name: 'heroImage', maxCount: 1 },
	{ name: 'logoImage', maxCount: 1 },
	{ name: 'coverImage', maxCount: 1 },
	{ name: 'coverImageWithLogo', maxCount: 1 },
	{ name: 'gallery', maxCount: 12 },
	{ name: 'experienceImages', maxCount: 10 },
	{ name: 'modelImages', maxCount: 50 },
];
router.post('/:slug/upload-many', auth, upload.fields(multiFields), ctrl.uploadMany);

module.exports = router;
