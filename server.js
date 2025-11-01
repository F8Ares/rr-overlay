import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve everything inside /public
app.use(express.static(path.join(__dirname, "public")));

// Dashboard (index.html)
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Auth redirect target (dashboard)
app.get("/dashboard", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// Overlay route
app.get("/overlay/:uid", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "overlay.html"));
});

// 404 fallback
app.use((_req, res) => {
  res.status(404).send("Not Found");
});

// ✅ Railway / Render / Heroku-friendly port binding
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
