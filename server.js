// server.js
const express = require('express');
const path = require('path');

const app = express();

// --- Trust proxy & force HTTPS (important for OAuth + OBS) ---
app.enable('trust proxy');
app.use((req, res, next) => {
  const proto = req.get('x-forwarded-proto');
  if (proto && proto !== 'https') {
    const host = req.get('host');
    return res.redirect(301, `https://${host}${req.originalUrl}`);
  }
  next();
});

// --- Static files ---
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    // Light caching for static assets; avoid caching HTML
    if (!/\.html$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=3600, immutable');
    }
  }
}));

// --- Clean routes ---
// Root -> /login
app.get('/', (_req, res) => {
  res.redirect(302, '/login');
});

// Login page serves index.html
app.get('/login', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Dashboard page
app.get('/dashboard', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Overlay page by UID (always serve overlay.html; JS reads :uid from URL)
app.get('/overlay/:uid', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'overlay.html'));
});

// (Optional) Health check endpoint for Railway
app.get('/healthz', (_req, res) => res.status(200).send('ok'));

// Fallback: let Railway/Express 404 for anything else
// (You chose no custom 404)

// --- Start ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`RR Overlay server running on port ${PORT}`);
});
