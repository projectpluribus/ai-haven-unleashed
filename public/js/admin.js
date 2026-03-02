/* ========================================
   AI bloop Admin Dashboard — Logic
   ======================================== */

const API_BASE = 'https://api.aibloop.com';
let lastFetchTime = null;
let refreshTimer = null;
let timestampTimer = null;
let allBots = []; // cached for filtering

// ============ HELPERS ============

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function showLogin() {
  document.getElementById('loginOverlay').style.display = '';
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('loginError').textContent = '';
  document.getElementById('loginPass').value = '';
  document.getElementById('loginPass').focus();
  if (refreshTimer) clearInterval(refreshTimer);
  if (timestampTimer) clearInterval(timestampTimer);
}

function showDashboard() {
  document.getElementById('loginOverlay').style.display = 'none';
  document.getElementById('dashboard').style.display = '';
}

function logout() {
  sessionStorage.removeItem('adminKey');
  showLogin();
}

// ============ API ============

async function adminFetch(endpoint) {
  const key = sessionStorage.getItem('adminKey');
  if (!key) { showLogin(); return null; }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'X-Admin-Key': key }
  });

  if (res.status === 401) {
    sessionStorage.removeItem('adminKey');
    showLogin();
    return null;
  }

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// ============ LOGIN ============

async function attemptLogin(e) {
  e.preventDefault();
  const pass = document.getElementById('loginPass').value.trim();
  const btn = document.getElementById('loginBtn');
  const errEl = document.getElementById('loginError');

  if (!pass) { errEl.textContent = 'Please enter a password.'; return; }

  btn.disabled = true;
  btn.textContent = 'Logging in...';
  errEl.textContent = '';

  try {
    const res = await fetch(`${API_BASE}/api/admin/stats`, {
      headers: { 'X-Admin-Key': pass }
    });

    if (res.status === 401) {
      errEl.textContent = 'Invalid password. Try again.';
      btn.disabled = false;
      btn.textContent = 'Login';
      return;
    }

    if (!res.ok) {
      errEl.textContent = `Server error (${res.status}). Try later.`;
      btn.disabled = false;
      btn.textContent = 'Login';
      return;
    }

    // Success
    sessionStorage.setItem('adminKey', pass);
    btn.disabled = false;
    btn.textContent = 'Login';
    showDashboard();
    initDashboard();
  } catch (err) {
    errEl.textContent = 'Network error. Check your connection.';
    btn.disabled = false;
    btn.textContent = 'Login';
  }
}

// ============ STATS ============

async function fetchStats() {
  try {
    const s = await adminFetch('/api/admin/stats');
    if (!s) return;

    lastFetchTime = Date.now();

    // Total Bots
    const botEl = document.getElementById('statBots');
    const botSub = document.getElementById('statBotsSub');
    botEl.textContent = s.totalBots ?? s.active_bots ?? 0;
    botEl.classList.remove('skeleton-text');
    botSub.textContent = `${s.paidBots ?? s.paid_bots ?? 0} paid · ${s.freeBots ?? s.free_bots ?? 0} free`;

    // Conversations
    const convoEl = document.getElementById('statConvos');
    const convoSub = document.getElementById('statConvosSub');
    const today = s.conversationsToday ?? s.conversations_today ?? 0;
    const yesterday = s.conversationsYesterday ?? s.conversations_yesterday ?? 0;
    convoEl.textContent = today.toLocaleString();
    convoEl.classList.remove('skeleton-text');
    if (yesterday > 0) {
      const pct = (((today - yesterday) / yesterday) * 100).toFixed(1);
      const up = pct >= 0;
      convoSub.textContent = `${up ? '↑' : '↓'} ${Math.abs(pct)}% vs yesterday`;
      convoSub.className = 'stat-sub ' + (up ? 'up' : 'down');
    } else {
      convoSub.textContent = 'No data yesterday';
    }

    // Leads
    const leadEl = document.getElementById('statLeads');
    const leadSub = document.getElementById('statLeadsSub');
    leadEl.textContent = (s.totalLeads ?? s.total_leads ?? 0).toLocaleString();
    leadEl.classList.remove('skeleton-text');
    leadSub.textContent = '';

    // Revenue
    const revEl = document.getElementById('statRevenue');
    const revSub = document.getElementById('statRevenueSub');
    const rev = s.monthlyRevenue ?? s.monthly_revenue ?? 0;
    revEl.textContent = '$' + rev.toLocaleString();
    revEl.classList.remove('skeleton-text');
    revSub.textContent = '';

    updateTimestamp();
  } catch (err) {
    console.error('Stats error:', err);
  }
}

