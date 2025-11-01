// ---- Supabase project settings ----
const SUPABASE_URL = "https://bzbijokrdnjzzcxkxvgc.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6Ymlqb2tyZG5qenpjeGt4dmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MTQ2OTQsImV4cCI6MjA3NzQ5MDY5NH0.NphwJv0ZYN656vQ8jYL-cOasgekTGoH78EzpqObD-yo";

// ONE global client (avoid duplicate creations)
window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Provider Client IDs (for hard provider logout)
window.PROVIDERS = {
  twitchClientId: "341pc2a6q0x78a30yx323mi61nrtqu",
  discordClientId: "1433836176669675651"
};
