/* ========================================
   AI bloop — Main JavaScript
   Fully functional onboarding, demo chat, nav
   ======================================== */

// ============ REVENUE CALCULATOR ============
function updateCalc() {
  const visitors = parseFloat(document.getElementById('calcVisitors').value) || 0;
  const dealValue = parseFloat(document.getElementById('calcDealValue').value) || 0;
  const convRate = parseFloat(document.getElementById('calcConversion').value) || 0;
  const currentLeads = visitors * (convRate / 100);
  const potentialLeads = currentLeads * 3.2;
  const missedLeads = Math.round(potentialLeads - currentLeads);
  const lostRevenue = missedLeads * dealValue;
  document.getElementById('calcMissedLeads').textContent = missedLeads.toLocaleString();
  document.getElementById('calcLostRevenue').textContent = '$' + lostRevenue.toLocaleString();
  document.getElementById('calcCallout').innerHTML = 'You could be losing <strong>$' + lostRevenue.toLocaleString() + '/month</strong> in unanswered questions.';
}
document.addEventListener('DOMContentLoaded', updateCalc);

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

// ============ ONBOARDING WIZARD ============
const wizardSteps = [
  { id: 'business', title: 'Business Details', desc: 'Name, website, email' },
  { id: 'industry', title: 'Your Industry', desc: 'Select your vertical' },
  { id: 'goals', title: 'Bot Goals', desc: 'What should it do?' },
  { id: 'description', title: 'Business Info', desc: 'Describe your business' },
  { id: 'customize', title: 'Customize', desc: 'Tone & appearance' },
  { id: 'result', title: 'Your Bot', desc: 'Ready to deploy!' }
];

let currentWizStep = 0;
let wizData = {
  businessName: '', website: '', email: '', industry: '', goals: [],
  description: '', tone: 'professional', greeting: '', primaryColor: '#c4f751'
};

function renderWizSidebar() {
  document.getElementById('wizStepsList').innerHTML = wizardSteps.map((s, i) => `
    <div class="wiz-step-item ${i === currentWizStep ? 'active' : ''} ${i < currentWizStep ? 'completed' : ''}">
      <div class="wiz-step-dot"></div>
      <div>
        <div class="wiz-step-title">${s.title}</div>
        <div class="wiz-step-desc">${s.desc}</div>
      </div>
    </div>
  `).join('');
}

