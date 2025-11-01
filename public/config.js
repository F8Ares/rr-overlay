// --- Supabase config ---
const SUPABASE_URL = "https://bzbijokrdnjzzcxkxvgc.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6Ymlqb2tyZG5qenpjeGt4dmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MTQ2OTQsImV4cCI6MjA3NzQ5MDY5NH0.NphwJv0ZYN656vQ8jYL-cOasgekTGoH78EzpqObD-yo";

// Create ONE global supabase client
window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Detect correct redirect URL based on environment
const isLocalhost = window.location.hostname.includes("localhost");
const REDIRECT_BASE = isLocalhost
  ? "http://localhost:4000"
  : "https://rr-overlay-production.up.railway.app";

// Final redirect used in login buttons
window.OAUTH_REDIRECT = `${REDIRECT_BASE}/dashboard.html`;

// Provider Client IDs (for future logout logic)
window.PROVIDERS = {
  twitchClientId: "341pc2a6q0x78a30yx323mi61nrtqu",
  discordClientId: "1433836176669675651"
};
