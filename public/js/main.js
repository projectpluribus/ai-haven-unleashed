/* ========================================
   AI bloop — Main JavaScript
   Fully functional onboarding, demo chat, nav
   ======================================== */

// ============ NAVIGATION ============
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
  document.getElementById('mobileOverlay').classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('mobileOverlay').classList.remove('open');
}

// ============ FAQ ============
function toggleFaq(el) {
  const wasOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('open'));
  if (!wasOpen) el.classList.add('open');
}

// ============ DEMO CHAT ============
let demoChatOpen = true;

function toggleDemoChat() {
  const chat = document.getElementById('demoChat');
  const trigger = document.getElementById('demoChatTrigger');
  demoChatOpen = !demoChatOpen;
  chat.classList.toggle('hidden', !demoChatOpen);
  trigger.style.display = demoChatOpen ? 'none' : 'flex';
}

const demoBotKnowledge = {
  pricing: "AI bloop costs **$100/month flat** — no tiers, no upsells, no per-message charges. You get unlimited conversations, lead capture, analytics, multi-language support, and full customization. There's a 7-day free trial with no credit card required, and you can cancel anytime.",
  install: "Super easy! After creating your bot, you get a single line of JavaScript. Paste it before the closing </body> tag on your site. Works with WordPress, Shopify, Squarespace, Wix, Webflow, or any custom site. Most people go live in under 2 minutes. We also have a WordPress plugin for one-click install.",
  industries: "We support every industry! Most popular: **Healthcare** (appointments, insurance FAQs), **Real Estate** (lead qualification, property info), **E-Commerce** (product recs, order tracking), **Legal** (client intake), **Restaurants** (reservations, menus), and **Fitness** (class bookings). Each bot comes pre-loaded with industry knowledge.",
  demo: "You're chatting with an AI bloop bot right now! 😊 For your business, the bot would know YOUR products, prices, policies, and FAQs. Try the 'Build Your Bot' wizard above — takes 60 seconds to create your custom agent.",
  different: "ChatGPT is general-purpose and knows nothing about your business. AI bloop creates a **purpose-built agent** trained on YOUR data — products, services, pricing, policies. It speaks your brand voice and converts visitors into customers. Like hiring a dedicated expert employee vs. a random person.",
  features: "You get: Custom AI trained on your data, unlimited conversations, embeddable widget, lead capture, 50+ languages, brand customization, human handoff, analytics dashboard, conversation history, weekly reports, and quick prompts. All included for $100/mo.",
  customize: "Full control! Widget colors, bot avatar, bot name, greeting message, quick prompts, conversation tone (professional/friendly/casual/formal), and lead capture form fields. Preview changes in real-time. The widget looks native on any website.",
  security: "Enterprise-grade security: TLS 1.3 encryption in transit, AES-256 at rest. GDPR compliant, SOC 2 Type II in progress. Your data is never shared or used to train other models. Each client's data is fully isolated.",
  support: "Priority email and chat support for all customers. Most issues resolved within 2 hours. Plus comprehensive help center, setup guides, and video tutorials.",
  cancel: "Zero contracts, zero commitments. Cancel anytime from your dashboard in 10 seconds. Bot stays active until end of billing period. We also offer a 7-day free trial — no credit card needed.",
  hello: "Hey there! 👋 Welcome! I'm the AI bloop demo bot. I can answer questions about pricing, features, setup, industries we support, or anything else about AI bloop. What would you like to know?",
  default: "Great question! I'm specifically trained on AI bloop's features and services. I can tell you about: pricing ($100/mo flat), setup (under 2 minutes), supported industries, customization options, security, or anything else. What interests you?"
};

