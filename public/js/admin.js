/* ========================================
   AI bloop Admin — JavaScript
   ======================================== */

const API_BASE = 'https://api.aibloop.com/api/admin';
let lastFetchTime = null;
let refreshInterval = null;

function getAdminKey() {
  return sessionStorage.getItem('abloop_key') || '';
}

function handle401() {
  sessionStorage.removeItem('abloop_admin');
  sessionStorage.removeItem('abloop_key');
  document.getElementById('adminLoginOverlay').style.display = '';
  document.getElementById('loginError').style.display = 'none';
  if (refreshInterval) clearInterval(refreshInterval);
}

async function apiFetch(endpoint) {
  const res = await fetch(API_BASE + endpoint, {
    headers: { 'X-Admin-Key': getAdminKey() }
  });
  if (res.status === 401) { handle401(); throw new Error('Unauthorized'); }
  if (!res.ok) throw new Error('API error ' + res.status);
  return res.json();
}

// ============ DASHBOARD DATA ============

function updateTimestamp() {
  const el = document.getElementById('dashLastUpdated');
  if (!el || !lastFetchTime) return;
  const secs = Math.floor((Date.now() - lastFetchTime) / 1000);
  if (secs < 5) el.textContent = 'All systems operational · Last updated just now';
  else if (secs < 60) el.textContent = `All systems operational · Last updated ${secs}s ago`;
  else el.textContent = `All systems operational · Last updated ${Math.floor(secs/60)}m ago`;
}

async function fetchStats() {
  try {
    const stats = await apiFetch('/stats');
    lastFetchTime = Date.now();

    // Active bots
    const el1 = document.getElementById('statBots');
    const el1c = document.getElementById('statBotsChange');
    if (el1) el1.textContent = (stats.active_bots || 0).toLocaleString();
    if (el1c && stats.paid_bots !== undefined) {
      el1c.className = 'stat-change';
      el1c.textContent = `${stats.paid_bots || 0} paid · ${stats.free_bots || 0} free`;
    }

    // Conversations today
    const el2 = document.getElementById('statConvos');
    const el2c = document.getElementById('statConvosChange');
    if (el2) el2.textContent = (stats.conversations_today || 0).toLocaleString();
    if (el2c) {
      if (stats.conversations_yesterday && stats.conversations_yesterday > 0) {
        const pct = (((stats.conversations_today - stats.conversations_yesterday) / stats.conversations_yesterday) * 100).toFixed(1);
        const up = pct >= 0;
        el2c.className = 'stat-change ' + (up ? 'up' : '');
        el2c.textContent = `${up ? '↑' : '↓'} ${Math.abs(pct)}% vs yesterday`;
      } else {
        el2c.textContent = '';
      }
    }

    // Revenue
    const el3 = document.getElementById('statRevenue');
    const el3c = document.getElementById('statRevenueChange');
    if (el3) {
      const rev = stats.monthly_revenue || 0;
      el3.textContent = rev >= 1000 ? '$' + (rev / 1000).toFixed(1) + 'K' : '$' + rev;
    }
    if (el3c) el3c.textContent = '';

    updateTimestamp();
  } catch (e) {
    console.error('Stats fetch error:', e);
  }
}

async function fetchBots() {
  try {
    const bots = await apiFetch('/bots');
    const tbody = document.getElementById('botsTableBody');
    const badge = document.getElementById('botCountBadge');
    if (badge) badge.textContent = `${bots.length} total`;
    if (!tbody) return;

    if (!bots.length) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--muted);">No bots yet</td></tr>';
      return;
    }

    tbody.innerHTML = bots.map(b => {
      const status = b.status || 'active';
      const dotColor = status === 'active' ? 'green' : status === 'training' ? 'yellow' : 'blue';
      const created = b.created_at ? new Date(b.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
      return `<tr>
        <td>${esc(b.business_name || b.name || '—')}</td>
        <td>${esc(b.email || '—')}</td>
        <td>${esc(b.industry || '—')}</td>
        <td><span class="badge-label">${esc(b.plan || 'free')}</span></td>
        <td>${(b.messages_used || b.message_count || 0).toLocaleString()}</td>
        <td><span class="status-dot ${dotColor}"></span> ${esc(status.charAt(0).toUpperCase() + status.slice(1))}</td>
        <td>${created}</td>
      </tr>`;
    }).join('');
  } catch (e) {
    console.error('Bots fetch error:', e);
  }
}