function renderWizBody() {
  const body = document.getElementById('wizardBody');
  const bar = document.getElementById('wizProgressBar');
  const counter = document.getElementById('wizCounter');
  const backBtn = document.getElementById('wizBack');
  const nextBtn = document.getElementById('wizNext');

  bar.style.width = ((currentWizStep + 1) / wizardSteps.length * 100) + '%';
  counter.textContent = `Step ${currentWizStep + 1} of ${wizardSteps.length}`;
  backBtn.style.visibility = currentWizStep === 0 ? 'hidden' : 'visible';
  if (currentWizStep === wizardSteps.length - 1) {
    nextBtn.textContent = 'Start My Free Trial →';
    // Add paid button if not already present
    setTimeout(() => {
      if (!document.getElementById('wizPaidBtn')) {
        const orText = document.createElement('div');
        orText.style.cssText = 'text-align:center;font-size:13px;color:var(--text-muted);margin:8px 0;';
        orText.textContent = 'or';
        nextBtn.parentElement.insertBefore(orText, nextBtn.nextSibling);

        const paidBtn = document.createElement('button');
        paidBtn.id = 'wizPaidBtn';
        paidBtn.className = 'btn';
        paidBtn.style.cssText = 'background:transparent;border:1.5px solid var(--accent);color:var(--accent);padding:12px 24px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;width:100%;margin-top:0;';
        paidBtn.textContent = 'Skip Trial — Pay $100/mo & Go Live Instantly';
        paidBtn.onclick = function() { wizNextPaid(); };
        orText.parentElement.insertBefore(paidBtn, orText.nextSibling);
      }
    }, 0);
  } else {
    nextBtn.textContent = 'Continue →';
  }

  let html = '';
  switch (currentWizStep) {
    case 0:
      html = `
        <h3 class="wiz-title">What's your business?</h3>
        <p class="wiz-desc">We'll use this to create and personalize your AI chatbot.</p>
        <div class="wiz-field">
          <label class="wiz-label">Business Name *</label>
          <input class="wiz-input" id="wiz-name" placeholder="e.g. Sunrise Dental, Peak Fitness, Bella Cucina" value="${escapeHtml(wizData.businessName)}">
        </div>
        <div class="wiz-row">
          <div class="wiz-field">
            <label class="wiz-label">Website URL</label>
            <input class="wiz-input" id="wiz-website" placeholder="https://yoursite.com" value="${escapeHtml(wizData.website)}">
          </div>
          <div class="wiz-field">
            <label class="wiz-label">Email *</label>
            <input class="wiz-input" id="wiz-email" type="email" placeholder="you@company.com" value="${escapeHtml(wizData.email)}">
          </div>
        </div>`;
      break;
    case 1:
      const inds = [
        { i: '🏥', t: 'Healthcare & Dental', d: 'Clinics, dentists, therapists' },
        { i: '🏠', t: 'Real Estate', d: 'Brokers, agents, property mgmt' },
        { i: '🛒', t: 'E-Commerce', d: 'Online stores, DTC brands' },
        { i: '⚖️', t: 'Legal Services', d: 'Law firms, consultants' },
        { i: '🍽️', t: 'Restaurants & Food', d: 'Dining, catering, delivery' },
        { i: '🏋️', t: 'Fitness & Wellness', d: 'Gyms, studios, spas' },
        { i: '🎓', t: 'Education', d: 'Schools, courses, tutoring' },
        { i: '🔧', t: 'Home Services', d: 'Plumbing, HVAC, cleaning' },
        { i: '💼', t: 'Professional Services', d: 'Accounting, consulting, finance' },
        { i: '✨', t: 'Other', d: 'We support every industry' }
      ];
      html = `
        <h3 class="wiz-title">What industry are you in?</h3>
        <p class="wiz-desc">We'll pre-train your bot with industry-specific knowledge.</p>
        <div class="wiz-options">
          ${inds.map(ind => `
            <div class="wiz-option ${wizData.industry === ind.t ? 'selected' : ''}" onclick="selectIndustry(this,'${ind.t}')">
              <div class="wiz-option-icon">${ind.i}</div>
              <div class="wiz-option-title">${ind.t}</div>
              <div class="wiz-option-desc">${ind.d}</div>
            </div>`).join('')}
        </div>`;
      break;
    case 2:
      const goals = [
        { id:'faq', i:'❓', t:'Answer FAQs', d:'Handle common questions automatically' },
        { id:'leads', i:'📧', t:'Capture Leads', d:'Collect emails and phone numbers' },
        { id:'booking', i:'📅', t:'Book Appointments', d:'Schedule meetings and demos' },
        { id:'products', i:'🛍️', t:'Product Help', d:'Recommendations and info' },
        { id:'support', i:'🎧', t:'Customer Support', d:'Returns, orders, troubleshooting' },
        { id:'qualify', i:'🎯', t:'Qualify Prospects', d:'Pre-qualify before handoff' }
      ];
      html = `
        <h3 class="wiz-title">What should your bot do?</h3>
        <p class="wiz-desc">Select all that apply. You can change these later.</p>
        <div class="wiz-options">
          ${goals.map(g => `
            <div class="wiz-option ${wizData.goals.includes(g.id) ? 'selected' : ''}" onclick="toggleGoal(this,'${g.id}')">
              <div class="wiz-option-icon">${g.i}</div>
              <div class="wiz-option-title">${g.t}</div>
              <div class="wiz-option-desc">${g.d}</div>
            </div>`).join('')}
        </div>`;
      break;
    case 3:
      html = `
        <h3 class="wiz-title">Tell us about your business</h3>
        <p class="wiz-desc">The more detail you provide, the smarter your bot will be.</p>
        <div class="wiz-field">
          <label class="wiz-label">Business Description *</label>
          <textarea class="wiz-textarea" id="wiz-desc" placeholder="Describe what you sell, who your customers are, your pricing, hours, policies, and anything customers commonly ask about...">${escapeHtml(wizData.description)}</textarea>
        </div>
        <div class="wiz-field">
          <label class="wiz-label">Common Customer Questions (optional, one per line)</label>
          <textarea class="wiz-textarea" id="wiz-faqs" style="min-height:80px;" placeholder="What are your hours?\nDo you accept insurance?\nHow much does a cleaning cost?"></textarea>
        </div>`;
      break;
    case 4:
      html = `
        <h3 class="wiz-title">Customize your bot</h3>
        <p class="wiz-desc">Set the tone, personality, and look of your AI agent.</p>
        <div class="wiz-row">
          <div class="wiz-field">
            <label class="wiz-label">Conversation Tone</label>
            <select class="wiz-select" id="wiz-tone">
              <option value="professional" ${wizData.tone==='professional'?'selected':''}>Professional & Helpful</option>
              <option value="friendly" ${wizData.tone==='friendly'?'selected':''}>Warm & Friendly</option>
              <option value="casual" ${wizData.tone==='casual'?'selected':''}>Casual & Conversational</option>
              <option value="formal" ${wizData.tone==='formal'?'selected':''}>Formal & Corporate</option>
            </select>
          </div>
          <div class="wiz-field">
            <label class="wiz-label">Bot Name</label>
            <input class="wiz-input" id="wiz-botname" placeholder="e.g. ${wizData.businessName||'Your'} Assistant" value="${wizData.businessName?wizData.businessName+' Assistant':''}">
          </div>
        </div>
        <div class="wiz-field">
          <label class="wiz-label">Greeting Message</label>
          <textarea class="wiz-textarea" id="wiz-greeting" style="min-height:80px;" placeholder="Hi! 👋 Welcome to ${wizData.businessName||'our website'}. How can I help you today?">${escapeHtml(wizData.greeting)}</textarea>
        </div>
        <div class="wiz-field">
          <label class="wiz-label">Brand Color</label>
          <div style="display:flex;gap:10px;align-items:center;">
            <input type="color" id="wiz-color" value="${wizData.primaryColor}" style="width:48px;height:36px;border:1px solid var(--border);border-radius:8px;background:var(--bg);cursor:pointer;padding:2px;">
            <span style="font-size:13px;color:var(--text-muted);">Used for chat widget accent</span>
          </div>
        </div>`;
      break;
    case 5:
      const name = wizData.businessName || 'Your Business';
      const ind = wizData.industry || 'General';
      const gLabels = { faq:'FAQ Answering', leads:'Lead Capture', booking:'Appointment Booking', products:'Product Recommendations', support:'Customer Support', qualify:'Lead Qualification' };
      const activeGoals = wizData.goals.map(g => gLabels[g]||g);
      html = `
        <h3 class="wiz-title">Review & Create Your Bot</h3>
        <p class="wiz-desc">Everything look good? Hit "Start My Free Trial" to go live.</p>
        <div class="wiz-result">
          <div class="wiz-result-header">
            <div class="wiz-result-avatar">⚡</div>
            <div>
              <div class="wiz-result-name">${escapeHtml(name)} AI Agent</div>
              <div class="wiz-result-meta">${escapeHtml(ind)} · ${escapeHtml(wizData.tone)} tone</div>
            </div>
          </div>
          <div class="wiz-result-features">
            <div class="wiz-result-feat"><span class="chk">✓</span> Trained on your data</div>
            <div class="wiz-result-feat"><span class="chk">✓</span> Unlimited conversations</div>
            ${activeGoals.map(g=>`<div class="wiz-result-feat"><span class="chk">✓</span> ${g}</div>`).join('')}
            <div class="wiz-result-feat"><span class="chk">✓</span> 50+ languages</div>
            <div class="wiz-result-feat"><span class="chk">✓</span> Weekly email reports</div>
            <div class="wiz-result-feat"><span class="chk">✓</span> Human handoff</div>
          </div>
        </div>`;
      break;
  }
  body.innerHTML = html;
  renderWizSidebar();
}

