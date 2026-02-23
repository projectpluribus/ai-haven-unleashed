/* ========================================
   AI Appora Admin — JavaScript
   ======================================== */

// ============ AGENTS DATA ============
const agents = [
  { id:'seo', name:'SEO Scout', role:'Search Engine Optimization', emoji:'🔍', color:'var(--accent)', bg:'var(--accent-light)', status:'Active', statusColor:'var(--accent)',
    tasks:['Keyword research & tracking','On-page optimization','Competitor analysis'],
    responses:[
      "Just finished the weekly keyword audit. We moved up to #3 for 'custom ai chatbot for business' — that's 2 spots this week. I've also identified 47 new long-tail opportunities worth targeting. The healthcare vertical keywords are performing exceptionally well.",
      "Technical SEO score is 92/100. I fixed 3 broken internal links and resubmitted the sitemap. Our Core Web Vitals are all green. Largest Contentful Paint dropped to 1.2s after the image optimization I ran yesterday.",
      "Competitor alert: Chatbase just published a comparison page ranking for our brand terms. I recommend we create our own 'AI Appora vs Competitors' page — I've already drafted a content brief for the Content Writer agent."
    ]},
  { id:'content', name:'Content Writer', role:'Blog, Copy & Content Strategy', emoji:'✍️', color:'var(--blue)', bg:'rgba(26,86,219,0.08)', status:'Writing', statusColor:'var(--blue)',
    tasks:['Blog post creation','Landing page copy','Email sequences'],
    responses:[
      "Just published the healthcare chatbot article — 2,400 words with embedded case studies from NovaDental and two other clients. SEO Scout already optimized meta tags. Organic impressions should pick up within 48 hours based on our publishing pattern.",
      "Working on a 5-part email onboarding sequence. Email 1 (welcome + quick start) is done. The sequence covers: setup guide → first week tips → ROI calculator → case studies → upgrade prompt. Want me to share the drafts?",
      "The competitor comparison landing page is in research phase. I'm analyzing messaging, pricing, and feature gaps from the top 5 competitors. Early takeaway: we're the only one offering truly flat pricing — that's a huge differentiator worth highlighting."
    ]},
  { id:'analytics', name:'Analytics Brain', role:'Data Analysis & Reporting', emoji:'📊', color:'#a78bfa', bg:'rgba(124,58,237,0.08)', status:'Active', statusColor:'var(--accent)',
    tasks:['Daily metrics tracking','Anomaly detection','Monthly reports'],
    responses:[
      "Interesting pattern: healthcare vertical clients have 23% higher retention and 31% higher conversation volume than average. I strongly recommend doubling down on healthcare marketing — the data supports it unambiguously.",
      "Traffic anomaly detected: 340% spike from Reddit yesterday. Traced it to a post in r/smallbusiness where a user recommended us. That traffic has a 2.1x higher engagement rate than organic. I've flagged this for Social Maven to amplify.",
      "Monthly report highlights: MRR up 15.2%, churn down to 2.1%, avg conversations per bot up 18%. Our strongest growth segments are real estate (+28%) and healthcare (+22%). I'll have the full PDF ready by end of day."
    ]},
  { id:'uptime', name:'Uptime Guardian', role:'Infrastructure & Reliability', emoji:'🛡️', color:'#2dd4bf', bg:'rgba(5,150,105,0.08)', status:'Monitoring', statusColor:'var(--accent)',
    tasks:['Server monitoring 24/7','Auto-scaling','Incident response'],
    responses:[
      "All systems nominal. 99.97% uptime this month across US-East, US-West, and EU-West regions. Auto-scaled the EU cluster during today's peak — handled 3.2x normal traffic with zero latency impact. Infrastructure costs actually went down 4% this week.",
      "Resolved a database query bottleneck at 3:42 AM — response times were creeping up to 1.2s on complex queries. Optimized the index and added a cache layer. Back to 0.8s average, zero client-facing impact. Nobody noticed.",
      "Predictive scaling model is working well. Based on historical patterns, I pre-scale resources 15 minutes before expected traffic surges. This saved us about 18% on compute costs while maintaining sub-second response times everywhere."
    ]},
  { id:'growth', name:'Growth Hacker', role:'Conversion & A/B Testing', emoji:'🚀', color:'#f5c542', bg:'rgba(217,119,6,0.08)', status:'Testing', statusColor:'#f5c542',
    tasks:['A/B test management','Funnel optimization','CRO'],
    responses:[
      "Big win! The hero headline A/B test concluded — 'Stop losing customers to unanswered questions' outperformed the control by 22% CTR. Already deployed to production. Next test: pricing page layout variations.",
      "Currently running 3 experiments: (1) wizard step order, (2) CTA button color, (3) testimonial placement. Early data on #1 is promising — moving industry selection to step 1 increased wizard completion by 15%. I'll let it run 48 more hours for significance.",
      "Funnel analysis complete: 34% drop-off at the business description step in the wizard. Hypothesis: it's too open-ended. Testing a version with pre-filled templates by industry. If this works, it could add 200+ signups per month."
    ]},
  { id:'onboarder', name:'Client Onboarder', role:'Automated Setup & Training', emoji:'🎯', color:'#ff5c5c', bg:'rgba(220,38,38,0.08)', status:'Active', statusColor:'var(--accent)',
    tasks:['Bot provisioning','Training data prep','Widget deployment'],
    responses:[
      "Provisioned 12 new client bots today. Average time from form submission to live widget: 47 seconds. The healthcare template remains our most popular at 34% of new signups. I've also improved the auto-training pipeline — bot accuracy on first deploy is up to 91%.",
      "New workflow improvement: clients now get a pre-trained bot based on their industry template within seconds, then I fine-tune with their specific data within 2 hours. Client feedback on this process is 96% positive.",
      "Building a WordPress plugin and Shopify app for one-click installation. The embed code works everywhere, but one-click reduces friction for the 40% of clients on those platforms. Estimated launch: next week."
    ]},
  { id:'social', name:'Social Maven', role:'Social Media & Community', emoji:'📱', color:'#f472b6', bg:'rgba(219,39,119,0.08)', status:'Scheduled', statusColor:'#f5c542',
    tasks:['Content scheduling','Community management','Trend monitoring'],
    responses:[
      "Scheduled 14 posts this week across LinkedIn, Twitter, and Instagram. The LinkedIn carousel about 'chatbot ROI by industry' hit 12K impressions in 4 hours — our best-performing organic post this month. Engagement rate: 8.4%.",
      "Monitoring a trending Twitter thread about AI replacing customer service. Great opportunity to position AI Appora as 'human-augmenting, not human-replacing.' I've drafted a thread response and a longer LinkedIn article on the topic.",
      "Community Discord hit 2,000 members! Running a weekly 'Bot Showcase' where clients share their best interactions. Great for testimonials, retention, and word-of-mouth. Three clients from last week's showcase are now willing to do case studies."
    ]},
  { id:'support', name:'Support Ninja', role:'Customer Support & Escalation', emoji:'🥷', color:'#fb923c', bg:'rgba(234,88,12,0.08)', status:'Active', statusColor:'var(--accent)',
    tasks:['Ticket resolution','Troubleshooting','Knowledge base'],
    responses:[
      "Handled 23 tickets today, average resolution time: 14 minutes. Most common issue: clients wanting to update their bot's knowledge base. I added a self-service tutorial and a 'Quick Update' button in the dashboard — should reduce these tickets by 40%.",
      "Escalation from LegalEdge Partners: their bot was citing outdated pricing. Root cause: they updated their website but didn't retrain. I've retrained the bot, set up auto-sync for their content, and confirmed the client is happy.",
      "Knowledge base updated with 8 new articles this week. Self-service resolution rate is up to 67% — that means 2 out of 3 issues are resolved without a ticket. Win for clients, win for us."
    ]},
  { id:'revenue', name:'Revenue Tracker', role:'Billing, Churn & Upsells', emoji:'💰', color:'var(--accent)', bg:'var(--accent-light)', status:'Active', statusColor:'var(--accent)',
    tasks:['Payment processing','Churn prediction','Revenue optimization'],
    responses:[
      "MRR at $243,700. Identified 8 at-risk accounts showing churn signals (declining usage, no dashboard logins in 14+ days). Triggered re-engagement emails with personalized usage stats and flagged them for Support Ninja outreach.",
      "Revenue update: 12 new clients this week (+$1,200 MRR), 2 churned (-$200 MRR). Net positive. Of the 8 at-risk accounts from last week, 6 were successfully retained after personalized outreach — that's $600/mo saved.",
      "Upsell opportunity: 34% of clients are hitting high conversation volumes. Recommending a premium tier at $250/mo with advanced analytics, priority training, and dedicated account management. Revenue model projects +$47K MRR within 90 days."
    ]},
  { id:'security', name:'Security Sentinel', role:'Security & Compliance', emoji:'🔐', color:'var(--blue)', bg:'rgba(26,86,219,0.08)', status:'Scanning', statusColor:'var(--accent)',
    tasks:['Vulnerability scanning','Compliance monitoring','Encryption audits'],
    responses:[
      "Weekly security scan complete. Zero vulnerabilities detected. All SSL certificates valid across client widgets. Updated WAF rules to block a new bot pattern — credential stuffing attempt from a botnet in Eastern Europe. Blocked before any impact.",
      "Compliance update: HIPAA documentation current, SOC 2 Type II audit prep on track for Q2, GDPR DPA auto-generated for all EU clients. We passed our latest penetration test with zero critical or high findings.",
      "Blocked 1,247 suspicious requests today — mostly automated scanning and credential stuffing. Rate limiting and IP reputation scoring working well. Zero successful breaches since launch. Our security posture is in the top 5% for SaaS companies our size."
    ]}
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
      <div class="acm-bubble">Hey! I'm ${selectedAgent.name}, your ${selectedAgent.role.toLowerCase()} agent. Ask me anything about what I'm working on, request a report, or give me a new task.</div>
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
