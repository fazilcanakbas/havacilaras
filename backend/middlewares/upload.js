const multer = require('multer');
const path = require('path');
const fs = require('fs');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // use slug path if provided: /uploads/projects/[slug]
    const base = path.join(__dirname, '..', 'uploads');
    const slug = (req.params?.slug || req.body?.slug || '').toString().trim();
    const folder = slug ? path.join(base, 'projects', slug) : base;
    ensureDir(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, unique + ext);
  },
});

const fileFilter = (req, file, cb) => {
  if (/^image\//.test(file.mimetype)) return cb(null, true);
  cb(new Error('Only image uploads are allowed'));
};

module.exports = multer({ storage, fileFilter, limits: { fileSize: 25 * 1024 * 1024 } });