async function fetchLeads() {
  try {
    const leads = await apiFetch('/leads');
    const tbody = document.getElementById('leadsTableBody');
    const badge = document.getElementById('leadCountBadge');
    if (badge) badge.textContent = `${leads.length} total`;
    if (!tbody) return;

    if (!leads.length) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--muted);">No leads yet</td></tr>';
      return;
    }

    tbody.innerHTML = leads.map(l => {
      const date = l.created_at ? new Date(l.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—';
      return `<tr>
        <td>${esc(l.name || '—')}</td>
        <td>${esc(l.email || '—')}</td>
        <td>${esc(l.company || '—')}</td>
        <td style="max-width:300px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(l.message || '—')}</td>
        <td>${date}</td>
      </tr>`;
    }).join('');
  } catch (e) {
    console.error('Leads fetch error:', e);
  }
}

function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

async function initDashboard() {
  if (!getAdminKey()) return;
  await Promise.all([fetchStats(), fetchBots(), fetchLeads()]);
  // auto-refresh stats every 60s
  if (refreshInterval) clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    fetchStats();
    fetchBots();
    fetchLeads();
  }, 60000);
  // update timestamp every 10s
  setInterval(updateTimestamp, 10000);
}

// Auto-init if already logged in
if (sessionStorage.getItem('abloop_admin') === '1') {
  initDashboard();
}

// ============ AGENTS DATA ============
const agents = [
  { id:'seo', name:'SEO Scout', role:'Search Engine Optimization', emoji:'🔍', color:'var(--accent)', bg:'var(--accent-light)', status:'Active', statusColor:'var(--accent)',
    tasks:['Keyword research & tracking','On-page optimization','Competitor analysis'],
    responses:[
      "Just finished the weekly keyword audit. We moved up to #3 for 'custom ai chatbot for business' — that's 2 spots this week.",
      "Technical SEO score is 92/100. I fixed 3 broken internal links and resubmitted the sitemap.",
      "Competitor alert: Chatbase just published a comparison page ranking for our brand terms."
    ]},
  { id:'content', name:'Content Writer', role:'Blog, Copy & Content Strategy', emoji:'✍️', color:'var(--blue)', bg:'rgba(26,86,219,0.08)', status:'Writing', statusColor:'var(--blue)',
    tasks:['Blog post creation','Landing page copy','Email sequences'],
    responses:[
      "Just published the healthcare chatbot article — 2,400 words with embedded case studies.",
      "Working on a 5-part email onboarding sequence. Email 1 is done.",
      "The competitor comparison landing page is in research phase."
    ]},
  { id:'analytics', name:'Analytics Brain', role:'Data Analysis & Reporting', emoji:'📊', color:'#a78bfa', bg:'rgba(124,58,237,0.08)', status:'Active', statusColor:'var(--accent)',
    tasks:['Daily metrics tracking','Anomaly detection','Monthly reports'],
    responses:[
      "Healthcare vertical clients have 23% higher retention than average.",
      "Traffic anomaly detected: 340% spike from Reddit yesterday.",
      "Monthly report highlights: MRR up 15.2%, churn down to 2.1%."
    ]},
  { id:'uptime', name:'Uptime Guardian', role:'Infrastructure & Reliability', emoji:'🛡️', color:'#2dd4bf', bg:'rgba(5,150,105,0.08)', status:'Monitoring', statusColor:'var(--accent)',
    tasks:['Server monitoring 24/7','Auto-scaling','Incident response'],
    responses:["All systems nominal. 99.97% uptime this month.","Resolved a database query bottleneck at 3:42 AM.","Predictive scaling model is working well."]},
  { id:'growth', name:'Growth Hacker', role:'Conversion & A/B Testing', emoji:'🚀', color:'#f5c542', bg:'rgba(217,119,6,0.08)', status:'Testing', statusColor:'#f5c542',
    tasks:['A/B test management','Funnel optimization','CRO'],
    responses:["Hero headline A/B test concluded — +22% CTR.","Running 3 experiments currently.","Funnel analysis complete: 34% drop-off at business description step."]},
  { id:'onboarder', name:'Client Onboarder', role:'Automated Setup & Training', emoji:'🎯', color:'#ff5c5c', bg:'rgba(220,38,38,0.08)', status:'Active', statusColor:'var(--accent)',
    tasks:['Bot provisioning','Training data prep','Widget deployment'],
    responses:["Provisioned 12 new client bots today.","New workflow improvement: pre-trained bots within seconds.","Building a WordPress plugin for one-click install."]},
  { id:'social', name:'Social Maven', role:'Social Media & Community', emoji:'📱', color:'#f472b6', bg:'rgba(219,39,119,0.08)', status:'Scheduled', statusColor:'#f5c542',
    tasks:['Content scheduling','Community management','Trend monitoring'],
    responses:["Scheduled 14 posts this week across LinkedIn, Twitter, and Instagram.","Monitoring a trending Twitter thread about AI replacing customer service.","Community Discord hit 2,000 members!"]},
  { id:'support', name:'Support Ninja', role:'Customer Support & Escalation', emoji:'🥷', color:'#fb923c', bg:'rgba(234,88,12,0.08)', status:'Active', statusColor:'var(--accent)',
    tasks:['Ticket resolution','Troubleshooting','Knowledge base'],
    responses:["Handled 23 tickets today, average resolution time: 14 minutes.","Escalation resolved for LegalEdge Partners.","Knowledge base updated with 8 new articles."]},
  { id:'revenue', name:'Revenue Tracker', role:'Billing, Churn & Upsells', emoji:'💰', color:'var(--accent)', bg:'var(--accent-light)', status:'Active', statusColor:'var(--accent)',
    tasks:['Payment processing','Churn prediction','Revenue optimization'],
    responses:["Identified 8 at-risk accounts showing churn signals.","12 new clients this week (+$1,200 MRR).","34% of clients hitting high conversation volumes."]},
  { id:'security', name:'Security Sentinel', role:'Security & Compliance', emoji:'🔐', color:'var(--blue)', bg:'rgba(26,86,219,0.08)', status:'Scanning', statusColor:'var(--accent)',
    tasks:['Vulnerability scanning','Compliance monitoring','Encryption audits'],
    responses:["Weekly security scan complete. Zero vulnerabilities.","Compliance update: HIPAA documentation current.","Blocked 1,247 suspicious requests today."]}
];