function selectIndustry(el, value) {
  document.querySelectorAll('.wiz-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  wizData.industry = value;
}

function toggleGoal(el, value) {
  el.classList.toggle('selected');
  wizData.goals = wizData.goals.includes(value) ? wizData.goals.filter(g=>g!==value) : [...wizData.goals, value];
}

function saveWizStep() {
  switch(currentWizStep) {
    case 0:
      wizData.businessName = document.getElementById('wiz-name')?.value || '';
      wizData.website = document.getElementById('wiz-website')?.value || '';
      wizData.email = document.getElementById('wiz-email')?.value || '';
      break;
    case 3:
      wizData.description = document.getElementById('wiz-desc')?.value || '';
      break;
    case 4:
      wizData.tone = document.getElementById('wiz-tone')?.value || 'professional';
      wizData.greeting = document.getElementById('wiz-greeting')?.value || '';
      wizData.primaryColor = document.getElementById('wiz-color')?.value || '#c4f751';
      break;
  }
}

function validateWizStep() {
  switch(currentWizStep) {
    case 0:
      const n = document.getElementById('wiz-name')?.value?.trim();
      const e = document.getElementById('wiz-email')?.value?.trim();
      if (!n) { shakeField('wiz-name'); return false; }
      if (!e || !e.includes('@')) { shakeField('wiz-email'); return false; }
      return true;
    case 1: return !!wizData.industry;
    case 2: return wizData.goals.length > 0;
    case 3:
      const d = document.getElementById('wiz-desc')?.value?.trim();
      if (!d || d.length < 1) { shakeField('wiz-desc'); return false; }
      return true;
    default: return true;
  }
}

function shakeField(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.borderColor = '#ff5c5c';
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
    // POST to API
    const nextBtn = document.getElementById('wizNext');
    nextBtn.disabled = true;
    nextBtn.textContent = 'Creating your chatbot...';

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
    .then(res => { if (!res.ok) throw new Error('Request failed'); return res.json(); })
    .then(data => {
      if (!data.bot_id) throw new Error('No bot_id');
      const body = document.getElementById('wizardBody');
      const footer = document.querySelector('.wizard-footer');
      footer.style.display = 'none';
      document.getElementById('wizProgressBar').style.width = '100%';
      document.getElementById('wizCounter').textContent = 'Complete!';

      const embedCode = '<script src="https://api.aibloop.com/api/widget/' + data.bot_id + '"><\/script>';

      body.innerHTML = `
        <div class="wiz-success">
          <div class="wiz-success-badge">✓ Successfully Created</div>
          <h3 class="wiz-title" style="-webkit-text-fill-color:unset;background:none;color:var(--text);">Your AI Chatbot is Ready!</h3>

          <div style="background:rgba(245,185,60,0.12);border:1.5px solid rgba(245,185,60,0.45);border-radius:12px;padding:16px 20px;margin:18px 0 24px;text-align:left;">
            <p style="margin:0;font-size:14px;line-height:1.6;color:var(--text);">⚡ <strong>Free Trial:</strong> Your bot includes 50 free messages. After 50 messages, the bot will pause until you subscribe. Activate unlimited messages anytime for $100/mo.</p>
          </div>

          <div class="wiz-result" style="text-align:left;">
            <div style="font-weight:600;font-size:15px;margin-bottom:8px;">Copy the embed code and paste it on your website before the closing &lt;/body&gt; tag:</div>
            <div class="wiz-result-code">
              <button class="copy-btn" onclick="copyEmbed(this)">Copy Code</button>
              <code>${escapeHtml(embedCode)}</code>
            </div>
          </div>

          <div style="margin-top:24px;text-align:center;">
            <a href="https://buy.stripe.com/8x228s1em7jp8LHbv63ks00" class="btn btn-accent" style="font-size:15px;padding:12px 32px;display:inline-block;text-decoration:none;" target="_blank">Activate Full Access — $100/mo</a>
          </div>

          <p style="margin-top:20px;font-size:13px;color:var(--text-muted);text-align:center;">Questions? Email <a href="mailto:support@aibloop.com" style="color:var(--accent);text-decoration:underline;">support@aibloop.com</a></p>
        </div>`;
    })
    .catch(() => {
      nextBtn.disabled = false;
      nextBtn.textContent = 'Start My Free Trial →';
      alert('Something went wrong, please try again.');
    });
  }
}

