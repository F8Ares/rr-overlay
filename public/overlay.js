(function(){
  if (!window.sb){
    console.error('Supabase not initialized'); return;
  }

  const $ = (sel) => document.querySelector(sel);
  const fmtInt = (n)=> {
    if (n === null || n === undefined || n === '' || isNaN(Number(n))) return '—';
    return Number(n).toLocaleString('en-US', { maximumFractionDigits:0 });
  };
  const fmtSigned = (n) => {
    if (n === null || n === undefined || isNaN(Number(n))) return '—';
    const v = Number(n);
    const s = v > 0 ? '+' : (v < 0 ? '−' : ''); // use proper minus sign for neat look
    return s ? `${s}${fmtInt(Math.abs(v))}` : '0';
  };

  // Extract UID from /overlay/:uid
  const parts = window.location.pathname.split('/').filter(Boolean); // ["overlay", "<uid>"]
  const uid = parts[1];
  if (!uid){ console.error('No UID in URL'); }

  async function fetchStats(){
    const { data, error } = await sb
      .from('creator_stats')
      .select('*')
      .eq('uid', uid)
      .maybeSingle();

    if (error || !data){
      console.error('Overlay: could not load stats', error);
      return;
    }

    const {
      total_trophy_count = null,
      total_crit_count = null,              // raw integer -> displayed as "1234%"
      season_trophy_start = null,
      session_trophy_start = null,
      session_wins = null,
      session_losses = null
    } = data;

    // Gains: allow negative (no clamping)
    const streamGain = (total_trophy_count ?? null) !== null && (session_trophy_start ?? null) !== null
      ? Number(total_trophy_count) - Number(session_trophy_start)
      : null;

    const seasonGain = (total_trophy_count ?? null) !== null && (season_trophy_start ?? null) !== null
      ? Number(total_trophy_count) - Number(season_trophy_start)
      : null;

    // Update DOM
    $('#totalTrophies').textContent = fmtInt(total_trophy_count);
    $('#totalCrit').textContent     = (total_crit_count === null || total_crit_count === '' || isNaN(Number(total_crit_count)))
      ? '—' : `${fmtInt(total_crit_count)}%`;
    $('#streamGain').textContent    = fmtSigned(streamGain);
    $('#seasonGain').textContent    = fmtSigned(seasonGain);

    const wins = Number(session_wins || 0);
    const losses = Number(session_losses || 0);
    $('#wlValue').textContent = `${fmtInt(wins)}–${fmtInt(losses)}`;
  }

  // Initial + refresh every 3s
  fetchStats();
  setInterval(fetchStats, 3000);
})();