// ============ SITE VISITS ============

async function fetchVisits() {
  try {
    const v = await adminFetch('/api/admin/visits');
    if (!v) return;

    const visitEl = document.getElementById('statVisits');
    const visitSub = document.getElementById('statVisitsSub');
    const total = v.totalVisits ?? v.total_visits ?? v.total ?? 0;
    const today = v.visitsToday ?? v.visits_today ?? v.today ?? 0;
    const yesterday = v.visitsYesterday ?? v.visits_yesterday ?? v.yesterday ?? 0;

    visitEl.textContent = total.toLocaleString();
    visitEl.classList.remove('skeleton-text');

    if (today > 0) {
      let sub = `${today.toLocaleString()} today`;
      if (yesterday > 0) {
        const pct = (((today - yesterday) / yesterday) * 100).toFixed(1);
        const up = pct >= 0;
        sub += ` · ${up ? '↑' : '↓'} ${Math.abs(pct)}% vs yesterday`;
        visitSub.className = 'stat-sub ' + (up ? 'up' : 'down');
      }
      visitSub.textContent = sub;
    } else {
      visitSub.textContent = 'No visits today';
    }
  } catch (err) {
    const visitEl = document.getElementById('statVisits');
    const visitSub = document.getElementById('statVisitsSub');
    visitEl.textContent = '—';
    visitEl.classList.remove('skeleton-text');
    visitSub.textContent = 'Endpoint unavailable';
    console.error('Visits error:', err);
  }
}

// ============ BOTS ============

async function fetchBots() {
  const tbody = document.getElementById('botsBody');
  const errEl = document.getElementById('botsError');
  errEl.style.display = 'none';

  try {
    const bots = await adminFetch('/api/admin/bots');
    if (!bots) return;

    allBots = bots;
    renderBots(bots);
  } catch (err) {
    tbody.innerHTML = '';
    errEl.textContent = 'Failed to load bots. Will retry on next refresh.';
    errEl.style.display = '';
    console.error('Bots error:', err);
  }
}

function renderBots(bots) {
  const tbody = document.getElementById('botsBody');

  if (!bots.length) {
    tbody.innerHTML = '<tr><td colspan="7" class="table-empty">No bots yet</td></tr>';
    return;
  }

  tbody.innerHTML = bots.map(b => {
    const plan = (b.plan || 'free').toLowerCase();
    const used = b.messages_used ?? b.message_count ?? 0;
    const limit = b.messages_limit ?? b.message_limit ?? 50;
    const pct = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
    const barClass = pct >= 100 ? 'full' : pct >= 80 ? 'high' : '';
    const active = b.active !== false && b.status !== 'inactive';
    const dotClass = active ? 'green' : 'red';
    const statusLabel = active ? 'Active' : 'Inactive';

    return `<tr>
      <td>${esc(b.business_name || b.name || '—')}</td>
      <td>${esc(b.email || '—')}</td>
      <td>${esc(b.industry || '—')}</td>
      <td><span class="plan-badge ${plan === 'paid' ? 'paid' : 'free'}">${esc(plan)}</span></td>
      <td>
        <div class="msg-progress">
          <span class="msg-progress-text">${used} / ${limit}</span>
          <div class="msg-bar"><div class="msg-bar-fill ${barClass}" style="width:${pct}%"></div></div>
        </div>
      </td>
      <td><span class="status-indicator"><span class="status-dot ${dotClass}"></span>${statusLabel}</span></td>
      <td style="font-family:var(--font-mono);font-size:12px;">${formatDate(b.created_at)}</td>
    </tr>`;
  }).join('');
}