function loadBotPreview(botId) {
  const container = document.getElementById('botPreviewContainer');
  const btn = document.getElementById('testBotBtn');
  if (!container || container.dataset.loaded) return;
  container.dataset.loaded = 'true';
  btn.disabled = true;
  btn.textContent = 'Loading...';

  // Load the widget script
  const script = document.createElement('script');
  script.src = 'https://api.aibloop.com/api/widget/' + botId;
  script.onload = () => {
    btn.style.display = 'none';
    container.innerHTML = '<p style="font-size:13px;color:var(--text-muted);margin-top:4px;">✓ Bot widget loaded — look for the chat bubble on this page.</p>';
  };
  script.onerror = () => {
    btn.disabled = false;
    btn.textContent = '⚡ Test Your Bot';
    container.dataset.loaded = '';
    container.innerHTML = '<p style="font-size:13px;color:#ff5c5c;">Could not load the bot preview. Try again.</p>';
  };
  document.body.appendChild(script);
}

function wizNextPaid() {
  if (!validateWizStep()) return;
  saveWizStep();

  const paidBtn = document.getElementById('wizPaidBtn');
  const nextBtn = document.getElementById('wizNext');
  paidBtn.disabled = true;
  paidBtn.textContent = 'Redirecting to checkout...';
  nextBtn.disabled = true;

  fetch('https://api.aibloop.com/api/bots/paid', {
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
  .then(res => { if (!res.ok) throw new Error('Request failed'); return res.json(); })
  .then(data => {
    if (!data.checkout_url) throw new Error('No checkout_url');
    window.location.href = data.checkout_url;
  })
  .catch(() => {
    paidBtn.disabled = false;
    paidBtn.textContent = 'Skip Trial — Pay $100/mo & Go Live Instantly';
    nextBtn.disabled = false;
    alert('Something went wrong, please try again.');
  });
}

function wizPrev() {
  if (currentWizStep > 0) {
    saveWizStep();
    currentWizStep--;
    renderWizBody();
  }
}

function copyEmbed(btn) {
  const code = btn.parentElement.querySelector('code')?.textContent || btn.parentElement.textContent.replace('Copy','').trim();
  navigator.clipboard?.writeText(code).then(() => {
    btn.textContent = 'Copied!';
    btn.style.background = 'var(--accent)';
    btn.style.color = 'var(--bg)';
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.style.background = '';
      btn.style.color = '';
    }, 2000);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = code;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 2000);
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

// ============ BORDER LIGHT RIBBON ============
(function() {
  const container = document.getElementById('borderRibbon');
  if (!container) return;

  const glowCount = 6;
  const glowEls = [];
  for (let i = 0; i < glowCount; i++) {
    const g = document.createElement('div');
    g.className = 'border-glow';
    g.style.opacity = '0';
    container.appendChild(g);
    glowEls.push(g);
  }

  function animate() {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const sections = document.querySelectorAll('section, .footer');
    const borders = [];

    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.bottom > -100 && rect.top < vh + 100) {
        borders.push({ y: rect.top, width: rect.width });
        borders.push({ y: rect.bottom, width: rect.width });
      }
    });

    const centerY = vh * 0.5;
    borders.sort((a, b) => Math.abs(a.y - centerY) - Math.abs(b.y - centerY));

    glowEls.forEach((g, i) => {
      if (i < borders.length) {
        const b = borders[i];
        const dist = Math.abs(b.y - centerY);
        if (dist < vh * 0.7) {
          const progress = 1 - dist / (vh * 0.7);
          g.style.opacity = (progress * 0.9).toFixed(2);
          g.style.top = b.y + 'px';
          const scrollPhase = (scrollY * 0.5 + i * 200) % (b.width + 200) - 100;
          g.style.left = Math.max(0, Math.min(b.width - 220, scrollPhase)) + 'px';
          g.style.width = '220px';
        } else {
          g.style.opacity = '0';
        }
      } else {
        g.style.opacity = '0';
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
})();


// ============ 3D TILT ON CARDS ============
(function() {
  const cards = document.querySelectorAll('.feature-card, .industry-card, .test-card, .step-card');
  cards.forEach(card => {
    card.classList.add('tilt-card');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -8;
      const rotateY = (x - centerX) / centerX * 8;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
})();

// ============ FLOATING PARTICLES ============
(function() {
  const container = document.createElement('div');
  container.className = 'particles-container';
  document.body.prepend(container);
  for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = (60 + Math.random() * 40) + '%';
    p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
    p.style.animationDuration = (8 + Math.random() * 15) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(p);
  }
})();