function getBotResponse(userMsg) {
  const msg = userMsg.toLowerCase();
  if (msg.includes('hi') && msg.length < 12 || msg.includes('hello') || msg.includes('hey'))
    return demoBotKnowledge.hello;
  if (msg.includes('pric') || msg.includes('cost') || msg.includes('how much') || msg.includes('$') || msg.includes('pay') || msg.includes('fee'))
    return demoBotKnowledge.pricing;
  if (msg.includes('install') || msg.includes('embed') || msg.includes('add') || msg.includes('setup') || msg.includes('set up') || msg.includes('code') || msg.includes('wordpress') || msg.includes('shopify'))
    return demoBotKnowledge.install;
  if (msg.includes('industr') || msg.includes('health') || msg.includes('real estate') || msg.includes('restaurant') || msg.includes('ecommerce') || msg.includes('legal') || msg.includes('fitness') || msg.includes('what bus'))
    return demoBotKnowledge.industries;
  if (msg.includes('demo') || msg.includes('try') || msg.includes('test') || msg.includes('preview'))
    return demoBotKnowledge.demo;
  if (msg.includes('different') || msg.includes('chatgpt') || msg.includes('vs') || msg.includes('compar') || msg.includes('generic') || msg.includes('better'))
    return demoBotKnowledge.different;
  if (msg.includes('feature') || msg.includes('include') || msg.includes('what do') || msg.includes('everything'))
    return demoBotKnowledge.features;
  if (msg.includes('custom') || msg.includes('brand') || msg.includes('color') || msg.includes('design') || msg.includes('appear'))
    return demoBotKnowledge.customize;
  if (msg.includes('secur') || msg.includes('privac') || msg.includes('gdpr') || msg.includes('data') || msg.includes('safe'))
    return demoBotKnowledge.security;
  if (msg.includes('support') || msg.includes('help') || msg.includes('contact'))
    return demoBotKnowledge.support;
  if (msg.includes('cancel') || msg.includes('contract') || msg.includes('trial') || msg.includes('free'))
    return demoBotKnowledge.cancel;
  return demoBotKnowledge.default;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function scrollChat(c) { c.scrollTop = c.scrollHeight; }

function sendDemoChat() {
  const input = document.getElementById('demoChatInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';

  const prompts = document.getElementById('demoPrompts');
  if (prompts) prompts.style.display = 'none';

  const c = document.getElementById('demoChatMessages');
  c.innerHTML += `<div class="d-msg user"><div class="d-msg-bubble">${escapeHtml(msg)}</div></div>`;
  scrollChat(c);

  c.innerHTML += `<div class="d-msg bot" id="typing"><div class="d-msg-typing"><span></span><span></span><span></span></div></div>`;
  scrollChat(c);

  setTimeout(() => {
    const t = document.getElementById('typing');
    if (t) t.remove();
    const response = getBotResponse(msg).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    c.innerHTML += `<div class="d-msg bot"><div class="d-msg-bubble">${response}</div></div>`;
    scrollChat(c);
  }, 500 + Math.random() * 700);
}

function askQuickPrompt(btn) {
  document.getElementById('demoChatInput').value = btn.textContent;
  sendDemoChat();
}

// ============ ONBOARDING WIZARD — PREMIUM ============
const wizardSteps = [
  { id: 'business', title: 'Business Details' },
  { id: 'email', title: 'Your Email' },
  { id: 'industry', title: 'Industry' },
  { id: 'goals', title: 'Goals' },
  { id: 'description', title: 'Description & Tone' },
  { id: 'review', title: 'Review & Create' }
];

let currentWizStep = 0;
let wizData = {
  businessName: '', website: '', email: '', industry: '', goals: [],
  description: '', tone: 'professional'
};

function renderProgressTrack() {
  const track = document.getElementById('wizProgressTrack');
  track.innerHTML = wizardSteps.map((s, i) => {
    const dotClass = i < currentWizStep ? 'completed' : i === currentWizStep ? 'active' : '';
    const lineClass = i < currentWizStep ? 'completed' : '';
    const icon = i < currentWizStep ? '✓' : (i + 1);
    let html = `<div class="wiz-progress-step"><div class="wiz-progress-dot ${dotClass}">${icon}</div>`;
    if (i < wizardSteps.length - 1) html += `<div class="wiz-progress-line ${lineClass}"></div>`;
    html += '</div>';
    return html;
  }).join('');
}

function renderWizBody() {
  const body = document.getElementById('wizardBody');
  const backBtn = document.getElementById('wizBack');
  const nextBtn = document.getElementById('wizNext');

  backBtn.style.visibility = currentWizStep === 0 ? 'hidden' : 'visible';
  nextBtn.innerHTML = currentWizStep === wizardSteps.length - 1 ? 'Create My Chatbot →' : 'Continue →';
  renderProgressTrack();

  // Force re-animation
  body.style.animation = 'none';
  body.offsetHeight;
  body.style.animation = '';

  let html = '';
  switch (currentWizStep) {
    case 0:
      html = `
        <h3 class="wiz-title">What's your business?</h3>
        <p class="wiz-desc">We'll use this to personalize your AI chatbot.</p>
        <div class="wiz-field">
          <label class="wiz-label">Business Name *</label>
          <input class="wiz-input" id="wiz-name" placeholder="e.g. Sunrise Dental, Peak Fitness" value="${escapeHtml(wizData.businessName)}">
        </div>
        <div class="wiz-field">
          <label class="wiz-label">Website URL (optional)</label>
          <input class="wiz-input" id="wiz-website" placeholder="https://yoursite.com" value="${escapeHtml(wizData.website)}">
        </div>`;
      break;
    case 1:
      html = `
        <h3 class="wiz-title">What's your email?</h3>
        <p class="wiz-desc">We'll send your bot credentials and setup instructions here.</p>
        <div class="wiz-field">
          <label class="wiz-label">Email Address *</label>
          <input class="wiz-input" id="wiz-email" type="email" placeholder="you@company.com" value="${escapeHtml(wizData.email)}">
        </div>`;
      break;
    case 2:
      const inds = [
        { i:'🏥', t:'Healthcare' }, { i:'🏠', t:'Real Estate' }, { i:'🛒', t:'E-Commerce' },
        { i:'⚖️', t:'Legal' }, { i:'🍽️', t:'Restaurant' }, { i:'🏋️', t:'Fitness' },
        { i:'🎓', t:'Education' }, { i:'🔧', t:'Home Services' }, { i:'✨', t:'Other' }
      ];
      html = `
        <h3 class="wiz-title">What industry are you in?</h3>
        <p class="wiz-desc">We'll pre-train your bot with industry-specific knowledge.</p>
        <div class="wiz-card-grid">
          ${inds.map(ind => `
            <div class="wiz-card ${wizData.industry === ind.t ? 'selected' : ''}" onclick="selectIndustry(this,'${ind.t}')">
              <div class="wiz-card-icon">${ind.i}</div>
              <div class="wiz-card-title">${ind.t}</div>
            </div>`).join('')}
        </div>`;
      break;
    case 3:
      const goals = [
        { id:'faq', i:'❓', t:'Answer FAQs' }, { id:'leads', i:'📧', t:'Capture Leads' },
        { id:'booking', i:'📅', t:'Book Appointments' }, { id:'products', i:'🛍️', t:'Product Recs' },
        { id:'support', i:'🎧', t:'Support Tickets' }, { id:'custom', i:'⚙️', t:'Custom' }
      ];
      html = `
        <h3 class="wiz-title">What should your bot do?</h3>
        <p class="wiz-desc">Select all that apply — you can change these later.</p>
        <div class="wiz-card-grid">
          ${goals.map(g => `
            <div class="wiz-card ${wizData.goals.includes(g.id) ? 'selected' : ''}" onclick="toggleGoal(this,'${g.id}')">
              <div class="wiz-card-icon">${g.i}</div>
              <div class="wiz-card-title">${g.t}</div>
            </div>`).join('')}
        </div>`;
      break;
    case 4:
      html = `
        <h3 class="wiz-title">Tell us about your business</h3>
        <p class="wiz-desc">The more detail you provide, the smarter your bot will be.</p>
        <div class="wiz-field">
          <label class="wiz-label">Business Description *</label>
          <textarea class="wiz-textarea" id="wiz-desc" placeholder="Describe what you sell, who your customers are, pricing, hours, policies...">${escapeHtml(wizData.description)}</textarea>
        </div>
        <div class="wiz-field">
          <label class="wiz-label">Conversation Tone</label>
          <div class="wiz-tone-grid">
            <div class="wiz-tone-card ${wizData.tone==='friendly'?'selected':''}" onclick="selectTone(this,'friendly')">
              <div class="tone-emoji">😊</div>
              <div class="tone-label">Friendly</div>
              <div class="tone-desc">Warm & approachable</div>
            </div>
            <div class="wiz-tone-card ${wizData.tone==='professional'?'selected':''}" onclick="selectTone(this,'professional')">
              <div class="tone-emoji">💼</div>
              <div class="tone-label">Professional</div>
              <div class="tone-desc">Polished & expert</div>
            </div>
            <div class="wiz-tone-card ${wizData.tone==='casual'?'selected':''}" onclick="selectTone(this,'casual')">
              <div class="tone-emoji">✌️</div>
              <div class="tone-label">Casual</div>
              <div class="tone-desc">Relaxed & natural</div>
            </div>
          </div>
        </div>`;
      break;
    case 5:
      const name = wizData.businessName || 'Your Business';
      const gLabels = { faq:'Answer FAQs', leads:'Capture Leads', booking:'Book Appointments', products:'Product Recs', support:'Support Tickets', custom:'Custom' };
      const activeGoals = wizData.goals.map(g => gLabels[g]||g);
      html = `
        <h3 class="wiz-title">Review & create your bot</h3>
        <p class="wiz-desc">Everything look good? Hit the button below to go live.</p>
        <div class="wiz-review">
          <div class="wiz-review-row"><div class="wiz-review-label">Business</div><div class="wiz-review-value">${escapeHtml(name)}</div></div>
          ${wizData.website ? `<div class="wiz-review-row"><div class="wiz-review-label">Website</div><div class="wiz-review-value">${escapeHtml(wizData.website)}</div></div>` : ''}
          <div class="wiz-review-row"><div class="wiz-review-label">Email</div><div class="wiz-review-value">${escapeHtml(wizData.email)}</div></div>
          <div class="wiz-review-row"><div class="wiz-review-label">Industry</div><div class="wiz-review-value">${escapeHtml(wizData.industry)}</div></div>
          <div class="wiz-review-row"><div class="wiz-review-label">Goals</div><div class="wiz-review-value"><div class="wiz-review-tags">${activeGoals.map(g=>`<span class="wiz-review-tag">${g}</span>`).join('')}</div></div></div>
          <div class="wiz-review-row"><div class="wiz-review-label">Tone</div><div class="wiz-review-value" style="text-transform:capitalize;">${escapeHtml(wizData.tone)}</div></div>
        </div>`;
      break;
  }
  body.innerHTML = html;
}

function selectIndustry(el, value) {
  document.querySelectorAll('.wiz-card-grid .wiz-card').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  wizData.industry = value;
}

function toggleGoal(el, value) {
  el.classList.toggle('selected');
  wizData.goals = wizData.goals.includes(value) ? wizData.goals.filter(g=>g!==value) : [...wizData.goals, value];
}

function selectTone(el, value) {
  document.querySelectorAll('.wiz-tone-card').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  wizData.tone = value;
}

function saveWizStep() {
  switch(currentWizStep) {
    case 0:
      wizData.businessName = document.getElementById('wiz-name')?.value || '';
      wizData.website = document.getElementById('wiz-website')?.value || '';
      break;
    case 1:
      wizData.email = document.getElementById('wiz-email')?.value || '';
      break;
    case 4:
      wizData.description = document.getElementById('wiz-desc')?.value || '';
      break;
  }
}

function validateWizStep() {
  switch(currentWizStep) {
    case 0:
      const n = document.getElementById('wiz-name')?.value?.trim();
      if (!n) { shakeField('wiz-name'); return false; }
      return true;
    case 1:
      const e = document.getElementById('wiz-email')?.value?.trim();
      if (!e || !e.includes('@') || !e.includes('.')) { shakeField('wiz-email'); return false; }
      return true;
    case 2: return !!wizData.industry;
    case 3: return wizData.goals.length > 0;
    case 4:
      const d = document.getElementById('wiz-desc')?.value?.trim();
      if (!d || d.length < 1) { shakeField('wiz-desc'); return false; }
      return true;
    default: return true;
  }
}

function shakeField(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.borderColor = 'var(--red)';
  el.style.animation = 'shake 0.4s ease';
  el.addEventListener('animationend', () => el.style.animation = '', { once: true });
  el.focus();
}

const shakeStyle = document.createElement('style');
shakeStyle.textContent = `@keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }`;
document.head.appendChild(shakeStyle);

function wizNext() {
  if (!validateWizStep()) return;
  saveWizStep();
  if (currentWizStep < wizardSteps.length - 1) {
    currentWizStep++;
    renderWizBody();
    document.getElementById('wizard').scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    submitWizard();
  }
}

function wizPrev() {
  if (currentWizStep > 0) {
    saveWizStep();
    currentWizStep--;
    renderWizBody();
  }
}

function submitWizard() {
  const body = document.getElementById('wizardBody');
  const footer = document.querySelector('.wizard-footer');
  footer.style.display = 'none';

  const creationSteps = [
    { label: 'Analyzing your business data…', delay: 500 },
    { label: 'Training AI on your products & services…', delay: 1200 },
    { label: 'Configuring conversation flows…', delay: 2000 },
    { label: 'Setting up lead capture…', delay: 2600 },
    { label: 'Deploying your AI agent…', delay: 3200 }
  ];

  body.innerHTML = `
    <div class="wiz-creating">
      <div class="wiz-creating-spinner"></div>
      <div class="wiz-creating-title">Building your AI agent</div>
      <div class="wiz-creating-sub">This usually takes a few seconds…</div>
      <div class="wiz-creating-steps">
        ${creationSteps.map((s, i) => `
          <div class="wiz-creating-step" id="cstep-${i}">
            <div class="wiz-creating-step-icon">○</div>
            <div>${s.label}</div>
          </div>`).join('')}
      </div>
    </div>`;

  creationSteps.forEach((s, i) => {
    setTimeout(() => {
      const el = document.getElementById('cstep-' + i);
      if (el) { el.classList.add('active'); el.querySelector('.wiz-creating-step-icon').textContent = '⟳'; }
      if (i > 0) {
        const prev = document.getElementById('cstep-' + (i - 1));
        if (prev) { prev.classList.remove('active'); prev.classList.add('done'); prev.querySelector('.wiz-creating-step-icon').textContent = '✓'; }
      }
    }, s.delay);
  });

  // POST to API
  setTimeout(() => {
    const last = document.getElementById('cstep-' + (creationSteps.length - 1));
    if (last) { last.classList.remove('active'); last.classList.add('done'); last.querySelector('.wiz-creating-step-icon').textContent = '✓'; }

    fetch('https://api.aibloop.com/api/bots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessName: wizData.businessName,
        website: wizData.website,
        email: wizData.email,
        industry: wizData.industry,
        description: wizData.description,
        tone: wizData.tone,
        goals: wizData.goals
      })
    })
    .then(res => {
      if (!res.ok) throw new Error('API error');
      return res.json();
    })
    .then(data => {
      const botId = data.bot_id || data.id || 'bot_' + Math.random().toString(36).substr(2, 12);
      showSuccess(botId);
    })
    .catch(err => {
      showError(err.message);
    });
  }, 3800);
}

