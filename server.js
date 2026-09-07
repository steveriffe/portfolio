const express = require('express');
const compression = require('compression');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = path.join(__dirname, 'public');

// Enable high-ratio compression
app.use(compression());

// Basic Security & Content Policy headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});

// Cache static assets (images, fonts)
app.use(
  express.static(PUBLIC_DIR, {
    maxAge: '1d',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      } else if (filePath.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
      }
    },
  })
);

// Health check for Cloud Run
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// JSON API for Data Urbanism slides & speaker notes
app.get('/api/data-urbanism', (req, res) => {
  const jsonPath = path.join(PUBLIC_DIR, 'data', 'data_urbanism.json');
  if (fs.existsSync(jsonPath)) {
    res.sendFile(jsonPath);
  } else {
    res.status(404).json({ error: 'Data Urbanism presentation data not found' });
  }
});

// Clean Route mappings for project walkthroughs
const routes = {
  '/': 'index.html',
  '/data-urbanism': 'data-urbanism.html',
  '/avdb': 'avdb.html',
  '/career': 'career.html',
  '/music-roast': 'music-roast.html',
  '/tableau': 'tableau.html',
  '/resume': 'resume.html',
};

Object.entries(routes).forEach(([route, file]) => {
  app.get(route, (req, res) => {
    const filePath = path.join(PUBLIC_DIR, file);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
    }
  });
});

// Fallback for 404s
app.use((req, res) => {
  res.status(404).sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`🚀 Steve Riffe Portfolio Server running on port ${PORT}`);
  console.log(`🌐 Local URL: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