let selectedAgent = null;
let agentMsgCounters = {};

function renderAgents() {
  document.getElementById('agentsGrid').innerHTML = agents.map(a => `
    <div class="agent-card ${selectedAgent?.id===a.id?'selected':''}" onclick="selectAgent('${a.id}')">
      <div class="agent-top">
        <div class="agent-av" style="background:${a.bg}">${a.emoji}</div>
        <div class="agent-info">
          <div class="agent-name">${a.name}</div>
          <div class="agent-role">${a.role}</div>
        </div>
        <div class="agent-status" style="color:${a.statusColor}">
          <span class="status-dot" style="background:${a.statusColor}"></span>
          ${a.status}
        </div>
      </div>
      <div class="agent-tasks">
        ${a.tasks.map(t=>`<div class="agent-task"><span class="c">✓</span> ${t}</div>`).join('')}
      </div>
    </div>
  `).join('');
}

function selectAgent(id) {
  selectedAgent = agents.find(a=>a.id===id);
  renderAgents();
  if (!selectedAgent) return;
  document.getElementById('chatTitle').textContent = `💬 Chat with ${selectedAgent.name}`;
  const msgs = document.getElementById('agentChatMsgs');
  msgs.innerHTML = `
    <div class="acm bot">
      <div class="acm-label">${selectedAgent.emoji} ${selectedAgent.name}</div>
      <div class="acm-bubble">Hey! I'm ${selectedAgent.name}, your ${selectedAgent.role.toLowerCase()} agent. Ask me anything about what I'm working on.</div>
    </div>`;
  document.getElementById('agentChatCard').scrollIntoView({ behavior:'smooth', block:'center' });
}