function showSuccess(botId) {
  const body = document.getElementById('wizardBody');
  const embedCode = `<script src="https://api.aibloop.com/api/widget/${botId}"><\/script>`;

  // Mark all progress dots complete
  document.querySelectorAll('.wiz-progress-dot').forEach(d => { d.className = 'wiz-progress-dot completed'; d.textContent = '✓'; });
  document.querySelectorAll('.wiz-progress-line').forEach(l => l.classList.add('completed'));

  body.innerHTML = `
    <div class="wiz-success">
      <div class="wiz-success-checkmark">✓</div>
      <h3>Your AI Chatbot is Ready!</h3>
      <p>Copy the embed code below and paste it before your &lt;/body&gt; tag.</p>
      <div class="wiz-embed-block">
        <button class="copy-btn" onclick="copyEmbed(this)">Copy Code</button>
        <code>${escapeHtml(embedCode)}</code>
      </div>
      <div class="wiz-success-actions">
        <a href="https://api.aibloop.com/widget/${botId}" target="_blank" class="wiz-btn wiz-btn-outline">Test Your Bot</a>
        <a href="https://buy.stripe.com/8x228s1em7jp8LHbv63ks00" target="_blank" class="wiz-btn wiz-btn-green">Activate Full Access — $100/mo</a>
      </div>
      <p class="wiz-success-note">Your bot is live in demo mode (50 messages). Subscribe for unlimited conversations.</p>
    </div>`;
}

function showError(msg) {
  const body = document.getElementById('wizardBody');
  const footer = document.querySelector('.wizard-footer');

  body.innerHTML = `
    <div class="wiz-error">
      <div class="wiz-error-icon">⚠️</div>
      <h3>Something went wrong</h3>
      <p>${escapeHtml(msg || 'We couldn\'t create your bot right now. Please try again.')}</p>
      <button class="wiz-btn wiz-btn-next" onclick="retryWizard()">Try Again →</button>
    </div>`;
}

function retryWizard() {
  const footer = document.querySelector('.wizard-footer');
  footer.style.display = 'flex';
  currentWizStep = 5;
  renderWizBody();
}

function copyEmbed(btn) {
  const code = btn.parentElement.querySelector('code')?.textContent || '';
  navigator.clipboard?.writeText(code).then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy Code', 2000);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = code;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy Code', 2000);
  });
}

// Initialize wizard
renderWizBody();

// ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
