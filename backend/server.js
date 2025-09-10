const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const { connectDB } = require('./config/db');
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simple health check
app.get('/health', (req, res) => res.json({ ok: anan }));

// Connect DB then mount routes
connectDB();
// Routes
const projectRoutes = require('./routes/project.routes');
app.use('/api/projects', projectRoutes);

// Ensure data file exists
const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'projects.json');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, '[]');

app.listen(PORT, () => {
  console.log(`Backend API listening on http://localhost:${PORT}`);
});