function sendAgentMsg() {
  if (!selectedAgent) { alert('Please select an agent first!'); return; }
  const input = document.getElementById('agentInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  const msgs = document.getElementById('agentChatMsgs');
  msgs.innerHTML += `<div class="acm user"><div class="acm-label">You 👤</div><div class="acm-bubble">${msg.replace(/</g,'&lt;')}</div></div>`;
  msgs.scrollTop = msgs.scrollHeight;
  if (!agentMsgCounters[selectedAgent.id]) agentMsgCounters[selectedAgent.id] = 0;
  const idx = agentMsgCounters[selectedAgent.id] % selectedAgent.responses.length;
  agentMsgCounters[selectedAgent.id]++;
  setTimeout(() => {
    msgs.innerHTML += `<div class="acm bot"><div class="acm-label">${selectedAgent.emoji} ${selectedAgent.name}</div><div class="acm-bubble">${selectedAgent.responses[idx]}</div></div>`;
    msgs.scrollTop = msgs.scrollHeight;
  }, 400 + Math.random() * 600);
}

renderAgents();

// ============ PAGE SWITCHING ============
function switchPage(page, el) {
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(s=>s.classList.remove('active'));
  document.getElementById('page-'+page)?.classList.add('active');
  if (el) el.classList.add('active');
}

// ============ CHART ============
(function renderChart() {
  const data = [12400,13200,11800,15600,14200,16800,15400,17200,16100,18400,17800,19200,18100,18400];
  const days = ['Feb 10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
  const max = Math.max(...data);
  const area = document.getElementById('chartArea');
  const labels = document.getElementById('chartLabels');
  if (!area) return;
  area.innerHTML = data.map((v,i) => `<div class="chart-bar" data-val="${(v/1000).toFixed(1)}K" style="height:${(v/max)*100}%;background:${i===data.length-1?'var(--accent)':'var(--border)'}"></div>`).join('');
  labels.innerHTML = days.map(d => `<span>${d}</span>`).join('');
})();

// ============ ACTIVITY FEED ============
(function renderActivity() {
  const items = [
    { agent:'SEO Scout', color:'var(--accent)', msg:'Completed keyword audit — 47 new opportunities found', time:'2 min ago' },
    { agent:'Content Writer', color:'var(--blue)', msg:'Published 3 blog posts to staging', time:'8 min ago' },
    { agent:'Analytics Brain', color:'#a78bfa', msg:'Detected traffic spike from Reddit (+340%)', time:'14 min ago' },
    { agent:'Uptime Guardian', color:'#2dd4bf', msg:'Resolved latency issue on EU-West cluster', time:'23 min ago' },
    { agent:'Growth Hacker', color:'#f5c542', msg:'A/B test concluded — Variant B wins (+22% CTR)', time:'31 min ago' },
    { agent:'Client Onboarder', color:'#ff5c5c', msg:'Provisioned 12 new bots automatically', time:'45 min ago' },
    { agent:'Revenue Tracker', color:'var(--accent)', msg:'8 at-risk accounts flagged for outreach', time:'1 hr ago' },
    { agent:'Security Sentinel', color:'var(--blue)', msg:'Blocked 1,247 suspicious requests', time:'1 hr ago' },
    { agent:'Support Ninja', color:'#fb923c', msg:'Resolved 23 tickets — avg 14min resolution', time:'2 hr ago' },
    { agent:'Social Maven', color:'#f472b6', msg:'LinkedIn carousel hit 12K impressions', time:'3 hr ago' }
  ];
  const feed = document.getElementById('activityFeed');
  if (!feed) return;
  feed.innerHTML = items.map(i => `
    <div class="activity-item">
      <div class="activity-dot" style="background:${i.color}"></div>
      <div>
        <div class="activity-text"><strong>${i.agent}</strong> ${i.msg}</div>
        <div class="activity-time">${i.time}</div>
      </div>
    </div>
  `).join('');
})();

// ============ LOGS ============
(function renderLogs() {
  const logs = [
    { t:'14:23:01', a:'SEO Scout', m:'Completed keyword position check — 1,247 keywords tracked' },
    { t:'14:22:45', a:'Uptime Guardian', m:'Health check: all 3 regions < 200ms' },
    { t:'14:21:12', a:'Content Writer', m:'Blog "Healthcare Chatbot ROI" → ready' },
    { t:'14:19:33', a:'Growth Hacker', m:'A/B test variant_b serving 50% traffic' },
    { t:'14:17:08', a:'Client Onboarder', m:'Bot provisioned: CloudNine Travel' },
    { t:'14:15:22', a:'Revenue Tracker', m:'Payment: NovaDental Group — $100.00' },
    { t:'14:12:44', a:'Security Sentinel', m:'Blocked 47 requests from 203.0.113.x' },
    { t:'14:10:01', a:'Analytics Brain', m:'Hourly snapshot: 1,842 conversations' },
    { t:'14:08:33', a:'Support Ninja', m:'Ticket #4821 resolved (11min)' },
    { t:'14:05:17', a:'Social Maven', m:'Published: "5 Signs You Need an AI Chatbot"' },
    { t:'14:02:00', a:'Uptime Guardian', m:'Auto-scaled EU-West: 4→6 instances' },
    { t:'13:58:44', a:'SEO Scout', m:'New backlink: techcrunch.com/ai-tools' },
    { t:'13:55:12', a:'Revenue Tracker', m:'Churn risk: 2 accounts, 0 logins 14d' },
    { t:'13:51:08', a:'Content Writer', m:'Draft started: "RE Lead Gen Guide"' },
    { t:'13:48:22', a:'Security Sentinel', m:'SSL renewal: 14 client widgets' },
    { t:'13:45:00', a:'Growth Hacker', m:'CTA test: green vs lime, 1,200 impressions' },
    { t:'13:42:11', a:'Analytics Brain', m:'Reddit traffic conversion: 4.7% (vs 2.1% avg)' },
    { t:'13:38:55', a:'Support Ninja', m:'KB article published: "Update Bot Knowledge"' },
    { t:'13:35:20', a:'Client Onboarder', m:'Healthcare template updated v2.4' },
    { t:'13:32:00', a:'Social Maven', m:'Engaged 15 comments on LinkedIn post' }
  ];
  const feed = document.getElementById('logFeed');
  if (!feed) return;
  feed.innerHTML = logs.map(l => `<div class="log-line"><span class="log-time">[${l.t}]</span> <span class="log-agent">${l.a}</span> → ${l.m}</div>`).join('');
})();