function filterBots() {
  const q = document.getElementById('botSearch').value.toLowerCase().trim();
  if (!q) { renderBots(allBots); return; }
  const filtered = allBots.filter(b =>
    (b.business_name || b.name || '').toLowerCase().includes(q) ||
    (b.email || '').toLowerCase().includes(q)
  );
  renderBots(filtered);
}

// ============ LEADS ============

async function fetchLeads() {
  const tbody = document.getElementById('leadsBody');
  const errEl = document.getElementById('leadsError');
  const countEl = document.getElementById('leadsCount');
  errEl.style.display = 'none';

  try {
    const leads = await adminFetch('/api/admin/leads');
    if (!leads) return;

    countEl.textContent = `${leads.length} total`;

    if (!leads.length) {
      tbody.innerHTML = '<tr><td colspan="5" class="table-empty">No leads yet</td></tr>';
      return;
    }

    tbody.innerHTML = leads.map(l => `<tr>
      <td>${esc(l.name || '—')}</td>
      <td>${esc(l.email || '—')}</td>
      <td>${esc(l.phone || '—')}</td>
      <td>${esc(l.business_name || '—')}</td>
      <td style="font-family:var(--font-mono);font-size:12px;">${formatDate(l.captured_at || l.created_at)}</td>
    </tr>`).join('');
  } catch (err) {
    tbody.innerHTML = '';
    errEl.textContent = 'Failed to load leads. Will retry on next refresh.';
    errEl.style.display = '';
    console.error('Leads error:', err);
  }
}

// ============ CONVERSATIONS (optional) ============

async function fetchConversations() {
  try {
    const convos = await adminFetch('/api/admin/conversations');
    if (!convos) return;

    const section = document.getElementById('convosSection');
    const tbody = document.getElementById('convosBody');

    if (!Array.isArray(convos) || !convos.length) return;

    section.style.display = '';
    tbody.innerHTML = convos.map(c => `<tr>
      <td>${esc(c.business_name || c.bot_name || '—')}</td>
      <td style="font-family:var(--font-mono);font-size:12px;">${esc((c.session_id || '').substring(0, 12))}…</td>
      <td>${c.message_count ?? c.messages ?? 0}</td>
      <td style="font-family:var(--font-mono);font-size:12px;">${formatDate(c.last_message_at || c.updated_at)}</td>
    </tr>`).join('');
  } catch (err) {
    // 404 or other — silently skip
  }
}

// ============ TIMESTAMP ============

function updateTimestamp() {
  const el = document.getElementById('lastUpdated');
  if (!el || !lastFetchTime) return;
  const secs = Math.floor((Date.now() - lastFetchTime) / 1000);
  if (secs < 5) el.textContent = 'Updated just now';
  else if (secs < 60) el.textContent = `Updated ${secs}s ago`;
  else el.textContent = `Updated ${Math.floor(secs / 60)}m ago`;
}

// ============ INIT ============

async function refreshAll() {
  await Promise.all([fetchStats(), fetchVisits(), fetchBots(), fetchLeads(), fetchConversations()]);
}

async function initDashboard() {
  await refreshAll();

  if (refreshTimer) clearInterval(refreshTimer);
  refreshTimer = setInterval(refreshAll, 60000);

  if (timestampTimer) clearInterval(timestampTimer);
  timestampTimer = setInterval(updateTimestamp, 10000);
}

// Auto-login if key exists
(function() {
  const key = sessionStorage.getItem('adminKey');
  if (key) {
    showDashboard();
    initDashboard();
  } else {
    showLogin();
  }
})();
